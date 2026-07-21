import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Search,
  Bell,
  Moon,
  Sun,
  Globe,
  Menu,
  User,
  Settings,
  HelpCircle,
  LogOut,
  CheckCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@providers/ThemeProvider';
import { useLanguage } from '@providers/LanguageProvider';
import { useAuthStore } from '@store/authStore';
import { apiClient } from '@services/api/client';
import { ROUTES } from '@constants/route.constants';
import { cn } from '@utils/cn';
import type { Notification } from '@services/api/types';

interface DashboardHeaderProps {
  onMenuToggle: () => void;
  onLogout: () => void;
}

export function DashboardHeader({ onMenuToggle, onLogout }: DashboardHeaderProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const user = useAuthStore((state) => state.user);
  const [searchFocused, setSearchFocused] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    apiClient
      .get<{ success: boolean; data: Notification[] }>('/dashboard/notifications')
      .then((res) => setNotifications(res.data.data || []))
      .catch(() => {});
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-xl px-4 lg:px-6 gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div
          className={cn(
            'hidden sm:flex items-center gap-2 rounded-xl border bg-muted/50 px-3 py-2 transition-all duration-300',
            searchFocused ? 'border-primary ring-2 ring-primary/20' : 'border-border'
          )}
        >
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder={t('dashboard.header.search')}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-48 lg:w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={toggleLanguage}
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          title={language === 'ar' ? 'English' : 'العربية'}
        >
          <Globe className="h-5 w-5" />
        </button>

        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
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

        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setProfileOpen(false);
            }}
            className="relative rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className={cn(
                    'absolute top-full right-0 mt-2 z-50 w-80 rounded-xl border border-border bg-card shadow-xl',
                    language === 'ar' ? 'left-0 right-auto' : ''
                  )}
                >
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <h3 className="text-sm font-semibold text-foreground">
                      {t('dashboard.header.notifications')}
                    </h3>
                    <button className="text-xs font-medium text-primary hover:underline">
                      {t('dashboard.header.markAllRead')}
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-sm text-muted-foreground">
                        {t('dashboard.header.noNotifications')}
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif._id}
                          className={cn(
                            'flex items-start gap-3 p-4 border-b border-border/50 transition-colors hover:bg-muted/50 cursor-pointer',
                            !notif.isRead && 'bg-primary/5'
                          )}
                        >
                          <div
                            className={cn(
                              'mt-1 h-2 w-2 shrink-0 rounded-full',
                              notif.isRead ? 'bg-muted-foreground/30' : 'bg-primary'
                            )}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground truncate">{notif.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {new Date(notif.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-3 border-t border-border">
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-xs font-medium text-primary hover:bg-primary/5 transition-colors">
                      <CheckCheck className="h-3.5 w-3.5" />
                      {t('dashboard.header.markAllRead')}
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotifOpen(false);
            }}
            className="ml-2 flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-muted"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-sm">
              <User className="h-4 w-4" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-foreground leading-tight">
                {user ? `${user.firstName} ${user.lastName}` : 'User'}
              </p>
              <p className="text-[11px] text-muted-foreground leading-tight capitalize">{user?.role || 'User'}</p>
            </div>
          </button>

          <AnimatePresence>
            {profileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className={cn(
                    'absolute top-full right-0 mt-2 z-50 w-56 rounded-xl border border-border bg-card shadow-xl',
                    language === 'ar' ? 'left-0 right-auto' : ''
                  )}
                >
                  <div className="p-3 border-b border-border">
                    <p className="text-sm font-medium text-foreground">
                      {user ? `${user.firstName} ${user.lastName}` : 'User'}
                    </p>
                    <p className="text-xs text-muted-foreground">{user?.email || ''}</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <button
                      onClick={() => navigate(ROUTES.DASHBOARD_ADMIN_PROFILE)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <User className="h-4 w-4 text-muted-foreground" />
                      {t('dashboard.header.profile')}
                    </button>
                    <button
                      onClick={() => navigate(ROUTES.DASHBOARD_GENERAL_SETTINGS)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Settings className="h-4 w-4 text-muted-foreground" />
                      {t('dashboard.header.accountSettings')}
                    </button>
                    <button
                      onClick={() => navigate(ROUTES.DASHBOARD_SUPPORT)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      {t('dashboard.header.helpCenter')}
                    </button>
                  </div>
                  <div className="p-2 border-t border-border">
                    <button
                      onClick={onLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      {t('dashboard.sidebar.logout')}
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
