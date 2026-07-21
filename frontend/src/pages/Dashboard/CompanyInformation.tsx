import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Save, RotateCcw, Upload, Building2, Globe, Mail, Phone, MapPin,
  Clock, Link, Copyright, FileText, MessageCircle,
} from 'lucide-react';
// TODO: Backend API does not provide a company information endpoint.
// Replace with real data from a GET/PUT /company endpoint when available.
const companyInfoDefaults = {
  logo: '/images/logo.png',
  favicon: '/images/favicon.ico',
  nameAr: 'روافد العمران للمقاولات العامة',
  nameEn: 'Rawafid Al Omran General Contracting',
  shortDescAr: 'شركة رائدة في مجال المقاولات والبناء والهندسة',
  shortDescEn: 'A leading company in contracting, construction, and engineering',
  fullDescAr: 'تأسست شركة روافد العمران للمقاولات العامة في عام 1998، ومنذ ذلك الحين وهي تقدم حلولاً متكاملة في مجال البناء والهندسة. تمتلك الشركة فريقاً من أكثر من 200 متخصص في مختلف المجالات الهندسية والإنشائية، ونفذت العديد من المشاريع الكبرى في جميع أنحاء المملكة العربية السعودية ودول الخليج.',
  fullDescEn: 'Rawafid Al Omran General Contracting was founded in 1998, and since then has been providing integrated solutions in construction and engineering. The company has a team of over 200 specialists in various engineering and construction fields, and has executed numerous major projects throughout Saudi Arabia and the Gulf countries.',
  email: 'info@rawafid-alomran.com',
  phone: '+966 55 123 4567',
  whatsapp: '+966 55 123 4567',
  addressAr: 'الرياض - حي النرجس - طريق الملك عبدالله',
  addressEn: 'Riyadh - Al Narjis District - King Abdullah Road',
  googleMapsUrl: 'https://maps.google.com/?q=Rawafid+Al+Omran',
  workingHours: 'SAT - THU: 8:00 AM - 5:00 PM',
  socialLinks: [
    { platform: 'twitter', url: 'https://twitter.com/rawafid' },
    { platform: 'linkedin', url: 'https://linkedin.com/company/rawafid' },
    { platform: 'instagram', url: 'https://instagram.com/rawafid' },
    { platform: 'facebook', url: 'https://facebook.com/rawafid' },
    { platform: 'youtube', url: 'https://youtube.com/@rawafid' },
  ],
  copyright: '© 2024 Rawafid Al Omran General Contracting. All rights reserved.',
  footerText: 'Rawafid Al Omran - Your trusted partner in construction and engineering since 1998',
};

export function CompanyInformation() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ ...companyInfoDefaults });

  const updateField = (field: string, value: any) => setForm((prev) => ({ ...prev, [field]: value }));
  const updateSocial = (idx: number, field: 'platform' | 'url', value: string) => {
    const links = [...form.socialLinks];
    links[idx] = { ...links[idx], [field]: value };
    updateField('socialLinks', links);
  };
  const addSocial = () => updateField('socialLinks', [...form.socialLinks, { platform: '', url: '' }]);
  const removeSocial = (idx: number) => updateField('socialLinks', form.socialLinks.filter((_, i) => i !== idx));
  const resetForm = () => setForm({ ...companyInfoDefaults });

  const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-border bg-muted/30">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      </div>
      <div className="p-6 space-y-5">{children}</div>
    </div>
  );

  const FieldRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-3 items-start">
      <label className="text-sm font-medium text-muted-foreground pt-2">{label}</label>
      <div className="w-full">{children}</div>
    </div>
  );

  const inputCls = 'w-full h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring';
  const textareaCls = 'w-full min-h-[100px] px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y';

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard/administration')}
            className="rounded-lg p-2 border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t('dashboard.companyInformation.pageTitle')}</h1>
            <p className="text-muted-foreground mt-1">{t('dashboard.companyInformation.pageDescription')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={resetForm}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
            <RotateCcw className="h-4 w-4" />{t('dashboard.companyInformation.reset')}
          </button>
          <button className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors">
            <Save className="h-4 w-4" />{t('dashboard.companyInformation.save')}
          </button>
        </div>
      </motion.div>

      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
          <SectionCard title={t('dashboard.companyInformation.branding')}>
            <FieldRow label={t('dashboard.companyInformation.logo')}>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-xl border border-border bg-muted flex items-center justify-center overflow-hidden">
                  {form.logo ? <img src={form.logo} alt="logo" className="h-full w-full object-contain" /> : <Building2 className="h-6 w-6 text-muted-foreground" />}
                </div>
                <button className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-input text-sm text-muted-foreground hover:bg-muted transition-colors">
                  <Upload className="h-4 w-4" />{t('dashboard.companyInformation.upload')}
                </button>
              </div>
            </FieldRow>
            <FieldRow label={t('dashboard.companyInformation.favicon')}>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg border border-border bg-muted flex items-center justify-center overflow-hidden">
                  {form.favicon ? <img src={form.favicon} alt="favicon" className="h-full w-full object-contain" /> : <Globe className="h-5 w-5 text-muted-foreground" />}
                </div>
                <button className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-input text-sm text-muted-foreground hover:bg-muted transition-colors">
                  <Upload className="h-4 w-4" />{t('dashboard.companyInformation.upload')}
                </button>
              </div>
            </FieldRow>
          </SectionCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <SectionCard title={t('dashboard.companyInformation.companyName')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">{t('dashboard.companyInformation.nameAr')}</label>
                <input type="text" value={form.nameAr} onChange={(e) => updateField('nameAr', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">{t('dashboard.companyInformation.nameEn')}</label>
                <input type="text" value={form.nameEn} onChange={(e) => updateField('nameEn', e.target.value)} className={inputCls} />
              </div>
            </div>
          </SectionCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
          <SectionCard title={t('dashboard.companyInformation.description')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">{t('dashboard.companyInformation.shortDescAr')}</label>
                <input type="text" value={form.shortDescAr} onChange={(e) => updateField('shortDescAr', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">{t('dashboard.companyInformation.shortDescEn')}</label>
                <input type="text" value={form.shortDescEn} onChange={(e) => updateField('shortDescEn', e.target.value)} className={inputCls} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">{t('dashboard.companyInformation.fullDescAr')}</label>
                <textarea value={form.fullDescAr} onChange={(e) => updateField('fullDescAr', e.target.value)} className={textareaCls} />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">{t('dashboard.companyInformation.fullDescEn')}</label>
                <textarea value={form.fullDescEn} onChange={(e) => updateField('fullDescEn', e.target.value)} className={textareaCls} />
              </div>
            </div>
          </SectionCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
          <SectionCard title={t('dashboard.companyInformation.contact')}>
            <FieldRow label={t('dashboard.companyInformation.email')}>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} className={`${inputCls} pl-10`} />
              </div>
            </FieldRow>
            <FieldRow label={t('dashboard.companyInformation.phone')}>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="text" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} className={`${inputCls} pl-10`} />
              </div>
            </FieldRow>
            <FieldRow label={t('dashboard.companyInformation.whatsapp')}>
              <div className="relative">
                <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="text" value={form.whatsapp} onChange={(e) => updateField('whatsapp', e.target.value)} className={`${inputCls} pl-10`} />
              </div>
            </FieldRow>
          </SectionCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}>
          <SectionCard title={t('dashboard.companyInformation.address')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">{t('dashboard.companyInformation.addressAr')}</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type="text" value={form.addressAr} onChange={(e) => updateField('addressAr', e.target.value)} className={`${inputCls} pl-10`} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">{t('dashboard.companyInformation.addressEn')}</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type="text" value={form.addressEn} onChange={(e) => updateField('addressEn', e.target.value)} className={`${inputCls} pl-10`} />
                </div>
              </div>
            </div>
            <FieldRow label={t('dashboard.companyInformation.googleMapsUrl')}>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="text" value={form.googleMapsUrl} onChange={(e) => updateField('googleMapsUrl', e.target.value)} className={`${inputCls} pl-10`} />
              </div>
            </FieldRow>
            <FieldRow label={t('dashboard.companyInformation.workingHours')}>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="text" value={form.workingHours} onChange={(e) => updateField('workingHours', e.target.value)} className={`${inputCls} pl-10`} />
              </div>
            </FieldRow>
          </SectionCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
          <SectionCard title={t('dashboard.companyInformation.socialLinks')}>
            {form.socialLinks.map((link, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input type="text" value={link.platform} onChange={(e) => updateSocial(idx, 'platform', e.target.value)}
                  placeholder={t('dashboard.companyInformation.platform')}
                  className={`${inputCls} max-w-[180px]`} />
                <div className="relative flex-1">
                  <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type="text" value={link.url} onChange={(e) => updateSocial(idx, 'url', e.target.value)}
                    placeholder={t('dashboard.companyInformation.urlPlaceholder')}
                    className={`${inputCls} pl-10`} />
                </div>
                {form.socialLinks.length > 1 && (
                  <button onClick={() => removeSocial(idx)}
                    className="h-10 w-10 flex items-center justify-center rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors">
                    &times;
                  </button>
                )}
              </div>
            ))}
            <button onClick={addSocial}
              className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-dashed border-border text-sm text-muted-foreground hover:bg-muted transition-colors">
              + {t('dashboard.companyInformation.addSocial')}
            </button>
          </SectionCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }}>
          <SectionCard title={t('dashboard.companyInformation.footer')}>
            <FieldRow label={t('dashboard.companyInformation.copyright')}>
              <div className="relative">
                <Copyright className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="text" value={form.copyright} onChange={(e) => updateField('copyright', e.target.value)} className={`${inputCls} pl-10`} />
              </div>
            </FieldRow>
            <FieldRow label={t('dashboard.companyInformation.footerText')}>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="text" value={form.footerText} onChange={(e) => updateField('footerText', e.target.value)} className={`${inputCls} pl-10`} />
              </div>
            </FieldRow>
          </SectionCard>
        </motion.div>
      </div>
    </div>
  );
}
