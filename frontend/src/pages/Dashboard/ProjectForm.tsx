import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Upload,
  X,
  ImagePlus,
  Globe,
  Star,
} from 'lucide-react';
import { type DashboardProject } from '@data/dashboardMockData';

export interface ProjectFormData {
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  slug: string;
  category: string;
  featured: boolean;
  status: string;
  coverImage: string;
  galleryImages: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

interface ProjectFormProps {
  initialData?: DashboardProject;
  onSubmit: (data: ProjectFormData) => void;
  isSubmitting: boolean;
}

export function ProjectForm({ initialData, onSubmit, isSubmitting }: ProjectFormProps) {
  const { t } = useTranslation();

  const [form, setForm] = useState<ProjectFormData>({
    titleAr: initialData?.titleAr || '',
    titleEn: initialData?.titleEn || '',
    descriptionAr: initialData?.descriptionAr || '',
    descriptionEn: initialData?.descriptionEn || '',
    slug: initialData?.slug || '',
    category: initialData?.category || '',
    featured: initialData?.featured || false,
    status: initialData?.status || '',
    coverImage: initialData?.coverImage || '',
    galleryImages: initialData?.galleryImages || [],
    seoTitle: initialData?.seo?.title || '',
    seoDescription: initialData?.seo?.description || '',
    seoKeywords: initialData?.seo?.keywords?.join(', ') || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof ProjectFormData, value: string | boolean | string[]) => {
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
    if (!form.titleAr.trim()) newErrors.titleAr = t('dashboard.addProject.validation.titleArRequired');
    if (!form.titleEn.trim()) newErrors.titleEn = t('dashboard.addProject.validation.titleEnRequired');
    if (!form.descriptionAr.trim()) newErrors.descriptionAr = t('dashboard.addProject.validation.descriptionArRequired');
    if (!form.descriptionEn.trim()) newErrors.descriptionEn = t('dashboard.addProject.validation.descriptionEnRequired');
    if (!form.slug.trim()) newErrors.slug = t('dashboard.addProject.validation.slugRequired');
    if (!form.category) newErrors.category = t('dashboard.addProject.validation.categoryRequired');
    if (!form.status) newErrors.status = t('dashboard.addProject.validation.statusRequired');
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
    const url = prompt(t('dashboard.addProject.coverImageDescription') || 'Enter image URL:');
    if (url) {
      updateField('coverImage', url);
    }
  };

  const handleGalleryUpload = () => {
    const url = prompt('Enter image URL for gallery:');
    if (url) {
      updateField('galleryImages', [...form.galleryImages, url]);
    }
  };

  const removeGalleryImage = (index: number) => {
    updateField('galleryImages', form.galleryImages.filter((_, i) => i !== index));
  };

  const fieldClass = (name: string) =>
    `w-full h-11 px-4 rounded-lg border text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
      errors[name] ? 'border-destructive focus:ring-destructive' : 'border-input'
    }`;

  const textareaClass = (name: string) =>
    `w-full min-h-[120px] px-4 py-3 rounded-lg border text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-y ${
      errors[name] ? 'border-destructive focus:ring-destructive' : 'border-input'
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addProject.basicInfo')}</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addProject.titleAr')} <span className="text-destructive">*</span>
            </label>
            <input
              value={form.titleAr}
              onChange={(e) => updateField('titleAr', e.target.value)}
              placeholder={t('dashboard.addProject.titleArPlaceholder')}
              className={fieldClass('titleAr')}
            />
            {errors.titleAr && <p className="mt-1 text-xs text-destructive">{errors.titleAr}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addProject.titleEn')} <span className="text-destructive">*</span>
            </label>
            <input
              value={form.titleEn}
              onChange={(e) => updateField('titleEn', e.target.value)}
              placeholder={t('dashboard.addProject.titleEnPlaceholder')}
              className={fieldClass('titleEn')}
            />
            {errors.titleEn && <p className="mt-1 text-xs text-destructive">{errors.titleEn}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addProject.descriptionAr')} <span className="text-destructive">*</span>
            </label>
            <textarea
              value={form.descriptionAr}
              onChange={(e) => updateField('descriptionAr', e.target.value)}
              placeholder={t('dashboard.addProject.descriptionArPlaceholder')}
              className={textareaClass('descriptionAr')}
              rows={4}
            />
            {errors.descriptionAr && <p className="mt-1 text-xs text-destructive">{errors.descriptionAr}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addProject.descriptionEn')} <span className="text-destructive">*</span>
            </label>
            <textarea
              value={form.descriptionEn}
              onChange={(e) => updateField('descriptionEn', e.target.value)}
              placeholder={t('dashboard.addProject.descriptionEnPlaceholder')}
              className={textareaClass('descriptionEn')}
              rows={4}
            />
            {errors.descriptionEn && <p className="mt-1 text-xs text-destructive">{errors.descriptionEn}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addProject.slug')} <span className="text-destructive">*</span>
            </label>
            <div className="flex gap-2">
              <input
                value={form.slug}
                onChange={(e) => updateField('slug', e.target.value)}
                placeholder={t('dashboard.addProject.slugPlaceholder')}
                className={`${fieldClass('slug')} flex-1`}
              />
              <button
                type="button"
                onClick={autoGenerateSlug}
                className="shrink-0 h-11 px-3 rounded-lg border border-border text-xs text-muted-foreground hover:bg-muted transition-colors"
                title={t('dashboard.addProject.slugAutoGenerate')}
              >
                <Globe className="h-4 w-4" />
              </button>
            </div>
            {errors.slug && <p className="mt-1 text-xs text-destructive">{errors.slug}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                {t('dashboard.addProject.category')} <span className="text-destructive">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => updateField('category', e.target.value)}
                className={fieldClass('category')}
              >
                <option value="">{t('dashboard.addProject.categoryPlaceholder')}</option>
                <option value="commercial">{t('dashboard.home.categoryCommercial')}</option>
                <option value="residential">{t('dashboard.home.categoryResidential')}</option>
                <option value="infrastructure">{t('dashboard.home.categoryInfrastructure')}</option>
                <option value="industrial">{t('dashboard.home.categoryIndustrial')}</option>
                <option value="educational">{t('dashboard.home.categoryEducational')}</option>
              </select>
              {errors.category && <p className="mt-1 text-xs text-destructive">{errors.category}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                {t('dashboard.addProject.status')} <span className="text-destructive">*</span>
              </label>
              <select
                value={form.status}
                onChange={(e) => updateField('status', e.target.value)}
                className={fieldClass('status')}
              >
                <option value="">{t('dashboard.addProject.statusPlaceholder')}</option>
                <option value="planning">{t('dashboard.home.statusPlanning')}</option>
                <option value="inProgress">{t('dashboard.home.statusInProgress')}</option>
                <option value="completed">{t('dashboard.home.statusCompleted')}</option>
                <option value="onHold">{t('dashboard.home.statusOnHold')}</option>
                <option value="cancelled">{t('dashboard.home.statusCancelled')}</option>
              </select>
              {errors.status && <p className="mt-1 text-xs text-destructive">{errors.status}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3">
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
              {t('dashboard.addProject.featured')}
            </button>
            <span className="text-xs text-muted-foreground">
              {t('dashboard.addProject.featuredDescription')}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addProject.coverImage')}</h3>
        <p className="text-xs text-muted-foreground -mt-4">{t('dashboard.addProject.coverImageDescription')}</p>

        <div className="flex items-center gap-4">
          {form.coverImage ? (
            <div className="relative group">
              <img
                src={form.coverImage}
                alt="Cover"
                className="h-32 w-48 rounded-lg object-cover border border-border"
              />
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
              <span className="text-xs font-medium">{t('dashboard.addProject.uploadImage')}</span>
            </button>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addProject.galleryImages')}</h3>
        <p className="text-xs text-muted-foreground -mt-4">{t('dashboard.addProject.galleryImagesDescription')}</p>

        <div className="flex flex-wrap gap-3">
          {form.galleryImages.map((img, i) => (
            <div key={i} className="relative group">
              <img
                src={img}
                alt={`Gallery ${i + 1}`}
                className="h-24 w-24 rounded-lg object-cover border border-border"
              />
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
            <span className="text-[10px] font-medium">{t('dashboard.addProject.addImages')}</span>
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addProject.seoSection')}</h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addProject.seoTitle')}
            </label>
            <input
              value={form.seoTitle}
              onChange={(e) => updateField('seoTitle', e.target.value)}
              placeholder={t('dashboard.addProject.seoTitlePlaceholder')}
              className={fieldClass('seoTitle')}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addProject.seoDescription')}
            </label>
            <textarea
              value={form.seoDescription}
              onChange={(e) => updateField('seoDescription', e.target.value)}
              placeholder={t('dashboard.addProject.seoDescriptionPlaceholder')}
              className={textareaClass('seoDescription')}
              rows={3}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addProject.seoKeywords')}
            </label>
            <input
              value={form.seoKeywords}
              onChange={(e) => updateField('seoKeywords', e.target.value)}
              placeholder={t('dashboard.addProject.seoKeywordsPlaceholder')}
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
          {t('dashboard.addProject.cancel')}
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t('dashboard.addProject.saving') : t('dashboard.addProject.save')}
        </button>
      </div>
    </form>
  );
}
