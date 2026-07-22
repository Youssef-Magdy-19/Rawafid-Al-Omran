import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Building2, PencilRuler, HardHat, RefreshCw, Check } from 'lucide-react';
import { SectionHeader, CTABanner, SkeletonCard, ErrorState } from '@components';
import { useServices } from '@hooks/useServices';
import { useLanguage } from '@providers/LanguageProvider';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  PencilRuler,
  HardHat,
  RefreshCw,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export function ServicesPage() {
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const { data: services, isLoading, error, refetch } = useServices();

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
            <div className="grid gap-8 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
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
        <title>{t('services.seo.title')}</title>
        <meta name="description" content={t('services.seo.description')} />
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
            <span className="premium-subtitle mb-6 justify-center">{t('services.subtitle')}</span>
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground lg:text-6xl lg:leading-tight">
              {t('services.hero.title')}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {t('services.hero.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-gradient py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="premium-subtitle mb-6 justify-center">{t('services.subtitle')}</span>
            <p className="text-lg text-muted-foreground leading-relaxed md:text-xl">
              {t('services.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services - Alternating Editorial Blocks */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-24"
          >
            {services?.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Building2;
              const isReversed = index % 2 !== 0;
              const title = language === 'ar' ? service.titleAr : service.title;
              const description = language === 'ar' ? service.descriptionAr : service.description;
              const features = language === 'ar' ? service.featuresAr : service.features;

              return (
                <motion.div
                  key={service.id}
                  variants={fadeUp}
                  className={`grid gap-8 lg:gap-16 items-center lg:grid-cols-2 ${isReversed ? 'lg:direction-rtl' : ''}`}
                  style={{ direction: isReversed && isRTL ? 'ltr' : undefined }}
                >
                  {/* Content Side */}
                  <div className={`order-2 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <span className="premium-subtitle mb-4">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h2 className="text-3xl font-bold text-foreground mb-4 lg:text-4xl">
                      {title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {features?.slice(0, 4).map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      {t('common.learnMore')}
                      {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                    </Link>
                  </div>

                  {/* Image Side */}
                  <div className={`order-1 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                      {service.image ? (
                        <img
                          src={service.image}
                          alt={title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                          <IconComponent className="h-20 w-20 text-primary/20" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-gradient-alt py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeader
            title={t('services.process.title')}
            subtitle={t('services.process.subtitle')}
            description={t('services.process.description')}
            className="mb-16"
            size="lg"
          />
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent lg:block" />
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                { step: '01', key: 'consultation' },
                { step: '02', key: 'planning' },
                { step: '03', key: 'execution' },
                { step: '04', key: 'delivery' },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="relative"
                >
                  <div className="premium-card p-8 text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20">
                      {item.step}
                    </div>
                    <h4 className="mb-3 text-lg font-bold text-foreground">
                      {t(`services.process.steps.${item.key}.title`)}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(`services.process.steps.${item.key}.description`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title={t('services.cta.title')}
        description={t('services.cta.description')}
        buttonText={t('services.cta.button')}
        buttonLink="/contact"
        variant="accent"
      />
    </>
  );
}
