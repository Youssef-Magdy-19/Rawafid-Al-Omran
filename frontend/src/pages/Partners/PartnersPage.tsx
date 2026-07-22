import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink, Building2 } from 'lucide-react';
import { usePartners } from '@hooks/usePartners';
import { useLanguage } from '@providers/LanguageProvider';
import { Button } from '@components/ui';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function PartnersPage() {
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const { data: partners, isLoading, error } = usePartners();

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
        <title>{t('partners.seo.title')} | Rawafid Al Omran</title>
        <meta name="description" content={t('partners.seo.description')} />
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
              {t('partners.hero.title')}
            </h1>
            <p className="text-lg text-muted-foreground">{t('partners.hero.description')}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          {partners && partners.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {partners.map((partner) => {
                const name = language === 'ar' ? partner.nameAr || partner.name : partner.name;
                const description = language === 'ar' ? undefined : partner.description;
                return (
                  <motion.div
                    key={partner._id}
                    variants={itemVariants}
                    className="group rounded-2xl bg-background p-8 shadow-sm transition-all hover:shadow-lg border border-border/50"
                  >
                    <div className="mb-6 flex h-24 items-center justify-center">
                      {partner.logo ? (
                        <img
                          src={partner.logo}
                          alt={name}
                          className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
                          <Building2 className="h-10 w-10 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <h3 className="mb-2 text-center text-lg font-bold text-foreground">{name}</h3>
                    {description && (
                      <p className="mb-4 text-center text-sm text-muted-foreground line-clamp-2">{description}</p>
                    )}
                    {partner.website && (
                      <div className="text-center">
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 ${isRTL ? 'flex-row-reverse' : ''}`}
                        >
                          {t('common.visitWebsite')}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <Building2 className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">{t('partners.empty.title')}</h3>
              <p className="text-muted-foreground">{t('partners.empty.description')}</p>
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
            <h2 className="mb-4 text-3xl font-bold text-primary-foreground lg:text-4xl">{t('partners.cta.title')}</h2>
            <p className="mb-8 text-lg text-primary-foreground/80">{t('partners.cta.description')}</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-background px-8 py-3 font-semibold text-primary transition-colors hover:bg-background/90"
            >
              {t('partners.cta.button')}
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
