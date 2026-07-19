import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '@constants/route.constants';
import { mockFaqs } from '@data/faqMockData';
import { FaqForm, type FaqFormData } from './FaqForm';

export function EditFaq() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const faq = useMemo(() => mockFaqs.find((f) => f.id === id), [id]);
  if (!faq) return (
    <div className="flex flex-col items-center justify-center py-20">
      <p className="text-lg font-medium text-foreground">FAQ not found</p>
      <button onClick={() => navigate(ROUTES.DASHBOARD_FAQ)} className="mt-4 text-sm text-primary hover:underline">{t('dashboard.faq.pageTitle')}</button>
    </div>
  );
  const handleSubmit = (_data: FaqFormData) => {
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); navigate(ROUTES.DASHBOARD_FAQ); }, 1000);
  };
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold text-foreground">{t('dashboard.editFaq.pageTitle')}</h1>
        <p className="text-muted-foreground mt-1">{t('dashboard.editFaq.pageDescription')}</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        <FaqForm initialData={faq} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </motion.div>
    </div>
  );
}
