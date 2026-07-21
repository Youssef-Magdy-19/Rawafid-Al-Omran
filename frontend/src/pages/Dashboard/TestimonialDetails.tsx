import { useTranslation, } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Pencil, Trash2, Star, Calendar, Clock,
  Building2, Briefcase, User, MessageSquareQuote,
} from 'lucide-react';
import { ROUTES } from '@constants/route.constants';
import { useTestimonial, useDeleteTestimonial } from '@hooks/dashboard';
import { useToast } from '@providers/ToastProvider';
import { ErrorState } from '@components/ui/ErrorState';

export function TestimonialDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: testimonial, isLoading, isError, error, refetch } = useTestimonial(id || '');
  const deleteTestimonial = useDeleteTestimonial();
  const { addToast } = useToast();

  const handleDelete = () => {
    if (!testimonial?.id) return;
    if (!window.confirm(t('dashboard.testimonialDetails.deleteConfirm'))) return;
    deleteTestimonial.mutate(testimonial.id, {
      onSuccess: () => {
        addToast(t('dashboard.testimonialDetails.deletedSuccess'), 'success');
        navigate(ROUTES.DASHBOARD_TESTIMONIALS);
      },
      onError: () => addToast(t('common.error'), 'error'),
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}`} />
    ));
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-muted rounded animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-xl border border-border p-6 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-4 bg-muted rounded animate-pulse" style={{ width: `${[70, 50, 80][i]}%` }} />
            ))}
            <div className="h-20 bg-muted rounded animate-pulse w-full" />
          </div>
          <div className="rounded-xl border border-border p-6 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-4 bg-muted rounded animate-pulse" style={{ width: `${[60, 50, 70, 45][i]}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError || !testimonial) {
    return <ErrorState message={(error as Error)?.message || t('common.loadError')} onRetry={refetch} />;
  }

  const InfoRow = ({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) => (
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
        className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-border shrink-0 bg-muted">
            {testimonial.image && <img src={testimonial.image} alt={testimonial.name} className="h-full w-full object-cover" />}
          </div>
          <div>
            <button onClick={() => navigate(ROUTES.DASHBOARD_TESTIMONIALS)}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-1">
              <ArrowLeft className="h-4 w-4" />{t('dashboard.testimonials.pageTitle')}
            </button>
            <h1 className="text-2xl font-bold text-foreground">{testimonial.name}</h1>
            <p className="text-muted-foreground mt-0.5">{testimonial.position || testimonial.company || ''}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(ROUTES.DASHBOARD_TESTIMONIALS_EDIT.replace(':id', testimonial.id))}
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
            <Pencil className="h-4 w-4" />{t('common.edit')}
          </button>
          <button onClick={handleDelete} disabled={deleteTestimonial.isPending}
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-colors disabled:opacity-50">
            <Trash2 className="h-4 w-4" />{deleteTestimonial.isPending ? t('common.deleting') : t('common.delete')}
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
            className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-border">
              <MessageSquareQuote className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">{t('dashboard.testimonialDetails.testimonialContent')}</h3>
            </div>
            <p className="text-sm text-foreground leading-relaxed italic">&ldquo;{testimonial.content}&rdquo;</p>
            <div className="flex items-center gap-1">{renderStars(testimonial.rating || 0)}</div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
            className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <User className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">{t('dashboard.testimonialDetails.clientInfo')}</h3>
            </div>
            <InfoRow icon={User} label={t('dashboard.testimonialDetails.name')} value={testimonial.name} />
            {testimonial.position && <InfoRow icon={Briefcase} label={t('dashboard.testimonialDetails.position')} value={testimonial.position} />}
            {testimonial.company && <InfoRow icon={Building2} label={t('dashboard.testimonialDetails.company')} value={testimonial.company} />}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <Star className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">{t('dashboard.testimonialDetails.metadata')}</h3>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('dashboard.testimonialDetails.rating')}</span>
              <div className="flex items-center gap-0.5">{renderStars(testimonial.rating || 0)}</div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('dashboard.testimonialDetails.status')}</span>
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${testimonial.isActive ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-muted text-muted-foreground border-border'}`}>
                {testimonial.isActive ? t('dashboard.testimonials.active_badge') : t('dashboard.testimonials.inactive_badge')}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('dashboard.testimonialDetails.createdAt')}</span>
              <span className="text-sm text-foreground flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-muted-foreground" />{new Date(testimonial.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('dashboard.testimonialDetails.updatedAt')}</span>
              <span className="text-sm text-foreground flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-muted-foreground" />{new Date(testimonial.updatedAt).toLocaleDateString()}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
