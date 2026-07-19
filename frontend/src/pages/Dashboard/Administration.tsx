import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Building2, Settings, User, UserCircle, Lock, ArrowRight,
} from 'lucide-react';

const adminCards = [
  { key: 'companyInfo', icon: Building2, path: '/dashboard/administration/company-info', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
  { key: 'generalSettings', icon: Settings, path: '/dashboard/administration/general-settings', color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20' },
  { key: 'adminProfile', icon: User, path: '/dashboard/administration/profile', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
  { key: 'editProfile', icon: UserCircle, path: '/dashboard/administration/profile/edit', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
  { key: 'changePassword', icon: Lock, path: '/dashboard/administration/change-password', color: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' },
];

export function Administration() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('dashboard.administration.pageTitle')}</h1>
          <p className="text-muted-foreground mt-1">{t('dashboard.administration.pageDescription')}</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminCards.map((card, idx) => (
          <motion.button key={card.key} onClick={() => navigate(card.path)}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="rounded-xl border border-border bg-card shadow-sm p-6 text-left hover:shadow-md hover:border-primary/20 transition-all group">
            <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl border ${card.color} mb-4`}>
              <card.icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {t(`dashboard.administration.${card.key}`)}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {t(`dashboard.administration.${card.key}Desc`)}
            </p>
            <div className="flex items-center gap-1 mt-4 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              <span>{t('dashboard.administration.manage')}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
