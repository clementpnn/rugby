'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'
import { ColumnHeader } from '@/components/table/columnHeader'

export type Users = {
    id: number
    name: string
    company: string
    status: string
    email: string
}

export const columns: ColumnDef<Users>[] = [
  {
    id: 'select',
    header: ( { table } ) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={( value ) => table.toggleAllPageRowsSelected( !!value )}
        aria-label="Select all"
      />
    ),
    cell: ( { row } ) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={( value ) => row.toggleSelected( !!value )}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: ( { column } ) => {
      return (
        <ColumnHeader title='Name' column={column} />
      )
    },
    cell:
    ( { row } ) => {
      const { name } = row.original
      return(
        <div className='flex gap-x-1'>{name}</div>
      )
    }
  },
  {
    accessorKey: 'company',
    header: ( { column } ) => {
      return (
        <ColumnHeader title='Company' column={column} />
      )
    },
    cell: ( { row } ) => <div>{row.getValue( 'company' )}</div>
  },
  {
    accessorKey: 'status',
    header: ( { column } ) => {
      return (
        <ColumnHeader title='Status' column={column} />
      )
    },
    cell: ( { row } ) => <div className="lowercase">{row.getValue( 'status' )}</div>
  },
  {
    accessorKey: 'email',
    header: ( { column } ) => {
      return (
        <ColumnHeader title='Email' column={column} />
      )
    },
    cell: ( { row } ) => <div className="lowercase">{row.getValue( 'email' )}</div>
  }
]
