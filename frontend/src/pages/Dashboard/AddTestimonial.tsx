import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '@constants/route.constants';
import { useCreateTestimonial } from '@hooks/dashboard';
import { useToast } from '@providers/ToastProvider';
import { parseApiFieldErrors } from '@utils/api';
import { TestimonialsForm } from './TestimonialsForm';

export function AddTestimonial() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const createTestimonial = useCreateTestimonial();
  const { addToast } = useToast();
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  const handleSubmit = (data: Record<string, unknown>) => {
    setServerErrors({});
    createTestimonial.mutate(data, {
      onSuccess: () => {
        addToast(t('dashboard.addTestimonial.createdSuccess'), 'success');
        navigate(ROUTES.DASHBOARD_TESTIMONIALS);
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
        <button onClick={() => navigate(ROUTES.DASHBOARD_TESTIMONIALS)}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="h-4 w-4" />{t('dashboard.testimonials.pageTitle')}
        </button>
        <h1 className="text-2xl font-bold text-foreground">{t('dashboard.addTestimonial.pageTitle')}</h1>
        <p className="text-muted-foreground mt-1">{t('dashboard.addTestimonial.pageDescription')}</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        <TestimonialsForm onSubmit={handleSubmit} isSubmitting={createTestimonial.isPending} serverErrors={serverErrors} />
      </motion.div>
    </div>
  );
}
