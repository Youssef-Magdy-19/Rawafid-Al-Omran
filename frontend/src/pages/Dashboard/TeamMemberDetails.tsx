import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Pencil, Trash2, Calendar, Clock, Users, Star, StarOff,
  Power, Mail, Phone, Briefcase,
} from 'lucide-react';
import { ROUTES } from '@constants/route.constants';
import { useTeamMember, useDeleteTeamMember } from '@hooks/dashboard';
import { useToast } from '@providers/ToastProvider';
import { ErrorState } from '@components/ui/ErrorState';

const departmentColorMap: Record<string, string> = {
  management: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  engineering: 'bg-violet-500/10 text-violet-600 border-violet-500/20',
  design: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  operations: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
  finance: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  hr: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
};

export function TeamMemberDetails() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: member, isLoading, isError, error, refetch } = useTeamMember(id || '');
  const deleteTeamMember = useDeleteTeamMember();
  const { addToast } = useToast();
  const lang = i18n.language.startsWith('ar') ? 'ar' : 'en';

  const handleDelete = () => {
    if (!member?.id) return;
    if (!window.confirm(t('dashboard.teamMemberDetails.deleteConfirm'))) return;
    deleteTeamMember.mutate(member.id, {
      onSuccess: () => {
        addToast(t('dashboard.teamMemberDetails.deletedSuccess'), 'success');
        navigate(ROUTES.DASHBOARD_TEAM);
      },
      onError: () => addToast(t('common.error'), 'error'),
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-muted rounded animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-xl border border-border p-6 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-4 bg-muted rounded animate-pulse" style={{ width: `${[70, 50, 60, 80][i]}%` }} />
            ))}
          </div>
          <div className="rounded-xl border border-border p-6 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 bg-muted rounded animate-pulse" style={{ width: `${[60, 50, 70, 45, 55][i]}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError || !member) {
    return <ErrorState message={(error as Error)?.message || t('common.loadError')} onRetry={refetch} />;
  }

  const deptClass = departmentColorMap[member.department || ''] || '';
  const bio = lang === 'ar' ? member.bioAr : member.bio;
  const name = lang === 'ar' ? member.nameAr : member.name;
  const position = lang === 'ar' ? member.positionAr : member.position;

  const metaItem = (label: string, value: React.ReactNode) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm text-foreground">{value}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-border shrink-0 bg-muted">
            {member.image && <img src={member.image} alt={name} className="h-full w-full object-cover" />}
          </div>
          <div>
            <button onClick={() => navigate(ROUTES.DASHBOARD_TEAM)}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-1">
              <ArrowLeft className="h-4 w-4" />{t('dashboard.team.pageTitle')}
            </button>
            <h1 className="text-2xl font-bold text-foreground">{name}</h1>
            <p className="text-muted-foreground mt-0.5">{position}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(ROUTES.DASHBOARD_TEAM_EDIT.replace(':id', member.id))}
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
            <Pencil className="h-4 w-4" />{t('common.edit')}
          </button>
          <button onClick={handleDelete} disabled={deleteTeamMember.isPending}
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-colors disabled:opacity-50">
            <Trash2 className="h-4 w-4" />{deleteTeamMember.isPending ? t('common.deleting') : t('common.delete')}
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
            className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-border">
              <Users className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">{t('dashboard.teamMemberDetails.profileInformation')}</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.teamMemberDetails.nameAr')}</p>
                <p className="text-sm text-foreground">{member.nameAr}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.teamMemberDetails.nameEn')}</p>
                <p className="text-sm text-foreground">{member.name}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.teamMemberDetails.positionAr')}</p>
                <p className="text-sm text-foreground">{member.positionAr}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.teamMemberDetails.positionEn')}</p>
                <p className="text-sm text-foreground">{member.position}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.teamMemberDetails.department')}</p>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${deptClass}`}>
                  {member.department || '—'}
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.teamMemberDetails.displayOrder')}</p>
                <p className="text-sm text-foreground">#{member.order ?? 0}</p>
              </div>
            </div>
          </motion.div>

          {bio && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
              className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold text-foreground">{t('dashboard.teamMemberDetails.biography')}</h3>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{bio}</p>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
            className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-2">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <Users className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">{t('dashboard.teamMemberDetails.metadata')}</h3>
            </div>

            <div className="flex flex-col items-center gap-3 py-2">
              <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-border bg-muted">
                {member.image && <img src={member.image} alt="" className="h-full w-full object-cover" />}
              </div>
              <p className="text-xs text-muted-foreground">{member.id}</p>
            </div>

            {metaItem(t('dashboard.teamMemberDetails.featured'),
              member.isFeatured ? <Star className="h-4 w-4 text-secondary fill-secondary" /> : <StarOff className="h-4 w-4 text-muted-foreground/50" />
            )}
            {metaItem(t('dashboard.teamMemberDetails.status'),
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${member.isActive ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-muted text-muted-foreground border-border'}`}>
                {member.isActive ? <><Power className="h-3 w-3 mr-1" />{t('dashboard.team.active_badge')}</> : t('dashboard.team.inactive_badge')}
              </span>
            )}
            {metaItem(t('dashboard.teamMemberDetails.createdAt'),
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{new Date(member.createdAt).toLocaleDateString()}</span>
            )}
            {metaItem(t('dashboard.teamMemberDetails.updatedAt'),
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{new Date(member.updatedAt).toLocaleDateString()}</span>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">{t('dashboard.teamMemberDetails.contactInformation')}</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-sm text-foreground">{member.email || '—'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-sm text-foreground">{member.phone || '—'}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
