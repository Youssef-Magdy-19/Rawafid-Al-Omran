import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Pencil, Trash2, Calendar, Clock, HelpCircle, Hash } from 'lucide-react';
import { ROUTES } from '@constants/route.constants';
import { useFaq, useDeleteFaq } from '@hooks/dashboard';
import { useToast } from '@providers/ToastProvider';
import { LoadingSkeleton } from '@components/ui/LoadingSkeleton';
import { ErrorState } from '@components/ui/ErrorState';

export function FaqDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addToast } = useToast();

  const { data: faq, isLoading, isError, refetch } = useFaq(id || '');
  const deleteFaq = useDeleteFaq();

  const handleDelete = () => {
    if (!id) return;
    deleteFaq.mutate(id, {
      onSuccess: () => {
        addToast(t('dashboard.faq.deletedSuccess'), 'success');
        navigate(ROUTES.DASHBOARD_FAQ);
      },
      onError: () => addToast(t('common.error'), 'error'),
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <LoadingSkeleton className="h-10 w-10 rounded-xl" />
          <div><LoadingSkeleton className="h-8 w-48" /><LoadingSkeleton className="h-4 w-64 mt-2" /></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <LoadingSkeleton className="h-48 rounded-xl" />
          <div className="lg:col-span-2 space-y-6">
            <LoadingSkeleton className="h-48 rounded-xl" />
            <LoadingSkeleton className="h-32 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !faq) {
    return (
      <ErrorState
        title={t('dashboard.faqDetails.notFound')}
        message={t('dashboard.faqDetails.notFoundDescription')}
        onRetry={refetch}
      />
    );
  }

  const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0"><Icon className="h-4 w-4 text-muted-foreground" /></div>
      <div className="min-w-0"><p className="text-xs text-muted-foreground">{label}</p><p className="text-sm font-medium text-foreground truncate">{value}</p></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(ROUTES.DASHBOARD_FAQ)}
            className="h-10 w-10 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"><ArrowLeft className="h-4 w-4" /></button>
          <div><h1 className="text-2xl font-bold text-foreground">{t('dashboard.faqDetails.pageTitle')}</h1><p className="text-muted-foreground mt-1">{t('dashboard.faqDetails.pageDescription')}</p></div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(ROUTES.DASHBOARD_FAQ_EDIT.replace(':id', id || ''))}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"><Pencil className="h-4 w-4" />{t('dashboard.faqDetails.editFaq')}</button>
          <button onClick={handleDelete} disabled={deleteFaq.isPending}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"><Trash2 className="h-4 w-4" />{t('dashboard.faqDetails.deleteFaq')}</button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="lg:col-span-1">
          <div className="rounded-xl border border-border bg-card shadow-sm p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4"><HelpCircle className="h-8 w-8 text-primary" /></div>
              <h2 className="text-lg font-bold text-foreground">{(faq.question?.length ?? 0) > 50 ? (faq.question?.substring(0, 50) ?? '') + '...' : (faq.question ?? '')}</h2>
              <div className="flex items-center gap-2 mt-4 flex-wrap justify-center">
                {faq.category && (
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium bg-blue-500/10 text-blue-600 border-blue-500/20">{faq.category}</span>
                )}
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${faq.isActive ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-muted text-muted-foreground border-border'}`}>
                  {faq.isActive ? t('dashboard.faqDetails.active') : t('dashboard.faqDetails.inactive')}</span>
              </div>
              <div className="flex items-center gap-1 mt-3 text-muted-foreground"><Hash className="h-3.5 w-3.5" /><span className="text-xs">{t('dashboard.faqDetails.displayOrder')}: {faq.order ?? 0}</span></div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }} className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.faqDetails.questionInformation')}</h3>
            <div className="rounded-lg bg-muted/50 p-4 text-sm text-foreground leading-relaxed font-medium">{faq.question}</div>
          </div>
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.faqDetails.answer')}</h3>
            <div className="rounded-lg bg-muted/50 p-4 text-sm text-foreground leading-relaxed">{faq.answer}</div>
          </div>
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.faqDetails.metadata')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow icon={Calendar} label={t('dashboard.faqDetails.createdAt')} value={new Date(faq.createdAt).toLocaleDateString()} />
              <InfoRow icon={Clock} label={t('dashboard.faqDetails.updatedAt')} value={new Date(faq.updatedAt).toLocaleDateString()} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
