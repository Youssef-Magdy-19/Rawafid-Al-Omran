import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HeroSection,
  SectionHeader,
  ServiceCard,
  ProjectCard,
  Statistic,
  TestimonialCard,
  CTABanner,
  NewsletterForm,
} from '@components';
import { Button } from '@components/ui';
import { useServices } from '@hooks/useServices';
import { useProjects } from '@hooks/useProjects';
import { useTestimonials } from '@hooks/useTestimonials';
import { useLanguage } from '@providers/LanguageProvider';
import {
  Building2, Users, Award, Globe, Loader2,
  ArrowRight, ArrowLeft, HardHat,
  CheckCircle2,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Award, Building2, Users, Globe,
};

const statistics = [
  { id: 'stat-1', value: '25+', labelKey: 'statistics.yearsExperience', icon: 'Award' },
  { id: 'stat-2', value: '500+', labelKey: 'statistics.projectsCompleted', icon: 'Building2' },
  { id: 'stat-3', value: '200+', labelKey: 'statistics.teamMembers', icon: 'Users' },
  { id: 'stat-4', value: '98%', labelKey: 'statistics.clientSatisfaction', icon: 'Globe' },
];

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1], delay: i * 0.1 },
  }),
};

export function HomePage() {
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const { data: services, isLoading: servicesLoading } = useServices();
  const { data: projects, isLoading: projectsLoading } = useProjects({ limit: '4', isFeatured: 'true' });
  const { data: testimonials, isLoading: testimonialsLoading } = useTestimonials();

  const isLoading = servicesLoading || projectsLoading || testimonialsLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground">{t('common.loading')}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('hero.title')} | Rawafid Al Omran</title>
        <meta name="description" content={t('hero.description')} />
      </Helmet>

      {/* ===== HERO ===== */}
      <HeroSection
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        description={t('hero.description')}
        primaryCtaText={t('hero.primaryCta')}
        primaryCtaLink="/contact"
        secondaryCtaText={t('hero.secondaryCta')}
        secondaryCtaLink="/projects"
        backgroundImage="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80"
      />

      {/* ===== QUICK STATS BAR ===== */}
      <section className="relative z-10 -mt-16 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="rounded-2xl bg-gradient-to-br from-primary via-primary to-primary-dark p-10 shadow-2xl shadow-primary/20 md:p-12"
          >
            <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
              {statistics.map((stat) => {
                const IconComponent = iconMap[stat.icon];
                return (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <Statistic
                      value={stat.value}
                      label={t(stat.labelKey)}
                      icon={IconComponent ? <IconComponent className="h-7 w-7" /> : undefined}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="section-gradient py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <SectionHeader
              title={t('services.title')}
              subtitle={t('services.subtitle')}
              description={t('services.description')}
              className="mb-16"
            />
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services?.slice(0, 4).map((service, i) => {
              const IconComponent = iconMap[service.icon] || Building2;
              const title = language === 'ar' ? service.titleAr : service.title;
              const description = language === 'ar'
                ? service.shortDescriptionAr || service.descriptionAr
                : service.shortDescription || service.description;
              return (
                <motion.div
                  key={service.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <ServiceCard
                    title={title}
                    description={description}
                    icon={<IconComponent className="h-6 w-6" />}
                    slug={service.slug}
                    index={i}
                  />
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/services">
              <Button variant="outline" rightIcon={<Arrow className="h-4 w-4" />}>
                {t('services.viewAll')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <SectionHeader
              title={t('projects.title')}
              subtitle={t('projects.subtitle')}
              description={t('projects.description')}
              className="mb-16"
            />
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {projects?.slice(0, 4).map((project, i) => {
              const title = language === 'ar' ? project.titleAr : project.title;
              const category = language === 'ar' ? project.categoryAr : project.category;
              return (
                <motion.div
                  key={project.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <ProjectCard
                    title={title}
                    category={category}
                    image={project.thumbnail || project.images?.[0] || ''}
                    slug={project.slug}
                  />
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/projects">
              <Button variant="outline" rightIcon={<Arrow className="h-4 w-4" />}>
                {t('projects.viewAll')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="section-gradient-alt py-24">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80"
                  alt="Rawafid Al Omran"
                  className="h-[450px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="absolute -bottom-6 left-6 right-auto rounded-2xl bg-card p-6 shadow-xl ring-1 ring-border/50">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <HardHat className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">25+</div>
                    <div className="text-xs text-muted-foreground">{t('statistics.yearsExperience')}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className={isRTL ? 'text-right' : 'text-left'}
            >
              <div className="mb-4">
                <span className="premium-subtitle">{t('about.story.subtitle')}</span>
              </div>
              <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                {t('about.story.title')}
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p className="text-lg">{t('about.story.paragraph1')}</p>
                <p className="text-lg">{t('about.story.paragraph2')}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                {['quality', 'safety', 'excellence'].map((val) => (
                  <div key={val} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <span className="text-foreground font-medium">{t(`about.values.${val}.title`)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/about">
                  <Button rightIcon={<Arrow className="h-4 w-4" />}>
                    {t('common.learnMore')}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <SectionHeader
              title={t('testimonials.title')}
              subtitle={t('testimonials.hero.title')}
              description={t('testimonials.seo.description')}
              className="mb-16"
            />
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials?.slice(0, 3).map((testimonial, i) => {
              const name = language === 'ar' ? testimonial.nameAr || testimonial.name : testimonial.name;
              const content = language === 'ar' ? testimonial.contentAr || testimonial.content : testimonial.content;
              const company = language === 'ar' ? testimonial.companyAr || testimonial.company : testimonial.company;
              const position = language === 'ar' ? testimonial.roleAr || testimonial.position : testimonial.position;
              return (
                <motion.div
                  key={testimonial._id || testimonial.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <TestimonialCard
                    name={name}
                    role={position || ''}
                    company={company || ''}
                    content={content}
                    rating={testimonial.rating || 5}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <CTABanner
        title={t('cta.title')}
        description={t('cta.description')}
        buttonText={t('cta.button')}
        buttonLink="/contact"
        variant="secondary"
      />

      {/* ===== NEWSLETTER ===== */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-4">
                <span className="premium-subtitle">{t('newsletter.title')}</span>
              </div>
              <p className="mt-6 text-lg text-muted-foreground">
                {t('newsletter.description')}
              </p>
              <div className="mt-8 flex justify-center">
                <NewsletterForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
