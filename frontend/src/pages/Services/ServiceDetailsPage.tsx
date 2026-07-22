import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useService } from '@hooks/useServices';
import { useLanguage } from '@providers/LanguageProvider';
import { ArrowLeft, Check, ArrowRight } from 'lucide-react';
import { Button } from '@components/ui';

export function ServiceDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const { data: service, isLoading, error } = useService(slug || '');

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <h2 className="text-2xl font-bold text-foreground">{t('common.error')}</h2>
        <p className="text-muted-foreground">{t('common.pageNotFound')}</p>
        <Link to="/services">
          <Button variant="outline" leftIcon={<ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />}>
            {t('common.backToServices')}
          </Button>
        </Link>
      </div>
    );
  }

  const title = language === 'ar' ? service.titleAr : service.title;
  const description = language === 'ar' ? service.descriptionAr : service.description;
  const features = language === 'ar' ? service.featuresAr : service.features;
  const benefits = language === 'ar' ? service.benefitsAr : service.benefits;

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
            className="mx-auto max-w-3xl"
          >
            <Link
              to="/services"
              className={`inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
              {t('common.backToServices')}
            </Link>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">{title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
          </motion.div>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
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
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
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

      {/* Process (if available) */}
      {service.process && service.process.length > 0 && (
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-3xl text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">{t('services.process.title')}</h2>
              <p className="text-muted-foreground">{t('services.process.subtitle')}</p>
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
                    className="relative text-center"
                  >
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                      {String(step.step).padStart(2, '0')}
                    </div>
                    <h4 className="mb-2 font-semibold text-foreground">{stepTitle}</h4>
                    <p className="text-sm text-muted-foreground">{stepDesc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

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
              {t('services.cta.title')}
            </h2>
            <p className="mb-8 text-lg text-primary-foreground/80">
              {t('services.cta.description')}
            </p>
            <Link
              to="/contact"
              className={`inline-flex items-center gap-2 rounded-lg bg-background px-8 py-3 font-semibold text-primary transition-colors hover:bg-background/90 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {t('services.cta.button')}
              <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
