import { flexRender } from '@tanstack/react-table';

import { PinnedRowProps } from './types';
import { getCommonPinningStyles } from './utils';
import { TableCell, TableRow } from '@/components/table';
import { cn } from '@heroui/react';

export function PinnedRow<TData>({
  row,
  table,
  enableStickyHeader,
}: PinnedRowProps<TData>) {
  const topOffset = enableStickyHeader ? 40 : 0;
  const topPosition =
    row.getIsPinned() === 'top'
      ? `${row.getPinnedIndex() * 48 + topOffset}px`
      : undefined;
  const bottomPosition =
    row.getIsPinned() === 'bottom'
      ? `${(table.getBottomRows().length - 1 - row.getPinnedIndex()) * 48}px`
      : undefined;

  return (
    <TableRow
      className={cn(
        'bg-content1 hover:bg-content2 dark:hover:bg-content1 sticky z-10',
        {
          'shadow-top-lg': row.getIsPinned() === 'bottom',
          'shadow-lg': row.getIsPinned() === 'top',
        }
      )}
      style={{
        top: topPosition,
        bottom: bottomPosition,
      }}
    >
      {row.getVisibleCells().map((cell) => {
        const { column } = cell;
        return (
          <TableCell
            key={cell.id}
            width={cell.column.getSize()}
            style={getCommonPinningStyles(column)}
          >
            <div className="truncate break-words">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          </TableCell>
        );
      })}
    </TableRow>
  );
}
