import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Save, Lock, Eye, EyeOff, CheckCircle2, XCircle,
} from 'lucide-react';

function getStrength(password: string): { label: string; percent: number; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  if (score <= 2) return { label: 'weak', percent: 25, color: 'bg-red-500' };
  if (score <= 3) return { label: 'fair', percent: 50, color: 'bg-amber-500' };
  if (score <= 5) return { label: 'good', percent: 75, color: 'bg-blue-500' };
  return { label: 'strong', percent: 100, color: 'bg-emerald-500' };
}

const requirements = [
  { key: 'minLength', test: (p: string) => p.length >= 8 },
  { key: 'uppercase', test: (p: string) => /[A-Z]/.test(p) },
  { key: 'lowercase', test: (p: string) => /[a-z]/.test(p) },
  { key: 'number', test: (p: string) => /[0-9]/.test(p) },
  { key: 'special', test: (p: string) => /[^a-zA-Z0-9]/.test(p) },
];

export function ChangePassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const strength = getStrength(newPassword);
  const passwordsMatch = confirmPassword.length > 0 && newPassword === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && newPassword !== confirmPassword;

  const isValid = currentPassword.length > 0 && newPassword.length >= 8 && passwordsMatch;

  // TODO: No API call — placeholder logic only.
  // Replace with actual POST /auth/change-password call using apiClient.
  const handleSubmit = () => {
    if (!isValid) return;
    setSubmitted(true);
  };

  const inputCls = 'w-full h-11 px-3 pr-10 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors';

  if (submitted) {
    return (
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard/administration')}
            className="rounded-lg p-2 border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h1 className="text-2xl font-bold text-foreground">{t('dashboard.changePassword.pageTitle')}</h1>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
          className="rounded-xl border border-border bg-card shadow-sm p-12 text-center max-w-lg mx-auto">
          <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mt-4">{t('dashboard.changePassword.successTitle')}</h2>
          <p className="text-muted-foreground mt-2">{t('dashboard.changePassword.successDescription')}</p>
          <button onClick={() => navigate('/dashboard/administration')}
            className="mt-6 inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors">
            {t('dashboard.changePassword.backToAdmin')}
          </button>
        </motion.div>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold text-foreground">{t('dashboard.changePassword.pageTitle')}</h1>
            <p className="text-muted-foreground mt-1">{t('dashboard.changePassword.pageDescription')}</p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center gap-3">
            <Lock className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">{t('dashboard.changePassword.updatePassword')}</h2>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">{t('dashboard.changePassword.currentPassword')}</label>
              <div className="relative">
                <input type={showCurrent ? 'text' : 'password'} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder={t('dashboard.changePassword.currentPasswordPlaceholder')} className={inputCls} />
                <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {currentPassword.length > 0 && currentPassword.length < 3 && (
                <p className="text-xs text-red-500 mt-1">{t('dashboard.changePassword.currentRequired')}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">{t('dashboard.changePassword.newPassword')}</label>
              <div className="relative">
                <input type={showNew ? 'text' : 'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={t('dashboard.changePassword.newPasswordPlaceholder')} className={inputCls} />
                <button type="button" onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {newPassword.length > 0 && (
                <div className="mt-3 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-300 ${strength.color}`} style={{ width: `${strength.percent}%` }} />
                    </div>
                    <span className={`text-xs font-medium ${strength.color.replace('bg-', 'text-').replace('500', '600')}`}>
                      {t(`dashboard.changePassword.${strength.label}`)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {requirements.map((req) => {
                      const passed = req.test(newPassword);
                      return (
                        <div key={req.key} className={`flex items-center gap-2 text-xs ${passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'}`}>
                          {passed ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                          {t(`dashboard.changePassword.${req.key}`)}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">{t('dashboard.changePassword.confirmPassword')}</label>
              <div className="relative">
                <input type={showConfirm ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t('dashboard.changePassword.confirmPasswordPlaceholder')} className={inputCls} />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {passwordsMatch && <p className="text-xs text-emerald-500 mt-1"><CheckCircle2 className="h-3 w-3 inline mr-1" />{t('dashboard.changePassword.passwordsMatch')}</p>}
              {passwordsMismatch && <p className="text-xs text-red-500 mt-1"><XCircle className="h-3 w-3 inline mr-1" />{t('dashboard.changePassword.passwordsMismatch')}</p>}
            </div>

            <div className="pt-2">
              <button onClick={handleSubmit} disabled={!isValid}
                className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/25 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <Save className="h-4 w-4" />{t('dashboard.changePassword.updatePassword')}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
