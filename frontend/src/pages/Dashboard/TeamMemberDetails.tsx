import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Calendar,
  Clock,
  Globe,
  Image as ImageIcon,
  Hash,
  ChevronLeft,
  ChevronRight,
  Users,
  Star,
  StarOff,
  Power,
  Mail,
  Phone,
  MessageCircle,
  Linkedin,
  Facebook,
  Instagram,
  Briefcase,
  Award,
  BookOpen,
} from 'lucide-react';
import { mockTeam } from '@data/teamMockData';
import { ROUTES } from '@constants/route.constants';

const departmentColorMap: Record<string, string> = {
  management: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  engineering: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
  design: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  operations: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
  finance: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  hr: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
};

export function TeamMemberDetails() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isAr = i18n.language === 'ar';

  const [galleryIndex, setGalleryIndex] = useState(0);

  const member = useMemo(() => mockTeam.find((m) => m.id === id), [id]);

  if (!member) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-medium text-foreground">Team member not found</p>
        <button
          onClick={() => navigate(ROUTES.DASHBOARD_TEAM)}
          className="mt-4 text-sm text-primary hover:underline"
        >
          {t('dashboard.team.pageTitle')}
        </button>
      </div>
    );
  }

  const allImages = [member.profileImage, ...member.galleryImages].filter(Boolean);
  const deptClass = departmentColorMap[member.department] || '';
  const skills = member.skills.split(',').map((s) => s.trim()).filter(Boolean);
  const certifications = member.certifications.split(',').map((c) => c.trim()).filter(Boolean);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button
          onClick={() => navigate(ROUTES.DASHBOARD_TEAM)}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('dashboard.teamMemberDetails.backToTeam')}
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-border shrink-0">
              <img
                src={member.profileImage}
                alt={isAr ? member.nameAr : member.nameEn}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {isAr ? member.nameAr : member.nameEn}
              </h1>
              <p className="text-muted-foreground mt-1">{isAr ? member.positionAr : member.positionEn}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/dashboard/team/${member.id}/edit`)}
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all duration-300"
            >
              <Pencil className="h-4 w-4" />
              {t('dashboard.teamMemberDetails.editTeam')}
            </button>
            <button className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-destructive/30 text-destructive font-semibold hover:bg-destructive/10 transition-all duration-300">
              <Trash2 className="h-4 w-4" />
              {t('dashboard.teamMemberDetails.deleteTeam')}
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {allImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-xl border border-border bg-card shadow-sm overflow-hidden"
            >
              <div className="p-5 border-b border-border flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold text-foreground">{t('dashboard.teamMemberDetails.gallery')}</h3>
              </div>

              <div className="relative">
                <img
                  src={allImages[galleryIndex]}
                  alt={`${isAr ? member.nameAr : member.nameEn} - ${galleryIndex + 1}`}
                  className="w-full h-[320px] object-cover"
                />
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setGalleryIndex((i) => (i === 0 ? allImages.length - 1 : i - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setGalleryIndex((i) => (i === allImages.length - 1 ? 0 : i + 1))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {allImages.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setGalleryIndex(i)}
                          className={`h-2 w-2 rounded-full transition-all ${
                            i === galleryIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {allImages.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setGalleryIndex(i)}
                      className={`shrink-0 h-16 w-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        i === galleryIndex ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6"
          >
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
                <p className="text-sm text-foreground">{member.nameEn}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.teamMemberDetails.positionAr')}</p>
                <p className="text-sm text-foreground">{member.positionAr}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.teamMemberDetails.positionEn')}</p>
                <p className="text-sm text-foreground">{member.positionEn}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.teamMemberDetails.department')}</p>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${deptClass}`}>
                  {member.department}
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.teamMemberDetails.displayOrder')}</p>
                <p className="text-sm text-foreground">#{member.displayOrder}</p>
              </div>
            </div>
          </motion.div>

          {(isAr ? member.shortBioAr : member.shortBioEn) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold text-foreground">{t('dashboard.teamMemberDetails.shortBioAr')}</h3>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{isAr ? member.shortBioAr : member.shortBioEn}</p>
            </motion.div>
          )}

          {(isAr ? member.fullBioAr : member.fullBioEn) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold text-foreground">{t('dashboard.teamMemberDetails.biography')}</h3>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{isAr ? member.fullBioAr : member.fullBioEn}</p>
            </motion.div>
          )}

          {member.experience && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold text-foreground">{t('dashboard.teamMemberDetails.experience')}</h3>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{member.experience}</p>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-5"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">{t('dashboard.teamMemberDetails.metadata')}</h3>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col items-center gap-3 py-2">
                <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-border">
                  <img src={member.profileImage} alt="" className="h-full w-full object-cover" />
                </div>
                <p className="text-xs text-muted-foreground">{member.id}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('dashboard.teamMemberDetails.featured')}</span>
                {member.featured ? (
                  <Star className="h-4 w-4 text-secondary fill-secondary" />
                ) : (
                  <StarOff className="h-4 w-4 text-muted-foreground/50" />
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('dashboard.teamMemberDetails.status')}</span>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                  member.active
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                    : 'bg-muted text-muted-foreground border-border'
                }`}>
                  {member.active ? (
                    <><Power className="h-3 w-3 mr-1" />{t('dashboard.team.active_badge')}</>
                  ) : (
                    t('dashboard.team.inactive_badge')
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('dashboard.teamMemberDetails.yearsOfExperience')}</span>
                <span className="text-sm font-medium text-foreground">{member.yearsOfExperience} yrs</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('dashboard.teamMemberDetails.createdAt')}</span>
                <span className="text-sm text-foreground flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  {member.createdAt}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('dashboard.teamMemberDetails.updatedAt')}</span>
                <span className="text-sm text-foreground flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  {member.updatedAt}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-5"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">{t('dashboard.teamMemberDetails.contactInformation')}</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-sm text-foreground">{member.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-sm text-foreground">{member.phone}</span>
              </div>
              {member.whatsapp && (
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm text-foreground">{member.whatsapp}</span>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-5"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">{t('dashboard.teamMemberDetails.socialLinks')}</h3>
            </div>

            <div className="space-y-3">
              {member.linkedin ? (
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors">
                  <Linkedin className="h-4 w-4 shrink-0" />
                  <span className="truncate">{member.linkedin}</span>
                </a>
              ) : (
                <p className="text-sm text-muted-foreground">—</p>
              )}
              {member.facebook ? (
                <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors">
                  <Facebook className="h-4 w-4 shrink-0" />
                  <span className="truncate">{member.facebook}</span>
                </a>
              ) : null}
              {member.instagram ? (
                <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors">
                  <Instagram className="h-4 w-4 shrink-0" />
                  <span className="truncate">{member.instagram}</span>
                </a>
              ) : null}
            </div>
          </motion.div>

          {skills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-5"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <Award className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold text-foreground">{t('dashboard.teamMemberDetails.skills')}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {certifications.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-5"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <Award className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold text-foreground">{t('dashboard.teamMemberDetails.certifications')}</h3>
              </div>

              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-2 text-sm text-foreground">
                    <Award className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-5"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">{t('dashboard.teamMemberDetails.seoInformation')}</h3>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.teamMemberDetails.seoTitleAr')}</p>
                <p className="text-sm text-foreground">{member.seo.titleAr || '—'}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.teamMemberDetails.seoTitleEn')}</p>
                <p className="text-sm text-foreground">{member.seo.titleEn || '—'}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.teamMemberDetails.seoDescriptionAr')}</p>
                <p className="text-sm text-foreground">{member.seo.descriptionAr || '—'}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.teamMemberDetails.seoDescriptionEn')}</p>
                <p className="text-sm text-foreground">{member.seo.descriptionEn || '—'}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.teamMemberDetails.seoKeywords')}</p>
                <p className="text-sm text-foreground">
                  {member.seo.keywords
                    ? member.seo.keywords.split(',').map((kw) => (
                        <span key={kw.trim()} className="inline-block mr-1.5 mb-1 rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          {kw.trim()}
                        </span>
                      ))
                    : '—'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
