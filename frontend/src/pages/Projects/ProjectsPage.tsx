import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Building2, ArrowUpRight } from 'lucide-react';
import { Badge, CTABanner, ErrorState, SkeletonCard } from '@components';
import { useProjects } from '@hooks/useProjects';
import { useLanguage } from '@providers/LanguageProvider';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export function ProjectsPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { data: projects, isLoading, error, refetch } = useProjects();

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="section-gradient py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <SkeletonCard />
          </div>
        </div>
        <div className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <ErrorState
          title={t('common.error')}
          description={t('common.tryAgain')}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('projects.seo.title')}</title>
        <meta name="description" content={t('projects.seo.description')} />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/80 to-primary/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--secondary)/0.15)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(var(--secondary)/0.1)_0%,_transparent_50%)]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="premium-subtitle mb-6 justify-center">{t('projects.subtitle')}</span>
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground lg:text-6xl lg:leading-tight">
              {t('projects.hero.title')}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {t('projects.hero.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Portfolio Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {projects?.map((project, index) => {
              const title = language === 'ar' ? project.titleAr : project.title;
              const category = language === 'ar' ? project.categoryAr : project.category;
              const location = language === 'ar' ? project.locationAr : project.location;
              const isFeatured = index === 0 || project.isFeatured;

              return (
                <motion.div
                  key={project.id}
                  variants={fadeUp}
                  className={isFeatured ? 'md:col-span-2 lg:col-span-2' : ''}
                >
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group block"
                  >
                    <div className={`relative overflow-hidden rounded-2xl ${isFeatured ? 'aspect-[16/7]' : 'aspect-[4/3]'}`}>
                      {project.thumbnail ? (
                        <img
                          src={project.thumbnail}
                          alt={title}
                          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                          <Building2 className="h-16 w-16 text-primary/20" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-500 group-hover:bg-black/40">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/80 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 backdrop-blur-sm">
                          <ArrowUpRight className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="absolute top-5 left-5">
                        <Badge variant="primary" size="sm" className="backdrop-blur-sm">
                          {category}
                        </Badge>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                        <div className="flex items-center gap-4 text-sm text-white/70">
                          {location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {location}
                            </span>
                          )}
                          {project.year && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {project.year}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

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
