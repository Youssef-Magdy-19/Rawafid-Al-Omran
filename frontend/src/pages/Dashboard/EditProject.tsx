import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '@constants/route.constants';
import { useProject, useUpdateProject } from '@hooks/dashboard';
import { useToast } from '@providers/ToastProvider';
import { ErrorState } from '@components/ui/ErrorState';
import { LoadingSkeleton } from '@components/ui/LoadingSkeleton';
import { parseApiFieldErrors } from '@utils/api';
import { ProjectForm } from './ProjectForm';

export function EditProject() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addToast } = useToast();
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  const { data: project, isLoading, isError, refetch } = useProject(id || '');
  const updateProject = useUpdateProject();

  const handleSubmit = (data: Record<string, unknown>) => {
    if (!project) return;
    setServerErrors({});
    updateProject.mutate(
      { id: project.id, data },
      {
        onSuccess: () => {
          addToast(t('dashboard.editProject.updatedSuccess'), 'success');
          navigate(`/dashboard/projects/${project.slug}`);
        },
        onError: (error) => {
          const parsed = parseApiFieldErrors(error);
          setServerErrors(parsed);
          if (!Object.keys(parsed).length) {
            addToast(t('common.error'), 'error');
          }
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton className="h-8 w-48" />
        <LoadingSkeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  if (isError) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-medium text-foreground">{t('dashboard.projectDetails.notFound')}</p>
        <button
          onClick={() => navigate(ROUTES.DASHBOARD_PROJECTS)}
          className="mt-4 text-sm text-primary hover:underline"
        >
          {t('dashboard.projects.pageTitle')}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button
          onClick={() => navigate(ROUTES.DASHBOARD_PROJECTS)}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('dashboard.projects.pageTitle')}
        </button>
        <h1 className="text-2xl font-bold text-foreground">{t('dashboard.editProject.pageTitle')}</h1>
        <p className="text-muted-foreground mt-1">{t('dashboard.editProject.pageDescription')}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <ProjectForm
          initialData={project}
          onSubmit={handleSubmit}
          isSubmitting={updateProject.isPending}
          serverErrors={serverErrors}
        />
      </motion.div>
    </div>
  );
}
