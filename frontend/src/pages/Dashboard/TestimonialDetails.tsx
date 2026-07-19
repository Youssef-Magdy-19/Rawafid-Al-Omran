import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Star,
  Calendar,
  Clock,
  Building2,
  Briefcase,
  User,
  MessageSquareQuote,
} from 'lucide-react';
import { mockTestimonials } from '@data/testimonialsMockData';

export function TestimonialDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const testimonial = useMemo(() => mockTestimonials.find((tst) => tst.id === id), [id]);

  if (!testimonial) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <MessageSquareQuote className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <p className="text-lg font-medium text-foreground">Testimonial not found</p>
        <button
          onClick={() => navigate('/dashboard/testimonials')}
          className="mt-4 text-sm text-primary hover:underline"
        >
          {t('dashboard.testimonialDetails.backToTestimonials')}
        </button>
      </div>
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard/testimonials')}
            className="h-10 w-10 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t('dashboard.testimonialDetails.pageTitle')}</h1>
            <p className="text-muted-foreground mt-1">{t('dashboard.testimonialDetails.pageDescription')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/dashboard/testimonials/${testimonial.id}/edit`)}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <Pencil className="h-4 w-4" />
            {t('dashboard.testimonialDetails.editTestimonial')}
          </button>
          <button className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
            <Trash2 className="h-4 w-4" />
            {t('dashboard.testimonialDetails.deleteTestimonial')}
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="rounded-xl border border-border bg-card shadow-sm p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-border bg-muted mb-4">
                <img
                  src={testimonial.avatarUrl}
                  alt={testimonial.clientName}
                  className="h-full w-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <h2 className="text-xl font-bold text-foreground">{testimonial.clientName}</h2>
              <p className="text-sm text-muted-foreground">{testimonial.clientPosition}</p>
              <div className="flex items-center gap-1 mt-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 mt-4">
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                  testimonial.isActive
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                    : 'bg-muted text-muted-foreground border-border'
                }`}>
                  {testimonial.isActive ? t('dashboard.testimonialDetails.active') : t('dashboard.testimonialDetails.inactive')}
                </span>
                {testimonial.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
                    <Star className="h-3 w-3" />
                    {t('dashboard.testimonialDetails.featured')}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.testimonialDetails.clientInformation')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow icon={User} label={t('dashboard.testimonials.clientName')} value={testimonial.clientName} />
              <InfoRow icon={Briefcase} label={t('dashboard.testimonials.clientPosition')} value={testimonial.clientPosition} />
              <InfoRow icon={Building2} label={t('dashboard.testimonials.companyName')} value={testimonial.companyName} />
              <InfoRow icon={MessageSquareQuote} label={t('dashboard.testimonials.projectName')} value={testimonial.projectName || t('dashboard.testimonialDetails.noProject')} />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.testimonialDetails.testimonialContent')}</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2">{t('dashboard.testimonialDetails.arabicContent')}</p>
                <div className="rounded-lg bg-muted/50 p-4 text-sm text-foreground leading-relaxed">
                  "{testimonial.contentAr}"
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">{t('dashboard.testimonialDetails.englishContent')}</p>
                <div className="rounded-lg bg-muted/50 p-4 text-sm text-foreground leading-relaxed">
                  "{testimonial.contentEn}"
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.testimonialDetails.metadata')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow icon={Calendar} label={t('dashboard.testimonialDetails.createdAt')} value={testimonial.createdAt} />
              <InfoRow icon={Clock} label={t('dashboard.testimonialDetails.updatedAt')} value={testimonial.updatedAt} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
