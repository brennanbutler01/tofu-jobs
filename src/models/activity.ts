import { Job } from '@/models/job'
import { ActivityCategories } from '@/models/activityCategories'

export interface Activity {
  id: number
  title: string
  startDateTime?: Date
  endDateTime?: Date
  note?: string
  isCompleted: boolean
  jobId?: number
  job?: Job
  activityCategory: ActivityCategories
  userId?: string
  dateCompleted?: Date
}

export interface PostActivity extends Omit<Activity, 'id'> {
  id?: number
}
