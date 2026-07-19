import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Upload,
  X,
  ImagePlus,
  Star,
  Power,
} from 'lucide-react';
import { type TeamMember, departmentLabels } from '@data/teamMockData';

export interface TeamFormData {
  nameAr: string;
  nameEn: string;
  positionAr: string;
  positionEn: string;
  shortBioAr: string;
  shortBioEn: string;
  fullBioAr: string;
  fullBioEn: string;
  department: string;
  email: string;
  phone: string;
  whatsapp: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  experience: string;
  yearsOfExperience: number;
  displayOrder: number;
  featured: boolean;
  active: boolean;
  profileImage: string;
  galleryImages: string[];
  skills: string;
  certifications: string;
  seoTitleAr: string;
  seoTitleEn: string;
  seoDescriptionAr: string;
  seoDescriptionEn: string;
  seoKeywords: string;
}

interface TeamFormProps {
  initialData?: TeamMember;
  onSubmit: (data: TeamFormData) => void;
  isSubmitting: boolean;
}

export function TeamForm({ initialData, onSubmit, isSubmitting }: TeamFormProps) {
  const { t } = useTranslation();

  const [form, setForm] = useState<TeamFormData>({
    nameAr: initialData?.nameAr || '',
    nameEn: initialData?.nameEn || '',
    positionAr: initialData?.positionAr || '',
    positionEn: initialData?.positionEn || '',
    shortBioAr: initialData?.shortBioAr || '',
    shortBioEn: initialData?.shortBioEn || '',
    fullBioAr: initialData?.fullBioAr || '',
    fullBioEn: initialData?.fullBioEn || '',
    department: initialData?.department || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    whatsapp: initialData?.whatsapp || '',
    linkedin: initialData?.linkedin || '',
    facebook: initialData?.facebook || '',
    instagram: initialData?.instagram || '',
    experience: initialData?.experience || '',
    yearsOfExperience: initialData?.yearsOfExperience || 0,
    displayOrder: initialData?.displayOrder || 0,
    featured: initialData?.featured || false,
    active: initialData?.active ?? true,
    profileImage: initialData?.profileImage || '',
    galleryImages: initialData?.galleryImages || [],
    skills: initialData?.skills || '',
    certifications: initialData?.certifications || '',
    seoTitleAr: initialData?.seo?.titleAr || '',
    seoTitleEn: initialData?.seo?.titleEn || '',
    seoDescriptionAr: initialData?.seo?.descriptionAr || '',
    seoDescriptionEn: initialData?.seo?.descriptionEn || '',
    seoKeywords: initialData?.seo?.keywords || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof TeamFormData, value: string | boolean | number | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.nameAr.trim()) newErrors.nameAr = t('dashboard.addTeamMember.validation.nameArRequired');
    if (!form.nameEn.trim()) newErrors.nameEn = t('dashboard.addTeamMember.validation.nameEnRequired');
    if (!form.email.trim()) {
      newErrors.email = t('dashboard.addTeamMember.validation.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = t('dashboard.addTeamMember.validation.emailInvalid');
    }
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
    const url = prompt(t('dashboard.addTeamMember.profileImageDescription') || 'Enter image URL:');
    if (url) updateField('profileImage', url);
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

  const deptOptions = Object.entries(departmentLabels);

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addTeamMember.basicInfo')}</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-muted-foreground mb-4 pb-2 border-b border-border">{t('dashboard.addTeamMember.arabicInfo')}</h4>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addTeamMember.nameAr')} <span className="text-destructive">*</span>
            </label>
            <input
              value={form.nameAr}
              onChange={(e) => updateField('nameAr', e.target.value)}
              placeholder={t('dashboard.addTeamMember.nameArPlaceholder')}
              className={fieldClass('nameAr')}
            />
            {errors.nameAr && <p className="mt-1 text-xs text-destructive">{errors.nameAr}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addTeamMember.positionAr')}
            </label>
            <input
              value={form.positionAr}
              onChange={(e) => updateField('positionAr', e.target.value)}
              placeholder={t('dashboard.addTeamMember.positionArPlaceholder')}
              className={fieldClass('positionAr')}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addTeamMember.shortBioAr')}
            </label>
            <textarea
              value={form.shortBioAr}
              onChange={(e) => updateField('shortBioAr', e.target.value)}
              placeholder={t('dashboard.addTeamMember.shortBioArPlaceholder')}
              className={textareaClass('shortBioAr')}
              rows={3}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addTeamMember.fullBioAr')}
            </label>
            <textarea
              value={form.fullBioAr}
              onChange={(e) => updateField('fullBioAr', e.target.value)}
              placeholder={t('dashboard.addTeamMember.fullBioArPlaceholder')}
              className={textareaClass('fullBioAr')}
              rows={4}
            />
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-muted-foreground mb-4 pb-2 border-b border-border">{t('dashboard.addTeamMember.englishInfo')}</h4>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addTeamMember.nameEn')} <span className="text-destructive">*</span>
            </label>
            <input
              value={form.nameEn}
              onChange={(e) => updateField('nameEn', e.target.value)}
              placeholder={t('dashboard.addTeamMember.nameEnPlaceholder')}
              className={fieldClass('nameEn')}
            />
            {errors.nameEn && <p className="mt-1 text-xs text-destructive">{errors.nameEn}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addTeamMember.positionEn')}
            </label>
            <input
              value={form.positionEn}
              onChange={(e) => updateField('positionEn', e.target.value)}
              placeholder={t('dashboard.addTeamMember.positionEnPlaceholder')}
              className={fieldClass('positionEn')}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addTeamMember.shortBioEn')}
            </label>
            <textarea
              value={form.shortBioEn}
              onChange={(e) => updateField('shortBioEn', e.target.value)}
              placeholder={t('dashboard.addTeamMember.shortBioEnPlaceholder')}
              className={textareaClass('shortBioEn')}
              rows={3}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addTeamMember.fullBioEn')}
            </label>
            <textarea
              value={form.fullBioEn}
              onChange={(e) => updateField('fullBioEn', e.target.value)}
              placeholder={t('dashboard.addTeamMember.fullBioEnPlaceholder')}
              className={textareaClass('fullBioEn')}
              rows={4}
            />
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-muted-foreground mb-4 pb-2 border-b border-border">{t('dashboard.addTeamMember.basicInfo')}</h4>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addTeamMember.department')}
            </label>
            <select
              value={form.department}
              onChange={(e) => updateField('department', e.target.value)}
              className={fieldClass('department')}
            >
              <option value="">{t('dashboard.addTeamMember.departmentPlaceholder')}</option>
              {deptOptions.map(([key]) => (
                <option key={key} value={key}>{t(`dashboard.teamMemberDetails.${key}` as any)}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                {t('dashboard.addTeamMember.yearsOfExperience')}
              </label>
              <input
                type="number"
                value={form.yearsOfExperience}
                onChange={(e) => updateField('yearsOfExperience', parseInt(e.target.value) || 0)}
                className={fieldClass('yearsOfExperience')}
                min={0}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                {t('dashboard.addTeamMember.displayOrder')}
              </label>
              <input
                type="number"
                value={form.displayOrder}
                onChange={(e) => updateField('displayOrder', parseInt(e.target.value) || 0)}
                className={fieldClass('displayOrder')}
                min={0}
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
              {t('dashboard.addTeamMember.featured')}
            </button>

            <div className="h-6 w-px bg-border" />

            <button
              type="button"
              onClick={() => updateField('active', !form.active)}
              className={`flex items-center gap-2 h-11 px-4 rounded-lg border text-sm font-medium transition-colors ${
                form.active
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'border-border text-muted-foreground hover:bg-muted'
              }`}
            >
              <Power className={`h-4 w-4 ${form.active ? 'fill-emerald-500' : ''}`} />
              {t('dashboard.addTeamMember.active')}
            </button>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addTeamMember.email')} <span className="text-destructive">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder={t('dashboard.addTeamMember.emailPlaceholder')}
              className={fieldClass('email')}
            />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addTeamMember.phone')}
            </label>
            <input
              value={form.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder={t('dashboard.addTeamMember.phonePlaceholder')}
              className={fieldClass('phone')}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addTeamMember.whatsapp')}
            </label>
            <input
              value={form.whatsapp}
              onChange={(e) => updateField('whatsapp', e.target.value)}
              placeholder={t('dashboard.addTeamMember.whatsappPlaceholder')}
              className={fieldClass('whatsapp')}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addTeamMember.linkedin')}
            </label>
            <input
              value={form.linkedin}
              onChange={(e) => updateField('linkedin', e.target.value)}
              placeholder={t('dashboard.addTeamMember.linkedinPlaceholder')}
              className={fieldClass('linkedin')}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addTeamMember.facebook')}
            </label>
            <input
              value={form.facebook}
              onChange={(e) => updateField('facebook', e.target.value)}
              placeholder={t('dashboard.addTeamMember.facebookPlaceholder')}
              className={fieldClass('facebook')}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addTeamMember.instagram')}
            </label>
            <input
              value={form.instagram}
              onChange={(e) => updateField('instagram', e.target.value)}
              placeholder={t('dashboard.addTeamMember.instagramPlaceholder')}
              className={fieldClass('instagram')}
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addTeamMember.experience')}</h3>

        <textarea
          value={form.experience}
          onChange={(e) => updateField('experience', e.target.value)}
          placeholder={t('dashboard.addTeamMember.experiencePlaceholder')}
          className={textareaClass('experience')}
          rows={4}
        />
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addTeamMember.skills')}</h3>
        <p className="text-xs text-muted-foreground -mt-4">{t('dashboard.addTeamMember.skillsDescription')}</p>
        <input
          value={form.skills}
          onChange={(e) => updateField('skills', e.target.value)}
          placeholder={t('dashboard.addTeamMember.skillsDescription')}
          className={fieldClass('skills')}
        />
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addTeamMember.certifications')}</h3>
        <p className="text-xs text-muted-foreground -mt-4">{t('dashboard.addTeamMember.certificationsDescription')}</p>
        <input
          value={form.certifications}
          onChange={(e) => updateField('certifications', e.target.value)}
          placeholder={t('dashboard.addTeamMember.certificationsDescription')}
          className={fieldClass('certifications')}
        />
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addTeamMember.profileImage')}</h3>
        <p className="text-xs text-muted-foreground -mt-4">{t('dashboard.addTeamMember.profileImageDescription')}</p>

        <div className="flex items-center gap-4">
          {form.profileImage ? (
            <div className="relative group">
              <img src={form.profileImage} alt="Profile" className="h-32 w-32 rounded-full object-cover border border-border" />
              <button
                type="button"
                onClick={() => updateField('profileImage', '')}
                className="absolute top-2 right-2 h-7 w-7 flex items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleCoverUpload}
              className="flex flex-col items-center justify-center h-32 w-32 rounded-full border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <Upload className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">{t('dashboard.addTeamMember.uploadImage')}</span>
            </button>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addTeamMember.galleryImages')}</h3>
        <p className="text-xs text-muted-foreground -mt-4">{t('dashboard.addTeamMember.galleryImagesDescription')}</p>

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
            <span className="text-[10px] font-medium">{t('dashboard.addTeamMember.addImages')}</span>
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addTeamMember.seoSection')}</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addTeamMember.seoTitleAr')}
            </label>
            <input
              value={form.seoTitleAr}
              onChange={(e) => updateField('seoTitleAr', e.target.value)}
              placeholder={t('dashboard.addTeamMember.seoTitleArPlaceholder')}
              className={fieldClass('seoTitleAr')}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addTeamMember.seoTitleEn')}
            </label>
            <input
              value={form.seoTitleEn}
              onChange={(e) => updateField('seoTitleEn', e.target.value)}
              placeholder={t('dashboard.addTeamMember.seoTitleEnPlaceholder')}
              className={fieldClass('seoTitleEn')}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addTeamMember.seoDescriptionAr')}
            </label>
            <textarea
              value={form.seoDescriptionAr}
              onChange={(e) => updateField('seoDescriptionAr', e.target.value)}
              placeholder={t('dashboard.addTeamMember.seoDescriptionArPlaceholder')}
              className={textareaClass('seoDescriptionAr')}
              rows={3}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addTeamMember.seoDescriptionEn')}
            </label>
            <textarea
              value={form.seoDescriptionEn}
              onChange={(e) => updateField('seoDescriptionEn', e.target.value)}
              placeholder={t('dashboard.addTeamMember.seoDescriptionEnPlaceholder')}
              className={textareaClass('seoDescriptionEn')}
              rows={3}
            />
          </div>
          <div className="lg:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addTeamMember.seoKeywords')}
            </label>
            <input
              value={form.seoKeywords}
              onChange={(e) => updateField('seoKeywords', e.target.value)}
              placeholder={t('dashboard.addTeamMember.seoKeywordsPlaceholder')}
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
          {t('dashboard.addTeamMember.cancel')}
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t('dashboard.addTeamMember.saving') : t('dashboard.addTeamMember.save')}
        </button>
      </div>
    </form>
  );
}
