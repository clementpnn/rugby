// import { User, Demand } from '@prisma/client'

interface Users {
  id: number
  name: string
  company: string
  status: string
  email: string
  emailVerified: boolean
  amount: number
  processing: number
  refused: number
  accepted: number
}

export const data: Users[] = [
  {
    id: 0,
    name: 'Chips',
    company: 'Parisien',
    status: 'Photograph',
    email: 'm@example.com',
    emailVerified: true,
    amount: 20,
    processing: 5,
    refused: 10,
    accepted: 1
  },
  {
    id: 1,
    name: 'John Doe',
    company: 'Acme Inc.',
    status: 'Journalist',
    email: 'john.doe@example.com',
    emailVerified: false,
    amount: 15,
    processing: 2,
    refused: 5,
    accepted: 8
  },
  {
    id: 2,
    name: 'Jane Smith',
    company: 'TechCo',
    status: 'Photograph',
    email: 'jane.smith@example.com',
    emailVerified: true,
    amount: 12,
    processing: 4,
    refused: 6,
    accepted: 2
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'NewsCorp',
    status: 'Journalist',
    email: 'alice.johnson@example.com',
    emailVerified: true,
    amount: 18,
    processing: 3,
    refused: 7,
    accepted: 8
  },
  {
    id: 4,
    name: 'Michael Brown',
    company: 'MediaGlobe',
    status: 'Photograph',
    email: 'michael.brown@example.com',
    emailVerified: false,
    amount: 22,
    processing: 6,
    refused: 12,
    accepted: 4
  },
  {
    id: 5,
    name: 'Sarah Anderson',
    company: 'PressTimes',
    status: 'Journalist',
    email: 'sarah.anderson@example.com',
    emailVerified: true,
    amount: 17,
    processing: 1,
    refused: 4,
    accepted: 12
  },
  {
    id: 6,
    name: 'David Lee',
    company: 'InfoPost',
    status: 'Photograph',
    email: 'david.lee@example.com',
    emailVerified: true,
    amount: 14,
    processing: 3,
    refused: 5,
    accepted: 6
  },
  {
    id: 7,
    name: 'Emily Wilson',
    company: 'MediaWorld',
    status: 'Photograph',
    email: 'emily.wilson@example.com',
    emailVerified: false,
    amount: 19,
    processing: 2,
    refused: 7,
    accepted: 10
  },
  {
    id: 8,
    name: 'Daniel Johnson',
    company: 'NewsViews',
    status: 'Journalist',
    email: 'daniel.johnson@example.com',
    emailVerified: true,
    amount: 16,
    processing: 4,
    refused: 8,
    accepted: 4
  },
  {
    id: 9,
    name: 'Sophia Clark',
    company: 'PressCorp',
    status: 'Photograph',
    email: 'sophia.clark@example.com',
    emailVerified: true,
    amount: 21,
    processing: 7,
    refused: 9,
    accepted: 5
  },
  {
    id: 10,
    name: 'Oliver Baker',
    company: 'MediaPost',
    status: 'Journalist',
    email: 'oliver.baker@example.com',
    emailVerified: false,
    amount: 13,
    processing: 1,
    refused: 3,
    accepted: 9
  } ]