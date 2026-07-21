import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Star, Power } from 'lucide-react';
import { ImageUpload, Dropdown } from '@components/ui';
import type { Blog } from '@services/api/types';
import type { ApiFieldErrors } from '@utils/api';
import { useAuthStore } from '@store/authStore';

export interface BlogFormData {
  titleAr: string;
  titleEn: string;
  slug: string;
  contentAr: string;
  contentEn: string;
  excerptAr: string;
  excerptEn: string;
  category: string;
  categoryAr: string;
  tags: string;
  isFeatured: boolean;
  isPublished: boolean;
  image: string;
  thumbnail: string;
  author: string;
  authorAr: string;
  publishedAt: string;
}

interface BlogFormProps {
  initialData?: Blog;
  onSubmit: (data: Record<string, unknown>) => void;
  isSubmitting: boolean;
  serverErrors?: ApiFieldErrors;
}

export function BlogForm({ initialData, onSubmit, isSubmitting, serverErrors = {} }: BlogFormProps) {
  const { t } = useTranslation();

  const [form, setForm] = useState<BlogFormData>({
    titleAr: initialData?.titleAr || '',
    titleEn: initialData?.title || '',
    slug: initialData?.slug || '',
    contentAr: initialData?.contentAr || '',
    contentEn: initialData?.content || '',
    excerptAr: initialData?.excerptAr || '',
    excerptEn: initialData?.excerpt || '',
    category: initialData?.category || '',
    categoryAr: (initialData as any)?.categoryAr || '',
    tags: initialData?.tags?.join(', ') || '',
    isFeatured: initialData?.isFeatured || false,
    isPublished: initialData?.isPublished ?? true,
    image: (initialData as any)?.image || '',
    thumbnail: (initialData as any)?.thumbnail || '',
    author: initialData?.author || useAuthStore.getState().user?.firstName + ' ' + useAuthStore.getState().user?.lastName || '',
    authorAr: (initialData as any)?.authorAr || '',
    publishedAt: initialData?.publishedAt || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (Object.keys(serverErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...serverErrors }));
    }
  }, [serverErrors]);

  const updateField = (field: keyof BlogFormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const autoGenerateSlug = () => {
    const slug = form.titleEn.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '');
    updateField('slug', slug);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.titleAr.trim()) newErrors.titleAr = t('dashboard.addBlogPost.validation.titleArRequired');
    if (!form.titleEn.trim()) newErrors.titleEn = t('dashboard.addBlogPost.validation.titleEnRequired');
    if (!form.contentAr.trim()) newErrors.contentAr = t('dashboard.addBlogPost.validation.contentArRequired');
    if (!form.contentEn.trim()) newErrors.contentEn = t('dashboard.addBlogPost.validation.contentEnRequired');
    if (!form.slug.trim()) newErrors.slug = t('dashboard.addBlogPost.validation.slugRequired');
    if (!form.category) newErrors.category = t('dashboard.addBlogPost.validation.categoryRequired');
    if (!form.categoryAr) newErrors.categoryAr = t('dashboard.addBlogPost.validation.categoryArRequired');
    if (!form.author.trim()) newErrors.author = t('dashboard.addBlogPost.validation.authorRequired');
    if (!form.authorAr.trim()) newErrors.authorAr = t('dashboard.addBlogPost.validation.authorArRequired');
    if (!form.image.trim()) newErrors.image = t('dashboard.addBlogPost.validation.imageRequired');
    if (!form.thumbnail.trim()) newErrors.thumbnail = t('dashboard.addBlogPost.validation.thumbnailRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const tags = form.tags.split(',').map((s) => s.trim()).filter(Boolean);

    const payload: Record<string, unknown> = {
      title: form.titleEn,
      titleAr: form.titleAr,
      slug: form.slug,
      content: form.contentEn,
      contentAr: form.contentAr,
      excerpt: form.excerptEn || form.contentEn.slice(0, 200),
      excerptAr: form.excerptAr || form.contentAr.slice(0, 200),
      category: form.category,
      categoryAr: form.categoryAr,
      tags,
      isPublished: form.isPublished,
      isFeatured: form.isFeatured,
      author: form.author,
      authorAr: form.authorAr,
      image: form.image,
      thumbnail: form.thumbnail,
      publishedAt: form.publishedAt || new Date().toISOString(),
    };

    onSubmit(payload);
  };

  const fieldClass = (name: string) =>
    `w-full h-11 px-4 rounded-lg border text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
      errors[name] ? 'border-destructive focus:ring-destructive' : 'border-input'
    }`;

  const textareaClass = (name: string) =>
    `w-full min-h-[120px] px-4 py-3 rounded-lg border text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-y ${
      errors[name] ? 'border-destructive focus:ring-destructive' : 'border-input'
    }`;

  const categories = [
    'constructionNews', 'industryInsights', 'projectUpdates', 'safetyTips', 'companyNews',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addBlogPost.basicInfo')}</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addBlogPost.titleAr')} <span className="text-destructive">*</span></label>
            <input value={form.titleAr} onChange={(e) => updateField('titleAr', e.target.value)} placeholder={t('dashboard.addBlogPost.titleArPlaceholder')} className={fieldClass('titleAr')} />
            {errors.titleAr && <p className="mt-1 text-xs text-destructive">{errors.titleAr}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addBlogPost.titleEn')} <span className="text-destructive">*</span></label>
            <input value={form.titleEn} onChange={(e) => updateField('titleEn', e.target.value)} placeholder={t('dashboard.addBlogPost.titleEnPlaceholder')} className={fieldClass('titleEn')} />
            {errors.titleEn && <p className="mt-1 text-xs text-destructive">{errors.titleEn}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addBlogPost.excerptAr')}</label>
            <textarea value={form.excerptAr} onChange={(e) => updateField('excerptAr', e.target.value)} placeholder={t('dashboard.addBlogPost.excerptArPlaceholder')} className={textareaClass('excerptAr')} rows={3} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addBlogPost.excerptEn')}</label>
            <textarea value={form.excerptEn} onChange={(e) => updateField('excerptEn', e.target.value)} placeholder={t('dashboard.addBlogPost.excerptEnPlaceholder')} className={textareaClass('excerptEn')} rows={3} />
          </div>
          <div className="lg:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addBlogPost.contentAr')} <span className="text-destructive">*</span></label>
            <textarea value={form.contentAr} onChange={(e) => updateField('contentAr', e.target.value)} placeholder={t('dashboard.addBlogPost.contentArPlaceholder')} className={textareaClass('contentAr')} rows={8} />
            {errors.contentAr && <p className="mt-1 text-xs text-destructive">{errors.contentAr}</p>}
          </div>
          <div className="lg:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addBlogPost.contentEn')} <span className="text-destructive">*</span></label>
            <textarea value={form.contentEn} onChange={(e) => updateField('contentEn', e.target.value)} placeholder={t('dashboard.addBlogPost.contentEnPlaceholder')} className={textareaClass('contentEn')} rows={8} />
            {errors.contentEn && <p className="mt-1 text-xs text-destructive">{errors.contentEn}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addBlogPost.slug')} <span className="text-destructive">*</span></label>
            <div className="flex gap-2">
              <input value={form.slug} onChange={(e) => updateField('slug', e.target.value)} placeholder={t('dashboard.addBlogPost.slugPlaceholder')} className={`${fieldClass('slug')} flex-1`} />
              <button type="button" onClick={autoGenerateSlug} className="shrink-0 h-11 px-3 rounded-lg border border-border text-xs text-muted-foreground hover:bg-muted transition-colors" title={t('dashboard.addBlogPost.slugAutoGenerate')}>
                <Globe className="h-4 w-4" />
              </button>
            </div>
            {errors.slug && <p className="mt-1 text-xs text-destructive">{errors.slug}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Dropdown
                label={t('dashboard.addBlogPost.category')}
                value={form.category}
                onChange={(val) => updateField('category', val)}
                placeholder={t('dashboard.addBlogPost.categoryPlaceholder')}
                options={categories.map((cat) => ({ value: cat, label: t(`dashboard.blogPostDetails.${cat}`) }))}
                className="w-full"
                error={errors.category}
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addBlogPost.categoryAr')} <span className="text-destructive">*</span></label>
              <input value={form.categoryAr} onChange={(e) => updateField('categoryAr', e.target.value)} placeholder={t('dashboard.addBlogPost.categoryArPlaceholder')} className={fieldClass('categoryAr')} />
              {errors.categoryAr && <p className="mt-1 text-xs text-destructive">{errors.categoryAr}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addBlogPost.author')} <span className="text-destructive">*</span></label>
              <input value={form.author} onChange={(e) => updateField('author', e.target.value)} placeholder={t('dashboard.addBlogPost.authorPlaceholder')} className={fieldClass('author')} />
              {errors.author && <p className="mt-1 text-xs text-destructive">{errors.author}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addBlogPost.authorAr')} <span className="text-destructive">*</span></label>
              <input value={form.authorAr} onChange={(e) => updateField('authorAr', e.target.value)} placeholder={t('dashboard.addBlogPost.authorArPlaceholder')} className={fieldClass('authorAr')} />
              {errors.authorAr && <p className="mt-1 text-xs text-destructive">{errors.authorAr}</p>}
            </div>
          </div>
          <div className="lg:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addBlogPost.publishedAt')}</label>
            <input type="date" value={form.publishedAt} onChange={(e) => updateField('publishedAt', e.target.value)} className={fieldClass('publishedAt')} />
          </div>
          <div className="lg:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addBlogPost.tags')}</label>
            <input value={form.tags} onChange={(e) => updateField('tags', e.target.value)} placeholder={t('dashboard.addBlogPost.tagsPlaceholder')} className={fieldClass('tags')} />
            <p className="mt-1 text-xs text-muted-foreground">{t('dashboard.addBlogPost.tagsHint')}</p>
          </div>
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => updateField('isFeatured', !form.isFeatured)}
              className={`flex items-center gap-2 h-11 px-4 rounded-lg border text-sm font-medium transition-colors ${form.isFeatured ? 'border-secondary bg-secondary/10 text-secondary' : 'border-border text-muted-foreground hover:bg-muted'}`}>
              <Star className={`h-4 w-4 ${form.isFeatured ? 'fill-secondary' : ''}`} />
              {t('dashboard.addBlogPost.featured')}
            </button>
            <button type="button" onClick={() => updateField('isPublished', !form.isPublished)}
              className={`flex items-center gap-2 h-11 px-4 rounded-lg border text-sm font-medium transition-colors ${form.isPublished ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600' : 'border-border text-muted-foreground hover:bg-muted'}`}>
              <Power className="h-4 w-4" />
              {form.isPublished ? t('dashboard.addBlogPost.published') : t('dashboard.addBlogPost.draft')}
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addBlogPost.images')}</h3>
        <ImageUpload
          value={form.image}
          onChange={(url) => updateField('image', url)}
          label={t('dashboard.addBlogPost.image')}
        />
        <ImageUpload
          value={form.thumbnail}
          onChange={(url) => updateField('thumbnail', url)}
          label={t('dashboard.addBlogPost.thumbnail')}
        />
      </div>

      <div className="flex items-center justify-end gap-3">
        <button type="button" onClick={() => window.history.back()}
          className="h-11 px-6 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
          {t('dashboard.addBlogPost.cancel')}
        </button>
        <button type="submit" disabled={isSubmitting}
          className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? t('dashboard.addBlogPost.saving') : t('dashboard.addBlogPost.save')}
        </button>
      </div>
    </form>
  );
}
