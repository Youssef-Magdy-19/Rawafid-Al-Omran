import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '@constants/route.constants';
import { useCreateTeamMember } from '@hooks/dashboard';
import { useToast } from '@providers/ToastProvider';
import { parseApiFieldErrors } from '@utils/api';
import { TeamForm } from './TeamForm';

export function AddTeamMember() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const createTeamMember = useCreateTeamMember();
  const { addToast } = useToast();
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  const handleSubmit = (data: Record<string, unknown>) => {
    setServerErrors({});
    createTeamMember.mutate(data, {
      onSuccess: () => {
        addToast(t('dashboard.addTeamMember.createdSuccess'), 'success');
        navigate(ROUTES.DASHBOARD_TEAM);
      },
      onError: (error) => {
        const parsed = parseApiFieldErrors(error);
        setServerErrors(parsed);
        if (!Object.keys(parsed).length) {
          addToast(t('common.error'), 'error');
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <button onClick={() => navigate(ROUTES.DASHBOARD_TEAM)}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="h-4 w-4" />{t('dashboard.team.pageTitle')}
        </button>
        <h1 className="text-2xl font-bold text-foreground">{t('dashboard.addTeamMember.pageTitle')}</h1>
        <p className="text-muted-foreground mt-1">{t('dashboard.addTeamMember.pageDescription')}</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        <TeamForm onSubmit={handleSubmit} isSubmitting={createTeamMember.isPending} serverErrors={serverErrors} />
      </motion.div>
    </div>
  );
}
