import { Job } from '@/models/job'

export interface CoverLetter {
  id: number
  title: string
  created: Date
  url: string
  jobId: number
  job?: Job
  userId: string
}

export interface PostCoverLetter
  extends Omit<CoverLetter, 'id' | 'jobId' | 'job' | 'userId'> {
  id?: number
  jobId?: number
  job?: Job
}
