import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2, Twitter, Linkedin, Facebook, BookOpen, RefreshCw } from 'lucide-react';
import { Badge, Image, Breadcrumb, CTABanner } from '@components';
import { useLanguage } from '@providers/LanguageProvider';
import { useBlog, useBlogs } from '@hooks/useBlogs';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

export function BlogDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const { data: post, isLoading, error, refetch } = useBlog(slug || '');
  const { data: allPosts = [] } = useBlogs();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 h-12 w-48 rounded-lg bg-muted animate-pulse" />
            <div className="mb-8 aspect-video w-full rounded-2xl bg-muted animate-pulse" />
            <div className="space-y-4">
              <div className="h-10 w-3/4 rounded-lg bg-muted animate-pulse" />
              <div className="h-4 w-1/2 rounded bg-muted animate-pulse" />
              <div className="h-4 w-full rounded bg-muted animate-pulse" />
              <div className="h-4 w-full rounded bg-muted animate-pulse" />
              <div className="h-4 w-2/3 rounded bg-muted animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post || error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="premium-glass rounded-2xl p-12 text-center max-w-md mx-4">
          <BookOpen className="mx-auto mb-4 h-14 w-14 text-muted-foreground/30" />
          <h2 className="text-2xl font-bold text-foreground mb-2">{t('blog.notFound')}</h2>
          <p className="text-muted-foreground mb-6">{t('blog.notFoundMessage')}</p>
          {error ? (
            <button onClick={() => refetch()} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 shadow-lg shadow-primary/20">
              <RefreshCw className="h-4 w-4" />{t('blog.retry')}
            </button>
          ) : (
            <Link to="/blog" className={`inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />{t('blog.backToBlog')}
            </Link>
          )}
        </div>
      </div>
    );
  }

  const title = language === 'ar' ? post.titleAr : post.title;
  const excerpt = language === 'ar' ? post.excerptAr || post.excerpt : post.excerpt;
  const content = language === 'ar' ? post.contentAr : post.content;
  const category = post.category;
  const author = post.author;
  const date = post.publishedAt || post.createdAt;
  const tags = post.tags || [];
  const coverImage = post.coverImage;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = (platform: string) => {
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    };
    if (urls[platform]) window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  const related = allPosts
    .filter((p) => p.id !== post.id && (p.category === post.category || p.tags?.some((t) => post.tags?.includes(t))))
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{title} | Rawafid Al Omran</title>
        <meta name="description" content={excerpt} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={excerpt} />
        {coverImage && <meta property="og:image" content={coverImage} />}
      </Helmet>

      {/* Hero with Image Overlay */}
      <section className="relative min-h-[50vh] lg:min-h-[60vh] flex items-end">
        <div className="absolute inset-0">
          <Image src={coverImage || ''} alt={title} aspectRatio="auto" className="absolute inset-0 w-full h-full" objectFit="cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        </div>
        <div className="container relative z-10 mx-auto px-4 lg:px-8 pb-12 lg:pb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mx-auto max-w-4xl">
            <Breadcrumb items={[
              { label: t('navigation.home'), href: '/' },
              { label: t('navigation.blog'), href: '/blog' },
              { label: title },
            ]} />
            <div className={`flex flex-wrap items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {category && <Badge variant="primary" size="lg">{category}</Badge>}
              {date && (
                <span className={`flex items-center gap-1.5 text-sm text-muted-foreground/80 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Calendar className="h-4 w-4" />{new Date(date).toLocaleDateString()}
                </span>
              )}
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground lg:text-4xl xl:text-5xl leading-tight">{title}</h1>
            {author && (
              <span className={`inline-flex items-center gap-2 text-sm text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                <User className="h-4 w-4" />{author}
              </span>
            )}
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <article className="bg-background py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <motion.div {...fadeUp} className="prose prose-lg max-w-none text-foreground mb-10 [&_h2]:text-foreground [&_h3]:text-foreground [&_p]:text-muted-foreground [&_li]:text-muted-foreground [&_blockquote]:border-primary [&_blockquote]:text-foreground [&_a]:text-primary [&_a]:no-underline [&_a]:font-medium"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Tags */}
            {tags.length > 0 && (
              <motion.div {...fadeUp} className={`flex flex-wrap gap-2 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {tags.map((tag) => (<Badge key={tag} variant="secondary" size="sm">{tag}</Badge>))}
              </motion.div>
            )}

            {/* Share */}
            <motion.div {...fadeUp} className={`flex items-center gap-6 border-y border-border py-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className={`flex items-center gap-2 text-sm font-medium text-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Share2 className="h-4 w-4" />{t('blog.share')}
              </span>
              <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {[
                  { key: 'twitter', icon: Twitter, label: 'Twitter' },
                  { key: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
                  { key: 'facebook', icon: Facebook, label: 'Facebook' },
                ].map(({ key, icon: Icon, label }) => (
                  <button key={key} onClick={() => handleShare(key)} className="rounded-xl bg-muted p-2.5 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200" aria-label={`${t('blog.share')} ${label}`}>
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Back Link */}
            <motion.div {...fadeUp} className="mt-8">
              <Link to="/blog" className={`inline-flex items-center gap-2 font-medium text-primary hover:text-primary/80 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                <ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />{t('blog.backToBlog')}
              </Link>
            </motion.div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="section-gradient-alt py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
              <span className="premium-subtitle justify-center mb-3">{t('blog.subtitle')}</span>
              <h2 className="text-2xl font-bold text-foreground lg:text-3xl">{t('blog.title')}</h2>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <motion.article key={p.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="premium-card group overflow-hidden flex flex-col">
                  <Link to={`/blog/${p.slug}`} className="block overflow-hidden">
                    <Image src={p.coverImage || ''} alt={language === 'ar' ? p.titleAr : p.title} aspectRatio="video" className="w-full group-hover:scale-105 transition-transform duration-500" />
                  </Link>
                  <div className="p-5 flex flex-col flex-1">
                    <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {p.category && <Badge variant="primary" size="sm">{p.category}</Badge>}
                      <span className="text-xs text-muted-foreground">{formatDate(p)}</span>
                    </div>
                    <Link to={`/blog/${p.slug}`}>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{language === 'ar' ? p.titleAr : p.title}</h3>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <CTABanner
        title={t('cta.title')}
        description={t('cta.description')}
        buttonText={t('cta.button')}
        buttonLink="/contact"
        variant="accent"
      />
    </>
  );
}

function formatDate(post: { publishedAt?: string; createdAt?: string }) {
  const d = post.publishedAt || post.createdAt;
  return d ? new Date(d).toLocaleDateString() : '';
}
