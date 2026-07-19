import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, User, ArrowLeft, Share2, Twitter, Linkedin, Facebook } from 'lucide-react';
import { PageHeader, Badge, Image } from '@components';
import { useLanguage } from '@providers/LanguageProvider';

const mockBlogPosts: Record<string, { id: string; title: string; excerpt: string; content: string; author: string; date: string; image: string; category: string; tags: string[] }> = {
  '1': {
    id: '1',
    title: 'The Future of Web Development in 2024',
    excerpt: 'Explore the latest trends and technologies shaping the future of web development.',
    content: `
      <p>Web development continues to evolve at a rapid pace, with new technologies and frameworks emerging every year. In this article, we'll explore the key trends that are shaping the future of web development.</p>
      
      <h2>1. Server Components and the Rise of Full-Stack Frameworks</h2>
      <p>React Server Components, Next.js, and similar frameworks are changing how we think about building web applications. By moving rendering to the server, we can achieve better performance and SEO while maintaining the developer experience of React.</p>
      
      <h2>2. TypeScript Becomes the Standard</h2>
      <p>TypeScript has become the de facto standard for building robust web applications. Its type system helps catch errors early and improves code maintainability, making it essential for large-scale applications.</p>
      
      <h2>3. Edge Computing and Global Deployments</h2>
      <p>Edge computing is revolutionizing how we deploy web applications. By running code closer to users, we can achieve faster response times and better performance worldwide.</p>
      
      <h2>4. AI-Powered Development Tools</h2>
      <p>AI assistants are becoming integral to the development workflow, helping developers write code faster and with fewer errors. Tools like GitHub Copilot are just the beginning.</p>
      
      <h2>Conclusion</h2>
      <p>The web development landscape is constantly changing. Staying updated with the latest trends and best practices is essential for building modern, performant, and user-friendly applications.</p>
    `,
    author: 'Ahmed Hassan',
    date: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
    category: 'Technology',
    tags: ['Web Development', 'React', 'TypeScript'],
  },
  '2': {
    id: '2',
    title: 'Building Scalable Applications with Modern Tools',
    excerpt: 'Learn how to build applications that can grow with your business needs.',
    content: `
      <p>Scalability is a critical aspect of modern application development. In this article, we'll explore strategies for building applications that can handle growth and increased demand.</p>
      
      <h2>Understanding Scalability</h2>
      <p>Scalability refers to an application's ability to handle increased load without compromising performance. There are two main types: vertical scaling (adding more power to existing machines) and horizontal scaling (adding more machines).</p>
      
      <h2>Microservices Architecture</h2>
      <p>Breaking down applications into smaller, independent services allows for better scalability and maintainability. Each service can be scaled independently based on its specific needs.</p>
      
      <h2>Database Optimization</h2>
      <p>Database performance is often the bottleneck in scalable applications. Implementing proper indexing, caching, and using the right database for your use case are essential strategies.</p>
      
      <h2>Conclusion</h2>
      <p>Building scalable applications requires careful planning and the right architectural decisions. By following these principles, you can create applications that grow with your business.</p>
    `,
    author: 'Sarah Johnson',
    date: '2024-01-10',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
    category: 'Development',
    tags: ['Architecture', 'Scalability', 'Best Practices'],
  },
};

export function BlogDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  const post = id ? mockBlogPosts[id] : null;

  if (!post) {
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

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  const handleShare = (platform: string) => {
    const text = post.title;
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
        title={post.title}
        description={post.excerpt}
        breadcrumbs={[
          { label: t('nav.blog') || 'Blog', href: '/blog' },
          { label: post.title },
        ]}
        backgroundImage={post.image}
        variant="default"
      />

      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Meta Info */}
          <div className={`flex flex-wrap items-center gap-6 mb-8 ${isRTL ? 'justify-end' : ''}`}>
            <div className={`flex items-center gap-2 text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <User className="h-5 w-5" />
              <span>{post.author}</span>
            </div>
            <div className={`flex items-center gap-2 text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Calendar className="h-5 w-5" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <Badge variant="primary">{post.category}</Badge>
          </div>

          {/* Featured Image */}
          <div className="mb-8 rounded-xl overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              aspectRatio="video"
              className="w-full"
            />
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className={`flex flex-wrap gap-2 mb-8 ${isRTL ? 'justify-end' : ''}`}>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" size="sm">
                {tag}
              </Badge>
            ))}
          </div>

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