"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  Row,
  SortingState,
  Updater,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  //  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { Table as TanstackTable } from "@tanstack/react-table";

export interface DataTableHandle {
  getTableState: () => {
    sorting: SortingState;
    columnFilters: ColumnFiltersState;
    pagination: {
      pageIndex: number;
      pageSize: number;
    };
    selectRows: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rows: Row<any>[];
    };
  };
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: {
    pageSize: number;
    pageIndex: number;
    totalCount: number;
  };
  onPaginationChange?: (updaterOrValue: Updater<PaginationState>) => void;
  //  onPaginationChange?: (pageIndex: number) => void;
  //  onPageSizeChange?: (pageSize: number) => void;
  DataTableToolbar?: React.ComponentType<{ table: TanstackTable<TData> }>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DataTable = React.forwardRef<
  DataTableHandle,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DataTableProps<any, any>
>(
  (
    { columns, data, onPaginationChange, pagination, DataTableToolbar },
    ref
  ) => {
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] =
      React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    /*
  function onPaginationChange(updaterOrValue: Updater<PaginationState>) {
    if (typeof updaterOrValue === "function") {
    } else {
    }
  }
*/

    const table = useReactTable({
      data,
      columns,
      state: {
        sorting,
        columnVisibility,
        rowSelection,
        columnFilters,
        pagination: {
          pageIndex: pagination?.pageIndex ?? 0,
          pageSize: pagination?.pageSize ?? 10,
        },
      },
      enableRowSelection: true,
      onRowSelectionChange: setRowSelection,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onColumnVisibilityChange: setColumnVisibility,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      //    getPaginationRowModel: getPaginationRowModel(),
      manualPagination: true,
      rowCount: pagination?.totalCount,
      pageCount: Math.ceil(
        (pagination?.totalCount ?? 0) / (pagination?.pageSize ?? 10)
      ),
      onPaginationChange,
      getSortedRowModel: getSortedRowModel(),
      getFacetedRowModel: getFacetedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    React.useImperativeHandle(ref, () => ({
      getTableState: () => ({
        sorting,
        columnFilters,
        pagination: {
          pageIndex: table.getState().pagination.pageIndex,
          pageSize: table.getState().pagination.pageSize,
        },
        selectRows: {
          rows: table.getSelectedRowModel().rows,
        },
      }),
    }));

    return (
      <div className="space-y-4">
        {DataTableToolbar && <DataTableToolbar table={table} />}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} />
      </div>
    );
  }
);

DataTable.displayName = "DataTable";
