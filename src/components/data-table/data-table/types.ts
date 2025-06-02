import {
  BuiltInFilterFn,
  ColumnDef,
  ColumnOrderState,
  ColumnPinningState,
  ColumnResizeMode,
  PaginationState,
  Row,
  Table,
  VisibilityState,
} from '@tanstack/react-table';

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pinnedColumns?: ColumnPinningState;
  keepPinnedRows?: boolean;
  enableStickyHeader?: boolean;
  enableColumnResizing?: boolean;
  columnResizeMode?: ColumnResizeMode;
  columnOrder?: ColumnOrderState;
  columnVisibility?: VisibilityState;
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
  enableMultiRowSelection?: boolean | ((row: Row<TData>) => boolean);
  enableRowPinning?: boolean | ((row: Row<TData>) => boolean);
  enableColumnPinning?: boolean;
  enableSorting?: boolean;
  enableFilters?: boolean;
  enableColumnFilters?: boolean;
  globalFilterFn?: BuiltInFilterFn;
  pagination?: PaginationState;
  tableRef?: React.MutableRefObject<Table<TData> | undefined>;
  onRowSelectionChange?: (selectedRows: Row<TData>[]) => void;
  onPageCountChange?: (pageCount: number) => void;
}

export interface PinnedRowProps<TData> {
  row: Row<TData>;
  table: Table<TData>;
  enableStickyHeader?: boolean;
}
