import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, Sun, Moon, Globe, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@providers/ThemeProvider';
import { useLanguage } from '@providers/LanguageProvider';
import { Button } from '@components/ui';
import { cn } from '@utils/cn';

const navLinks = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'services', path: '/services' },
  { key: 'projects', path: '/projects' },
  { key: 'blog', path: '/blog' },
  { key: 'contact', path: '/contact' },
];

export function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, isRTL } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'premium-glass py-2'
            : isHomePage
              ? 'bg-transparent py-4'
              : 'bg-background/50 backdrop-blur-none py-4'
        )}
      >
        <nav className="container mx-auto flex h-14 items-center justify-between px-4 lg:px-8">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 group-hover:shadow-primary/40 group-hover:scale-105">
              <span className="text-sm font-bold tracking-tight">RO</span>
            </div>
            <div className="flex flex-col">
              <span className={cn(
                'text-base font-bold tracking-tight transition-colors duration-300',
                isScrolled || !isHomePage ? 'text-foreground' : 'text-white'
              )}>
                {t('company.name')}
              </span>
              <span className={cn(
                'hidden text-xs font-medium transition-colors duration-300 sm:block',
                isScrolled || !isHomePage ? 'text-muted-foreground' : 'text-white/60'
              )}>
                {t('company.tagline')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.key}
                  to={link.path}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg',
                    isActive
                      ? 'text-primary'
                      : isScrolled || !isHomePage
                        ? 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                  )}
                >
                  {t(`navigation.${link.key}`)}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-primary"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                isScrolled || !isHomePage
                  ? 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              )}
              aria-label={t('common.toggleLanguage')}
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{language === 'ar' ? 'EN' : 'AR'}</span>
            </button>
            <button
              onClick={toggleTheme}
              className={cn(
                'rounded-lg p-2 transition-all duration-200',
                isScrolled || !isHomePage
                  ? 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              )}
              aria-label={t('common.toggleTheme')}
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'light' ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </motion.div>
            </button>
            <Link to="/contact" className="hidden lg:block">
              <Button size="sm" className="shadow-lg shadow-primary/20">
                {t('common.contactUs')}
              </Button>
            </Link>
            <button
              className="lg:hidden rounded-lg p-2 transition-all duration-200"
              onClick={() => setMobileMenuOpen(true)}
              aria-label={t('common.openMenu')}
            >
              <Menu className={cn(
                'h-5 w-5',
                isScrolled || !isHomePage ? 'text-foreground' : 'text-white'
              )} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: isRTL ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={cn(
                'fixed top-0 bottom-0 z-50 w-full max-w-sm bg-background shadow-2xl lg:hidden',
                isRTL ? 'left-0' : 'right-0'
              )}
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-border px-6 py-5">
                  <Link
                    to="/"
                    className="flex items-center gap-3"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <span className="text-sm font-bold">RO</span>
                    </div>
                    <span className="text-base font-bold text-foreground">{t('company.name')}</span>
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label={t('common.closeMenu')}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto px-6 py-6">
                  <div className="space-y-1">
                    {navLinks.map((link, index) => {
                      const isActive = location.pathname === link.path;
                      return (
                        <motion.div
                          key={link.key}
                          initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            to={link.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              'flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition-all duration-200',
                              isActive
                                ? 'bg-primary/10 text-primary'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            )}
                          >
                            {isActive && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
                            {t(`navigation.${link.key}`)}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </nav>

                <div className="border-t border-border px-6 py-6 space-y-3">
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full">{t('common.contactUs')}</Button>
                  </Link>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleLanguage}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-muted px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
                    >
                      <Globe className="h-4 w-4" />
                      {language === 'ar' ? 'English' : 'العربية'}
                    </button>
                    <button
                      onClick={toggleTheme}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-muted px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
                    >
                      {theme === 'light' ? (
                        <><Moon className="h-4 w-4" />{language === 'ar' ? 'الوضع الداكن' : 'Dark'}</>
                      ) : (
                        <><Sun className="h-4 w-4" />{language === 'ar' ? 'الوضع الفاتح' : 'Light'}</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}