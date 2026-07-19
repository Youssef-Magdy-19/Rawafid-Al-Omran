import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  SlidersHorizontal,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowUpDown,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  Ban,
} from 'lucide-react';
import { ROUTES } from '@constants/route.constants';
import { mockEquipment, equipmentCategoryLabels, operatingStatusLabels } from '@data/equipmentMockData';

const categoryColorMap: Record<string, string> = {
  heavyMachinery: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  lightEquipment: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
  vehicles: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  tools: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
  safetyEquipment: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
};

const statusStyleMap: Record<string, string> = {
  operational: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  underMaintenance: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  outOfService: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
};

type SortField = 'nameEn' | 'category' | 'operatingStatus' | 'model' | 'nextMaintenanceDate';
type SortOrder = 'asc' | 'desc';

export function EquipmentList() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [maintenanceFilter, setMaintenanceFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('nameEn');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...mockEquipment];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.nameAr.includes(q) ||
          e.nameEn.toLowerCase().includes(q) ||
          e.id.toLowerCase().includes(q) ||
          e.serialNumber.toLowerCase().includes(q) ||
          e.model.toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== 'all') {
      result = result.filter((e) => e.category === categoryFilter);
    }

    if (availabilityFilter === 'available') {
      result = result.filter((e) => e.operatingStatus === 'operational');
    } else if (availabilityFilter === 'unavailable') {
      result = result.filter((e) => e.operatingStatus !== 'operational');
    }

    if (maintenanceFilter === 'overdue') {
      const today = new Date();
      result = result.filter((e) => new Date(e.nextMaintenanceDate) < today);
    } else if (maintenanceFilter === 'upcoming') {
      const today = new Date();
      const thirtyDays = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
      result = result.filter(
        (e) => new Date(e.nextMaintenanceDate) >= today && new Date(e.nextMaintenanceDate) <= thirtyDays
      );
    } else if (maintenanceFilter === 'done') {
      result = result.filter((e) => e.operatingStatus === 'operational');
    }

    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'nameEn') {
        cmp = a.nameEn.localeCompare(b.nameEn);
      } else if (sortField === 'category') {
        cmp = a.category.localeCompare(b.category);
      } else if (sortField === 'operatingStatus') {
        cmp = a.operatingStatus.localeCompare(b.operatingStatus);
      } else if (sortField === 'model') {
        cmp = a.model.localeCompare(b.model);
      } else if (sortField === 'nextMaintenanceDate') {
        cmp = a.nextMaintenanceDate.localeCompare(b.nextMaintenanceDate);
      }
      return sortOrder === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [search, categoryFilter, availabilityFilter, maintenanceFilter, sortField, sortOrder]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const allSelected = paginated.length > 0 && paginated.every((e) => selectedIds.has(e.id));

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
    else setSelectedIds(new Set(paginated.map((e) => e.id)));
  };

  const handleDelete = (e: React.MouseEvent, _id: string) => {
    e.stopPropagation();
  };

  const clearFilters = () => {
    setSearch('');
    setCategoryFilter('all');
    setAvailabilityFilter('all');
    setMaintenanceFilter('all');
    setCurrentPage(1);
  };

  const hasActiveFilters = search || categoryFilter !== 'all' || availabilityFilter !== 'all' || maintenanceFilter !== 'all';

  const categoryOptions = Object.entries(equipmentCategoryLabels);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('dashboard.equipment.pageTitle')}</h1>
          <p className="text-muted-foreground mt-1">{t('dashboard.equipment.pageDescription')}</p>
        </div>
        <button
          onClick={() => navigate(ROUTES.DASHBOARD_EQUIPMENT_ADD)}
          className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all duration-300"
        >
          <Plus className="h-4 w-4" />
          {t('dashboard.equipment.addNew')}
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
                placeholder={t('dashboard.equipment.searchPlaceholder')}
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
              <span className="hidden sm:inline">{t('dashboard.equipment.filterCategory')}</span>
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
                <option value="all">{t('dashboard.equipment.allCategories')}</option>
                {categoryOptions.map(([key]) => (
                  <option key={key} value={key}>{t(`dashboard.equipmentDetails.${key}` as any)}</option>
                ))}
              </select>

              <select
                value={availabilityFilter}
                onChange={(e) => { setAvailabilityFilter(e.target.value); setCurrentPage(1); }}
                className="h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">{t('dashboard.equipment.all')}</option>
                <option value="available">{t('dashboard.equipment.available')}</option>
                <option value="unavailable">{t('dashboard.equipment.underMaintenance')}</option>
              </select>

              <select
                value={maintenanceFilter}
                onChange={(e) => { setMaintenanceFilter(e.target.value); setCurrentPage(1); }}
                className="h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">{t('dashboard.equipment.all')}</option>
                <option value="overdue">{t('dashboard.equipment.filterMaintenanceStatus')} - Overdue</option>
                <option value="upcoming">Upcoming (30 days)</option>
              </select>

              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value as SortField)}
                className="h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="nameEn">{t('dashboard.equipment.sortName')}</option>
                <option value="category">{t('dashboard.equipment.category')}</option>
                <option value="operatingStatus">{t('dashboard.equipment.sortStatus')}</option>
                <option value="nextMaintenanceDate">{t('dashboard.equipment.sortDate')}</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="inline-flex items-center gap-1 h-10 px-3 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-colors"
              >
                <ArrowUpDown className="h-4 w-4" />
                {sortOrder === 'asc' ? t('dashboard.equipment.ascending') : t('dashboard.equipment.descending')}
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
              {selectedIds.size} {t('dashboard.equipment.selected')}
            </span>
            <div className="h-4 w-px bg-border" />
            <button className="text-sm text-destructive hover:underline flex items-center gap-1">
              <Trash2 className="h-3.5 w-3.5" />
              {t('dashboard.equipment.bulkDelete')}
            </button>
            <button className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {t('dashboard.equipment.bulkMarkAvailable')}
            </button>
            <button className="text-sm text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1">
              <AlertTriangle className="h-3.5 w-3.5" />
              {t('dashboard.equipment.bulkMarkMaintenance')}
            </button>
            <button className="text-sm text-red-600 dark:text-red-400 hover:underline flex items-center gap-1">
              <Ban className="h-3.5 w-3.5" />
              {t('dashboard.equipment.bulkMarkOutOfService')}
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
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.equipment.image')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.equipment.equipmentNameAr')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.equipment.equipmentNameEn')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.equipment.category')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.equipment.model')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.equipment.serialNumber')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.equipment.status')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.equipment.lastMaintenance')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.equipment.nextMaintenance')}</th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.equipment.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Wrench className="h-8 w-8 text-muted-foreground/50" />
                      <p className="text-sm font-medium text-foreground">{t('dashboard.equipment.noEquipment')}</p>
                      <p className="text-xs text-muted-foreground">{t('dashboard.equipment.noEquipmentDescription')}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((equip) => {
                  const categoryClass = categoryColorMap[equip.category] || '';
                  const statusClass = statusStyleMap[equip.operatingStatus] || '';
                  return (
                    <tr
                      key={equip.id}
                      className="hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/dashboard/equipment/${equip.id}`)}
                    >
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedIds.has(equip.id)}
                          onChange={() => toggleSelect(equip.id)}
                          className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-10 w-14 rounded-lg overflow-hidden border border-border bg-muted">
                          <img
                            src={equip.coverImage}
                            alt=""
                            className="h-full w-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground font-medium">{equip.nameAr}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{equip.nameEn}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryClass}`}>
                          {equip.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{equip.model}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground font-mono">{equip.serialNumber}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusClass}`}>
                          {equip.operatingStatus === 'operational' && <CheckCircle2 className="h-3 w-3" />}
                          {equip.operatingStatus === 'underMaintenance' && <AlertTriangle className="h-3 w-3" />}
                          {equip.operatingStatus === 'outOfService' && <Ban className="h-3 w-3" />}
                          {t(`dashboard.equipment.${operatingStatusLabels[equip.operatingStatus]}_badge` as any)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{equip.lastMaintenanceDate}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{equip.nextMaintenanceDate}</td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => navigate(`/dashboard/equipment/${equip.id}`)}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                            title={t('dashboard.equipment.view')}
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => navigate(`/dashboard/equipment/${equip.id}/edit`)}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                            title={t('dashboard.equipment.edit')}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(e, equip.id)}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-destructive transition-colors"
                            title={t('dashboard.equipment.delete')}
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
            <span>{t('dashboard.equipment.showing')}</span>
            <span className="font-medium text-foreground">
              {filtered.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
            </span>
            <span>{t('dashboard.equipment.to')}</span>
            <span className="font-medium text-foreground">
              {Math.min(currentPage * itemsPerPage, filtered.length)}
            </span>
            <span>{t('dashboard.equipment.of')}</span>
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
