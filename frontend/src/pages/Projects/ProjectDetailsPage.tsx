import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useProject } from '@hooks/useProjects';
import { useLanguage } from '@providers/LanguageProvider';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Building2, Clock, Check } from 'lucide-react';
import { Badge, Image } from '@components';
import { Button } from '@components/ui';

export function ProjectDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const { data: project, isLoading, error } = useProject(slug || '');

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <h2 className="text-2xl font-bold text-foreground">{t('common.error')}</h2>
        <p className="text-muted-foreground">{t('common.pageNotFound')}</p>
        <Link to="/projects">
          <Button variant="outline" leftIcon={<ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />}>
            {t('common.backToProjects')}
          </Button>
        </Link>
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

  return (
    <>
      <Helmet>
        <title>{title} | Rawafid Al Omran</title>
        <meta name="description" content={description} />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20 lg:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl"
          >
            <Link
              to="/projects"
              className={`inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
              {t('common.backToProjects')}
            </Link>

            <div className="flex flex-wrap gap-3 mb-4">
              <Badge variant="secondary">{category}</Badge>
              <Badge variant={project.status === 'completed' ? 'default' : 'outline'}>
                {project.status === 'completed' ? t('common.completed') : t('common.inProgress')}
              </Badge>
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">{title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">{description}</p>

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
                  <Clock className="h-4 w-4 text-primary" />
                  {project.duration}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-foreground mb-8"
            >
              {t('projects.galleryTitle')}
            </motion.h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {project.images.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="overflow-hidden rounded-xl"
                >
                  <Image src={img} alt={`${title} - ${index + 1}`} aspectRatio="video" className="w-full" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Project Details */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {features && features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-bold text-foreground mb-4">{t('projects.featuresTitle')}</h3>
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
                  initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl font-bold text-foreground mb-4">{t('projects.challengesTitle')}</h3>
                  <p className="text-muted-foreground leading-relaxed">{challenges}</p>
                </motion.div>
              )}

              {solutions && (
                <motion.div
                  initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h3 className="text-xl font-bold text-foreground mb-4">{t('projects.solutionsTitle')}</h3>
                  <p className="text-muted-foreground leading-relaxed">{solutions}</p>
                </motion.div>
              )}

              {results && (
                <motion.div
                  initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-xl font-bold text-foreground mb-4">{t('projects.resultsTitle')}</h3>
                  <p className="text-muted-foreground leading-relaxed">{results}</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-primary-foreground lg:text-4xl">
              {t('projects.cta.title')}
            </h2>
            <p className="mb-8 text-lg text-primary-foreground/80">
              {t('projects.cta.description')}
            </p>
            <Link
              to="/contact"
              className={`inline-flex items-center gap-2 rounded-lg bg-background px-8 py-3 font-semibold text-primary transition-colors hover:bg-background/90 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {t('projects.cta.button')}
              <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
