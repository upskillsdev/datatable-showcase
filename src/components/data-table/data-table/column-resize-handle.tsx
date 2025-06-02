import { cn } from '@heroui/react';
import { Header, useReactTable } from '@tanstack/react-table';

interface ColumnResizeHandleProps<TData> {
  header: Header<TData, unknown>;
  table: ReturnType<typeof useReactTable<TData>>;
  columnResizeMode?: 'onChange' | 'onEnd';
}

export function ColumnResizeHandle<TData>({
  header,
  table,
  columnResizeMode = 'onEnd',
}: ColumnResizeHandleProps<TData>) {
  const { column } = header;

  return (
    <div
      className={cn(
        'bg-divider absolute top-0 h-full w-1 cursor-col-resize touch-none select-none',
        {
          hidden: column.getCanResize() === false,
          'right-0': table.options.columnResizeDirection === 'ltr',
          'left-0': table.options.columnResizeDirection === 'rtl',
          'bg-divider opacity-100': header.column.getIsResizing(),
        }
      )}
      onDoubleClick={() => header.column.resetSize()}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      style={{
        transform:
          columnResizeMode === 'onEnd' && header.column.getIsResizing()
            ? `translateX(${
                (table.options.columnResizeDirection === 'rtl' ? -1 : 1) *
                (table.getState().columnSizingInfo.deltaOffset ?? 0)
              }px)`
            : '',
      }}
    />
  );
}
