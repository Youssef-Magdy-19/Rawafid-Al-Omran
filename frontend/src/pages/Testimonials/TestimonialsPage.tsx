import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Star, Quote, User, MessageSquare, ArrowRight } from 'lucide-react';
import { useTestimonials } from '@hooks/useTestimonials';
import { useLanguage } from '@providers/LanguageProvider';
import { Button } from '@components/ui';
import { Skeleton } from '@components/Skeleton';
import { ErrorState } from '@components/ErrorState';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-secondary text-secondary' : 'text-muted-foreground/30'}`}
        />
      ))}
    </div>
  );
}

function TestimonialSkeleton() {
  return (
    <div className="premium-card p-8">
      <Skeleton className="mb-4 h-4 w-24" variant="text" />
      <Skeleton className="mb-6 h-20 w-full" variant="text" />
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" variant="circular" />
        <div>
          <Skeleton className="mb-1 h-4 w-32" variant="text" />
          <Skeleton className="h-3 w-24" variant="text" />
        </div>
      </div>
    </div>
  );
}

export function TestimonialsPage() {
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const { data: testimonials, isLoading, error, refetch } = useTestimonials();

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>{t('testimonials.seo.title')} | Rawafid Al Omran</title>
          <meta name="description" content={t('testimonials.seo.description')} />
        </Helmet>
        <section className="section-gradient relative overflow-hidden py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <Skeleton className="mx-auto mb-4 h-4 w-32" variant="text" />
              <Skeleton className="mx-auto mb-6 h-12 w-72" variant="text" />
              <Skeleton className="mx-auto h-5 w-96" variant="text" />
            </div>
            <div className="mx-auto mb-16 max-w-4xl">
              <TestimonialSkeleton />
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <TestimonialSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Helmet>
          <title>{t('testimonials.seo.title')} | Rawafid Al Omran</title>
          <meta name="description" content={t('testimonials.seo.description')} />
        </Helmet>
        <section className="section-gradient flex min-h-[60vh] items-center justify-center">
          <ErrorState
            title={t('common.error')}
            description={t('common.tryAgain')}
            onRetry={() => refetch()}
            error={error as Error}
          />
        </section>
      </>
    );
  }

  const featured = testimonials?.[0];
  const rest = testimonials?.slice(1) || [];

  return (
    <>
      <Helmet>
        <title>{t('testimonials.seo.title')} | Rawafid Al Omran</title>
        <meta name="description" content={t('testimonials.seo.description')} />
      </Helmet>

      <section className="section-gradient relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="premium-subtitle mb-6 inline-flex justify-center">
              {t('testimonials.pageTitle')}
            </span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              {t('testimonials.hero.title')}
            </h1>
            <p className="text-lg text-muted-foreground lg:text-xl">
              {t('testimonials.hero.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {testimonials && testimonials.length > 0 ? (
        <>
          {featured && (
            <section className="py-12 lg:py-16">
              <div className="container mx-auto px-4 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="premium-card relative mx-auto max-w-4xl overflow-hidden p-8 lg:p-12"
                >
                  <Quote className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} h-16 w-16 text-primary/5`} />
                  <div className={`relative ${isRTL ? 'text-right' : ''}`}>
                    <StarRating rating={featured.rating || 5} />
                    <blockquote className="my-6 text-xl leading-relaxed text-foreground/90 lg:text-2xl">
                      &ldquo;{language === 'ar' ? featured.contentAr || featured.content : featured.content}&rdquo;
                    </blockquote>
                    <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {featured.image ? (
                        <img
                          src={featured.image}
                          alt={language === 'ar' ? featured.nameAr || featured.name : featured.name}
                          className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/20"
                        />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                          <User className="h-7 w-7 text-primary" />
                        </div>
                      )}
                      <div>
                        <h4 className="text-lg font-bold text-foreground">
                          {language === 'ar' ? featured.nameAr || featured.name : featured.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {[language === 'ar' ? featured.roleAr || featured.position : featured.position, language === 'ar' ? featured.companyAr || featured.company : featured.company].filter(Boolean).join(' \u2022 ')}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          )}

          {rest.length > 0 && (
            <section className="pb-16 lg:pb-24">
              <div className="container mx-auto px-4 lg:px-8">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                  {rest.map((testimonial) => {
                    const name = language === 'ar' ? testimonial.nameAr || testimonial.name : testimonial.name;
                    const content = language === 'ar' ? testimonial.contentAr || testimonial.content : testimonial.content;
                    const company = language === 'ar' ? testimonial.companyAr || testimonial.company : testimonial.company;
                    const position = language === 'ar' ? testimonial.roleAr || testimonial.position : testimonial.position;

                    return (
                      <motion.div
                        key={testimonial._id}
                        variants={itemVariants}
                        className="premium-card group relative p-8"
                      >
                        <Quote className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} h-8 w-8 text-primary/10`} />
                        <div className={`mb-4 flex ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                          <StarRating rating={testimonial.rating || 5} />
                        </div>
                        <p className={`mb-6 text-muted-foreground leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                          &ldquo;{content}&rdquo;
                        </p>
                        <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          {testimonial.image ? (
                            <img
                              src={testimonial.image}
                              alt={name}
                              className="h-12 w-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                              <User className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                          <div className={isRTL ? 'text-right' : ''}>
                            <h4 className="font-semibold text-foreground">{name}</h4>
                            {(position || company) && (
                              <p className="text-sm text-muted-foreground">
                                {[position, company].filter(Boolean).join(', ')}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </section>
          )}
        </>
      ) : (
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
                <MessageSquare className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">{t('testimonials.empty.title')}</h3>
              <p className="text-muted-foreground">{t('testimonials.empty.description')}</p>
            </motion.div>
          </div>
        </section>
      )}

      <section className="section-gradient-alt relative overflow-hidden py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
              {t('testimonials.cta.title')}
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              {t('testimonials.cta.description')}
            </p>
            <Link to="/contact">
              <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                {t('testimonials.cta.button')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}