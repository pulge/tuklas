import { useState, useMemo } from 'react';

/**
 * A generic hook for managing bulk selections in a list.
 */
export function useBulkSelect<T extends { id: string }>(items: T[]) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleToggleSelect = (id: string, checked: boolean) => {
    const next = new Set(selectedIds);
    if (checked) next.add(id);
    else next.delete(id);
    setSelectedIds(next);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) setSelectedIds(new Set(items.map(item => item.id)));
    else setSelectedIds(new Set());
  };

  const selectedItems = useMemo(() => 
    items.filter(item => selectedIds.has(item.id)), 
  [items, selectedIds]);

  const clearSelection = () => setSelectedIds(new Set());

  return {
    selectedIds,
    selectedItems,
    handleToggleSelect,
    handleSelectAll,
    clearSelection,
    isAllSelected: items.length > 0 && items.every(item => selectedIds.has(item.id)),
    count: selectedIds.size
  };
}
