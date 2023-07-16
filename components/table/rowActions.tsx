import { Row } from '@tanstack/react-table'

import { ButtonUI } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdownMenu'

import { MoreVertical } from 'lucide-react'

interface RowActionsProperties<TData> {
    row: Row<TData>
}

export function RowActions<TData>( {
  row
}: RowActionsProperties<TData> ) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ButtonUI variant="link" size='sm' className="h-8 w-8 p-0 hover:scale-100 focus-visible:ring-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </ButtonUI>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            // eslint-disable-next-line no-console
            onClick={() => console.log( row )}
          >
                Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
