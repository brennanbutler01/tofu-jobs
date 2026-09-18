import { Job } from '@/models/job'
import { DefaultJobLists } from '@/models/defaultJobLists'

export interface JobList {
  id: number
  title: string
  jobs: Job[]
  isUserCreated: boolean
  userId?: string
  defaultJobLists?: DefaultJobLists
}

export interface PostJobList extends Omit<JobList, 'id'> {
  id?: number
}
