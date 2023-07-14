
'use client'

import { ColumnDef } from '@tanstack/react-table'

import { ButtonUI } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdownMenu'
import { MoreVertical } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnHeader } from '@/components/table/columnHeader'
// import { User, Demand } from '@prisma/client'

export type Users = {
  id: number
  name: string
  company: string
  status: 'Journalist' | 'Photograph'
  email: string
  emailVerified: boolean
  amount: number
  processing: number
  refused: number
  accepted: number
}
// type Users = {
//     user: User & { demands: Demand[] }[]
// }

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
    cell: ( { row } ) => <div>{row.getValue( 'name' )}</div>
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ButtonUI variant="secondary" size='sm' className="h-8 w-8 p-0 bg-transparent hover:bg-transparent hover:scale-100 focus-visible:ring-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </ButtonUI>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              // eslint-disable-next-line no-console
              onClick={() => console.log( row.id )}
            >
                Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
