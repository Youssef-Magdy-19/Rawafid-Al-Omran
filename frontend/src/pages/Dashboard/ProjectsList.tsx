import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  SlidersHorizontal,
  Grid3X3,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Star,
  StarOff,
  X,
  ArrowUpDown,
  Loader2,
} from 'lucide-react';
import { ROUTES } from '@constants/route.constants';
import { useProjects, useDeleteProject } from '@hooks/dashboard';
import { useToast } from '@providers/ToastProvider';
import { LoadingSkeleton } from '@components/ui/LoadingSkeleton';
import { ErrorState } from '@components/ui/ErrorState';
import { Dropdown } from '@components/ui/Dropdown';

const statusColorMap: Record<string, string> = {
  planning: 'bg-muted text-muted-foreground border-border',
  'in-progress': 'bg-primary/10 text-primary border-primary/20',
  inProgress: 'bg-primary/10 text-primary border-primary/20',
  completed: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  'on-hold': 'bg-destructive/10 text-destructive border-destructive/20',
  onHold: 'bg-destructive/10 text-destructive border-destructive/20',
  cancelled: 'bg-muted text-muted-foreground border-border',
};

type SortField = 'title' | 'createdAt' | 'status';
type SortOrder = 'asc' | 'desc';

export function ProjectsList() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const isAr = i18n.language === 'ar';

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [featuredFilter, setFeaturedFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {
      page: String(currentPage),
      limit: String(itemsPerPage),
    };
    if (search) params.search = search;
    if (statusFilter !== 'all') params.status = statusFilter;
    if (categoryFilter !== 'all') params.category = categoryFilter;
    if (featuredFilter === 'featured') params.isFeatured = 'true';
    else if (featuredFilter === 'nonFeatured') params.isFeatured = 'false';
    if (sortField) params.sortBy = sortField;
    if (sortOrder) params.sortOrder = sortOrder;
    return params;
  }, [search, statusFilter, categoryFilter, featuredFilter, sortField, sortOrder, currentPage, itemsPerPage]);

  const { data, isLoading, isError, refetch } = useProjects(queryParams);
  const deleteProject = useDeleteProject();

  const projects = data?.projects || [];
  const pagination = data?.pagination;

  const filteredProjects = useMemo(() => {
    let result = [...projects];
    if (sortField === 'title') {
      result.sort((a, b) => {
        const cmp = (isAr ? a.titleAr : a.title).localeCompare(isAr ? b.titleAr : b.title);
        return sortOrder === 'asc' ? cmp : -cmp;
      });
    } else if (sortField === 'status') {
      result.sort((a, b) => {
        const cmp = a.status.localeCompare(b.status);
        return sortOrder === 'asc' ? cmp : -cmp;
      });
    }
    return result;
  }, [projects, sortField, sortOrder, isAr]);

  const totalPages = pagination?.totalPages || 0;

  const allSelected = filteredProjects.length > 0 && filteredProjects.every((p) => selectedIds.has(p.id));

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(filteredProjects.map((p) => p.id)));
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteProject.mutate(id, {
      onSuccess: () => {
        addToast(t('dashboard.projects.deletedSuccess'), 'success');
        setSelectedIds((prev) => { const n = new Set(prev); n.delete(id); return n; });
      },
      onError: () => addToast(t('common.error'), 'error'),
    });
  };

  const handleBulkDelete = () => {
    selectedIds.forEach((id) => deleteProject.mutate(id));
    addToast(t('dashboard.projects.bulkDeleted'), 'success');
    setSelectedIds(new Set());
  };

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setCategoryFilter('all');
    setFeaturedFilter('all');
    setCurrentPage(1);
  };

  const hasActiveFilters = statusFilter !== 'all' || categoryFilter !== 'all' || featuredFilter !== 'all' || search;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <LoadingSkeleton className="h-8 w-48" />
            <LoadingSkeleton className="h-4 w-64 mt-2" />
          </div>
          <LoadingSkeleton className="h-11 w-32" />
        </div>
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <LoadingSkeleton className="h-10 w-full" />
          <LoadingSkeleton className="h-6 w-full" count={5} />
        </div>
      </div>
    );
  }

  if (isError) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('dashboard.projects.pageTitle')}</h1>
          <p className="text-muted-foreground mt-1">{t('dashboard.projects.pageDescription')}</p>
        </div>
        <button
          onClick={() => navigate(ROUTES.DASHBOARD_PROJECTS_ADD)}
          className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all duration-300"
        >
          <Plus className="h-4 w-4" />
          {t('dashboard.projects.addNew')}
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-xl border border-border bg-card shadow-sm"
      >
        <div className="p-4 border-b border-border space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder={t('dashboard.projects.searchPlaceholder')}
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 h-10 px-4 rounded-lg border text-sm font-medium transition-colors ${
                showFilters || hasActiveFilters
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border text-muted-foreground hover:bg-muted'
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">{t('dashboard.projects.filterStatus')}</span>
            </button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <Dropdown
                value={statusFilter}
                onChange={(val) => { setStatusFilter(val); setCurrentPage(1); }}
                placeholder={t('dashboard.projects.allStatuses')}
                options={[
                  { value: 'planning', label: t('dashboard.home.statusPlanning') },
                  { value: 'in-progress', label: t('dashboard.home.statusInProgress') },
                  { value: 'completed', label: t('dashboard.home.statusCompleted') },
                  { value: 'on-hold', label: t('dashboard.home.statusOnHold') },
                  { value: 'cancelled', label: t('dashboard.home.statusCancelled') },
                ]}
                className="w-48"
              />

              <Dropdown
                value={categoryFilter}
                onChange={(val) => { setCategoryFilter(val); setCurrentPage(1); }}
                placeholder={t('dashboard.projects.allCategories')}
                options={[
                  { value: 'commercial', label: t('dashboard.home.categoryCommercial') },
                  { value: 'residential', label: t('dashboard.home.categoryResidential') },
                  { value: 'infrastructure', label: t('dashboard.home.categoryInfrastructure') },
                  { value: 'industrial', label: t('dashboard.home.categoryIndustrial') },
                  { value: 'educational', label: t('dashboard.home.categoryEducational') },
                ]}
                className="w-48"
              />

              <Dropdown
                value={featuredFilter}
                onChange={(val) => { setFeaturedFilter(val); setCurrentPage(1); }}
                placeholder={t('dashboard.projects.all')}
                options={[
                  { value: 'featured', label: t('dashboard.projects.featuredOnly') },
                  { value: 'nonFeatured', label: t('dashboard.projects.nonFeatured') },
                ]}
                className="w-44"
              />

              <Dropdown
                value={sortField}
                onChange={(val) => setSortField(val as SortField)}
                placeholder={t('dashboard.projects.sortDate')}
                options={[
                  { value: 'createdAt', label: t('dashboard.projects.sortDate') },
                  { value: 'title', label: t('dashboard.projects.sortName') },
                  { value: 'status', label: t('dashboard.projects.sortStatus') },
                ]}
                className="w-44"
              />

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="inline-flex items-center gap-1 h-10 px-3 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-colors"
              >
                <ArrowUpDown className="h-4 w-4" />
                {sortOrder === 'asc' ? t('dashboard.projects.ascending') : t('dashboard.projects.descending')}
              </button>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 h-10 px-3 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <X className="h-4 w-4" />
                  Clear
                </button>
              )}
            </motion.div>
          )}
        </div>

        {selectedIds.size > 0 && (
          <div className="px-4 py-3 bg-primary/5 border-b border-primary/10 flex items-center gap-3">
            <span className="text-sm font-medium text-foreground">
              {selectedIds.size} {t('dashboard.projects.selected')}
            </span>
            <div className="h-4 w-px bg-border" />
            <button
              onClick={handleBulkDelete}
              className="text-sm text-destructive hover:underline flex items-center gap-1"
            >
              <Trash2 className="h-3.5 w-3.5" />
              {t('dashboard.projects.bulkDelete')}
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                  />
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('dashboard.projects.thumbnail')}
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('dashboard.projects.projectName')}
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('dashboard.projects.category')}
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('dashboard.projects.status')}
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('dashboard.projects.featured')}
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('dashboard.projects.createdDate')}
                </th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('dashboard.projects.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Grid3X3 className="h-8 w-8 text-muted-foreground/50" />
                      <p className="text-sm font-medium text-foreground">{t('dashboard.projects.noProjects')}</p>
                      <p className="text-xs text-muted-foreground">{t('dashboard.projects.noProjectsDescription')}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => {
                  const statusClass = statusColorMap[project.status] || statusColorMap.planning;
                  return (
                    <tr
                      key={project.id}
                      className="hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/dashboard/projects/${project.slug}`)}
                    >
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedIds.has(project.id)}
                          onChange={() => toggleSelect(project.id)}
                          className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-10 w-10 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={project.thumbnail || project.images?.[0] || ''}
                            alt={isAr ? project.titleAr : project.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-medium text-foreground">
                          {isAr ? project.titleAr : project.title}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-muted-foreground">
                          {isAr && project.categoryAr ? project.categoryAr : project.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusClass}`}>
                          {t(`dashboard.home.status${project.status === 'in-progress' ? 'InProgress' : project.status === 'on-hold' ? 'OnHold' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}` as any)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {project.isFeatured ? (
                          <Star className="h-4 w-4 text-secondary fill-secondary" />
                        ) : (
                          <StarOff className="h-4 w-4 text-muted-foreground/50" />
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => navigate(`/dashboard/projects/${project.slug}`)}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                            title={t('dashboard.projects.view')}
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => navigate(`/dashboard/projects/${project.slug}/edit`)}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                            title={t('dashboard.projects.edit')}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(e, project.id)}
                            disabled={deleteProject.isPending}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-destructive transition-colors disabled:opacity-50"
                            title={t('dashboard.projects.delete')}
                          >
                            {deleteProject.isPending ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{t('dashboard.projects.showing')}</span>
            <span className="font-medium text-foreground">
              {pagination?.total === 0 ? 0 : ((pagination?.page || 1) - 1) * (pagination?.limit || 10) + 1}
            </span>
            <span>{t('dashboard.projects.to')}</span>
            <span className="font-medium text-foreground">
              {Math.min((pagination?.page || 1) * (pagination?.limit || 10), pagination?.total || 0)}
            </span>
            <span>{t('dashboard.projects.of')}</span>
            <span className="font-medium text-foreground">{pagination?.total || 0}</span>
          </div>

          <div className="flex items-center gap-3">
            <Dropdown
              value={String(itemsPerPage)}
              onChange={(val) => { setItemsPerPage(Number(val)); setCurrentPage(1); }}
              options={[
                { value: '5', label: '5' },
                { value: '10', label: '10' },
                { value: '20', label: '20' },
                { value: '50', label: '50' },
              ]}
              className="w-20"
            />

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="h-9 w-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const start = Math.max(1, currentPage - 2);
                const page = start + i;
                if (page > totalPages) return null;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-9 w-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      page === currentPage
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="h-9 w-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
