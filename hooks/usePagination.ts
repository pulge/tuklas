import { useState, useMemo } from "react";

export function usePagination<T>(items: T[], initialPageSize = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = useMemo(() => Math.ceil(items.length / pageSize), [items.length, pageSize]);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return items.slice(start, end);
  }, [items, currentPage, pageSize]);

  // Reset to first page when items change or page size changes
  // Pattern: Adjusting state during render (avoids cascading effect renders)
  const [prevItemsLength, setPrevItemsLength] = useState(items.length);
  const [prevPageSize, setPrevPageSize] = useState(pageSize);

  if (items.length !== prevItemsLength || pageSize !== prevPageSize) {
    setPrevItemsLength(items.length);
    setPrevPageSize(pageSize);
    setCurrentPage(1);
  }

  return {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    paginatedItems,
  };
}
