import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '@constants/route.constants';
import { mockEquipment } from '@data/equipmentMockData';
import { EquipmentForm, type EquipmentFormData } from './EquipmentForm';

export function EditEquipment() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  const equipment = useMemo(() => mockEquipment.find((e) => e.id === id), [id]);

  if (!equipment) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-medium text-foreground">{t('dashboard.editEquipment.notFound')}</p>
        <button
          onClick={() => navigate(ROUTES.DASHBOARD_EQUIPMENT)}
          className="mt-4 text-sm text-primary hover:underline"
        >
          {t('dashboard.equipment.pageTitle')}
        </button>
      </div>
    );
  }

  const handleSubmit = (_data: EquipmentFormData) => {
    setServerErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate(ROUTES.DASHBOARD_EQUIPMENT);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-foreground">{t('dashboard.editEquipment.pageTitle')}</h1>
        <p className="text-muted-foreground mt-1">{t('dashboard.editEquipment.pageDescription')}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <EquipmentForm initialData={equipment} onSubmit={handleSubmit} isSubmitting={isSubmitting} serverErrors={serverErrors} />
      </motion.div>
    </div>
  );
}
