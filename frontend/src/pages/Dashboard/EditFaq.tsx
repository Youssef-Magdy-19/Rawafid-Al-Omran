import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '@constants/route.constants';
import { useFaq, useUpdateFaq } from '@hooks/dashboard';
import { useToast } from '@providers/ToastProvider';
import { parseApiFieldErrors } from '@utils/api';
import { FaqForm, type FaqFormData } from './FaqForm';
import { LoadingSkeleton } from '@components/ui/LoadingSkeleton';
import { ErrorState } from '@components/ui/ErrorState';

export function EditFaq() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addToast } = useToast();
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  const { data: faq, isLoading, isError } = useFaq(id || '');
  const updateFaq = useUpdateFaq();

  const handleSubmit = (data: FaqFormData) => {
    if (!id) return;
    setServerErrors({});
    updateFaq.mutate({ id, data: data as unknown as Record<string, unknown> }, {
      onSuccess: () => {
        addToast(t('dashboard.editFaq.success'), 'success');
        navigate(ROUTES.DASHBOARD_FAQ);
      },
      onError: (error) => {
        const parsed = parseApiFieldErrors(error);
        setServerErrors(parsed);
        if (!Object.keys(parsed).length) {
          addToast(t('dashboard.editFaq.error'), 'error');
        }
      },
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div><LoadingSkeleton className="h-8 w-48" /><LoadingSkeleton className="h-4 w-64 mt-2" /></div>
        <LoadingSkeleton className="h-96 rounded-xl" />
      </div>
    );
  }

  if (isError || !faq) {
    return (
      <ErrorState
        title={t('dashboard.editFaq.notFound')}
        onRetry={() => navigate(ROUTES.DASHBOARD_FAQ)}
      />
    );
  }

  const initialData: FaqFormData = {
    question: faq.question,
    questionAr: faq.questionAr || '',
    answer: faq.answer,
    answerAr: faq.answerAr || '',
    category: faq.category || '',
    categoryAr: faq.categoryAr || '',
    order: faq.order ?? 0,
    isActive: faq.isActive ?? true,
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold text-foreground">{t('dashboard.editFaq.pageTitle')}</h1>
        <p className="text-muted-foreground mt-1">{t('dashboard.editFaq.pageDescription')}</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        <FaqForm initialData={initialData} onSubmit={handleSubmit} isSubmitting={updateFaq.isPending} serverErrors={serverErrors} />
      </motion.div>
    </div>
  );
}
