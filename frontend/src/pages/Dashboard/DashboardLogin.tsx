import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, Plane, Globe } from 'lucide-react';
import { ROUTES } from '@constants/route.constants';
import { useTheme } from '@providers/ThemeProvider';
import { useLanguage } from '@providers/LanguageProvider';
import { useAuthStore } from '@store/authStore';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function DashboardLogin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { toggleLanguage } = useLanguage();
  const login = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [error, setError] = useState('');

  const emailError = emailTouched && !email ? t('dashboard.login.emailRequired') : emailTouched && !EMAIL_REGEX.test(email) ? t('dashboard.login.emailInvalid') : '';
  const passwordError = passwordTouched && !password ? t('dashboard.login.passwordRequired') : '';
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);

    if (!email || !password || !EMAIL_REGEX.test(email)) return;

    setIsLoading(true);

    try {
      await login(email, password);
      navigate(ROUTES.DASHBOARD_HOME, { replace: true });
    } catch {
      setError(t('dashboard.login.authError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left - Brand Side */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-charcoal">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative flex flex-col justify-center px-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm text-white shadow-lg">
                <Plane className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{t('company.name')}</h1>
                <p className="text-sm text-white/70">{t('company.tagline')}</p>
              </div>
            </div>

            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              {t('dashboard.login.welcomeBack')}
            </h2>
            <p className="text-lg text-white/70 mb-12 max-w-md">
              {t('dashboard.login.welcomeSubtitle')}
            </p>

            <div className="grid grid-cols-2 gap-6 max-w-sm">
              {[
                { value: '2,500+', label: 'Shipments/Month' },
                { value: '98%', label: 'On-Time Delivery' },
                { value: '50+', label: 'Global Routes' },
                { value: '24/7', label: 'Support' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="rounded-xl bg-white/5 backdrop-blur-sm p-4 border border-white/10"
                >
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/60 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />

        <div className="absolute bottom-8 left-16 flex items-center gap-4 text-white/50 text-xs">
          <span>Air Freight Management System</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span>v2.0</span>
        </div>
      </div>

      {/* Right - Login Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="flex items-center justify-between mb-8 lg:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
                <Plane className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{t('company.shortName')}</p>
                <p className="text-[10px] text-muted-foreground">{t('company.tagline')}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={toggleLanguage}
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"
              >
                <Globe className="h-4 w-4" />
              </button>
              <button
                onClick={toggleTheme}
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"
              >
                {theme === 'light' ? (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                ) : (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Logo toggle area */}
          <div className="hidden lg:flex justify-end mb-8">
            <div className="flex items-center gap-1">
              <button
                onClick={toggleLanguage}
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"
                title={t('dashboard.login.switchLanguage')}
              >
                <Globe className="h-4 w-4" />
              </button>
              <button
                onClick={toggleTheme}
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"
              >
                {theme === 'light' ? (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                ) : (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                )}
              </button>
            </div>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {t('dashboard.login.title')}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t('dashboard.login.subtitle')}
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3"
            >
              <p className="text-sm text-destructive font-medium">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-foreground">
                {t('dashboard.login.emailLabel')}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                onBlur={() => setEmailTouched(true)}
                placeholder={t('dashboard.login.emailPlaceholder')}
                className={`flex h-12 w-full rounded-xl border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/50 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:shadow-md hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed ${
                  emailError ? 'border-destructive focus:ring-destructive/30 focus:border-destructive' : 'border-input'
                }`}
                autoComplete="email"
                disabled={isLoading}
              />
              {emailError && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-xs font-medium text-destructive">
                  {emailError}
                </motion.p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-foreground">
                {t('dashboard.login.passwordLabel')}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  onBlur={() => setPasswordTouched(true)}
                  placeholder={t('dashboard.login.passwordPlaceholder')}
                  className={`flex h-12 w-full rounded-xl border bg-background px-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground/50 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:shadow-md hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed ${
                    passwordError ? 'border-destructive focus:ring-destructive/30 focus:border-destructive' : 'border-input'
                  }`}
                  autoComplete="current-password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {passwordError && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-xs font-medium text-destructive">
                  {passwordError}
                </motion.p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">{t('dashboard.login.rememberMe')}</span>
              </label>
              <button type="button" className="text-sm font-medium text-primary hover:underline">
                {t('dashboard.login.forgotPassword')}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="relative flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  {t('dashboard.login.loggingIn')}
                </>
              ) : (
                t('dashboard.login.loginButton')
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            {t('dashboard.login.noAccount')}{' '}
            <button className="font-medium text-primary hover:underline">
              {t('dashboard.login.contactAdmin')}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
