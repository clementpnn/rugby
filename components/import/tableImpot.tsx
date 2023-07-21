'use client'

import { useEffect } from 'react'
import { DataTable } from '@/components/table/dataTable'
import { columns } from '@/app/table/columns'
import { JOB } from '@prisma/client'

interface TableImporthProperties {
  data: {
    id: string
    name: string
    company: string
    status: JOB
    email: string
    emailVerified: boolean
    amount: number
    accepted: number
    refused: number
    processing: number
  }[] | undefined
  }

const TableImport: React.FC<TableImporthProperties> = ( { data } ) => {

  useEffect( () => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [] )

  if ( !data ) {
    return (
      <p>no data</p>
    )
  }

  return (
    <div className="mt-6 bg-neutral0 w-full h-[calc(100%-168px)] p-10 rounded-xl overflow-auto no-scrollbar">
      <DataTable columns={columns} data={data}/>
    </div>
  )
}

export default TableImport