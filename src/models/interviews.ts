import { Job } from '@/models/job'
import { InterviewTypes } from '@/models/interviewTypes'

export interface Interview {
  id: number
  round: number
  interviewType: InterviewTypes
  jobId: number
  job: Job
  start: Date
  end: Date
  userId: string
}

export interface PostInterview
  extends Omit<Interview, 'id' | 'jobId' | 'job' | 'userId'> {
  id?: number
  jobId?: number
  job?: Job
}
