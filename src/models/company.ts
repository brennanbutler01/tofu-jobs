import { Job } from '@/models/job'

export interface Company {
  id: number
  name: string
  location?: string
  website?: string
  industry?: string
  description?: string
  userId?: string
  jobs: Job[]
}

export interface PostCompany extends Omit<Company, 'id'> {
  id?: number
}
