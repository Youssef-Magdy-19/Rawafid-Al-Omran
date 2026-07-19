import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, PencilRuler, HardHat, RefreshCw, Check } from 'lucide-react';
import { SectionHeader } from '@components';
import { useServices } from '@hooks/useServices';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  PencilRuler,
  HardHat,
  RefreshCw,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export function ServicesPage() {
  const { t } = useTranslation();
  const { data: services, isLoading, error } = useServices();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
        <p className="text-lg text-muted-foreground">{t('common.error')}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {t('common.retry')}
        </button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('services.seo.title')}</title>
        <meta name="description" content={t('services.seo.description')} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-muted/30 py-20 lg:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              {t('services.hero.title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('services.hero.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2"
          >
            {services?.map((service) => {
              const IconComponent = iconMap[service.icon] || Building2;
              return (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  className="group relative overflow-hidden rounded-2xl bg-background p-8 shadow-sm transition-all hover:shadow-lg"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mb-6 text-muted-foreground">
                    {service.description}
                  </p>
                  <ul className="mb-6 space-y-2">
                    {service.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    {t('common.learnMore')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeader
            title={t('services.process.title')}
            subtitle={t('services.process.subtitle')}
            description={t('services.process.description')}
            className="mb-12"
          />
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { step: '01', title: t('services.process.steps.consultation.title'), desc: t('services.process.steps.consultation.description') },
              { step: '02', title: t('services.process.steps.planning.title'), desc: t('services.process.steps.planning.description') },
              { step: '03', title: t('services.process.steps.execution.title'), desc: t('services.process.steps.execution.description') },
              { step: '04', title: t('services.process.steps.delivery.title'), desc: t('services.process.steps.delivery.description') },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h4 className="mb-2 font-semibold text-foreground">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
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
              {t('services.cta.title')}
            </h2>
            <p className="mb-8 text-lg text-primary-foreground/80">
              {t('services.cta.description')}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-background px-8 py-3 font-semibold text-primary transition-colors hover:bg-background/90"
            >
              {t('services.cta.button')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}