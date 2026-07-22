import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Star, Quote, User, ArrowRight } from 'lucide-react';
import { useTestimonials } from '@hooks/useTestimonials';
import { useLanguage } from '@providers/LanguageProvider';
import { Button } from '@components/ui';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function TestimonialsPage() {
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const { data: testimonials, isLoading, error } = useTestimonials();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center px-4">
        <h2 className="text-2xl font-bold text-foreground">{t('common.error')}</h2>
        <p className="text-muted-foreground">{t('common.tryAgain')}</p>
        <Button onClick={() => window.location.reload()}>{t('common.retry')}</Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('testimonials.seo.title')} | Rawafid Al Omran</title>
        <meta name="description" content={t('testimonials.seo.description')} />
      </Helmet>

      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20 lg:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              {t('testimonials.hero.title')}
            </h1>
            <p className="text-lg text-muted-foreground">{t('testimonials.hero.description')}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          {testimonials && testimonials.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {testimonials.map((testimonial) => {
                const name = language === 'ar' ? testimonial.nameAr || testimonial.name : testimonial.name;
                const content = language === 'ar' ? testimonial.contentAr || testimonial.content : testimonial.content;
                const company = language === 'ar' ? testimonial.companyAr || testimonial.company : testimonial.company;
                const position = language === 'ar' ? testimonial.roleAr || testimonial.position : testimonial.position;

                return (
                  <motion.div
                    key={testimonial._id}
                    variants={itemVariants}
                    className="group relative rounded-2xl bg-background p-8 shadow-sm transition-all hover:shadow-lg border border-border/50"
                  >
                    <Quote className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} h-8 w-8 text-primary/10`} />
                    <div className={`mb-4 flex ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                      {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
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
          ) : (
            <div className="text-center py-16">
              <Quote className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">{t('testimonials.empty.title')}</h3>
              <p className="text-muted-foreground">{t('testimonials.empty.description')}</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-primary-foreground lg:text-4xl">{t('testimonials.cta.title')}</h2>
            <p className="mb-8 text-lg text-primary-foreground/80">{t('testimonials.cta.description')}</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-background px-8 py-3 font-semibold text-primary transition-colors hover:bg-background/90"
            >
              {t('testimonials.cta.button')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
