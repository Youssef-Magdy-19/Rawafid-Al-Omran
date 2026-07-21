import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Pencil,
  Calendar,
  Clock,
  Star,
  StarOff,
  Globe,
  Image as ImageIcon,
  Hash,
  Tag,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { ROUTES } from '@constants/route.constants';
import { useProject } from '@hooks/dashboard';
import { LoadingSkeleton } from '@components/ui/LoadingSkeleton';
import { ErrorState } from '@components/ui/ErrorState';

const statusColorMap: Record<string, string> = {
  planning: 'bg-muted text-muted-foreground border-border',
  'in-progress': 'bg-primary/10 text-primary border-primary/20',
  completed: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  'on-hold': 'bg-destructive/10 text-destructive border-destructive/20',
  cancelled: 'bg-muted text-muted-foreground border-border',
};

export function ProjectDetails() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isAr = i18n.language === 'ar';

  const [galleryIndex, setGalleryIndex] = useState(0);

  const { data: project, isLoading, isError, refetch } = useProject(id || '');

  if (isLoading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <LoadingSkeleton className="h-[320px] w-full rounded-xl" />
            <LoadingSkeleton className="h-64 w-full rounded-xl" />
          </div>
          <div className="space-y-6">
            <LoadingSkeleton className="h-64 w-full rounded-xl" />
            <LoadingSkeleton className="h-48 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-medium text-foreground">{t('dashboard.projectDetails.notFound')}</p>
        <button
          onClick={() => navigate(ROUTES.DASHBOARD_PROJECTS)}
          className="mt-4 text-sm text-primary hover:underline"
        >
          {t('dashboard.projects.pageTitle')}
        </button>
      </div>
    );
  }

  const categoryKey = `dashboard.home.category${(project.category?.charAt(0).toUpperCase() ?? '') + (project.category?.slice(1) ?? '')}` as const;
  const statusKey = project.status ? `dashboard.home.status${project.status === 'in-progress' ? 'InProgress' : project.status === 'on-hold' ? 'OnHold' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}` as const : '';
  const statusClass = statusColorMap[project.status] || statusColorMap.planning;

  const allImages = [project.thumbnail, ...(project.images || [])].filter(Boolean);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button
          onClick={() => navigate(ROUTES.DASHBOARD_PROJECTS)}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('dashboard.projectDetails.backToProjects')}
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isAr ? project.titleAr : project.title}
            </h1>
            <p className="text-muted-foreground mt-1">{t('dashboard.projectDetails.pageDescription')}</p>
          </div>
          <button
            onClick={() => navigate(`/dashboard/projects/${project.slug}/edit`)}
            className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all duration-300"
          >
            <Pencil className="h-4 w-4" />
            {t('dashboard.projectDetails.editProject')}
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {allImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-xl border border-border bg-card shadow-sm overflow-hidden"
            >
              <div className="p-5 border-b border-border flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold text-foreground">{t('dashboard.projectDetails.gallery')}</h3>
              </div>

              <div className="relative">
                <img
                  src={allImages[galleryIndex]}
                  alt={`${isAr ? project.titleAr : project.title} - ${galleryIndex + 1}`}
                  className="w-full h-[320px] object-cover"
                />
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setGalleryIndex((i) => (i === 0 ? allImages.length - 1 : i - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setGalleryIndex((i) => (i === allImages.length - 1 ? 0 : i + 1))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {allImages.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setGalleryIndex(i)}
                          className={`h-2 w-2 rounded-full transition-all ${
                            i === galleryIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {allImages.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setGalleryIndex(i)}
                      className={`shrink-0 h-16 w-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        i === galleryIndex ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6"
          >
            <div className="flex items-center gap-2 pb-4 border-b border-border">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">{t('dashboard.projectDetails.projectInformation')}</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  {t('dashboard.projectDetails.titleAr')}
                </p>
                <p className="text-sm text-foreground">{project.titleAr}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  {t('dashboard.projectDetails.titleEn')}
                </p>
                <p className="text-sm text-foreground">{project.title}</p>
              </div>
              <div className="lg:col-span-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  {t('dashboard.projectDetails.descriptionAr')}
                </p>
                <p className="text-sm text-foreground leading-relaxed">{project.descriptionAr}</p>
              </div>
              <div className="lg:col-span-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  {t('dashboard.projectDetails.descriptionEn')}
                </p>
                <p className="text-sm text-foreground leading-relaxed">{project.description}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  {t('dashboard.projectDetails.slug')}
                </p>
                <p className="text-sm text-foreground font-mono">{project.slug}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  {t('dashboard.projectDetails.location')}
                </p>
                <p className="text-sm text-foreground">{isAr ? project.locationAr : project.location}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  {t('dashboard.projectDetails.client')}
                </p>
                <p className="text-sm text-foreground">{isAr ? project.clientAr : project.client}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  {t('dashboard.projectDetails.year')}
                </p>
                <p className="text-sm text-foreground">{project.year}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-5"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">{t('dashboard.projectDetails.metadata')}</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('dashboard.projectDetails.category')}</span>
                <span className="text-sm font-medium text-foreground">
                  {isAr && project.categoryAr ? project.categoryAr : t(categoryKey)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('dashboard.projectDetails.status')}</span>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusClass}`}>
                  {t(statusKey)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('dashboard.projectDetails.featured')}</span>
                {project.isFeatured ? (
                  <Star className="h-4 w-4 text-secondary fill-secondary" />
                ) : (
                  <StarOff className="h-4 w-4 text-muted-foreground/50" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('dashboard.projectDetails.createdAt')}</span>
                <span className="text-sm text-foreground flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('dashboard.projectDetails.updatedAt')}</span>
                <span className="text-sm text-foreground flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  {new Date(project.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-5"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">{t('dashboard.projectDetails.seoInformation')}</h3>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  {t('dashboard.projectDetails.budget')}
                </p>
                <p className="text-sm text-foreground">{isAr ? project.budgetAr : project.budget || '—'}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  {t('dashboard.projectDetails.duration')}
                </p>
                <p className="text-sm text-foreground">{isAr ? project.durationAr : project.duration || '—'}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
