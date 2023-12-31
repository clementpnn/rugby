'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'
import { ColumnHeader } from '@/components/table/columnHeader'
import { RowActions } from '@/components/table/rowActions'

import { MdVerified } from 'react-icons/md'

export type Users = {
    name: string
    company: string
    status: string
    email: string
    emailVerified: boolean
    amount: number
    accepted: number
    processing: number
    refused: number
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
      const { name, emailVerified } = row.original
      return(
        <div className='flex gap-x-1'>{name} {emailVerified ?? <MdVerified className='w-4' />}</div>
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
    accessorKey: 'email',
    header: ( { column } ) => {
      return (
        <ColumnHeader title='Email' column={column} />
      )
    },
    cell: ( { row } ) => <div className="lowercase">{row.getValue( 'email' )}</div>
  },
  {
    accessorKey: 'amount',
    header: ( { column } ) => {
      return (
        <ColumnHeader title='Amount' column={column} />
      )
    },
    cell: ( { row } ) => <div className="lowercase">{row.getValue( 'amount' )}</div>
  },
  {
    accessorKey: 'processing',
    header: ( { column } ) => {
      return (
        <ColumnHeader title='Processing' column={column} />
      )
    },
    cell: ( { row } ) => <div className="lowercase">{row.getValue( 'processing' )}</div>
  },
  {
    accessorKey: 'refused',
    header: ( { column } ) => {
      return (
        <ColumnHeader title='Refused' column={column} />
      )
    },
    cell: ( { row } ) => <div className="lowercase">{row.getValue( 'refused' )}</div>
  },
  {
    accessorKey: 'accepted',
    header: ( { column } ) => {
      return (
        <ColumnHeader title='Accepted' column={column} />
      )
    },
    cell: ( { row } ) => <div className="lowercase">{row.getValue( 'accepted' )}</div>
  },
  {
    id: 'actions',
    cell: ( { row } ) => {
      return (
        <RowActions row={row} />
      )
    }
  }
]
