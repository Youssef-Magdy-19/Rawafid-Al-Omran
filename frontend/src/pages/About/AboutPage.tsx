import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Eye, Award, Users, Building2, Shield, ArrowRight } from 'lucide-react';
import { SectionHeader, Statistic } from '@components';
import { useAbout } from '@hooks/useAbout';

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

export function AboutPage() {
  const { t } = useTranslation();
  const { isLoading, error } = useAbout();

  const values = [
    {
      icon: Target,
      title: t('about.values.quality.title'),
      description: t('about.values.quality.description'),
    },
    {
      icon: Shield,
      title: t('about.values.safety.title'),
      description: t('about.values.safety.description'),
    },
    {
      icon: Award,
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description'),
    },
    {
      icon: Users,
      title: t('about.values.integrity.title'),
      description: t('about.values.integrity.description'),
    },
  ];

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
        <title>{t('about.seo.title')}</title>
        <meta name="description" content={t('about.seo.description')} />
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
              {t('about.hero.title')}
            </h1>
            <p className="text-lg text-muted-foreground">{t('about.hero.description')}</p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-6 text-3xl font-bold text-foreground">{t('about.story.title')}</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>{t('about.story.paragraph1')}</p>
                <p>{t('about.story.paragraph2')}</p>
                <p>{t('about.story.paragraph3')}</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                  <Building2 className="h-24 w-24 text-primary/40" />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-xl bg-primary p-6 text-primary-foreground shadow-lg">
                <p className="text-4xl font-bold">25+</p>
                <p className="text-sm">{t('about.story.yearsLabel')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-background p-8 shadow-sm"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-foreground">{t('about.mission.title')}</h3>
              <p className="text-muted-foreground">{t('about.mission.description')}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl bg-background p-8 shadow-sm"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10">
                <Eye className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-foreground">{t('about.vision.title')}</h3>
              <p className="text-muted-foreground">{t('about.vision.description')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeader
            title={t('about.statistics.title')}
            subtitle={t('about.statistics.subtitle')}
            description={t('about.statistics.description')}
            className="mb-12"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Statistic value="25+" label={t('statistics.yearsExperience')} />
            <Statistic value="500+" label={t('statistics.projectsCompleted')} />
            <Statistic value="200+" label={t('statistics.teamMembers')} />
            <Statistic value="98%" label={t('statistics.clientSatisfaction')} />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeader
            title={t('about.values.title')}
            subtitle={t('about.values.subtitle')}
            description={t('about.values.description')}
            className="mb-12"
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="rounded-2xl bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="mb-2 font-semibold text-foreground">{value.title}</h4>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
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
              {t('cta.title')}
            </h2>
            <p className="mb-8 text-lg text-primary-foreground/80">
              {t('cta.description')}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-background px-8 py-3 font-semibold text-primary transition-colors hover:bg-background/90"
            >
              {t('cta.button')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
