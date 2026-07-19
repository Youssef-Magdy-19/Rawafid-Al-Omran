import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '@constants/route.constants';
import { mockPartners } from '@data/partnersMockData';
import { PartnersForm, type PartnerFormData } from './PartnersForm';

export function EditPartner() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const partner = useMemo(() => mockPartners.find((p) => p.id === id), [id]);

  if (!partner) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-medium text-foreground">Partner not found</p>
        <button
          onClick={() => navigate(ROUTES.DASHBOARD_PARTNERS)}
          className="mt-4 text-sm text-primary hover:underline"
        >
          {t('dashboard.partners.pageTitle')}
        </button>
      </div>
    );
  }

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
        <h1 className="text-2xl font-bold text-foreground">{t('dashboard.editPartner.pageTitle')}</h1>
        <p className="text-muted-foreground mt-1">{t('dashboard.editPartner.pageDescription')}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <PartnersForm initialData={partner} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </motion.div>
    </div>
  );
}
