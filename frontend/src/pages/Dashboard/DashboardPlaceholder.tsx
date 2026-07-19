import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';

interface DashboardPlaceholderProps {
  section: string;
}

export function DashboardPlaceholder({ section }: DashboardPlaceholderProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {t(`dashboard.sidebar.${section}`)}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('dashboard.placeholder.description')}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-xl border border-border bg-card shadow-sm p-12 flex flex-col items-center justify-center gap-4"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Construction className="h-10 w-10" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">
          {t(`dashboard.sidebar.${section}`)}
        </h2>
        <p className="text-sm text-muted-foreground text-center max-w-md">
          {t('dashboard.placeholder.comingSoon')}
        </p>
      </motion.div>
    </div>
  );
}
