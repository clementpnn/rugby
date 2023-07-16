import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { ButtonUI } from '@/components/ui/button'
import {
  SelectUI,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

  interface PaginationProperties<TData> {
    table: Table<TData>
  }

export function Pagination<TData>( {
  table
}: PaginationProperties<TData> ) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 base-sm text-neutral5">
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="base-sm text-blue9">Rows per page</p>
          <SelectUI
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={( value ) => {
              table.setPageSize( Number( value ) )
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[ 10, 20, 30, 40, 50 ].map( ( pageSize ) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ) )}
            </SelectContent>
          </SelectUI>
        </div>
        <div className="flex w-[100px] items-center justify-center base-sm text-blue9">
            Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <ButtonUI
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex( 0 )}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </ButtonUI>
          <ButtonUI
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </ButtonUI>
          <ButtonUI
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </ButtonUI>
          <ButtonUI
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex( table.getPageCount() - 1 )}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </ButtonUI>
        </div>
      </div>
    </div>
  )
}