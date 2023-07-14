// import { User, Demand } from '@prisma/client'

type Users = {
    id: number
    name: string
    company: string
    status: 'Journalist' | 'Photograph'
    email: string
    amount: number
    processing: number
    refused: number
    accepted: number
}
// type Users = {
//     user: User & { demands: Demand[] }[]
// }

export const data: Users[] = [
  {
    id: 0,
    name: 'Chips',
    company: 'Parisien',
    status: 'Journalist',
    email: 'm@example.com',
    amount: 20,
    processing: 5,
    refused: 10,
    accepted: 1
  }
]