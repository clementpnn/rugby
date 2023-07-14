import { ArrowUpDown } from 'lucide-react'
import { ButtonUI } from '../ui/button'
import { Column } from '@tanstack/react-table'

interface ColumnHeaderProperties<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function ColumnHeader<TData, TValue>( {
  column,
  title
}: ColumnHeaderProperties<TData, TValue> ) {
  return (
    <>
      <ButtonUI
        variant="secondary"
        onClick={() => column.toggleSorting( column.getIsSorted() === 'asc' )}
        className='p-0 bg-transparent hover:bg-transparent'
      >
        {title}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </ButtonUI>
    </>
  )
}

