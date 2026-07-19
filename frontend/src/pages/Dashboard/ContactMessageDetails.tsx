import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Trash2, Calendar, Clock, User, Mail, Phone, Building2, FileText,
  Send, CheckCircle2, XCircle, Archive,
} from 'lucide-react';
import { mockContactMessages } from '@data/contactMessagesMockData';

export function ContactMessageDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [replyText, setReplyText] = useState('');

  const msg = useMemo(() => mockContactMessages.find((m) => m.id === id), [id]);
  if (!msg) return (
    <div className="flex flex-col items-center justify-center py-20">
      <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
      <p className="text-lg font-medium text-foreground">Message not found</p>
      <button onClick={() => navigate('/dashboard/contact-messages')} className="mt-4 text-sm text-primary hover:underline">{t('dashboard.contactMessageDetails.backToMessages')}</button>
    </div>
  );

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
          <button onClick={() => navigate('/dashboard/contact-messages')}
            className="h-10 w-10 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"><ArrowLeft className="h-4 w-4" /></button>
          <div><h1 className="text-2xl font-bold text-foreground">{t('dashboard.contactMessageDetails.pageTitle')}</h1><p className="text-muted-foreground mt-1">{t('dashboard.contactMessageDetails.pageDescription')}</p></div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 transition-colors">
            {msg.isRead ? <XCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
            {msg.isRead ? t('dashboard.contactMessageDetails.markUnread') : t('dashboard.contactMessageDetails.markRead')}
          </button>
          <button className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border text-sm font-medium text-violet-600 dark:text-violet-400 hover:bg-violet-500/10 transition-colors">
            <Archive className="h-4 w-4" />{msg.isArchived ? t('dashboard.contactMessageDetails.unarchive') : t('dashboard.contactMessageDetails.archive')}
          </button>
          <button className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
            <Trash2 className="h-4 w-4" />{t('dashboard.contactMessageDetails.deleteMessage')}
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="lg:col-span-1 space-y-6">
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.contactMessageDetails.senderInformation')}</h3>
            <div className="space-y-3">
              <InfoRow icon={User} label={t('dashboard.contactMessages.senderName')} value={msg.senderName} />
              <InfoRow icon={Mail} label={t('dashboard.contactMessages.email')} value={msg.email} />
              <InfoRow icon={Phone} label={t('dashboard.contactMessages.phone')} value={msg.phone} />
              <InfoRow icon={Building2} label={t('dashboard.contactMessages.company')} value={msg.company || t('dashboard.contactMessageDetails.noCompany')} />
              <InfoRow icon={FileText} label={t('dashboard.contactMessages.service')} value={msg.service} />
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.contactMessageDetails.metadata')}</h3>
            <InfoRow icon={Calendar} label={t('dashboard.contactMessageDetails.createdAt')} value={msg.createdAt} />
            <InfoRow icon={Clock} label={t('dashboard.contactMessageDetails.updatedAt')} value={msg.updatedAt} />
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
            <h3 className="text-lg font-semibold text-foreground">Reply</h3>
            <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)}
              placeholder={t('dashboard.contactMessageDetails.replyPlaceholder')}
              className="w-full min-h-[120px] px-4 py-3 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-y" rows={4} />
            <div className="flex justify-end">
              <button className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
