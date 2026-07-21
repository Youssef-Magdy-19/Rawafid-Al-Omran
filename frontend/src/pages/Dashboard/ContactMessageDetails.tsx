import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Trash2, Calendar, Clock, User, Mail, Phone,
  Send, CheckCircle2, XCircle,
} from 'lucide-react';
import { ROUTES } from '@constants/route.constants';
import { useContact, useUpdateContact, useDeleteContact } from '@hooks/dashboard';
import { useToast } from '@providers/ToastProvider';
import { LoadingSkeleton } from '@components/ui/LoadingSkeleton';
import { ErrorState } from '@components/ui/ErrorState';

export function ContactMessageDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addToast } = useToast();
  const [replyText, setReplyText] = useState('');

  const { data: msg, isLoading, isError, refetch } = useContact(id || '');
  const updateContact = useUpdateContact();
  const deleteContact = useDeleteContact();

  const handleToggleRead = () => {
    if (!id || !msg) return;
    updateContact.mutate({ id, data: { isRead: !msg.isRead } }, {
      onSuccess: () => addToast(t('dashboard.contactMessageDetails.statusUpdated'), 'success'),
      onError: () => addToast(t('common.error'), 'error'),
    });
  };

  const handleDelete = () => {
    if (!id) return;
    deleteContact.mutate(id, {
      onSuccess: () => {
        addToast(t('dashboard.contactMessages.deletedSuccess'), 'success');
        navigate(ROUTES.DASHBOARD_CONTACT_MESSAGES);
      },
      onError: () => addToast(t('common.error'), 'error'),
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <LoadingSkeleton className="h-10 w-10 rounded-xl" />
          <div><LoadingSkeleton className="h-8 w-48" /><LoadingSkeleton className="h-4 w-64 mt-2" /></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <LoadingSkeleton className="h-64 rounded-xl" />
          <div className="lg:col-span-2"><LoadingSkeleton className="h-96 rounded-xl" /></div>
        </div>
      </div>
    );
  }

  if (isError || !msg) {
    return (
      <ErrorState
        title={t('dashboard.contactMessageDetails.notFound')}
        message={t('dashboard.contactMessageDetails.notFoundDescription')}
        onRetry={refetch}
      />
    );
  }

  const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0"><Icon className="h-4 w-4 text-muted-foreground" /></div>
      <div className="min-w-0"><p className="text-xs text-muted-foreground">{label}</p><p className="text-sm font-medium text-foreground truncate">{value}</p></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(ROUTES.DASHBOARD_CONTACT_MESSAGES)}
            className="h-10 w-10 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"><ArrowLeft className="h-4 w-4" /></button>
          <div><h1 className="text-2xl font-bold text-foreground">{t('dashboard.contactMessageDetails.pageTitle')}</h1><p className="text-muted-foreground mt-1">{t('dashboard.contactMessageDetails.pageDescription')}</p></div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleToggleRead} disabled={updateContact.isPending}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border text-sm font-medium text-blue-600 hover:bg-blue-500/10 transition-colors disabled:opacity-50">
            {msg.isRead ? <XCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
            {msg.isRead ? t('dashboard.contactMessageDetails.markUnread') : t('dashboard.contactMessageDetails.markRead')}
          </button>
          <button onClick={handleDelete} disabled={deleteContact.isPending}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50">
            <Trash2 className="h-4 w-4" />{t('dashboard.contactMessageDetails.deleteMessage')}
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="lg:col-span-1 space-y-6">
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.contactMessageDetails.senderInformation')}</h3>
            <div className="space-y-3">
              <InfoRow icon={User} label={t('dashboard.contactMessages.senderName')} value={msg.name} />
              <InfoRow icon={Mail} label={t('dashboard.contactMessages.email')} value={msg.email} />
              {msg.phone && <InfoRow icon={Phone} label={t('dashboard.contactMessages.phone')} value={msg.phone} />}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.contactMessageDetails.metadata')}</h3>
            <InfoRow icon={Calendar} label={t('dashboard.contactMessageDetails.createdAt')} value={new Date(msg.createdAt).toLocaleDateString()} />
            <InfoRow icon={Clock} label={t('dashboard.contactMessageDetails.updatedAt')} value={new Date(msg.updatedAt).toLocaleDateString()} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }} className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.contactMessageDetails.messageContent')}</h3>
            <div>
              <p className="text-xs text-muted-foreground mb-1">{t('dashboard.contactMessageDetails.subject')}</p>
              <p className="text-base font-semibold text-foreground">{msg.subject}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">{t('dashboard.contactMessageDetails.message')}</p>
              <div className="rounded-lg bg-muted/50 p-4 text-sm text-foreground leading-relaxed whitespace-pre-wrap">{msg.message}</div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.contactMessageDetails.reply')}</h3>
            <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)}
              placeholder={t('dashboard.contactMessageDetails.replyPlaceholder')}
              className="w-full min-h-[120px] px-4 py-3 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-y" rows={4} />
            <div className="flex justify-end">
              <button onClick={() => addToast(t('common.comingSoon'), 'info')} className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!replyText.trim()}>
                <Send className="h-4 w-4" />{t('dashboard.contactMessageDetails.sendReply')}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
