import { Company } from '@/models/company'
import { JobList } from '@/models/jobList'
import { Interview } from '@/models/interviews'
import { CoverLetter } from '@/models/coverLetter'
import { Activity } from '@/models/activity'

export interface Job {
  id: number
  title: string
  companyId: number
  company: Company
  salary: number
  location: string
  isRemote: boolean
  jobListId: number
  jobList: JobList
  interviews: Interview[]
  coverLetters: CoverLetter[]
  activities: Activity[]
  userId?: string
}

export interface PostJob
  extends Omit<Job, 'id' | 'companyId' | 'company' | 'jobList' | 'jobListId'> {
  id?: number
  title: string
  companyId?: number
  company?: Company
  jobListId?: number
  jobList?: JobList
}
