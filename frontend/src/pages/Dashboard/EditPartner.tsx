import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '@constants/route.constants';
import { usePartner, useUpdatePartner } from '@hooks/dashboard';
import { useToast } from '@providers/ToastProvider';
import { parseApiFieldErrors } from '@utils/api';
import { PartnersForm, type PartnerFormData } from './PartnersForm';
import { LoadingSkeleton } from '@components/ui/LoadingSkeleton';
import { ErrorState } from '@components/ui/ErrorState';

export function EditPartner() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addToast } = useToast();
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  const { data: partner, isLoading, isError } = usePartner(id || '');
  const updatePartner = useUpdatePartner();

  const handleSubmit = (data: PartnerFormData) => {
    if (!id) return;
    setServerErrors({});
    updatePartner.mutate({ id, data: data as unknown as Record<string, unknown> }, {
      onSuccess: () => {
        addToast(t('dashboard.editPartner.success'), 'success');
        navigate(ROUTES.DASHBOARD_PARTNERS);
      },
      onError: (error) => {
        const parsed = parseApiFieldErrors(error);
        setServerErrors(parsed);
        if (!Object.keys(parsed).length) {
          addToast(t('dashboard.editPartner.error'), 'error');
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

  if (isError || !partner) {
    return (
      <ErrorState
        title={t('dashboard.editPartner.notFound')}
        onRetry={() => navigate(ROUTES.DASHBOARD_PARTNERS)}
      />
    );
  }

  const initialData: PartnerFormData = {
    name: partner.name,
    nameAr: partner.nameAr || '',
    logo: partner.logo || '',
    website: partner.website || '',
    description: partner.description || '',
    category: partner.category || '',
    categoryAr: partner.categoryAr || '',
    order: partner.order ?? 0,
    isActive: partner.isActive ?? true,
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold text-foreground">{t('dashboard.editPartner.pageTitle')}</h1>
        <p className="text-muted-foreground mt-1">{t('dashboard.editPartner.pageDescription')}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        <PartnersForm initialData={initialData} onSubmit={handleSubmit} isSubmitting={updatePartner.isPending} serverErrors={serverErrors} />
      </motion.div>
    </div>
  );
}
