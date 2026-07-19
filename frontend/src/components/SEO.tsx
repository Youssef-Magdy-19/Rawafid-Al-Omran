import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@providers/LanguageProvider';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonical?: string;
}

export function SEO({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  canonical,
}: SEOProps) {
  const { language } = useLanguage();
  const baseUrl = 'https://rawafid-alomran.com';
  const fullTitle = `${title} | Rawafid Al Omran`;
  const defaultOgImage = `${baseUrl}/og-image.jpg`;

  return (
    <Helmet>
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage || defaultOgImage} />
      <meta property="og:locale" content={language === 'ar' ? 'ar_SA' : 'en_US'} />
      {canonical && <meta property="og:url" content={canonical} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || defaultOgImage} />
      
      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
}