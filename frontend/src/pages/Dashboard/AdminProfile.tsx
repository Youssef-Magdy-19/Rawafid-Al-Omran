import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, User, Mail, Phone, Shield, Calendar, Clock, Link,
  Edit3, Lock, CheckCircle, XCircle,
} from 'lucide-react';
import { mockAdminProfile } from '@data/adminMockData';

export function AdminProfile() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const profile = mockAdminProfile;

  const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
    <div className="flex items-start gap-3">
      <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm text-foreground font-medium">{value}</p>
      </div>
    </div>
  );

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
            <h1 className="text-2xl font-bold text-foreground">{t('dashboard.adminProfile.pageTitle')}</h1>
            <p className="text-muted-foreground mt-1">{t('dashboard.adminProfile.pageDescription')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard/administration/profile/edit')}
            className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors">
            <Edit3 className="h-4 w-4" />{t('dashboard.adminProfile.editProfile')}
          </button>
          <button onClick={() => navigate('/dashboard/administration/change-password')}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
            <Lock className="h-4 w-4" />{t('dashboard.adminProfile.changePassword')}
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-muted/30">
              <h2 className="text-lg font-semibold text-foreground">{t('dashboard.adminProfile.profileInformation')}</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              <InfoRow icon={User} label={t('dashboard.adminProfile.name')} value={profile.nameAr} />
              <InfoRow icon={Mail} label={t('dashboard.adminProfile.email')} value={profile.email} />
              <InfoRow icon={Phone} label={t('dashboard.adminProfile.phone')} value={profile.phone} />
              <InfoRow icon={Shield} label={t('dashboard.adminProfile.role')} value={profile.role} />
              <InfoRow icon={Clock} label={t('dashboard.adminProfile.lastLogin')} value={profile.lastLogin} />
              <InfoRow icon={Calendar} label={t('dashboard.adminProfile.joinedDate')} value={profile.joinedDate} />
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
                  {profile.accountStatus === 'active'
                    ? <CheckCircle className="h-4 w-4 text-emerald-500" />
                    : <XCircle className="h-4 w-4 text-red-500" />}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{t('dashboard.adminProfile.accountStatus')}</p>
                  <p className="text-sm font-medium text-foreground">
                    {profile.accountStatus === 'active'
                      ? <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"><CheckCircle className="h-3 w-3" />{t('dashboard.adminProfile.active')}</span>
                      : <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"><XCircle className="h-3 w-3" />{t('dashboard.adminProfile.inactive')}</span>
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-muted/30">
              <h2 className="text-lg font-semibold text-foreground">{t('dashboard.adminProfile.biography')}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">{t('dashboard.adminProfile.bioAr')}</p>
                <p className="text-sm text-foreground leading-relaxed">{profile.biographyAr}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">{t('dashboard.adminProfile.bioEn')}</p>
                <p className="text-sm text-foreground leading-relaxed">{profile.biographyEn}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-6">
          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="p-6 text-center">
              <div className="h-28 w-28 rounded-2xl bg-muted mx-auto flex items-center justify-center overflow-hidden border-2 border-border">
                {profile.profileImage
                  ? <img src={profile.profileImage} alt={profile.nameAr} className="h-full w-full object-cover" />
                  : <User className="h-10 w-10 text-muted-foreground" />}
              </div>
              <h2 className="text-xl font-bold text-foreground mt-4">{profile.nameAr}</h2>
              <p className="text-sm text-muted-foreground">{profile.nameEn}</p>
              <div className="mt-3">
                <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary border-primary/20">
                  {t('dashboard.adminProfile.roleLabel')}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-muted/30">
              <h2 className="text-lg font-semibold text-foreground">{t('dashboard.adminProfile.socialLinks')}</h2>
            </div>
            <div className="p-6 space-y-3">
              {profile.socialLinks.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t('dashboard.adminProfile.noSocialLinks')}</p>
              ) : (
                profile.socialLinks.map((link, idx) => (
                  <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors group">
                    <Link className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm text-foreground capitalize">{link.platform}</span>
                  </a>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
