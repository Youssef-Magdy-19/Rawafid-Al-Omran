import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Save, User, Upload, Link,
} from 'lucide-react';
import { mockAdminProfile } from '@data/adminMockData';

export function EditProfile() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nameAr: mockAdminProfile.nameAr,
    nameEn: mockAdminProfile.nameEn,
    email: mockAdminProfile.email,
    phone: mockAdminProfile.phone,
    biographyAr: mockAdminProfile.biographyAr,
    biographyEn: mockAdminProfile.biographyEn,
    profileImage: mockAdminProfile.profileImage,
    socialLinks: [...mockAdminProfile.socialLinks],
  });

  const update = (field: string, value: any) => setForm((prev) => ({ ...prev, [field]: value }));
  const updateSocial = (idx: number, field: 'platform' | 'url', value: string) => {
    const links = [...form.socialLinks];
    links[idx] = { ...links[idx], [field]: value };
    update('socialLinks', links);
  };
  const addSocial = () => update('socialLinks', [...form.socialLinks, { platform: '', url: '' }]);
  const removeSocial = (idx: number) => update('socialLinks', form.socialLinks.filter((_, i) => i !== idx));

  const inputCls = 'w-full h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring';
  const textareaCls = 'w-full min-h-[100px] px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y';

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard/administration/profile')}
            className="rounded-lg p-2 border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t('dashboard.editProfile.pageTitle')}</h1>
            <p className="text-muted-foreground mt-1">{t('dashboard.editProfile.pageDescription')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard/administration/profile')}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
            {t('dashboard.editProfile.cancel')}
          </button>
          <button className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors">
            <Save className="h-4 w-4" />{t('dashboard.editProfile.save')}
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-muted/30">
              <h2 className="text-lg font-semibold text-foreground">{t('dashboard.editProfile.personalInfo')}</h2>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">{t('dashboard.editProfile.nameAr')}</label>
                  <input type="text" value={form.nameAr} onChange={(e) => update('nameAr', e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">{t('dashboard.editProfile.nameEn')}</label>
                  <input type="text" value={form.nameEn} onChange={(e) => update('nameEn', e.target.value)} className={inputCls} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">{t('dashboard.editProfile.email')}</label>
                  <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">{t('dashboard.editProfile.phone')}</label>
                  <input type="text" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputCls} />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-muted/30">
              <h2 className="text-lg font-semibold text-foreground">{t('dashboard.editProfile.biography')}</h2>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">{t('dashboard.editProfile.biographyAr')}</label>
                <textarea value={form.biographyAr} onChange={(e) => update('biographyAr', e.target.value)} className={textareaCls} />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">{t('dashboard.editProfile.biographyEn')}</label>
                <textarea value={form.biographyEn} onChange={(e) => update('biographyEn', e.target.value)} className={textareaCls} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-muted/30">
              <h2 className="text-lg font-semibold text-foreground">{t('dashboard.editProfile.socialLinks')}</h2>
            </div>
            <div className="p-6 space-y-3">
              {form.socialLinks.map((link, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input type="text" value={link.platform} onChange={(e) => updateSocial(idx, 'platform', e.target.value)}
                    placeholder={t('dashboard.editProfile.platform')}
                    className={`${inputCls} max-w-[160px]`} />
                  <div className="relative flex-1">
                    <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input type="text" value={link.url} onChange={(e) => updateSocial(idx, 'url', e.target.value)}
                      placeholder={t('dashboard.editProfile.urlPlaceholder')}
                      className={`${inputCls} pl-10`} />
                  </div>
                  {form.socialLinks.length > 1 && (
                    <button onClick={() => removeSocial(idx)}
                      className="h-10 w-10 flex items-center justify-center rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors">&times;</button>
                  )}
                </div>
              ))}
              <button onClick={addSocial}
                className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-dashed border-border text-sm text-muted-foreground hover:bg-muted transition-colors">
                + {t('dashboard.editProfile.addSocial')}
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-6">
          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-muted/30">
              <h2 className="text-lg font-semibold text-foreground">{t('dashboard.editProfile.profileImage')}</h2>
            </div>
            <div className="p-6 text-center">
              <div className="h-32 w-32 rounded-2xl bg-muted mx-auto flex items-center justify-center overflow-hidden border-2 border-dashed border-border">
                {form.profileImage
                  ? <img src={form.profileImage} alt="profile" className="h-full w-full object-cover" />
                  : <User className="h-10 w-10 text-muted-foreground" />}
              </div>
              <button className="inline-flex items-center gap-2 h-9 px-4 mt-4 rounded-lg border border-input text-sm text-muted-foreground hover:bg-muted transition-colors">
                <Upload className="h-4 w-4" />{t('dashboard.editProfile.uploadImage')}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
