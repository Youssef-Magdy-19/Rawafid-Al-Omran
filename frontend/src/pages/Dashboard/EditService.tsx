import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '@constants/route.constants';
import { mockServices } from '@data/servicesMockData';
import { ServiceForm, type ServiceFormData } from './ServiceForm';

export function EditService() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const service = useMemo(() => mockServices.find((s) => s.id === id), [id]);

  if (!service) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-medium text-foreground">Service not found</p>
        <button
          onClick={() => navigate(ROUTES.DASHBOARD_SERVICES)}
          className="mt-4 text-sm text-primary hover:underline"
        >
          {t('dashboard.services.pageTitle')}
        </button>
      </div>
    );
  }

  const handleSubmit = (_data: ServiceFormData) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate(`/dashboard/services/${id}`);
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
          onClick={() => navigate(ROUTES.DASHBOARD_SERVICES)}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('dashboard.services.pageTitle')}
        </button>
        <h1 className="text-2xl font-bold text-foreground">{t('dashboard.editService.pageTitle')}</h1>
        <p className="text-muted-foreground mt-1">{t('dashboard.editService.pageDescription')}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <ServiceForm initialData={service} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </motion.div>
    </div>
  );
}
