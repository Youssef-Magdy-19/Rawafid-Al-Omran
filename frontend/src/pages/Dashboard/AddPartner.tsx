import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '@constants/route.constants';
import { PartnersForm, type PartnerFormData } from './PartnersForm';

export function AddPartner() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (_data: PartnerFormData) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate(ROUTES.DASHBOARD_PARTNERS);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-foreground">{t('dashboard.addPartner.pageTitle')}</h1>
        <p className="text-muted-foreground mt-1">{t('dashboard.addPartner.pageDescription')}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <PartnersForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </motion.div>
    </div>
  );
}
