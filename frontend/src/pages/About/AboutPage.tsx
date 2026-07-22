import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Target, Eye, Award, Users, Building2, Shield,
  ArrowRight, ArrowLeft, Loader2,
} from 'lucide-react';
import { SectionHeader } from '@components';
import { Button } from '@components/ui';
import { useAbout } from '@hooks/useAbout';
import { useLanguage } from '@providers/LanguageProvider';

const stagger = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const timelineItems = [
  { year: '1998', key: 'about.timeline.items.1998' },
  { year: '2005', key: 'about.timeline.items.2005' },
  { year: '2010', key: 'about.timeline.items.2010' },
  { year: '2015', key: 'about.timeline.items.2015' },
  { year: '2020', key: 'about.timeline.items.2020' },
  { year: '2024', key: 'about.timeline.items.2024' },
];

export function AboutPage() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
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
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
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

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden py-24 lg:py-36">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.2)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.2)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="premium-subtitle mb-4 inline-flex justify-center">
              {t('company.tagline')}
            </span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {t('about.hero.title')}
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
              {t('about.hero.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== COMPANY STORY ===== */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className="relative"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                  <Building2 className="h-24 w-24 text-primary/30" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-6 text-primary-foreground shadow-xl">
                <p className="text-4xl font-bold">25+</p>
                <p className="text-sm font-medium text-primary-foreground/80">
                  {t('about.story.yearsLabel')}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className={isRTL ? 'text-right' : 'text-left'}
            >
              <span className="premium-subtitle mb-4 inline-flex">{t('about.story.subtitle')}</span>
              <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                {t('about.story.title')}
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p className="text-lg">{t('about.story.paragraph1')}</p>
                <p className="text-lg">{t('about.story.paragraph2')}</p>
                <p className="text-lg">{t('about.story.paragraph3')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== MISSION & VISION ===== */}
      <section className="section-gradient-alt py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="premium-card group p-10"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary/30 transition-all duration-500">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-foreground">{t('about.mission.title')}</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">{t('about.mission.description')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="premium-card group p-10"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 text-secondary ring-1 ring-secondary/20 group-hover:bg-secondary group-hover:text-secondary-foreground group-hover:ring-secondary/30 transition-all duration-500">
                <Eye className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-foreground">{t('about.vision.title')}</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">{t('about.vision.description')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== STATISTICS ===== */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title={t('about.statistics.title')}
            subtitle={t('about.statistics.subtitle')}
            description={t('about.statistics.description')}
            className="mb-16"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: '25+', labelKey: 'statistics.yearsExperience' },
              { value: '500+', labelKey: 'statistics.projectsCompleted' },
              { value: '200+', labelKey: 'statistics.teamMembers' },
              { value: '98%', labelKey: 'statistics.clientSatisfaction' },
            ].map((stat, i) => (
              <motion.div
                key={stat.labelKey}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="premium-card p-8 text-center"
              >
                <div className="text-4xl font-bold premium-gradient-text md:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {t(stat.labelKey)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="section-gradient py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title={t('about.values.title')}
            subtitle={t('about.values.subtitle')}
            description={t('about.values.description')}
            className="mb-16"
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                className="premium-card group p-8"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary/30 group-hover:shadow-lg group-hover:shadow-primary/20">
                  <value.icon className="h-7 w-7" />
                </div>
                <h4 className="mb-3 text-xl font-bold text-foreground">{value.title}</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title={t('about.timeline.title')}
            subtitle={t('about.timeline.subtitle')}
            className="mb-16"
          />
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border/60" />
            <div className="space-y-12">
              {timelineItems.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex items-center gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className={`premium-card inline-block p-6 ${i % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}>
                      <span className="text-sm font-bold text-primary">{item.year}</span>
                      <p className="mt-1 text-foreground font-semibold">{t(item.key)}</p>
                    </div>
                  </div>
                  <div className="relative z-10 flex h-5 w-5 items-center justify-center">
                    <div className="h-5 w-5 rounded-full border-4 border-primary bg-background" />
                  </div>
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary-dark py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--secondary)/0.15),transparent_50%)]" />
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
              {t('cta.title')}
            </h2>
            <p className="mb-8 text-lg text-primary-foreground/80 md:text-xl">
              {t('cta.description')}
            </p>
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                rightIcon={<Arrow className="h-5 w-5" />}
              >
                {t('cta.button')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
