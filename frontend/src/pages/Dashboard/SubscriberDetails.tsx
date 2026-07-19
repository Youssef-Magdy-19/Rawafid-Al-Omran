import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MailPlus, MailX, Calendar, Trash2, ExternalLink } from 'lucide-react';
import { mockSubscribers } from '@data/newsletterMockData';

export function SubscriberDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const subscriber = mockSubscribers.find((s) => s.id === id);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!subscriber) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <MailX className="h-12 w-12 text-muted-foreground/50" />
        <p className="text-lg font-medium text-foreground">{t('dashboard.subscriberDetails.notFound')}</p>
        <button onClick={() => navigate('/dashboard/subscribers')}
          className="inline-flex items-center gap-2 h-10 px-5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4" />{t('dashboard.subscriberDetails.backToSubscribers')}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard/subscribers')}
            className="rounded-lg p-2 border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t('dashboard.subscriberDetails.pageTitle')}</h1>
            <p className="text-muted-foreground mt-1">{t('dashboard.subscriberDetails.pageDescription')}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-border bg-card shadow-sm">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">{t('dashboard.subscriberDetails.subscriberInformation')}</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.subscriberDetails.email')}</label>
                <p className="mt-1 text-sm text-foreground flex items-center gap-2">
                  {subscriber.email}
                  <a href={`mailto:${subscriber.email}`} className="text-primary hover:underline inline-flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.subscriberDetails.name')}</label>
                <p className="mt-1 text-sm text-foreground">{subscriber.name}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.subscriberDetails.status')}</label>
                <p className="mt-2">
                  {subscriber.isActive
                    ? <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"><MailPlus className="h-3 w-3" />{t('dashboard.subscribers.active_badge')}</span>
                    : <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"><MailX className="h-3 w-3" />{t('dashboard.subscribers.unsubscribed_badge')}</span>
                  }
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.subscriberDetails.source')}</label>
                <p className="mt-1 text-sm text-foreground">{subscriber.source}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-6">
          <div className="rounded-xl border border-border bg-card shadow-sm">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">{t('dashboard.subscriberDetails.metadata')}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">{t('dashboard.subscriberDetails.subscribedAt')}</p>
                  <p className="text-sm text-foreground">{subscriber.subscribedAt}</p>
                </div>
              </div>
              {subscriber.unsubscribedAt && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t('dashboard.subscriberDetails.unsubscribedAt')}</p>
                    <p className="text-sm text-foreground">{subscriber.unsubscribedAt}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-sm p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">{t('dashboard.subscriberDetails.dangerZone')}</h2>
            {!confirmDelete ? (
              <button onClick={() => setConfirmDelete(true)}
                className="w-full inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl border border-red-500/30 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors">
                <Trash2 className="h-4 w-4" />{t('dashboard.subscriberDetails.deleteSubscriber')}
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">{t('dashboard.subscriberDetails.confirmDelete')}</p>
                <div className="flex gap-2">
                  <button onClick={() => setConfirmDelete(false)}
                    className="flex-1 h-10 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
                    {t('dashboard.subscriberDetails.cancel')}
                  </button>
                  <button className="flex-1 h-10 rounded-xl bg-destructive text-sm font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors">
                    {t('dashboard.subscriberDetails.confirm')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
