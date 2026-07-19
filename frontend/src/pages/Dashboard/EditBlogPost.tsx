import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '@constants/route.constants';
import { mockBlogPosts } from '@data/blogMockData';
import { BlogForm, type BlogFormData } from './BlogForm';

export function EditBlogPost() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const post = useMemo(() => mockBlogPosts.find((p) => p.id === id), [id]);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-medium text-foreground">Blog post not found</p>
        <button
          onClick={() => navigate(ROUTES.DASHBOARD_BLOG)}
          className="mt-4 text-sm text-primary hover:underline"
        >
          {t('dashboard.blog.pageTitle')}
        </button>
      </div>
    );
  }

  const handleSubmit = (_data: BlogFormData) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate(ROUTES.DASHBOARD_BLOG);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-foreground">{t('dashboard.editBlogPost.pageTitle')}</h1>
        <p className="text-muted-foreground mt-1">{t('dashboard.editBlogPost.pageDescription')}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <BlogForm initialData={post} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </motion.div>
    </div>
  );
}
