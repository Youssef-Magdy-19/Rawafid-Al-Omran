import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, Check, Building2, PencilRuler, HardHat, RefreshCw } from 'lucide-react';
import { useService } from '@hooks/useServices';
import { useLanguage } from '@providers/LanguageProvider';
import { Breadcrumb, CTABanner, ErrorState, SkeletonCard } from '@components';
import type { BreadcrumbItem } from '@components';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  PencilRuler,
  HardHat,
  RefreshCw,
};



export function ServiceDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const { data: service, isLoading, error, refetch } = useService(slug || '');

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

  if (error || !service) {
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

  const title = language === 'ar' ? service.titleAr : service.title;
  const description = language === 'ar' ? service.descriptionAr : service.description;
  const features = language === 'ar' ? service.featuresAr : service.features;
  const benefits = language === 'ar' ? service.benefitsAr : service.benefits;
  const IconComponent = iconMap[service.icon] || Building2;

  const breadcrumbs: BreadcrumbItem[] = [
    { label: t('navigation.services'), href: '/services' },
    { label: title },
  ];

  return (
    <>
      <Helmet>
        <title>{title} | Rawafid Al Omran</title>
        <meta name="description" content={description} />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/80 to-primary/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--secondary)/0.15)_0%,_transparent_50%)]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto max-w-4xl"
          >
            <Link
              to="/services"
              className={`inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
              {t('common.backToServices')}
            </Link>
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground lg:text-6xl lg:leading-tight">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb + Overview */}
      <section className="section-gradient py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <Breadcrumb items={breadcrumbs} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-12 lg:grid-cols-2 items-start mt-8"
          >
            <div className="flex items-start gap-6">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary ring-1 ring-primary/20">
                <IconComponent className="h-10 w-10" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">{title}</h2>
                <p className="text-muted-foreground leading-relaxed">{description}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="premium-subtitle mb-4">{t('common.featuresTitle')}</span>
              <h2 className="text-2xl font-bold text-foreground mb-6">{t('services.featuresTitle')}</h2>
              <div className="space-y-4">
                {features?.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="premium-subtitle mb-4">{t('common.benefitsTitle')}</span>
              <h2 className="text-2xl font-bold text-foreground mb-6">{t('services.benefitsTitle')}</h2>
              <div className="space-y-4">
                {benefits?.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Capabilities Grid */}
      <section className="section-gradient-alt py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center mb-12"
          >
            <span className="premium-subtitle mb-4 justify-center">{t('services.subtitle')}</span>
            <h2 className="text-3xl font-bold text-foreground lg:text-4xl">{t('services.featuresTitle')}</h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features?.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="premium-card p-6 flex items-start gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-medium">{feature}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      {service.process && service.process.length > 0 && (
        <section className="section-gradient-alt py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center mb-16"
            >
              <span className="premium-subtitle mb-4 justify-center">{t('services.process.subtitle')}</span>
              <h2 className="text-3xl font-bold text-foreground lg:text-4xl mb-4">{t('services.process.title')}</h2>
              <p className="text-muted-foreground">{t('services.process.description')}</p>
            </motion.div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {service.process.map((step, index) => {
                const stepTitle = language === 'ar' ? step.titleAr : step.title;
                const stepDesc = language === 'ar' ? step.descriptionAr : step.description;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="premium-card p-6 text-center h-full">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20">
                        {String(step.step).padStart(2, '0')}
                      </div>
                      <h4 className="mb-2 font-bold text-foreground">{stepTitle}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{stepDesc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

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
