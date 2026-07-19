import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Upload,
  X,
  ImagePlus,
  Globe,
  Star,
  Power,
  Bold,
  Italic,
  Underline,
  Heading1,
  List,
  ListOrdered,
  Quote,
  Code,
} from 'lucide-react';
import { type BlogPost, blogCategoryLabels, blogAuthorLabels } from '@data/blogMockData';

export interface BlogFormData {
  titleAr: string;
  titleEn: string;
  shortDescriptionAr: string;
  shortDescriptionEn: string;
  fullContentAr: string;
  fullContentEn: string;
  slug: string;
  category: string;
  author: string;
  readingTime: number;
  featured: boolean;
  published: boolean;
  coverImage: string;
  galleryImages: string[];
  tags: string;
  publishDate: string;
  seoTitleAr: string;
  seoTitleEn: string;
  seoDescriptionAr: string;
  seoDescriptionEn: string;
  seoKeywords: string;
}

interface BlogFormProps {
  initialData?: BlogPost;
  onSubmit: (data: BlogFormData) => void;
  isSubmitting: boolean;
}

export function BlogForm({ initialData, onSubmit, isSubmitting }: BlogFormProps) {
  const { t } = useTranslation();

  const [form, setForm] = useState<BlogFormData>({
    titleAr: initialData?.titleAr || '',
    titleEn: initialData?.titleEn || '',
    shortDescriptionAr: initialData?.shortDescriptionAr || '',
    shortDescriptionEn: initialData?.shortDescriptionEn || '',
    fullContentAr: initialData?.fullContentAr || '',
    fullContentEn: initialData?.fullContentEn || '',
    slug: initialData?.slug || '',
    category: initialData?.category || '',
    author: initialData?.author || 'admin',
    readingTime: initialData?.readingTime || 5,
    featured: initialData?.featured || false,
    published: initialData?.published ?? true,
    coverImage: initialData?.coverImage || '',
    galleryImages: initialData?.galleryImages || [],
    tags: initialData?.tags || '',
    publishDate: initialData?.publishDate || '',
    seoTitleAr: initialData?.seo?.titleAr || '',
    seoTitleEn: initialData?.seo?.titleEn || '',
    seoDescriptionAr: initialData?.seo?.descriptionAr || '',
    seoDescriptionEn: initialData?.seo?.descriptionEn || '',
    seoKeywords: initialData?.seo?.keywords || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof BlogFormData, value: string | boolean | number | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const autoGenerateSlug = () => {
    const slug = form.titleEn
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');
    updateField('slug', slug);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.titleAr.trim()) newErrors.titleAr = t('dashboard.addBlogPost.validation.titleArRequired');
    if (!form.titleEn.trim()) newErrors.titleEn = t('dashboard.addBlogPost.validation.titleEnRequired');
    if (!form.slug.trim()) newErrors.slug = t('dashboard.addBlogPost.validation.slugRequired');
    if (!form.category) newErrors.category = t('dashboard.addBlogPost.validation.categoryRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
    }
  };

  const handleCoverUpload = () => {
    const url = prompt(t('dashboard.addBlogPost.coverImageDescription') || 'Enter image URL:');
    if (url) updateField('coverImage', url);
  };

  const handleGalleryUpload = () => {
    const url = prompt('Enter image URL for gallery:');
    if (url) updateField('galleryImages', [...form.galleryImages, url]);
  };

  const removeGalleryImage = (index: number) => {
    updateField('galleryImages', form.galleryImages.filter((_, i) => i !== index));
  };

  const fieldClass = (name: string) =>
    `w-full h-11 px-4 rounded-lg border text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
      errors[name] ? 'border-destructive focus:ring-destructive' : 'border-input'
    }`;

  const textareaClass = (name: string) =>
    `w-full min-h-[100px] px-4 py-3 rounded-lg border text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-y ${
      errors[name] ? 'border-destructive focus:ring-destructive' : 'border-input'
    }`;

  const categoryOptions = Object.entries(blogCategoryLabels);
  const authorOptions = Object.entries(blogAuthorLabels);

  const toolbarButton = (icon: React.ReactNode, label: string) => (
    <button
      type="button"
      className="h-9 w-9 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
      title={label}
    >
      {icon}
    </button>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addBlogPost.basicInfo')}</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-muted-foreground mb-4 pb-2 border-b border-border">{t('dashboard.addBlogPost.arabicInfo')}</h4>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addBlogPost.titleAr')} <span className="text-destructive">*</span>
            </label>
            <input
              value={form.titleAr}
              onChange={(e) => updateField('titleAr', e.target.value)}
              placeholder={t('dashboard.addBlogPost.titleArPlaceholder')}
              className={fieldClass('titleAr')}
            />
            {errors.titleAr && <p className="mt-1 text-xs text-destructive">{errors.titleAr}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addBlogPost.shortDescriptionAr')}
            </label>
            <textarea
              value={form.shortDescriptionAr}
              onChange={(e) => updateField('shortDescriptionAr', e.target.value)}
              placeholder={t('dashboard.addBlogPost.shortDescriptionArPlaceholder')}
              className={textareaClass('shortDescriptionAr')}
              rows={3}
            />
          </div>

          <div className="lg:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addBlogPost.fullContentAr')}
            </label>
            <div className="rounded-lg border border-input overflow-hidden">
              <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/50">
                {toolbarButton(<Bold className="h-4 w-4" />, t('dashboard.addBlogPost.bold'))}
                {toolbarButton(<Italic className="h-4 w-4" />, t('dashboard.addBlogPost.italic'))}
                {toolbarButton(<Underline className="h-4 w-4" />, t('dashboard.addBlogPost.underline'))}
                <div className="h-6 w-px bg-border mx-1" />
                {toolbarButton(<Heading1 className="h-4 w-4" />, t('dashboard.addBlogPost.heading'))}
                {toolbarButton(<List className="h-4 w-4" />, t('dashboard.addBlogPost.bulletList'))}
                {toolbarButton(<ListOrdered className="h-4 w-4" />, t('dashboard.addBlogPost.numberList'))}
                <div className="h-6 w-px bg-border mx-1" />
                {toolbarButton(<Quote className="h-4 w-4" />, t('dashboard.addBlogPost.quote'))}
                {toolbarButton(<Code className="h-4 w-4" />, t('dashboard.addBlogPost.code'))}
              </div>
              <textarea
                value={form.fullContentAr}
                onChange={(e) => updateField('fullContentAr', e.target.value)}
                placeholder={t('dashboard.addBlogPost.richTextPlaceholder')}
                className="w-full min-h-[250px] px-4 py-3 text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none resize-y border-0"
                rows={8}
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-muted-foreground mb-4 pb-2 border-b border-border">{t('dashboard.addBlogPost.englishInfo')}</h4>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addBlogPost.titleEn')} <span className="text-destructive">*</span>
            </label>
            <input
              value={form.titleEn}
              onChange={(e) => updateField('titleEn', e.target.value)}
              placeholder={t('dashboard.addBlogPost.titleEnPlaceholder')}
              className={fieldClass('titleEn')}
            />
            {errors.titleEn && <p className="mt-1 text-xs text-destructive">{errors.titleEn}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addBlogPost.shortDescriptionEn')}
            </label>
            <textarea
              value={form.shortDescriptionEn}
              onChange={(e) => updateField('shortDescriptionEn', e.target.value)}
              placeholder={t('dashboard.addBlogPost.shortDescriptionEnPlaceholder')}
              className={textareaClass('shortDescriptionEn')}
              rows={3}
            />
          </div>

          <div className="lg:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addBlogPost.fullContentEn')}
            </label>
            <div className="rounded-lg border border-input overflow-hidden">
              <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/50">
                {toolbarButton(<Bold className="h-4 w-4" />, t('dashboard.addBlogPost.bold'))}
                {toolbarButton(<Italic className="h-4 w-4" />, t('dashboard.addBlogPost.italic'))}
                {toolbarButton(<Underline className="h-4 w-4" />, t('dashboard.addBlogPost.underline'))}
                <div className="h-6 w-px bg-border mx-1" />
                {toolbarButton(<Heading1 className="h-4 w-4" />, t('dashboard.addBlogPost.heading'))}
                {toolbarButton(<List className="h-4 w-4" />, t('dashboard.addBlogPost.bulletList'))}
                {toolbarButton(<ListOrdered className="h-4 w-4" />, t('dashboard.addBlogPost.numberList'))}
                <div className="h-6 w-px bg-border mx-1" />
                {toolbarButton(<Quote className="h-4 w-4" />, t('dashboard.addBlogPost.quote'))}
                {toolbarButton(<Code className="h-4 w-4" />, t('dashboard.addBlogPost.code'))}
              </div>
              <textarea
                value={form.fullContentEn}
                onChange={(e) => updateField('fullContentEn', e.target.value)}
                placeholder={t('dashboard.addBlogPost.richTextPlaceholder')}
                className="w-full min-h-[250px] px-4 py-3 text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none resize-y border-0"
                rows={8}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addBlogPost.slug')} <span className="text-destructive">*</span>
            </label>
            <div className="flex gap-2">
              <input
                value={form.slug}
                onChange={(e) => updateField('slug', e.target.value)}
                placeholder={t('dashboard.addBlogPost.slugPlaceholder')}
                className={`${fieldClass('slug')} flex-1`}
              />
              <button
                type="button"
                onClick={autoGenerateSlug}
                className="shrink-0 h-11 px-3 rounded-lg border border-border text-xs text-muted-foreground hover:bg-muted transition-colors"
                title={t('dashboard.addBlogPost.slugAutoGenerate')}
              >
                <Globe className="h-4 w-4" />
              </button>
            </div>
            {errors.slug && <p className="mt-1 text-xs text-destructive">{errors.slug}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                {t('dashboard.addBlogPost.category')} <span className="text-destructive">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => updateField('category', e.target.value)}
                className={fieldClass('category')}
              >
                <option value="">{t('dashboard.addBlogPost.categoryPlaceholder')}</option>
                {categoryOptions.map(([key]) => (
                  <option key={key} value={key}>{t(`dashboard.blogPostDetails.${key}` as any)}</option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-xs text-destructive">{errors.category}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                {t('dashboard.addBlogPost.author')}
              </label>
              <select
                value={form.author}
                onChange={(e) => updateField('author', e.target.value)}
                className={fieldClass('author')}
              >
                {authorOptions.map(([key]) => (
                  <option key={key} value={key}>{t(`dashboard.blogPostDetails.${key}` as any)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                {t('dashboard.addBlogPost.readingTime')}
              </label>
              <input
                type="number"
                value={form.readingTime}
                onChange={(e) => updateField('readingTime', parseInt(e.target.value) || 0)}
                placeholder={t('dashboard.addBlogPost.readingTimePlaceholder')}
                className={fieldClass('readingTime')}
                min={1}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                {t('dashboard.addBlogPost.publishDate')}
              </label>
              <input
                type="date"
                value={form.publishDate}
                onChange={(e) => updateField('publishDate', e.target.value)}
                className={fieldClass('publishDate')}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => updateField('featured', !form.featured)}
              className={`flex items-center gap-2 h-11 px-4 rounded-lg border text-sm font-medium transition-colors ${
                form.featured
                  ? 'border-secondary bg-secondary/10 text-secondary'
                  : 'border-border text-muted-foreground hover:bg-muted'
              }`}
            >
              <Star className={`h-4 w-4 ${form.featured ? 'fill-secondary' : ''}`} />
              {t('dashboard.addBlogPost.featured')}
            </button>

            <div className="h-6 w-px bg-border" />

            <button
              type="button"
              onClick={() => updateField('published', !form.published)}
              className={`flex items-center gap-2 h-11 px-4 rounded-lg border text-sm font-medium transition-colors ${
                form.published
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'border-border text-muted-foreground hover:bg-muted'
              }`}
            >
              <Power className={`h-4 w-4 ${form.published ? 'fill-emerald-500' : ''}`} />
              {t('dashboard.addBlogPost.published')}
            </button>
          </div>

          <div className="lg:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addBlogPost.tags')}
            </label>
            <input
              value={form.tags}
              onChange={(e) => updateField('tags', e.target.value)}
              placeholder={t('dashboard.addBlogPost.tagsDescription')}
              className={fieldClass('tags')}
            />
            <p className="mt-1 text-xs text-muted-foreground">{t('dashboard.addBlogPost.tagsDescription')}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addBlogPost.coverImage')}</h3>
        <p className="text-xs text-muted-foreground -mt-4">{t('dashboard.addBlogPost.coverImageDescription')}</p>

        <div className="flex items-center gap-4">
          {form.coverImage ? (
            <div className="relative group">
              <img src={form.coverImage} alt="Cover" className="h-32 w-48 rounded-lg object-cover border border-border" />
              <button
                type="button"
                onClick={() => updateField('coverImage', '')}
                className="absolute top-2 right-2 h-7 w-7 flex items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleCoverUpload}
              className="flex flex-col items-center justify-center h-32 w-48 rounded-lg border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <Upload className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">{t('dashboard.addBlogPost.uploadImage')}</span>
            </button>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addBlogPost.galleryImages')}</h3>
        <p className="text-xs text-muted-foreground -mt-4">{t('dashboard.addBlogPost.galleryImagesDescription')}</p>

        <div className="flex flex-wrap gap-3">
          {form.galleryImages.map((img, i) => (
            <div key={i} className="relative group">
              <img src={img} alt={`Gallery ${i + 1}`} className="h-24 w-24 rounded-lg object-cover border border-border" />
              <button
                type="button"
                onClick={() => removeGalleryImage(i)}
                className="absolute top-1 right-1 h-6 w-6 flex items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleGalleryUpload}
            className="flex flex-col items-center justify-center h-24 w-24 rounded-lg border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
          >
            <ImagePlus className="h-5 w-5 mb-1" />
            <span className="text-[10px] font-medium">{t('dashboard.addBlogPost.addImages')}</span>
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addBlogPost.seoSection')}</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addBlogPost.seoTitleAr')}
            </label>
            <input
              value={form.seoTitleAr}
              onChange={(e) => updateField('seoTitleAr', e.target.value)}
              placeholder={t('dashboard.addBlogPost.seoTitleArPlaceholder')}
              className={fieldClass('seoTitleAr')}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addBlogPost.seoTitleEn')}
            </label>
            <input
              value={form.seoTitleEn}
              onChange={(e) => updateField('seoTitleEn', e.target.value)}
              placeholder={t('dashboard.addBlogPost.seoTitleEnPlaceholder')}
              className={fieldClass('seoTitleEn')}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addBlogPost.seoDescriptionAr')}
            </label>
            <textarea
              value={form.seoDescriptionAr}
              onChange={(e) => updateField('seoDescriptionAr', e.target.value)}
              placeholder={t('dashboard.addBlogPost.seoDescriptionArPlaceholder')}
              className={textareaClass('seoDescriptionAr')}
              rows={3}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addBlogPost.seoDescriptionEn')}
            </label>
            <textarea
              value={form.seoDescriptionEn}
              onChange={(e) => updateField('seoDescriptionEn', e.target.value)}
              placeholder={t('dashboard.addBlogPost.seoDescriptionEnPlaceholder')}
              className={textareaClass('seoDescriptionEn')}
              rows={3}
            />
          </div>
          <div className="lg:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addBlogPost.seoKeywords')}
            </label>
            <input
              value={form.seoKeywords}
              onChange={(e) => updateField('seoKeywords', e.target.value)}
              placeholder={t('dashboard.addBlogPost.seoKeywordsPlaceholder')}
              className={fieldClass('seoKeywords')}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="h-11 px-6 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
        >
          {t('dashboard.addBlogPost.cancel')}
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t('dashboard.addBlogPost.saving') : t('dashboard.addBlogPost.save')}
        </button>
      </div>
    </form>
  );
}
