'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel
} from '@tanstack/react-table';
import { motion } from 'framer-motion';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
}

const ScoreboardTable = <TData, TValue>({
  columns,
  data,
  pageSize
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: pageSize || 10
      }
    }
  });

  return (
    <div className="rounded-md w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative flex flex-col bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-xl"
        style={{ overscrollBehavior: 'none' }}>
        <div className="flex-none overflow-x-auto">
          <Table>
            <TableHeader className="text-muted-foreground bg-gray-800/30 backdrop-blur-sm">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="grid grid-cols-[50px_1fr_1fr_3fr_1fr] lg:grid-cols-[100px_1fr_1fr_3fr_1fr] border-b border-gray-700/50">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="flex items-center h-14">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
          </Table>
        </div>

        <div className="flex-1 overflow-auto max-h-[50vh] touch-auto">
          <Table>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <motion.tr
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    key={row.id}
                    className="grid grid-cols-[50px_1fr_1fr_3fr_1fr] lg:grid-cols-[100px_1fr_1fr_3fr_1fr] text-color-light hover:bg-gray-800/30 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex-none overflow-x-auto">
          <div className="flex items-center justify-between space-x-2 py-4 px-6 border-t border-gray-700/50">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="hover:scale-105 transition-transform">
              <ArrowLeft className="w-4 h-4 text-color-light" />
            </Button>
            <div className="text-sm text-muted-foreground">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="hover:scale-105 transition-transform">
              <ArrowRight className="w-4 h-4 text-color-light" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ScoreboardTable;
