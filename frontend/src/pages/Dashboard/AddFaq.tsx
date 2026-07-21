import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '@constants/route.constants';
import { useCreateFaq } from '@hooks/dashboard';
import { useToast } from '@providers/ToastProvider';
import { parseApiFieldErrors } from '@utils/api';
import { FaqForm, type FaqFormData } from './FaqForm';

export function AddFaq() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const createFaq = useCreateFaq();

  const handleSubmit = (data: FaqFormData) => {
    setServerErrors({});
    createFaq.mutate(data as unknown as Record<string, unknown>, {
      onSuccess: () => {
        addToast(t('dashboard.addFaq.success'), 'success');
        navigate(ROUTES.DASHBOARD_FAQ);
      },
      onError: (error) => {
        const parsed = parseApiFieldErrors(error);
        setServerErrors(parsed);
        if (!Object.keys(parsed).length) {
          addToast(t('dashboard.addFaq.error'), 'error');
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold text-foreground">{t('dashboard.addFaq.pageTitle')}</h1>
        <p className="text-muted-foreground mt-1">{t('dashboard.addFaq.pageDescription')}</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        <FaqForm onSubmit={handleSubmit} isSubmitting={createFaq.isPending} serverErrors={serverErrors} />
      </motion.div>
    </div>
  );
}
