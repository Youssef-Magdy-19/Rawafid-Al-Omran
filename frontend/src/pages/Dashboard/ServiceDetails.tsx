import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, Pencil, Calendar, Star, Eye, EyeOff, Clock, Hash, Sparkles } from 'lucide-react';
import { ROUTES } from '@constants/route.constants';
import { useService, useDeleteService } from '@hooks/dashboard';
import { useToast } from '@providers/ToastProvider';
import { ErrorState } from '@components/ui/ErrorState';

export function ServiceDetails() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: service, isLoading, isError, error, refetch } = useService(id || '');
  const deleteService = useDeleteService();
  const { addToast } = useToast();
  const lang = i18n.language.startsWith('ar') ? 'ar' : 'en';

  const handleDelete = () => {
    if (!service?.id) return;
    if (!window.confirm(t('dashboard.serviceDetails.deleteConfirm'))) return;
    deleteService.mutate(service.id, {
      onSuccess: () => {
        addToast(t('dashboard.serviceDetails.deletedSuccess'), 'success');
        navigate(ROUTES.DASHBOARD_SERVICES);
      },
      onError: () => addToast(t('common.error'), 'error'),
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-muted rounded animate-pulse" />
        <div className="rounded-xl border border-border p-6 space-y-4">
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
            <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
            <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
            <div className="h-4 bg-muted rounded animate-pulse w-1/3" />
            <div className="h-20 bg-muted rounded animate-pulse w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !service) {
    return <ErrorState message={(error as Error)?.message || t('common.loadError')} onRetry={refetch} />;
  }

  const infoCard = (icon: React.ReactNode, label: string, value: string) => (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value || '—'}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <button onClick={() => navigate(ROUTES.DASHBOARD_SERVICES)}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
            <ArrowLeft className="h-4 w-4" />{t('dashboard.services.pageTitle')}
          </button>
          <h1 className="text-2xl font-bold text-foreground">
            {lang === 'ar' ? service.titleAr : service.title}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(ROUTES.DASHBOARD_SERVICES_EDIT.replace(':id', service.slug))}
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
            <Pencil className="h-4 w-4" />{t('common.edit')}
          </button>
          <button onClick={handleDelete} disabled={deleteService.isPending}
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-colors disabled:opacity-50">
            <Trash2 className="h-4 w-4" />{deleteService.isPending ? t('common.deleting') : t('common.delete')}
          </button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {infoCard(<Calendar className="h-4 w-4" />, t('dashboard.serviceDetails.createdAt'), new Date(service.createdAt).toLocaleDateString())}
        {infoCard(<Clock className="h-4 w-4" />, t('dashboard.serviceDetails.updatedAt'), new Date(service.updatedAt).toLocaleDateString())}
        {infoCard(<Hash className="h-4 w-4" />, t('dashboard.serviceDetails.order'), String(service.order ?? 0))}
        {infoCard(
          service.isFeatured ? <Star className="h-4 w-4 fill-secondary" /> : <Star className="h-4 w-4" />,
          t('dashboard.serviceDetails.featured'),
          service.isFeatured ? t('common.yes') : t('common.no')
        )}
        {infoCard(
          service.isActive ? <Eye className="h-4 w-4 text-emerald-500" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />,
          t('dashboard.serviceDetails.status'),
          service.isActive ? t('common.active') : t('common.inactive')
        )}
        {infoCard(<Sparkles className="h-4 w-4" />, t('dashboard.serviceDetails.slug'), service.slug)}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card shadow-sm p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">{t('dashboard.serviceDetails.arabicContent')}</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">{t('dashboard.serviceDetails.title')}</p>
              <p className="text-foreground font-medium">{service.titleAr}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">{t('dashboard.serviceDetails.shortDescription')}</p>
              <p className="text-sm text-foreground">{service.shortDescriptionAr || '—'}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">{t('dashboard.serviceDetails.fullDescription')}</p>
              <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap" dir="rtl">{service.descriptionAr}</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card shadow-sm p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">{t('dashboard.serviceDetails.englishContent')}</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">{t('dashboard.serviceDetails.title')}</p>
              <p className="text-foreground font-medium">{service.title}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">{t('dashboard.serviceDetails.shortDescription')}</p>
              <p className="text-sm text-foreground">{service.shortDescription || '—'}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">{t('dashboard.serviceDetails.fullDescription')}</p>
              <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap" dir="ltr">{service.description}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {service.image && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}
          className="rounded-xl border border-border bg-card shadow-sm p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">{t('dashboard.serviceDetails.image')}</h3>
          <img src={service.image} alt={service.title} className="max-h-80 rounded-lg object-cover border border-border" />
        </motion.div>
      )}
    </div>
  );
}
