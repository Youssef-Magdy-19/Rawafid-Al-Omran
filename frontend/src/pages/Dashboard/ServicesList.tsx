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
  Power,
  PowerOff,
  HardHat,
  Ruler,
  Truck,
  Wrench,
  Building2,
  PencilRuler,
  Drill,
  PaintBucket,
  Shovel,
} from 'lucide-react';
import { ROUTES } from '@constants/route.constants';
import { mockServices } from '@data/servicesMockData';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HardHat,
  Ruler,
  Truck,
  Wrench,
  Building2,
  PencilRuler,
  Drill,
  PaintBucket,
  Shovel,
};

const categoryColorMap: Record<string, string> = {
  construction: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  engineering: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
  infrastructure: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  maintenance: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
  consulting: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
};

function getIconComponent(iconName: string) {
  const Icon = iconMap[iconName];
  if (Icon) return <Icon className="h-4 w-4" />;
  const letter = iconName.charAt(0).toUpperCase();
  return <span className="text-xs font-bold">{letter}</span>;
}

type SortField = 'nameEn' | 'displayOrder' | 'createdAt' | 'active';
type SortOrder = 'asc' | 'desc';

export function ServicesList() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [featuredFilter, setFeaturedFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('displayOrder');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...mockServices];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.nameAr.includes(q) ||
          s.nameEn.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== 'all') {
      result = result.filter((s) => s.category === categoryFilter);
    }

    if (statusFilter === 'active') {
      result = result.filter((s) => s.active);
    } else if (statusFilter === 'inactive') {
      result = result.filter((s) => !s.active);
    }

    if (featuredFilter === 'featured') {
      result = result.filter((s) => s.featured);
    } else if (featuredFilter === 'nonFeatured') {
      result = result.filter((s) => !s.featured);
    }

    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'nameEn') {
        cmp = a.nameEn.localeCompare(b.nameEn);
      } else if (sortField === 'displayOrder') {
        cmp = a.displayOrder - b.displayOrder;
      } else if (sortField === 'createdAt') {
        cmp = a.createdAt.localeCompare(b.createdAt);
      } else if (sortField === 'active') {
        cmp = Number(a.active) - Number(b.active);
      }
      return sortOrder === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [search, categoryFilter, statusFilter, featuredFilter, sortField, sortOrder]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const allSelected = paginated.length > 0 && paginated.every((s) => selectedIds.has(s.id));

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
    else setSelectedIds(new Set(paginated.map((s) => s.id)));
  };

  const handleDelete = (e: React.MouseEvent, _id: string) => {
    e.stopPropagation();
  };

  const clearFilters = () => {
    setSearch('');
    setCategoryFilter('all');
    setStatusFilter('all');
    setFeaturedFilter('all');
    setCurrentPage(1);
  };

  const hasActiveFilters = search || categoryFilter !== 'all' || statusFilter !== 'all' || featuredFilter !== 'all';

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('dashboard.services.pageTitle')}</h1>
          <p className="text-muted-foreground mt-1">{t('dashboard.services.pageDescription')}</p>
        </div>
        <button
          onClick={() => navigate(ROUTES.DASHBOARD_SERVICES_ADD)}
          className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all duration-300"
        >
          <Plus className="h-4 w-4" />
          {t('dashboard.services.addNew')}
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
                placeholder={t('dashboard.services.searchPlaceholder')}
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
              <span className="hidden sm:inline">{t('dashboard.services.filterCategory')}</span>
            </button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <select
                value={categoryFilter}
                onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                className="h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">{t('dashboard.services.allCategories')}</option>
                <option value="construction">{t('dashboard.addService.category')} - Construction</option>
                <option value="engineering">Engineering</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="maintenance">Maintenance</option>
                <option value="consulting">Consulting</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                className="h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">{t('dashboard.services.allStatuses')}</option>
                <option value="active">{t('dashboard.services.active')}</option>
                <option value="inactive">{t('dashboard.services.inactive')}</option>
              </select>

              <select
                value={featuredFilter}
                onChange={(e) => { setFeaturedFilter(e.target.value); setCurrentPage(1); }}
                className="h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">{t('dashboard.services.all')}</option>
                <option value="featured">{t('dashboard.services.featuredOnly')}</option>
                <option value="nonFeatured">{t('dashboard.services.nonFeatured')}</option>
              </select>

              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value as SortField)}
                className="h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="displayOrder">{t('dashboard.services.sortOrder')}</option>
                <option value="nameEn">{t('dashboard.services.sortName')}</option>
                <option value="createdAt">{t('dashboard.services.sortDate')}</option>
                <option value="active">{t('dashboard.services.sortStatus')}</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="inline-flex items-center gap-1 h-10 px-3 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-colors"
              >
                <ArrowUpDown className="h-4 w-4" />
                {sortOrder === 'asc' ? t('dashboard.services.ascending') : t('dashboard.services.descending')}
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
          <div className="px-4 py-3 bg-primary/5 border-b border-primary/10 flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-foreground">
              {selectedIds.size} {t('dashboard.services.selected')}
            </span>
            <div className="h-4 w-px bg-border" />
            <button className="text-sm text-destructive hover:underline flex items-center gap-1">
              <Trash2 className="h-3.5 w-3.5" />
              {t('dashboard.services.bulkDelete')}
            </button>
            <button className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
              <Power className="h-3.5 w-3.5" />
              {t('dashboard.services.bulkActivate')}
            </button>
            <button className="text-sm text-muted-foreground hover:underline flex items-center gap-1">
              <PowerOff className="h-3.5 w-3.5" />
              {t('dashboard.services.bulkDeactivate')}
            </button>
            <button className="text-sm text-secondary hover:underline flex items-center gap-1">
              <Star className="h-3.5 w-3.5" />
              {t('dashboard.services.bulkMarkFeatured')}
            </button>
            <button className="text-sm text-muted-foreground hover:underline flex items-center gap-1">
              <StarOff className="h-3.5 w-3.5" />
              {t('dashboard.services.bulkRemoveFeatured')}
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
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.services.icon')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.services.arabicName')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.services.englishName')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.services.category')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.services.featured')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.services.status')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.services.order')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.services.createdDate')}</th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.services.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Grid3X3 className="h-8 w-8 text-muted-foreground/50" />
                      <p className="text-sm font-medium text-foreground">{t('dashboard.services.noServices')}</p>
                      <p className="text-xs text-muted-foreground">{t('dashboard.services.noServicesDescription')}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((service) => {
                  const categoryClass = categoryColorMap[service.category] || '';
                  return (
                    <tr
                      key={service.id}
                      className="hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/dashboard/services/${service.id}`)}
                    >
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedIds.has(service.id)}
                          onChange={() => toggleSelect(service.id)}
                          className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                          {getIconComponent(service.icon)}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground font-medium">{service.nameAr}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{service.nameEn}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryClass}`}>
                          {service.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {service.featured ? (
                          <Star className="h-4 w-4 text-secondary fill-secondary" />
                        ) : (
                          <StarOff className="h-4 w-4 text-muted-foreground/50" />
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                          service.active
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                            : 'bg-muted text-muted-foreground border-border'
                        }`}>
                          {service.active ? t('dashboard.services.active_badge') : t('dashboard.services.inactive_badge')}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{service.displayOrder}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{service.createdAt}</td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => navigate(`/dashboard/services/${service.id}`)}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                            title={t('dashboard.services.view')}
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => navigate(`/dashboard/services/${service.id}/edit`)}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                            title={t('dashboard.services.edit')}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(e, service.id)}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-destructive transition-colors"
                            title={t('dashboard.services.delete')}
                          >
                            <Trash2 className="h-4 w-4" />
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
            <span>{t('dashboard.services.showing')}</span>
            <span className="font-medium text-foreground">
              {filtered.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
            </span>
            <span>{t('dashboard.services.to')}</span>
            <span className="font-medium text-foreground">
              {Math.min(currentPage * itemsPerPage, filtered.length)}
            </span>
            <span>{t('dashboard.services.of')}</span>
            <span className="font-medium text-foreground">{filtered.length}</span>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={itemsPerPage}
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="h-9 px-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>

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
