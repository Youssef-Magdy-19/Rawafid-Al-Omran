import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Trash2, Calendar, Clock, User, Building2, Mail, Phone, DollarSign,
  MapPin, FileText, FileSpreadsheet, CheckCircle2, Clock as ClockIcon,
} from 'lucide-react';
import { mockQuoteRequests, statusColorMap, quoteStatusLabels } from '@data/quoteRequestsMockData';

export function QuoteRequestDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [selectedStatus, setSelectedStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');

  const qr = useMemo(() => mockQuoteRequests.find((q) => q.id === id), [id]);
  if (!qr) return (
    <div className="flex flex-col items-center justify-center py-20">
      <FileSpreadsheet className="h-12 w-12 text-muted-foreground/50 mb-4" />
      <p className="text-lg font-medium text-foreground">Quote request not found</p>
      <button onClick={() => navigate('/dashboard/quote-requests')} className="mt-4 text-sm text-primary hover:underline">{t('dashboard.quoteRequestDetails.backToQuotes')}</button>
    </div>
  );

  const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0"><Icon className="h-4 w-4 text-muted-foreground" /></div>
      <div className="min-w-0"><p className="text-xs text-muted-foreground">{label}</p><p className="text-sm font-medium text-foreground truncate">{value}</p></div>
    </div>
  );

  const statusFlow = ['pending', 'reviewed', 'inProgress', 'completed'];
  const currentStep = statusFlow.indexOf(qr.status);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard/quote-requests')}
            className="h-10 w-10 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"><ArrowLeft className="h-4 w-4" /></button>
          <div><h1 className="text-2xl font-bold text-foreground">{t('dashboard.quoteRequestDetails.pageTitle')}</h1><p className="text-muted-foreground mt-1">{t('dashboard.quoteRequestDetails.pageDescription')}</p></div>
        </div>
        <button className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
          <Trash2 className="h-4 w-4" />{t('dashboard.quoteRequestDetails.deleteQuote')}</button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="lg:col-span-1 space-y-6">
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.quoteRequestDetails.customerInformation')}</h3>
            <div className="space-y-3">
              <InfoRow icon={User} label={t('dashboard.quoteRequests.customerName')} value={qr.customerName} />
              <InfoRow icon={Building2} label={t('dashboard.quoteRequests.companyName')} value={qr.companyName || '-'} />
              <InfoRow icon={Mail} label={t('dashboard.quoteRequests.email')} value={qr.email} />
              <InfoRow icon={Phone} label={t('dashboard.quoteRequests.phone')} value={qr.phone} />
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.quoteRequestDetails.metadata')}</h3>
            <InfoRow icon={Calendar} label={t('dashboard.quoteRequestDetails.createdAt')} value={qr.createdAt} />
            <InfoRow icon={Clock} label={t('dashboard.quoteRequestDetails.updatedAt')} value={qr.updatedAt} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }} className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.quoteRequestDetails.projectInformation')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow icon={FileText} label={t('dashboard.quoteRequests.service')} value={qr.service} />
              <InfoRow icon={DollarSign} label={t('dashboard.quoteRequests.budget')} value={qr.budget} />
              <InfoRow icon={MapPin} label="Project Location" value={qr.projectLocation} />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.quoteRequestDetails.projectDetails')}</h3>
            <div className="rounded-lg bg-muted/50 p-4 text-sm text-foreground leading-relaxed">{qr.projectDetails}</div>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.quoteRequestDetails.attachments')}</h3>
            {qr.attachments.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {qr.attachments.map((att, i) => (
                  <div key={i} className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2 text-xs text-foreground">
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" />{att}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">{t('dashboard.quoteRequestDetails.noAttachments')}</p>
            )}
          </div>

          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.quoteRequestDetails.statusTimeline')}</h3>

            <div className="flex items-center gap-2 mb-4">
              {statusFlow.map((s, i) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium border ${
                    i <= currentStep ? statusColorMap[s] : 'bg-muted text-muted-foreground border-border'}`}>
                    {i <= currentStep ? <CheckCircle2 className="h-3 w-3" /> : <ClockIcon className="h-3 w-3" />}
                    {t(`dashboard.quoteRequestDetails.${s}` as any)}
                  </div>
                  {i < statusFlow.length - 1 && <div className={`flex-1 h-px ${i < currentStep ? 'bg-emerald-500' : 'bg-border'}`} />}
                </div>
              ))}
            </div>

            {qr.status === 'rejected' && (
              <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3">
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20">
                  {t('dashboard.quoteRequestDetails.rejected')}
                </span>
              </div>
            )}

            <div className="space-y-3">
              {qr.timeline.length > 0 ? qr.timeline.map((entry, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`h-3 w-3 rounded-full border-2 ${i === qr.timeline.length - 1 ? 'bg-primary border-primary' : 'bg-card border-muted-foreground/30'}`} />
                    {i < qr.timeline.length - 1 && <div className="w-px flex-1 bg-border" />}
                  </div>
                  <div className="pb-4">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusColorMap[entry.status] || ''}`}>
                        {t(`dashboard.quoteRequestDetails.${entry.status}` as any)}</span>
                      <span className="text-xs text-muted-foreground">{entry.date}</span>
                    </div>
                    <p className="text-xs text-foreground mt-1">{entry.note}</p>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-muted-foreground">{t('dashboard.quoteRequestDetails.timelineEmpty')}</p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.quoteRequestDetails.updateStatus')}</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}
                className="h-11 px-4 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring flex-1">
                <option value="">{t('dashboard.quoteRequestDetails.selectStatus')}</option>
                {Object.entries(quoteStatusLabels).map(([key]) => (
                  <option key={key} value={key}>{t(`dashboard.quoteRequestDetails.${key}` as any)}</option>
                ))}
              </select>
              <input type="text" value={statusNote} onChange={(e) => setStatusNote(e.target.value)}
                placeholder={t('dashboard.quoteRequestDetails.notePlaceholder')}
                className="h-11 px-4 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring flex-[2]" />
              <button className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25 hover:bg-primary-dark transition-all duration-300 whitespace-nowrap">
                {t('dashboard.quoteRequestDetails.updateStatus')}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
