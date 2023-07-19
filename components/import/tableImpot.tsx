'use client'

import { useEffect } from 'react'
// import { DataTable } from '@/components/table/dataTable'

const TableImport = async () => {
  useEffect( () => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [] )
  return (
    <div className="mt-6 bg-neutral0 w-full h-[calc(100%-168px)] p-10 mr-5 flex justify-between rounded-xl">
      {/* <DataTable columns={columns} data={data}/> */}
    </div>
  )
}

export default TableImport
