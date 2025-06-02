import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta {
    headerText?: string;
    filterControlType?: 'input' | 'select' | 'multi-select' | 'date' | 'range';
    filterControlOptions?: {
      label: string;
      value: string | number;
    }[];
  }
}
