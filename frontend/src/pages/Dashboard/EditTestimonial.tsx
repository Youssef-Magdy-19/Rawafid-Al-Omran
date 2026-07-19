import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '@constants/route.constants';
import { mockTestimonials } from '@data/testimonialsMockData';
import { TestimonialsForm, type TestimonialFormData } from './TestimonialsForm';

export function EditTestimonial() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const testimonial = useMemo(() => mockTestimonials.find((tst) => tst.id === id), [id]);

  if (!testimonial) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-medium text-foreground">Testimonial not found</p>
        <button
          onClick={() => navigate(ROUTES.DASHBOARD_TESTIMONIALS)}
          className="mt-4 text-sm text-primary hover:underline"
        >
          {t('dashboard.testimonials.pageTitle')}
        </button>
      </div>
    );
  }

  const handleSubmit = (_data: TestimonialFormData) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate(ROUTES.DASHBOARD_TESTIMONIALS);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-foreground">{t('dashboard.editTestimonial.pageTitle')}</h1>
        <p className="text-muted-foreground mt-1">{t('dashboard.editTestimonial.pageDescription')}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <TestimonialsForm initialData={testimonial} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </motion.div>
    </div>
  );
}
