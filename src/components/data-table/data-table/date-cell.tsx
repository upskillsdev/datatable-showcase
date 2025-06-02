import { CellContext } from '@tanstack/react-table';
import { formatDate } from '../utils';

type DateCellProps<T> = CellContext<T, unknown>;

export const DateCell = <T,>({ getValue }: DateCellProps<T>) => {
  const value = getValue() as string | undefined;
  return <span>{formatDate(value)}</span>;
};
