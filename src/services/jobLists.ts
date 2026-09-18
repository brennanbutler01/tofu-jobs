import { typedFetch } from '@/fetch'
import { Delete, Get, GetOne, Post, Put } from '@/services/types'
import { HttpMethods } from '@/http'
import useTypedSWR from '@/swr'
import { JobList, PostJobList } from '@/models/jobList'
import { DeleteConstraintException } from '@/models'

const input = `${import.meta.env.VITE_BACKEND_API}/JobList`
const inputWithId = (id: number) => `${input}/${id}`
export const get: Get<JobList> = async token => {
  return await typedFetch<JobList[]>({ input, token })
}

export const getOne: GetOne<JobList> = async (id, token) =>
  await typedFetch<JobList>({ input: inputWithId(id), token })

export const remove: Delete<JobList | DeleteConstraintException> = async (
  id,
  token
) =>
  await typedFetch<JobList | DeleteConstraintException>({
    input: inputWithId(id),
    init: { method: HttpMethods.DELETE },
    token,
  })

export const create: Post<JobList, PostJobList> = async (record, token) =>
  await typedFetch<JobList>({
    input,
    init: {
      body: JSON.stringify(record),
      method: HttpMethods.POST,
    },
    token,
  })

export const update: Put<JobList> = async (record, token) =>
  await typedFetch<JobList>({
    input: inputWithId(record.id),
    init: {
      body: JSON.stringify(record),
      method: HttpMethods.PUT,
    },
    token,
  })

export const useJobListSWR = () => {
  const { data, isError, isLoading } = useTypedSWR({
    url: input,
    fetcher: token => get(token),
  })
  return {
    isError,
    isLoading,
    jobLists: data,
  }
}
