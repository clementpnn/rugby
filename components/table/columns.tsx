
'use client'

import { ColumnDef } from '@tanstack/react-table'

import { ButtonUI } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdownMenu'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export const columns: ColumnDef<Payment>[] = [
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
    accessorKey: 'status',
    header: ( { column } ) => {
      return (
        <ButtonUI
          variant="secondary"
          onClick={() => column.toggleSorting( column.getIsSorted() === 'asc' )}
        >
          status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </ButtonUI>
      )
    },
    cell: ( { row } ) => <div className="lowercase">{row.getValue( 'status' )}</div>
  },
  {
    accessorKey: 'email',
    header: ( { column } ) => {
      return (
        <ButtonUI
          variant="secondary"
          onClick={() => column.toggleSorting( column.getIsSorted() === 'asc' )}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </ButtonUI>
      )
    },
    cell: ( { row } ) => <div className="lowercase">{row.getValue( 'email' )}</div>
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-left">Amount</div>,
    cell: ( { row } ) => {
      const amount = Number.parseFloat( row.getValue( 'amount' ) )
      const formatted = new Intl.NumberFormat( 'en-US', {
        style: 'currency',
        currency: 'USD'
      } ).format( amount )

      return <div className="text-left font-medium">{formatted}</div>
    }
  },
  {
    id: 'actions',
    cell: ( { row } ) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ButtonUI variant="primary" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </ButtonUI>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText( payment.id )}
            >
                Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
