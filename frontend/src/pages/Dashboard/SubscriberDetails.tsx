import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MailPlus, MailX, Calendar, Trash2 } from 'lucide-react';
import { ROUTES } from '@constants/route.constants';
import { useSubscriber, useUpdateSubscriber, useDeleteSubscriber } from '@hooks/dashboard';
import { useToast } from '@providers/ToastProvider';
import { LoadingSkeleton } from '@components/ui/LoadingSkeleton';
import { ErrorState } from '@components/ui/ErrorState';

export function SubscriberDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addToast } = useToast();

  const { data: subscriber, isLoading, isError, refetch } = useSubscriber(id || '');
  const updateSubscriber = useUpdateSubscriber();
  const deleteSubscriber = useDeleteSubscriber();

  const handleToggleActive = () => {
    if (!id || !subscriber) return;
    updateSubscriber.mutate({ id, data: { isActive: !subscriber.isActive } }, {
      onSuccess: () => addToast(t('dashboard.subscribers.statusUpdated'), 'success'),
      onError: () => addToast(t('common.error'), 'error'),
    });
  };

  const handleDelete = () => {
    if (!id) return;
    deleteSubscriber.mutate(id, {
      onSuccess: () => {
        addToast(t('dashboard.subscribers.deletedSuccess'), 'success');
        navigate(ROUTES.DASHBOARD_SUBSCRIBERS);
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
        <LoadingSkeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  if (isError || !subscriber) {
    return (
      <ErrorState
        title={t('dashboard.subscribers.notFound')}
        message={t('dashboard.subscribers.notFoundDescription')}
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(ROUTES.DASHBOARD_SUBSCRIBERS)}
            className="h-10 w-10 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"><ArrowLeft className="h-4 w-4" /></button>
          <div><h1 className="text-2xl font-bold text-foreground">{t('dashboard.subscriberDetails.pageTitle')}</h1><p className="text-muted-foreground mt-1">{t('dashboard.subscriberDetails.pageDescription')}</p></div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleToggleActive} disabled={updateSubscriber.isPending}
            className={`inline-flex items-center gap-2 h-10 px-4 rounded-xl border text-sm font-medium transition-colors disabled:opacity-50 ${
              subscriber.isActive
                ? 'border-amber-500/20 text-amber-600 hover:bg-amber-500/10'
                : 'border-emerald-500/20 text-emerald-600 hover:bg-emerald-500/10'
            }`}>
            {subscriber.isActive ? <MailX className="h-4 w-4" /> : <MailPlus className="h-4 w-4" />}
            {subscriber.isActive ? t('dashboard.subscriberDetails.deactivate') : t('dashboard.subscriberDetails.activate')}
          </button>
          <button onClick={handleDelete} disabled={deleteSubscriber.isPending}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50">
            <Trash2 className="h-4 w-4" />{t('dashboard.subscriberDetails.deleteSubscriber')}</button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        <div className="rounded-xl border border-border bg-card shadow-sm p-6 max-w-2xl">
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">{subscriber.email.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">{subscriber.email}</h2>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium mt-1 ${
                  subscriber.isActive ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-muted text-muted-foreground border-border'
                }`}>
                  {subscriber.isActive ? t('dashboard.subscriberDetails.active') : t('dashboard.subscriberDetails.inactive')}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">{t('dashboard.subscriberDetails.subscribedAt')}</p>
                <p className="text-sm font-medium text-foreground">{subscriber.subscribedAt ? new Date(subscriber.subscribedAt).toLocaleDateString() : '—'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">{t('dashboard.subscriberDetails.createdAt')}</p>
                <p className="text-sm font-medium text-foreground">{new Date(subscriber.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
