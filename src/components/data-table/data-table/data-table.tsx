"use client";

import React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../table";

import { ColumnResizeHandle } from "./column-resize-handle";
import { DEFAULT_PAGINATION_STATE } from "./constants";
import { PinnedRow } from "./pinned-row";
import { SortingTableHeader } from "./sorting-table-header";
import { DataTableProps } from "./types";
import { getCommonPinningStyles } from "./utils";
import { cn } from "@heroui/react";

export function DataTable<TData, TValue>({
  columns,
  data,
  pinnedColumns = {
    left: [],
    right: []
  },
  enableStickyHeader,
  enableColumnResizing,
  columnResizeMode,
  columnOrder,
  columnVisibility,
  enableRowSelection,
  enableMultiRowSelection,
  tableRef,
  onRowSelectionChange,
  onPageCountChange,
  enableRowPinning,
  enableColumnPinning,
  keepPinnedRows,
  enableSorting,
  enableFilters,
  enableColumnFilters,
  globalFilterFn,
  pagination: paginationState,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = React.useState<PaginationState>(
    paginationState || DEFAULT_PAGINATION_STATE
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnPinning: pinnedColumns,
      columnOrder,
      columnVisibility,
      pagination: paginationState ? pagination : undefined,
    },
    enableColumnResizing,
    columnResizeMode,
    enableMultiRowSelection,
    enableRowSelection,
    enableRowPinning,
    enableColumnPinning,
    enableSorting,
    enableFilters,
    enableColumnFilters,
    keepPinnedRows,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    globalFilterFn,
    getPaginationRowModel: paginationState
      ? getPaginationRowModel()
      : undefined,
    onPaginationChange: setPagination,
    defaultColumn: {
      size: 170,
      minSize: 50,
      maxSize: 500,
    },
  });

  if (tableRef) {
    tableRef.current = table;
  }

  const selectedRows = table.getSelectedRowModel().rows;
  const pageCount = paginationState ? table.getPageCount() : 0;

  React.useEffect(() => {
    if (onRowSelectionChange) {
      onRowSelectionChange(selectedRows);
    }
  }, [onRowSelectionChange, selectedRows]);

  React.useEffect(() => {
    if (onPageCountChange) {
      onPageCountChange(pageCount);
    }
  }, [onPageCountChange, pageCount]);

  React.useEffect(() => {
    if (paginationState) {
      setPagination(paginationState);
    }
  }, [paginationState]);

  return (
    <Table
      className="table-fixed border-spacing-0"
      style={{
        width: table.getCenterTotalSize(),
      }}
    >
      <TableHeader
        className={cn({
          "sticky top-0 z-20 opacity-95 shadow border-none": enableStickyHeader,
        })}
      >
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow
            key={headerGroup.id}
            className="bg-content1 hover:bg-content2 dark:hover:bg-content1"
          >
            {headerGroup.headers.map((header) => {
              const { column } = header;
              return (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  className="relative"
                  style={{
                    ...getCommonPinningStyles(column),
                    width: header.getSize(),
                  }}
                >
                  {header.column.getCanSort() ? (
                    <SortingTableHeader header={header} />
                  ) : (
                    <div className="truncate break-words">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </div>
                  )}
                  <ColumnResizeHandle
                    columnResizeMode={columnResizeMode}
                    header={header}
                    table={table}
                  />
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getTopRows().map((row) => (
          <PinnedRow
            key={row.id}
            row={row}
            table={table}
            enableStickyHeader={enableStickyHeader}
          />
        ))}
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
        {table.getBottomRows().map((row) => (
          <PinnedRow
            key={row.id}
            row={row}
            table={table}
            enableStickyHeader={enableStickyHeader}
          />
        ))}
      </TableBody>
    </Table>
  );
}
