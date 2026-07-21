import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, Power } from 'lucide-react';
import { ImageUpload, Dropdown } from '@components/ui';
import type { TeamMember } from '@services/api/types';
import type { ApiFieldErrors } from '@utils/api';

export interface TeamFormData {
  nameAr: string;
  nameEn: string;
  positionAr: string;
  positionEn: string;
  bioAr: string;
  bioEn: string;
  department: string;
  departmentAr: string;
  email: string;
  phone: string;
  order: number;
  isFeatured: boolean;
  isActive: boolean;
  image: string;
  thumbnail: string;
}

interface TeamFormProps {
  initialData?: TeamMember;
  onSubmit: (data: Record<string, unknown>) => void;
  isSubmitting: boolean;
  serverErrors?: ApiFieldErrors;
}

export function TeamForm({ initialData, onSubmit, isSubmitting, serverErrors = {} }: TeamFormProps) {
  const { t } = useTranslation();

  const [form, setForm] = useState<TeamFormData>({
    nameAr: initialData?.nameAr || '',
    nameEn: initialData?.name || '',
    positionAr: initialData?.positionAr || '',
    positionEn: initialData?.position || '',
    bioAr: initialData?.bioAr || '',
    bioEn: initialData?.bio || '',
    department: initialData?.department || '',
    departmentAr: initialData?.departmentAr || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    order: initialData?.order || 0,
    isFeatured: initialData?.isFeatured || false,
    isActive: initialData?.isActive ?? true,
    image: initialData?.image || '',
    thumbnail: initialData?.thumbnail || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (Object.keys(serverErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...serverErrors }));
    }
  }, [serverErrors]);

  const updateField = (field: keyof TeamFormData, value: string | boolean | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
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
    if (!validate()) return;

    const payload: Record<string, unknown> = {
      name: form.nameEn,
      nameAr: form.nameAr,
      role: form.positionEn,
      roleAr: form.positionAr,
      bio: form.bioEn,
      bioAr: form.bioAr,
      email: form.email,
      phone: form.phone,
      department: form.department,
      departmentAr: form.departmentAr,
      order: form.order,
      isActive: form.isActive,
      isFeatured: form.isFeatured,
      image: form.image || '',
      thumbnail: form.thumbnail || '',
    };

    onSubmit(payload);
  };

  const fieldClass = (name: string) =>
    `w-full h-11 px-4 rounded-lg border text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
      errors[name] ? 'border-destructive focus:ring-destructive' : 'border-input'
    }`;

  const textareaClass = (name: string) =>
    `w-full min-h-[100px] px-4 py-3 rounded-lg border text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-y ${
      errors[name] ? 'border-destructive focus:ring-destructive' : 'border-input'
    }`;

  const departments = ['management', 'engineering', 'design', 'operations', 'finance', 'hr'];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addTeamMember.basicInfo')}</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-muted-foreground mb-4 pb-2 border-b border-border">{t('dashboard.addTeamMember.arabicInfo')}</h4>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addTeamMember.nameAr')} <span className="text-destructive">*</span></label>
            <input value={form.nameAr} onChange={(e) => updateField('nameAr', e.target.value)} placeholder={t('dashboard.addTeamMember.nameArPlaceholder')} className={fieldClass('nameAr')} />
            {errors.nameAr && <p className="mt-1 text-xs text-destructive">{errors.nameAr}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addTeamMember.positionAr')}</label>
            <input value={form.positionAr} onChange={(e) => updateField('positionAr', e.target.value)} placeholder={t('dashboard.addTeamMember.positionArPlaceholder')} className={fieldClass('positionAr')} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addTeamMember.bioAr')}</label>
            <textarea value={form.bioAr} onChange={(e) => updateField('bioAr', e.target.value)} placeholder={t('dashboard.addTeamMember.bioArPlaceholder')} className={textareaClass('bioAr')} rows={3} />
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-muted-foreground mb-4 pb-2 border-b border-border">{t('dashboard.addTeamMember.englishInfo')}</h4>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addTeamMember.nameEn')} <span className="text-destructive">*</span></label>
            <input value={form.nameEn} onChange={(e) => updateField('nameEn', e.target.value)} placeholder={t('dashboard.addTeamMember.nameEnPlaceholder')} className={fieldClass('nameEn')} />
            {errors.nameEn && <p className="mt-1 text-xs text-destructive">{errors.nameEn}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addTeamMember.positionEn')}</label>
            <input value={form.positionEn} onChange={(e) => updateField('positionEn', e.target.value)} placeholder={t('dashboard.addTeamMember.positionEnPlaceholder')} className={fieldClass('positionEn')} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addTeamMember.bioEn')}</label>
            <textarea value={form.bioEn} onChange={(e) => updateField('bioEn', e.target.value)} placeholder={t('dashboard.addTeamMember.bioEnPlaceholder')} className={textareaClass('bioEn')} rows={3} />
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-muted-foreground mb-4 pb-2 border-b border-border">{t('dashboard.addTeamMember.contactInfo')}</h4>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addTeamMember.email')} <span className="text-destructive">*</span></label>
            <input type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} placeholder={t('dashboard.addTeamMember.emailPlaceholder')} className={fieldClass('email')} />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addTeamMember.phone')}</label>
            <input value={form.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder={t('dashboard.addTeamMember.phonePlaceholder')} className={fieldClass('phone')} />
          </div>

          <div>
            <Dropdown
              label={t('dashboard.addTeamMember.department')}
              value={form.department}
              onChange={(val) => updateField('department', val)}
              placeholder={t('dashboard.addTeamMember.departmentPlaceholder')}
              options={departments.map((dept) => ({ value: dept, label: t(`dashboard.teamMemberDetails.${dept}`) }))}
              className="w-full"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addTeamMember.departmentAr')}</label>
            <input value={form.departmentAr} onChange={(e) => updateField('departmentAr', e.target.value)} placeholder={t('dashboard.addTeamMember.departmentArPlaceholder')} className={fieldClass('departmentAr')} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addTeamMember.displayOrder')}</label>
              <input type="number" value={form.order} onChange={(e) => updateField('order', parseInt(e.target.value) || 0)} className={fieldClass('order')} min={0} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button type="button" onClick={() => updateField('isFeatured', !form.isFeatured)}
              className={`flex items-center gap-2 h-11 px-4 rounded-lg border text-sm font-medium transition-colors ${form.isFeatured ? 'border-secondary bg-secondary/10 text-secondary' : 'border-border text-muted-foreground hover:bg-muted'}`}>
              <Star className={`h-4 w-4 ${form.isFeatured ? 'fill-secondary' : ''}`} />
              {t('dashboard.addTeamMember.featured')}
            </button>
            <button type="button" onClick={() => updateField('isActive', !form.isActive)}
              className={`flex items-center gap-2 h-11 px-4 rounded-lg border text-sm font-medium transition-colors ${form.isActive ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600' : 'border-border text-muted-foreground hover:bg-muted'}`}>
              <Power className="h-4 w-4" />
              {form.isActive ? t('dashboard.addTeamMember.active') : t('dashboard.addTeamMember.inactive')}
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addTeamMember.profileImage')}</h3>
        <ImageUpload
          value={form.image}
          onChange={(url) => updateField('image', url)}
          label={t('dashboard.addTeamMember.profileImage')}
        />
        <ImageUpload
          value={form.thumbnail}
          onChange={(url) => updateField('thumbnail', url)}
          label={t('dashboard.addTeamMember.thumbnail')}
        />
      </div>

      <div className="flex items-center justify-end gap-3">
        <button type="button" onClick={() => window.history.back()}
          className="h-11 px-6 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
          {t('dashboard.addTeamMember.cancel')}
        </button>
        <button type="submit" disabled={isSubmitting}
          className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? t('dashboard.addTeamMember.saving') : t('dashboard.addTeamMember.save')}
        </button>
      </div>
    </form>
  );
}
