import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  Building2,
  Users,
  Wrench,
  Receipt,
  BarChart3,
  Settings,
  LifeBuoy,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  HardHat,
  FileText,
  HelpCircle,
  Handshake,
  FileSpreadsheet,
  Mail,
  MessageSquare,
  MailPlus,
  Shield,
  Bell,
  Activity,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@utils/cn';
import { ROUTES } from '@constants/route.constants';

const sidebarItems = [
  { key: 'dashboard', icon: LayoutDashboard, path: ROUTES.DASHBOARD_HOME },
  { key: 'projects', icon: Building2, path: ROUTES.DASHBOARD_PROJECTS },
  { key: 'services', icon: HardHat, path: ROUTES.DASHBOARD_SERVICES },
  { key: 'team', icon: Users, path: ROUTES.DASHBOARD_TEAM },
  { key: 'equipment', icon: Wrench, path: ROUTES.DASHBOARD_EQUIPMENT },
  { key: 'blog', icon: FileText, path: ROUTES.DASHBOARD_BLOG },
  { key: 'testimonials', icon: MessageSquare, path: ROUTES.DASHBOARD_TESTIMONIALS },
  { key: 'partners', icon: Handshake, path: ROUTES.DASHBOARD_PARTNERS },
  { key: 'faq', icon: HelpCircle, path: ROUTES.DASHBOARD_FAQ },
  { key: 'quoteRequests', icon: FileSpreadsheet, path: ROUTES.DASHBOARD_QUOTE_REQUESTS },
  { key: 'contactMessages', icon: Mail, path: ROUTES.DASHBOARD_CONTACT_MESSAGES },
  { key: 'subscribers', icon: MailPlus, path: ROUTES.DASHBOARD_SUBSCRIBERS },
  { key: 'invoices', icon: Receipt, path: ROUTES.DASHBOARD_INVOICES },
  { key: 'reports', icon: BarChart3, path: ROUTES.DASHBOARD_REPORTS },
  { key: 'notifications', icon: Bell, path: ROUTES.DASHBOARD_NOTIFICATIONS },
  { key: 'activity', icon: Activity, path: ROUTES.DASHBOARD_ACTIVITY },
  { key: 'administration', icon: Shield, path: ROUTES.DASHBOARD_ADMINISTRATION },
  { key: 'settings', icon: Settings, path: ROUTES.DASHBOARD_SETTINGS },
  { key: 'support', icon: LifeBuoy, path: ROUTES.DASHBOARD_SUPPORT },
];

interface DashboardSidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
  onMobileClose: () => void;
  onLogout: () => void;
}

export function DashboardSidebar({
  collapsed,
  mobileOpen,
  onToggle,
  onMobileClose,
  onLogout,
}: DashboardSidebarProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const sidebarContent = (
    <div className="flex h-full flex-col bg-card border-r border-border">
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <span className="text-sm font-bold">RO</span>
          </div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <p className="text-sm font-bold text-foreground">{t('company.shortName')}</p>
                <p className="text-[10px] font-medium text-muted-foreground leading-tight">
                  {t('company.tagline')}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.key}
            to={item.path}
            onClick={onMobileClose}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary/10 text-primary shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )
            }
          >
            <item.icon className="h-5 w-5 shrink-0" />
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: isRTL ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? -10 : 10 }}
                  className="truncate"
                >
                  {t(`dashboard.sidebar.${item.key}`)}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border p-3 space-y-1">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: isRTL ? -10 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? -10 : 10 }}
                className="truncate"
              >
                {t('dashboard.sidebar.logout')}
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <button
          onClick={onToggle}
          className="hidden lg:flex w-full items-center justify-center rounded-lg px-3 py-2 text-muted-foreground transition-all duration-200 hover:bg-muted"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside
        className={cn(
          'hidden lg:flex h-screen flex-col transition-all duration-300 ease-in-out',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: isRTL ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden"
            >
              <div className="relative h-full">
                {sidebarContent}
                <button
                  onClick={onMobileClose}
                  className="absolute top-4 right-4 rounded-lg p-1 text-muted-foreground hover:bg-muted lg:hidden"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
