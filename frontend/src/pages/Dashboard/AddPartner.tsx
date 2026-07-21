import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '@constants/route.constants';
import { useCreatePartner } from '@hooks/dashboard';
import { useToast } from '@providers/ToastProvider';
import { parseApiFieldErrors } from '@utils/api';
import { PartnersForm, type PartnerFormData } from './PartnersForm';

export function AddPartner() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const createPartner = useCreatePartner();

  const handleSubmit = (data: PartnerFormData) => {
    setServerErrors({});
    createPartner.mutate(data as unknown as Record<string, unknown>, {
      onSuccess: () => {
        addToast(t('dashboard.addPartner.success'), 'success');
        navigate(ROUTES.DASHBOARD_PARTNERS);
      },
      onError: (error) => {
        const parsed = parseApiFieldErrors(error);
        setServerErrors(parsed);
        if (!Object.keys(parsed).length) {
          addToast(t('dashboard.addPartner.error'), 'error');
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold text-foreground">{t('dashboard.addPartner.pageTitle')}</h1>
        <p className="text-muted-foreground mt-1">{t('dashboard.addPartner.pageDescription')}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        <PartnersForm onSubmit={handleSubmit} isSubmitting={createPartner.isPending} serverErrors={serverErrors} />
      </motion.div>
    </div>
  );
}
