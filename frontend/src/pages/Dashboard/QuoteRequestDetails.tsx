import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Trash2, Calendar, Clock, User, Building2, Mail, Phone, DollarSign,
  FileSpreadsheet, CheckCircle2, Clock as ClockIcon,
} from 'lucide-react';
import { ROUTES } from '@constants/route.constants';
import { useQuote, useUpdateQuote, useDeleteQuote } from '@hooks/dashboard';
import { useToast } from '@providers/ToastProvider';
import { LoadingSkeleton } from '@components/ui/LoadingSkeleton';
import { ErrorState } from '@components/ui/ErrorState';

const statusOptions = ['pending', 'reviewed', 'inProgress', 'completed', 'rejected'];

const statusColorMap: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  reviewed: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  inProgress: 'bg-violet-500/10 text-violet-600 border-violet-500/20',
  completed: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  rejected: 'bg-destructive/10 text-destructive border-destructive/20',
};

export function QuoteRequestDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addToast } = useToast();

  const { data: quote, isLoading, isError } = useQuote(id || '');
  const updateQuote = useUpdateQuote();
  const deleteQuote = useDeleteQuote();

  const handleStatusChange = (status: string) => {
    if (!id) return;
    updateQuote.mutate({ id, data: { status } }, {
      onSuccess: () => addToast(t('dashboard.quoteRequests.statusUpdated'), 'success'),
      onError: () => addToast(t('common.error'), 'error'),
    });
  };

  const handleDelete = () => {
    if (!id) return;
    deleteQuote.mutate(id, {
      onSuccess: () => {
        addToast(t('dashboard.quoteRequests.deletedSuccess'), 'success');
        navigate(ROUTES.DASHBOARD_QUOTE_REQUESTS);
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
          <LoadingSkeleton className="h-80 rounded-xl" />
          <div className="lg:col-span-2"><LoadingSkeleton className="h-64 rounded-xl" /></div>
        </div>
      </div>
    );
  }

  if (isError || !quote) {
    return (
      <ErrorState
        title={t('dashboard.quoteRequests.notFound')}
        message={t('dashboard.quoteRequests.notFoundDescription')}
        onRetry={() => navigate(ROUTES.DASHBOARD_QUOTE_REQUESTS)}
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
          <button onClick={() => navigate(ROUTES.DASHBOARD_QUOTE_REQUESTS)}
            className="h-10 w-10 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"><ArrowLeft className="h-4 w-4" /></button>
          <div><h1 className="text-2xl font-bold text-foreground">{t('dashboard.quoteRequestDetails.pageTitle')}</h1><p className="text-muted-foreground mt-1">{t('dashboard.quoteRequestDetails.pageDescription')}</p></div>
        </div>
        <button onClick={handleDelete} disabled={deleteQuote.isPending}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50">
          <Trash2 className="h-4 w-4" />{t('dashboard.quoteRequestDetails.deleteQuote')}</button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="lg:col-span-1 space-y-6">
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.quoteRequestDetails.customerInformation')}</h3>
            <div className="space-y-3">
              <InfoRow icon={User} label={t('dashboard.quoteRequests.customerName')} value={quote.name} />
              <InfoRow icon={Mail} label={t('dashboard.quoteRequests.email')} value={quote.email} />
              {quote.phone && <InfoRow icon={Phone} label={t('dashboard.quoteRequests.phone')} value={quote.phone} />}
              {quote.company && <InfoRow icon={Building2} label={t('dashboard.quoteRequests.company')} value={quote.company} />}
              {quote.howDidYouHear && <InfoRow icon={CheckCircle2} label={t('dashboard.quoteRequests.howDidYouHear')} value={quote.howDidYouHear} />}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.quoteRequestDetails.metadata')}</h3>
            <InfoRow icon={Calendar} label={t('dashboard.quoteRequestDetails.createdAt')} value={new Date(quote.createdAt).toLocaleDateString()} />
            <InfoRow icon={Clock} label={t('dashboard.quoteRequestDetails.updatedAt')} value={new Date(quote.updatedAt).toLocaleDateString()} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }} className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.quoteRequestDetails.projectInformation')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow icon={FileSpreadsheet} label={t('dashboard.quoteRequests.service')} value={quote.service} />
              {quote.budget && <InfoRow icon={DollarSign} label={t('dashboard.quoteRequests.budget')} value={quote.budget} />}
              {quote.timeline && <InfoRow icon={ClockIcon} label={t('dashboard.quoteRequests.timeline')} value={quote.timeline} />}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.quoteRequestDetails.projectDescription')}</h3>
            <div className="rounded-lg bg-muted/50 p-4 text-sm text-foreground leading-relaxed whitespace-pre-wrap">{quote.projectDescription}</div>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.quoteRequestDetails.statusUpdate')}</h3>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <button key={status} onClick={() => handleStatusChange(status)} disabled={updateQuote.isPending || quote.status === status}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    quote.status === status
                      ? `${statusColorMap[status]} ring-2 ring-offset-1 ring-offset-background ring-current`
                      : 'border-border text-muted-foreground hover:bg-muted'
                  }`}>
                  {status === 'completed' && <CheckCircle2 className="h-3 w-3" />}
                  {status}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
