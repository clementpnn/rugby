// import { ArrowUpDown } from 'lucide-react'
// import { ButtonUI } from '../ui/button'
// import { Column } from '@tanstack/react-table'

// interface ColumnHeaderProperties<TData, TValue>
//   extends React.HTMLAttributes<HTMLDivElement> {
//   column: Column<TData, TValue>
//   title: string
// }

// export function ColumnHeader<TData, TValue>( {
//   column,
//   title
// }: ColumnHeaderProperties<TData, TValue> ) {
//   return (
//     <>
//       <ButtonUI
//         variant="link"
//         onClick={() => column.toggleSorting( column.getIsSorted() === 'asc' )}
//         className='text-blue6 p-0'
//       >
//         {title}
//         <ArrowUpDown className="ml-2 h-4 w-4" />
//       </ButtonUI>
//     </>
//   )
// }

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon
} from '@radix-ui/react-icons'
import { Column } from '@tanstack/react-table'

import { cn } from '@/libs/utils'
import { ButtonUI } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdownMenu'

interface DataTableColumnHeaderProperties<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function ColumnHeader<TData, TValue>( {
  column,
  title,
  className
}: DataTableColumnHeaderProperties<TData, TValue> ) {
  if ( !column.getCanSort() ) {
    return <div className={cn( className )}>{title}</div>
  }

  return (
    <div className={cn( 'flex items-center space-x-2', className )}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ButtonUI
            variant="link"
            size='sm'
            className='text-blue6 p-0 focus-visible:ring-0'
          >
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : ( column.getIsSorted() === 'asc' ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <CaretSortIcon className="ml-2 h-4 w-4" />
            ) )}
          </ButtonUI>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting( false )}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting( true )}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
