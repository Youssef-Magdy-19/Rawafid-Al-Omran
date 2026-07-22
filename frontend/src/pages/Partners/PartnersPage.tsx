import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Building2, ExternalLink, Handshake } from 'lucide-react';
import { usePartners } from '@hooks/usePartners';
import { useLanguage } from '@providers/LanguageProvider';
import { Button } from '@components/ui';
import { Skeleton } from '@components/Skeleton';
import { ErrorState } from '@components/ErrorState';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function PartnerLogoSkeleton() {
  return (
    <div className="premium-card p-8">
      <Skeleton className="mx-auto mb-6 h-24 w-48" variant="rectangular" />
      <Skeleton className="mx-auto mb-2 h-5 w-32" variant="text" />
      <Skeleton className="mx-auto h-4 w-24" variant="text" />
    </div>
  );
}

export function PartnersPage() {
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const { data: partners, isLoading, error, refetch } = usePartners();

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>{t('partners.seo.title')} | Rawafid Al Omran</title>
          <meta name="description" content={t('partners.seo.description')} />
        </Helmet>
        <section className="section-gradient relative overflow-hidden py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <Skeleton className="mx-auto mb-4 h-4 w-32" variant="text" />
              <Skeleton className="mx-auto mb-6 h-12 w-72" variant="text" />
              <Skeleton className="mx-auto h-5 w-96" variant="text" />
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <PartnerLogoSkeleton key={i} />
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
          <title>{t('partners.seo.title')} | Rawafid Al Omran</title>
          <meta name="description" content={t('partners.seo.description')} />
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

  return (
    <>
      <Helmet>
        <title>{t('partners.seo.title')} | Rawafid Al Omran</title>
        <meta name="description" content={t('partners.seo.description')} />
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
              {t('company.shortName')}
            </span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              {t('partners.hero.title')}
            </h1>
            <p className="text-lg text-muted-foreground lg:text-xl">
              {t('partners.hero.description')}
            </p>
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
              viewport={{ once: true, margin: '-50px' }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {partners.map((partner) => {
                const name = language === 'ar' ? partner.nameAr || partner.name : partner.name;
                return (
                  <motion.div
                    key={partner._id}
                    variants={itemVariants}
                    className="premium-card group flex flex-col items-center p-8 text-center"
                  >
                    <div className="mb-6 flex h-28 w-full items-center justify-center">
                      {partner.logo ? (
                        <img
                          src={partner.logo}
                          alt={name}
                          className="max-h-full max-w-full object-contain transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-muted">
                          <Building2 className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <h3 className="mb-1 text-lg font-bold text-foreground">{name}</h3>
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-primary transition-colors hover:text-primary/80 ${isRTL ? 'flex-row-reverse' : ''}`}
                      >
                        {t('common.visitWebsite')}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-20 text-center"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
                <Handshake className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">{t('partners.empty.title')}</h3>
              <p className="text-muted-foreground">{t('partners.empty.description')}</p>
            </motion.div>
          )}
        </div>
      </section>

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
              {t('partners.cta.title')}
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              {t('partners.cta.description')}
            </p>
            <Link to="/contact">
              <Button size="lg" rightIcon={<ExternalLink className="h-4 w-4" />}>
                {t('partners.cta.button')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}