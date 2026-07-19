import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@providers/LanguageProvider';
import { cn } from '@utils/cn';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';

const footerLinks = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'services', path: '/services' },
  { key: 'projects', path: '/projects' },
  { key: 'blog', path: '/blog' },
  { key: 'careers', path: '/careers' },
  { key: 'contact', path: '/contact' },
  { key: 'faq', path: '/faq' },
];

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
];

export function Footer() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t bg-gradient-to-b from-background to-muted/20">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className={cn('space-y-6', isRTL && 'md:text-right')}>
            <Link to="/" className="group inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
                <span className="text-base font-bold">RO</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-foreground">{t('company.name')}</span>
                <span className="text-xs font-medium text-muted-foreground">{t('company.tagline')}</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t('footer.description')}
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <span className="h-1 w-1 rounded-full bg-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    {t(`navigation.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('footer.contactInfo')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-4 w-4" />
                </div>
                <span>info@rawafidomran.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="h-4 w-4" />
                </div>
                <span>+966 XX XXX XXXX</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>{t('footer.riyadh')}</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('footer.legal')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/privacy"
                  className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <span className="h-1 w-1 rounded-full bg-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <span className="h-1 w-1 rounded-full bg-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 border-t border-border/50 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {t('company.name')}. {t('footer.rights')}
            </p>
            <p className="text-xs text-muted-foreground">
              Crafted with precision in Riyadh
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
