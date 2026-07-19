import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '@constants/route.constants';
import { ProjectForm, type ProjectFormData } from './ProjectForm';

export function AddProject() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (_data: ProjectFormData) => {
    setIsSubmitting(true);
    // Temporary UI - no backend
    setTimeout(() => {
      setIsSubmitting(false);
      navigate(ROUTES.DASHBOARD_PROJECTS);
    }, 1000);
  };

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
        <h1 className="text-2xl font-bold text-foreground">{t('dashboard.addProject.pageTitle')}</h1>
        <p className="text-muted-foreground mt-1">{t('dashboard.addProject.pageDescription')}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <ProjectForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </motion.div>
    </div>
  );
}
