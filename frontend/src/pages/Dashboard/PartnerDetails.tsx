import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Pencil, Trash2, Calendar, Clock, Globe,
  Building2, Hash, Star,
} from 'lucide-react';
import { ROUTES } from '@constants/route.constants';
import { usePartner, useDeletePartner } from '@hooks/dashboard';
import { useToast } from '@providers/ToastProvider';
import { LoadingSkeleton } from '@components/ui/LoadingSkeleton';
import { ErrorState } from '@components/ui/ErrorState';

export function PartnerDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addToast } = useToast();

  const { data: partner, isLoading, isError, refetch } = usePartner(id || '');
  const deletePartner = useDeletePartner();

  const handleDelete = () => {
    if (!id) return;
    deletePartner.mutate(id, {
      onSuccess: () => {
        addToast(t('dashboard.partners.deletedSuccess'), 'success');
        navigate(ROUTES.DASHBOARD_PARTNERS);
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
          <LoadingSkeleton className="h-64 rounded-xl" />
          <div className="lg:col-span-2 space-y-6">
            <LoadingSkeleton className="h-48 rounded-xl" />
            <LoadingSkeleton className="h-48 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !partner) {
    return (
      <ErrorState
        title={t('dashboard.partnerDetails.notFound')}
        message={t('dashboard.partnerDetails.notFoundDescription')}
        onRetry={refetch}
      />
    );
  }

  const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground truncate">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(ROUTES.DASHBOARD_PARTNERS)}
            className="h-10 w-10 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t('dashboard.partnerDetails.pageTitle')}</h1>
            <p className="text-muted-foreground mt-1">{t('dashboard.partnerDetails.pageDescription')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(ROUTES.DASHBOARD_PARTNERS_EDIT.replace(':id', id || ''))}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
            <Pencil className="h-4 w-4" />{t('dashboard.partnerDetails.editPartner')}
          </button>
          <button onClick={handleDelete} disabled={deletePartner.isPending}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50">
            <Trash2 className="h-4 w-4" />{t('dashboard.partnerDetails.deletePartner')}
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-1">
          <div className="rounded-xl border border-border bg-card shadow-sm p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-xl overflow-hidden border-2 border-border bg-muted mb-4">
                {partner.logo && (
                  <img src={partner.logo} alt={partner.name} className="h-full w-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                )}
                {!partner.logo && (
                  <div className="h-full w-full flex items-center justify-center text-muted-foreground/50">
                    <Building2 className="h-8 w-8" />
                  </div>
                )}
              </div>
              <h2 className="text-xl font-bold text-foreground">{partner.name}</h2>
              <div className="flex items-center gap-2 mt-4">
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                  partner.isActive
                    ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                    : 'bg-muted text-muted-foreground border-border'
                }`}>
                  {partner.isActive ? t('dashboard.partnerDetails.active') : t('dashboard.partnerDetails.inactive')}
                </span>
                {partner.isFeatured && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-600">
                    <Star className="h-3 w-3" />{t('dashboard.partnerDetails.featured')}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
          className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.partnerDetails.partnerInformation')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow icon={Building2} label={t('dashboard.partners.partnerName')} value={partner.name} />
              <InfoRow icon={Globe} label={t('dashboard.partnerDetails.website')} value={partner.website || '—'} />
              <InfoRow icon={Hash} label="Order" value={String(partner.order ?? 0)} />
            </div>
          </div>

          {partner.description && (
            <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">{t('dashboard.partnerDetails.partnerDescription')}</h3>
              <div className="rounded-lg bg-muted/50 p-4 text-sm text-foreground leading-relaxed">
                "{partner.description}"
              </div>
            </div>
          )}

          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.partnerDetails.metadata')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow icon={Calendar} label={t('dashboard.partnerDetails.createdAt')} value={new Date(partner.createdAt).toLocaleDateString()} />
              <InfoRow icon={Clock} label={t('dashboard.partnerDetails.updatedAt')} value={new Date(partner.updatedAt).toLocaleDateString()} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
