import { CSSProperties } from 'react';
import { Column } from '@tanstack/react-table';

export const getCommonPinningStyles = <TData, TValue>(
  column: Column<TData, TValue>
): CSSProperties | undefined => {
  const isPinned = column.getIsPinned();
  const canPin = column.getCanPin();
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right');

  if (!canPin) {
    return;
  }

  return {
    boxShadow: isLastLeftPinnedColumn
      ? '-4px 0 4px -4px #afafaf9b inset'
      : isFirstRightPinnedColumn
      ? '4px 0 4px -4px #afafaf9b inset'
      : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
    backgroundColor: isPinned ? 'Background' : 'transparent',
  };
};
