import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { PageHeader, SearchBox, Pagination, Badge, Image } from '@components';
import { useLanguage } from '@providers/LanguageProvider';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
}

const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Web Development in 2024',
    excerpt: 'Explore the latest trends and technologies shaping the future of web development.',
    content: '',
    author: 'Ahmed Hassan',
    date: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    category: 'Technology',
    tags: ['Web Development', 'React', 'TypeScript'],
  },
  {
    id: '2',
    title: 'Building Scalable Applications with Modern Tools',
    excerpt: 'Learn how to build applications that can grow with your business needs.',
    content: '',
    author: 'Sarah Johnson',
    date: '2024-01-10',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    category: 'Development',
    tags: ['Architecture', 'Scalability', 'Best Practices'],
  },
  {
    id: '3',
    title: 'UI/UX Design Principles for Modern Apps',
    excerpt: 'Discover the key principles of creating beautiful and functional user interfaces.',
    content: '',
    author: 'Mohamed Ali',
    date: '2024-01-05',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    category: 'Design',
    tags: ['UI/UX', 'Design Systems', 'User Experience'],
  },
  {
    id: '4',
    title: 'Cloud Computing Best Practices',
    excerpt: 'Essential strategies for optimizing your cloud infrastructure.',
    content: '',
    author: 'Fatima Zahra',
    date: '2024-01-01',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    category: 'Cloud',
    tags: ['AWS', 'Azure', 'Cloud Architecture'],
  },
  {
    id: '5',
    title: 'Mobile App Development Trends',
    excerpt: 'Stay ahead with the latest mobile development frameworks and approaches.',
    content: '',
    author: 'Youssef Ibrahim',
    date: '2023-12-28',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    category: 'Mobile',
    tags: ['React Native', 'Flutter', 'iOS', 'Android'],
  },
  {
    id: '6',
    title: 'Cybersecurity in the Digital Age',
    excerpt: 'Protecting your applications and data from modern threats.',
    content: '',
    author: 'Nadia Mansour',
    date: '2023-12-20',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
    category: 'Security',
    tags: ['Cybersecurity', 'DevSecOps', 'Best Practices'],
  },
];

const ITEMS_PER_PAGE = 6;

export function BlogPage() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = Array.from(new Set(mockBlogPosts.map((post) => post.category)));

  const filteredPosts = mockBlogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <PageHeader
        title={t('blog.title') || 'Our Blog'}
        description={t('blog.subtitle') || 'Insights, tutorials, and news from our team'}
        variant="centered"
      />

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          <div className="max-w-xl mx-auto">
            <SearchBox
              onSearch={handleSearch}
              placeholder={t('blog.search') || 'Search articles...'}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedCategory
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t('blog.all') || 'All'}
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={`/blog/${post.id}`}>
                <Image
                  src={post.image}
                  alt={post.title}
                  aspectRatio="video"
                  className="w-full"
                />
              </Link>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="primary" size="sm">
                    {post.category}
                  </Badge>
                  <div className={`flex items-center gap-1 text-sm text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <Link to={`/blog/${post.id}`}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary-500 transition-colors">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-2 text-sm text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <Link
                    to={`/blog/${post.id}`}
                    className={`flex items-center gap-1 text-sm font-medium text-primary-500 hover:text-primary-600 ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    {t('blog.readMore') || 'Read More'}
                    <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}