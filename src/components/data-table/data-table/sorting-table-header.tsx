import { flexRender, Header } from '@tanstack/react-table';
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';

interface DataTableHeaderProps<TData, TValue> {
  header: Header<TData, TValue>;
}

export function SortingTableHeader<TData, TValue>({
  header,
}: DataTableHeaderProps<TData, TValue>) {
  const isSorted = header.column.getIsSorted();
  const toggleSortingHandler = header.column.getToggleSortingHandler();
  const nextSortingOrder = header.column.getNextSortingOrder();

  const getSortTitle = () => {
    if (nextSortingOrder === 'asc') return 'Sort ascending';
    if (nextSortingOrder === 'desc') return 'Sort descending';
    return 'Clear sort';
  };

  const getSortIcon = () => {
    if (isSorted === 'asc') return <ChevronUp size={16} />;
    if (isSorted === 'desc') return <ChevronDown size={16} />;
    return <ChevronsUpDown size={16} />;
  };

  return (
    <div className="truncate break-words">
      {header.isPlaceholder ? null : (
        <div
          className="hover:text-muted/50 flex cursor-pointer select-none items-center gap-2 transition-colors"
          onClick={toggleSortingHandler}
          title={getSortTitle()}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
          {getSortIcon()}
        </div>
      )}
    </div>
  );
}
