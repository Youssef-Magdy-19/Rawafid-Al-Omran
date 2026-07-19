import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, Sun, Moon, Globe, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@providers/ThemeProvider';
import { useLanguage } from '@providers/LanguageProvider';

const navLinks = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'services', path: '/services' },
  { key: 'projects', path: '/projects' },
  { key: 'blog', path: '/blog' },
  { key: 'careers', path: '/careers' },
  { key: 'contact', path: '/contact' },
];

export function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto flex h-18 items-center justify-between px-4 lg:px-8">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
              <span className="text-sm font-bold tracking-tight">RO</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-foreground">
                {t('company.name')}
              </span>
              <span className="hidden text-xs font-medium text-muted-foreground sm:block">
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
                  className={`relative px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
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
          <div className="flex items-center gap-1">
            <button
              onClick={toggleLanguage}
              className="group flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
              aria-label={t('common.toggleLanguage')}
            >
              <Globe className="h-4 w-4 transition-transform duration-200 group-hover:rotate-45" />
              <span className="hidden sm:inline">{language.toUpperCase()}</span>
            </button>
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
              aria-label={t('common.toggleTheme')}
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'light' ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </motion.div>
            </button>
            <button
              className="lg:hidden rounded-lg p-2 text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
              onClick={() => setMobileMenuOpen(true)}
              aria-label={t('common.openMenu')}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-background shadow-2xl lg:hidden"
            >
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-5">
                  <Link
                    to="/"
                    className="flex items-center gap-3"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <span className="text-sm font-bold">RO</span>
                    </div>
                    <span className="text-base font-bold text-foreground">
                      {t('company.name')}
                    </span>
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label={t('common.closeMenu')}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-6 py-6">
                  <div className="space-y-1">
                    {navLinks.map((link, index) => {
                      const isActive = location.pathname === link.path;
                      return (
                        <motion.div
                          key={link.key}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            to={link.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition-all duration-200 ${
                              isActive
                                ? 'bg-primary/10 text-primary'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            }`}
                          >
                            {isActive && (
                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            )}
                            {t(`navigation.${link.key}`)}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </nav>

                {/* Footer */}
                <div className="border-t px-6 py-6">
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
                        <>
                          <Moon className="h-4 w-4" />
                          {language === 'ar' ? 'الوضع الداكن' : 'Dark Mode'}
                        </>
                      ) : (
                        <>
                          <Sun className="h-4 w-4" />
                          {language === 'ar' ? 'الوضع الفاتح' : 'Light Mode'}
                        </>
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
