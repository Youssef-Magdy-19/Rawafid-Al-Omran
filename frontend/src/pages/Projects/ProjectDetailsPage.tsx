import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Building2, Check, Target, TrendingUp, ArrowUpRight } from 'lucide-react';
import { useProject, useProjects } from '@hooks/useProjects';
import { useLanguage } from '@providers/LanguageProvider';
import { Badge, Breadcrumb, CTABanner, ErrorState, SkeletonCard } from '@components';
import type { BreadcrumbItem } from '@components';

export function ProjectDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const { data: project, isLoading, error, refetch } = useProject(slug || '');
  const { data: allProjects } = useProjects();

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="section-gradient py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <SkeletonCard />
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <ErrorState
          title={t('common.error')}
          description={t('common.pageNotFound')}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  const title = language === 'ar' ? project.titleAr : project.title;
  const description = language === 'ar' ? project.descriptionAr : project.description;
  const location = language === 'ar' ? project.locationAr : project.location;
  const client = language === 'ar' ? project.clientAr : project.client;
  const features = language === 'ar' ? project.featuresAr : project.features;
  const challenges = language === 'ar' ? project.challengesAr : project.challenges;
  const solutions = language === 'ar' ? project.solutionsAr : project.solutions;
  const results = language === 'ar' ? project.resultsAr : project.results;
  const category = language === 'ar' ? project.categoryAr : project.category;

  const breadcrumbs: BreadcrumbItem[] = [
    { label: t('navigation.projects'), href: '/projects' },
    { label: title },
  ];

  return (
    <>
      <Helmet>
        <title>{title} | Rawafid Al Omran</title>
        <meta name="description" content={description} />
      </Helmet>

      {/* Hero Image with Overlay */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="container relative mx-auto px-4 lg:px-8 pb-16 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link
              to="/projects"
              className={`inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-6 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
              {t('common.backToProjects')}
            </Link>
            <div className="flex flex-wrap gap-3 mb-4">
              <Badge variant="primary" size="sm">{category}</Badge>
              <Badge variant={project.status === 'completed' ? 'default' : 'outline'} size="sm">
                {project.status === 'completed' ? t('common.completed') : t('common.inProgress')}
              </Badge>
            </div>
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground lg:text-6xl lg:leading-tight">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-8">
              {description}
            </p>
            <div className={`flex flex-wrap gap-6 text-sm text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
              {location && (
                <span className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <MapPin className="h-4 w-4 text-primary" />
                  {location}
                </span>
              )}
              {project.year && (
                <span className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Calendar className="h-4 w-4 text-primary" />
                  {project.year}
                </span>
              )}
              {client && (
                <span className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Building2 className="h-4 w-4 text-primary" />
                  {client}
                </span>
              )}
              {project.duration && (
                <span className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Calendar className="h-4 w-4 text-primary" />
                  {project.duration}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Info Bar */}
      <section className="section-gradient py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <Breadcrumb items={breadcrumbs} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
            {location && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="premium-card p-5 flex items-center gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('common.location') || 'Location'}</p>
                  <p className="font-semibold text-foreground">{location}</p>
                </div>
              </motion.div>
            )}
            {project.year && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="premium-card p-5 flex items-center gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('common.year') || 'Year'}</p>
                  <p className="font-semibold text-foreground">{project.year}</p>
                </div>
              </motion.div>
            )}
            {client && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="premium-card p-5 flex items-center gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('common.client') || 'Client'}</p>
                  <p className="font-semibold text-foreground">{client}</p>
                </div>
              </motion.div>
            )}
            {project.duration && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="premium-card p-5 flex items-center gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('common.duration') || 'Duration'}</p>
                  <p className="font-semibold text-foreground">{project.duration}</p>
                </div>
              </motion.div>
            )}
            {project.budget && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="premium-card p-5 flex items-center gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('common.budget') || 'Budget'}</p>
                  <p className="font-semibold text-foreground">{language === 'ar' ? project.budgetAr : project.budget}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Overview / Challenge / Solution / Results */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Features */}
            {features && features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="premium-subtitle mb-4">{t('common.featuresTitle')}</span>
                <h3 className="text-2xl font-bold text-foreground mb-6">{t('projects.featuresTitle')}</h3>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="space-y-8">
              {challenges && (
                <motion.div
                  initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                      <Target className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{t('projects.challengesTitle')}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed pl-14">{challenges}</p>
                </motion.div>
              )}

              {solutions && (
                <motion.div
                  initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{t('projects.solutionsTitle')}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed pl-14">{solutions}</p>
                </motion.div>
              )}

              {results && (
                <motion.div
                  initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10">
                      <TrendingUp className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{t('projects.resultsTitle')}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed pl-14">{results}</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <span className="premium-subtitle mb-4">{t('common.galleryTitle')}</span>
              <h2 className="text-3xl font-bold text-foreground lg:text-4xl">{t('projects.galleryTitle')}</h2>
            </motion.div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {project.images.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className={`overflow-hidden rounded-xl ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                >
                  <img
                    src={img}
                    alt={`${title} - ${index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {allProjects && allProjects.length > 1 && (
        <section className="section-gradient-alt py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <span className="premium-subtitle mb-4">{t('projects.subtitle')}</span>
              <h2 className="text-3xl font-bold text-foreground lg:text-4xl">{t('projects.title')}</h2>
            </motion.div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {allProjects
                ?.filter((p) => p.id !== project.id)
                .slice(0, 3)
                .map((related, index) => {
                  const relatedTitle = language === 'ar' ? related.titleAr : related.title;
                  const relatedCategory = language === 'ar' ? related.categoryAr : related.category;
                  return (
                    <motion.div
                      key={related.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Link
                        to={`/projects/${related.slug}`}
                        className="group block"
                      >
                        <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                          {related.thumbnail ? (
                            <img
                              src={related.thumbnail}
                              alt={language === 'ar' ? related.titleAr : related.title}
                              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                              <Building2 className="h-12 w-12 text-primary/20" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-500 group-hover:bg-black/40">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/80 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 backdrop-blur-sm">
                              <ArrowUpRight className="h-5 w-5" />
                            </div>
                          </div>
                          <div className="absolute top-4 left-4">
                            <Badge variant="primary" size="sm" className="backdrop-blur-sm">
                              {relatedCategory}
                            </Badge>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-5">
                            <h3 className="text-lg font-bold text-white">{relatedTitle}</h3>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <CTABanner
        title={t('projects.cta.title')}
        description={t('projects.cta.description')}
        buttonText={t('projects.cta.button')}
        buttonLink="/contact"
        variant="accent"
      />
    </>
  );
}
