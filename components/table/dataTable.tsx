'use client'

import * as React from 'react'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdownMenu'

import { ButtonUI } from '../ui/button'
import { InputUI } from '../ui/input'

import { RxMixerHorizontal } from 'react-icons/rx'
import { styled } from '@stitches/react'

import { Pagination } from './pagination'
import StatusButton from '../buttons/statusButton'

const ThickRxMixerHorizontal = styled( RxMixerHorizontal, {
  strokeWidth: '0.5px' // Ajustez la valeur pour définir l'épaisseur du trait
} )

interface DataTableProperties<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  statusButton: boolean
}

export function DataTable<TData, TValue>( {
  columns,
  data,
  statusButton
}: DataTableProperties<TData, TValue> ) {
  const [ sorting, setSorting ] = React.useState<SortingState>( [] )

  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>(
    []
  )

  const [ columnVisibility, setColumnVisibility ] =
    React.useState<VisibilityState>( {} )

  const [ rowSelection, setRowSelection ] = React.useState( {} )

  const table = useReactTable( {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  } )

  return (
    <>
      <div className="flex items-center py-4">
        <InputUI
          placeholder="Filter emails..."
          value={( table.getColumn( 'name' )?.getFilterValue() as string ) ?? ''}
          onChange={( event ) =>
            table.getColumn( 'name' )?.setFilterValue( event.target.value )
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ButtonUI variant="outline" className={`btn ${statusButton ? 'focus-visible:ring-0 ml-6' : 'focus-visible:ring-0 ml-auto'}`}>
              <ThickRxMixerHorizontal className='pr-2 w-6'/>
              Columns
            </ButtonUI>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                ( column ) => column.getCanHide()
              )
              .map( ( column ) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={( value ) =>
                      column.toggleVisibility( !!value )
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              } )}
          </DropdownMenuContent>
        </DropdownMenu>
        {statusButton ? <StatusButton/> : ''}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map( ( headerGroup ) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map( ( header ) => {
                  return (
                    <TableHead key={header.id} className='text-blue6 label-md'>
                      {header.isPlaceholder
                        ? undefined
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                } )}
              </TableRow>
            ) )}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map( ( row ) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map( ( cell ) => (
                    <TableCell key={cell.id}>
                      {flexRender( cell.column.columnDef.cell, cell.getContext() )}
                    </TableCell>
                  ) )}
                </TableRow>
              ) )
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
      <div className="flex items-center justify-center pt-4">
        <Pagination table={table} />
      </div>
    </>
  )
}
