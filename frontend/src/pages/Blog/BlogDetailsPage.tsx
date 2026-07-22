import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, User, ArrowLeft, Share2, Twitter, Linkedin, Facebook, Loader2 } from 'lucide-react';
import { PageHeader, Badge, Image } from '@components';
import { useLanguage } from '@providers/LanguageProvider';
import { useBlog } from '@hooks/useBlogs';

export function BlogDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const { data: post, isLoading, error } = useBlog(slug || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (!post || error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
            Back to Blog
          </Link>
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
    const text = title;
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    };
    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={title}
        description={excerpt}
        breadcrumbs={[
          { label: t('nav.blog') || 'Blog', href: '/blog' },
          { label: title },
        ]}
        backgroundImage={coverImage}
        variant="default"
      />

      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Meta Info */}
          <div className={`flex flex-wrap items-center gap-6 mb-8 ${isRTL ? 'justify-end' : ''}`}>
            {author && (
              <div className={`flex items-center gap-2 text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <User className="h-5 w-5" />
                <span>{author}</span>
              </div>
            )}
            {date && (
              <div className={`flex items-center gap-2 text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Calendar className="h-5 w-5" />
                <span>{new Date(date).toLocaleDateString()}</span>
              </div>
            )}
            {category && <Badge variant="primary">{category}</Badge>}
          </div>

          {/* Featured Image */}
          {coverImage && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src={coverImage}
                alt={title}
                aspectRatio="video"
                className="w-full"
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Tags */}
          {tags.length > 0 && (
            <div className={`flex flex-wrap gap-2 mb-8 ${isRTL ? 'justify-end' : ''}`}>
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Share */}
          <div className={`flex items-center gap-4 py-6 border-t border-b border-gray-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-2 text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Share2 className="h-5 w-5" />
              <span className="font-medium">{t('blog.share') || 'Share'}</span>
            </div>
            <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={() => handleShare('twitter')}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Share on Facebook"
              >
                <Facebook className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-8">
            <Link
              to="/blog"
              className={`inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
              {t('blog.backToBlog') || 'Back to Blog'}
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
