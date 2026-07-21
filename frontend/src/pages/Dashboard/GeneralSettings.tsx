import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Save, RotateCcw, Globe, Palette, Layout, Search, Share2,
  BarChart3, HardDrive, Mail, Lock, ToggleLeft, Wrench, Image,
} from 'lucide-react';
import { Dropdown } from '@components/ui/Dropdown';
// TODO: Backend API does not provide a settings endpoint.
// Replace with real data from a GET/PUT /settings endpoint when available.
const settingsDefaults = {
  websiteName: 'Rawafid Al Omran',
  websiteUrl: 'https://www.rawafid-alomran.com',
  defaultLanguage: 'ar',
  rtlSupport: true,
  themeMode: 'light',
  themeColor: '#1e40af',
  homepageLayout: 'default',
  projectsPerPage: 12,
  enableBlog: true,
  enableCareers: true,
  enableQuote: true,
  metaTitle: 'Rawafid Al Omran General Contracting',
  metaDescription: 'Rawafid Al Omran is a leading general contracting company in Saudi Arabia, providing construction, engineering, and project management services since 1998.',
  metaKeywords: 'contracting, construction, engineering, Saudi Arabia, Rawafid Al Omran',
  ogTitle: 'Rawafid Al Omran General Contracting',
  ogDescription: 'Your trusted partner in construction and engineering since 1998',
  ogImage: '/images/og-default.jpg',
  gaId: 'G-XXXXXXXXXX',
  googleTagManager: 'GTM-XXXXXXX',
  facebookPixel: 'XXXXXXXXXXXXXXXX',
  maintenanceMode: false,
  maintenanceMessage: 'We are currently performing scheduled maintenance. Please check back soon.',
  cacheEnabled: true,
  cacheDuration: 3600,
  maxFileSize: 10,
  allowedFileTypes: 'jpg,jpeg,png,gif,webp,pdf,doc,docx',
  smtpHost: 'smtp.rawafid-alomran.com',
  smtpPort: 587,
  smtpEmail: 'noreply@rawafid-alomran.com',
  smtpEncryption: 'tls',
  recaptchaSiteKey: '6LcXXXXXXXXXXXXXX',
  recaptchaSecretKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXX',
  twoFactorAuth: true,
  sessionTimeout: 60,
  autoSave: true,
  toastNotifications: true,
};

export function GeneralSettings() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ ...settingsDefaults });

  const update = (field: string, value: any) => setForm((prev) => ({ ...prev, [field]: value }));
  const reset = () => setForm({ ...settingsDefaults });

  const SectionCard = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center gap-3">
        <Icon className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      </div>
      <div className="p-6 space-y-5">{children}</div>
    </div>
  );

  const FieldRow = ({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) => (
    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-3 items-start">
      <div>
        <label className="text-sm font-medium text-foreground">{label}</label>
        {desc && <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );

  const Switch = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
    <button type="button" onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-muted-foreground/30'}`}>
      <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-5' : ''}`} />
    </button>
  );

  const inputCls = 'w-full h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring';

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
            <h1 className="text-2xl font-bold text-foreground">{t('dashboard.generalSettings.pageTitle')}</h1>
            <p className="text-muted-foreground mt-1">{t('dashboard.generalSettings.pageDescription')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={reset}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
            <RotateCcw className="h-4 w-4" />{t('dashboard.generalSettings.reset')}
          </button>
          <button className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors">
            <Save className="h-4 w-4" />{t('dashboard.generalSettings.save')}
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
          <SectionCard icon={Globe} title={t('dashboard.generalSettings.website')}>
            <FieldRow label={t('dashboard.generalSettings.websiteName')}>
              <input type="text" value={form.websiteName} onChange={(e) => update('websiteName', e.target.value)} className={inputCls} />
            </FieldRow>
            <FieldRow label={t('dashboard.generalSettings.websiteUrl')}>
              <input type="text" value={form.websiteUrl} onChange={(e) => update('websiteUrl', e.target.value)} className={inputCls} />
            </FieldRow>
          </SectionCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <SectionCard icon={Palette} title={t('dashboard.generalSettings.language')}>
            <FieldRow label={t('dashboard.generalSettings.defaultLanguage')}>
              <Dropdown
                value={form.defaultLanguage}
                onChange={(val) => update('defaultLanguage', val)}
                options={[
                  { value: 'ar', label: t('dashboard.generalSettings.arabic') },
                  { value: 'en', label: t('dashboard.generalSettings.english') },
                ]}
              />
            </FieldRow>
            <FieldRow label={t('dashboard.generalSettings.rtlSupport')}>
              <Switch checked={form.rtlSupport} onChange={(v) => update('rtlSupport', v)} />
            </FieldRow>
          </SectionCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
          <SectionCard icon={Palette} title={t('dashboard.generalSettings.theme')}>
            <FieldRow label={t('dashboard.generalSettings.themeMode')}>
              <Dropdown
                value={form.themeMode}
                onChange={(val) => update('themeMode', val)}
                options={[
                  { value: 'light', label: t('dashboard.generalSettings.light') },
                  { value: 'dark', label: t('dashboard.generalSettings.dark') },
                  { value: 'auto', label: t('dashboard.generalSettings.auto') },
                ]}
              />
            </FieldRow>
            <FieldRow label={t('dashboard.generalSettings.themeColor')}>
              <div className="flex items-center gap-3">
                <input type="color" value={form.themeColor} onChange={(e) => update('themeColor', e.target.value)}
                  className="h-10 w-12 rounded-lg border border-input bg-background cursor-pointer" />
                <input type="text" value={form.themeColor} onChange={(e) => update('themeColor', e.target.value)} className={`${inputCls} flex-1`} />
              </div>
            </FieldRow>
          </SectionCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
          <SectionCard icon={Layout} title={t('dashboard.generalSettings.homepage')}>
            <FieldRow label={t('dashboard.generalSettings.homepageLayout')}>
              <Dropdown
                value={form.homepageLayout}
                onChange={(val) => update('homepageLayout', val)}
                options={[
                  { value: 'default', label: t('dashboard.generalSettings.default') },
                  { value: 'modern', label: t('dashboard.generalSettings.modern') },
                  { value: 'classic', label: t('dashboard.generalSettings.classic') },
                ]}
              />
            </FieldRow>
            <FieldRow label={t('dashboard.generalSettings.projectsPerPage')}>
              <input type="number" value={form.projectsPerPage} onChange={(e) => update('projectsPerPage', Number(e.target.value))} className={inputCls} />
            </FieldRow>
            <FieldRow label={t('dashboard.generalSettings.enableBlog')}>
              <Switch checked={form.enableBlog} onChange={(v) => update('enableBlog', v)} />
            </FieldRow>
            <FieldRow label={t('dashboard.generalSettings.enableCareers')}>
              <Switch checked={form.enableCareers} onChange={(v) => update('enableCareers', v)} />
            </FieldRow>
            <FieldRow label={t('dashboard.generalSettings.enableQuote')}>
              <Switch checked={form.enableQuote} onChange={(v) => update('enableQuote', v)} />
            </FieldRow>
          </SectionCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}>
          <SectionCard icon={Search} title={t('dashboard.generalSettings.seo')}>
            <FieldRow label={t('dashboard.generalSettings.metaTitle')}>
              <input type="text" value={form.metaTitle} onChange={(e) => update('metaTitle', e.target.value)} className={inputCls} />
            </FieldRow>
            <FieldRow label={t('dashboard.generalSettings.metaDescription')}>
              <textarea value={form.metaDescription} onChange={(e) => update('metaDescription', e.target.value)}
                className="w-full min-h-[80px] px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
            </FieldRow>
            <FieldRow label={t('dashboard.generalSettings.metaKeywords')}>
              <input type="text" value={form.metaKeywords} onChange={(e) => update('metaKeywords', e.target.value)} className={inputCls} />
            </FieldRow>
          </SectionCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
          <SectionCard icon={Share2} title={t('dashboard.generalSettings.openGraph')}>
            <FieldRow label={t('dashboard.generalSettings.ogTitle')}>
              <input type="text" value={form.ogTitle} onChange={(e) => update('ogTitle', e.target.value)} className={inputCls} />
            </FieldRow>
            <FieldRow label={t('dashboard.generalSettings.ogDescription')}>
              <textarea value={form.ogDescription} onChange={(e) => update('ogDescription', e.target.value)}
                className="w-full min-h-[80px] px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
            </FieldRow>
            <FieldRow label={t('dashboard.generalSettings.ogImage')}>
              <div className="flex items-center gap-3">
                <input type="text" value={form.ogImage} onChange={(e) => update('ogImage', e.target.value)} className={inputCls} />
                <button className="inline-flex items-center gap-2 h-10 px-3 rounded-lg border border-input text-sm text-muted-foreground hover:bg-muted transition-colors shrink-0">
                  <Image className="h-4 w-4" />
                </button>
              </div>
            </FieldRow>
          </SectionCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }}>
          <SectionCard icon={BarChart3} title={t('dashboard.generalSettings.analytics')}>
            <FieldRow label={t('dashboard.generalSettings.gaId')}>
              <input type="text" value={form.gaId} onChange={(e) => update('gaId', e.target.value)} className={inputCls} placeholder="G-XXXXXXXXXX" />
            </FieldRow>
            <FieldRow label={t('dashboard.generalSettings.googleTagManager')}>
              <input type="text" value={form.googleTagManager} onChange={(e) => update('googleTagManager', e.target.value)} className={inputCls} />
            </FieldRow>
            <FieldRow label={t('dashboard.generalSettings.facebookPixel')}>
              <input type="text" value={form.facebookPixel} onChange={(e) => update('facebookPixel', e.target.value)} className={inputCls} />
            </FieldRow>
          </SectionCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}>
          <SectionCard icon={Wrench} title={t('dashboard.generalSettings.maintenance')}>
            <FieldRow label={t('dashboard.generalSettings.maintenanceMode')}>
              <Switch checked={form.maintenanceMode} onChange={(v) => update('maintenanceMode', v)} />
            </FieldRow>
            {form.maintenanceMode && (
              <FieldRow label={t('dashboard.generalSettings.maintenanceMessage')}>
                <textarea value={form.maintenanceMessage} onChange={(e) => update('maintenanceMessage', e.target.value)}
                  className="w-full min-h-[80px] px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
              </FieldRow>
            )}
          </SectionCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.45 }}>
          <SectionCard icon={HardDrive} title={t('dashboard.generalSettings.cache')}>
            <FieldRow label={t('dashboard.generalSettings.cacheEnabled')}>
              <Switch checked={form.cacheEnabled} onChange={(v) => update('cacheEnabled', v)} />
            </FieldRow>
            <FieldRow label={t('dashboard.generalSettings.cacheDuration')}>
              <div className="flex items-center gap-3">
                <input type="number" value={form.cacheDuration} onChange={(e) => update('cacheDuration', Number(e.target.value))} className={inputCls} />
                <span className="text-sm text-muted-foreground">{t('dashboard.generalSettings.seconds')}</span>
              </div>
            </FieldRow>
            <FieldRow label={t('dashboard.generalSettings.maxFileSize')}>
              <div className="flex items-center gap-3">
                <input type="number" value={form.maxFileSize} onChange={(e) => update('maxFileSize', Number(e.target.value))} className={inputCls} />
                <span className="text-sm text-muted-foreground">{t('dashboard.generalSettings.megabytes')}</span>
              </div>
            </FieldRow>
            <FieldRow label={t('dashboard.generalSettings.allowedFileTypes')}>
              <input type="text" value={form.allowedFileTypes} onChange={(e) => update('allowedFileTypes', e.target.value)} className={inputCls} />
            </FieldRow>
          </SectionCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}>
          <SectionCard icon={Mail} title={t('dashboard.generalSettings.email')}>
            <FieldRow label={t('dashboard.generalSettings.smtpHost')}>
              <input type="text" value={form.smtpHost} onChange={(e) => update('smtpHost', e.target.value)} className={inputCls} />
            </FieldRow>
            <FieldRow label={t('dashboard.generalSettings.smtpPort')}>
              <input type="number" value={form.smtpPort} onChange={(e) => update('smtpPort', Number(e.target.value))} className={inputCls} />
            </FieldRow>
            <FieldRow label={t('dashboard.generalSettings.smtpEmail')}>
              <input type="email" value={form.smtpEmail} onChange={(e) => update('smtpEmail', e.target.value)} className={inputCls} />
            </FieldRow>
            <FieldRow label={t('dashboard.generalSettings.smtpEncryption')}>
              <Dropdown
                value={form.smtpEncryption}
                onChange={(val) => update('smtpEncryption', val)}
                options={[
                  { value: 'tls', label: t('dashboard.generalSettings.tls') },
                  { value: 'ssl', label: t('dashboard.generalSettings.ssl') },
                  { value: 'none', label: t('dashboard.generalSettings.none') },
                ]}
              />
            </FieldRow>
          </SectionCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.55 }}>
          <SectionCard icon={Lock} title={t('dashboard.generalSettings.security')}>
            <FieldRow label={t('dashboard.generalSettings.recaptchaSiteKey')}>
              <input type="text" value={form.recaptchaSiteKey} onChange={(e) => update('recaptchaSiteKey', e.target.value)} className={inputCls} />
            </FieldRow>
            <FieldRow label={t('dashboard.generalSettings.recaptchaSecretKey')}>
              <input type="password" value={form.recaptchaSecretKey} onChange={(e) => update('recaptchaSecretKey', e.target.value)} className={inputCls} />
            </FieldRow>
            <FieldRow label={t('dashboard.generalSettings.twoFactorAuth')}>
              <Switch checked={form.twoFactorAuth} onChange={(v) => update('twoFactorAuth', v)} />
            </FieldRow>
            <FieldRow label={t('dashboard.generalSettings.sessionTimeout')}>
              <div className="flex items-center gap-3">
                <input type="number" value={form.sessionTimeout} onChange={(e) => update('sessionTimeout', Number(e.target.value))} className={inputCls} />
                <span className="text-sm text-muted-foreground">{t('dashboard.generalSettings.minutes')}</span>
              </div>
            </FieldRow>
          </SectionCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.6 }}>
          <SectionCard icon={ToggleLeft} title={t('dashboard.generalSettings.other')}>
            <FieldRow label={t('dashboard.generalSettings.autoSave')} desc={t('dashboard.generalSettings.autoSaveDesc')}>
              <Switch checked={form.autoSave} onChange={(v) => update('autoSave', v)} />
            </FieldRow>
            <FieldRow label={t('dashboard.generalSettings.toastNotifications')} desc={t('dashboard.generalSettings.toastNotificationsDesc')}>
              <Switch checked={form.toastNotifications} onChange={(v) => update('toastNotifications', v)} />
            </FieldRow>
          </SectionCard>
        </motion.div>
      </div>
    </div>
  );
}
