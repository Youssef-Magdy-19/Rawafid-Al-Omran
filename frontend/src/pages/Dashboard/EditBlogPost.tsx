import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { ROUTES } from '@constants/route.constants';
import { useBlog, useUpdateBlog } from '@hooks/dashboard';
import { useToast } from '@providers/ToastProvider';
import { parseApiFieldErrors } from '@utils/api';
import { BlogForm } from './BlogForm';

export function EditBlogPost() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: blog, isLoading, isError, error } = useBlog(id || '');
  const updateBlog = useUpdateBlog();
  const { addToast } = useToast();
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  const handleSubmit = (data: Record<string, unknown>) => {
    if (!blog?.id) return;
    setServerErrors({});
    updateBlog.mutate(
      { id: blog.id, data },
      {
        onSuccess: () => {
          addToast(t('dashboard.editBlogPost.updatedSuccess'), 'success');
          navigate(ROUTES.DASHBOARD_BLOG);
        },
        onError: (error) => {
          const parsed = parseApiFieldErrors(error);
          setServerErrors(parsed);
          if (!Object.keys(parsed).length) {
            addToast(t('common.error'), 'error');
          }
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">{t('common.loading')}</p>
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <h2 className="text-lg font-semibold text-foreground">{t('common.error')}</h2>
        <p className="text-sm text-muted-foreground">{(error as Error)?.message || t('common.loadError')}</p>
        <button onClick={() => navigate(ROUTES.DASHBOARD_BLOG)}
          className="h-10 px-5 rounded-xl bg-primary text-primary-foreground font-medium text-sm shadow-lg shadow-primary/25 hover:bg-primary-dark transition-all duration-300">
          {t('common.goBack')}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <button onClick={() => navigate(ROUTES.DASHBOARD_BLOG)}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="h-4 w-4" />{t('dashboard.blog.pageTitle')}
        </button>
        <h1 className="text-2xl font-bold text-foreground">{t('dashboard.editBlogPost.pageTitle')}</h1>
        <p className="text-muted-foreground mt-1">{t('dashboard.editBlogPost.pageDescription')}</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        <BlogForm initialData={blog} onSubmit={handleSubmit} isSubmitting={updateBlog.isPending} serverErrors={serverErrors} />
      </motion.div>
    </div>
  );
}
