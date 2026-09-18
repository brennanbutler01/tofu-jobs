import { typedFetch } from '@/fetch'
import { Delete, Get, GetOne, Post, Put } from '@/services/types'
import { HttpMethods } from '@/http'
import useTypedSWR from '@/swr'
import { Job, PostJob } from '@/models/job'

const input = `${import.meta.env.VITE_BACKEND_API}/Job`
const inputWithId = (id: number) => `${input}/${id}`
export const get: Get<Job> = async token => {
  return await typedFetch<Job[]>({ input, token })
}

export const getOne: GetOne<Job> = async (id, token) =>
  await typedFetch<Job>({ input: inputWithId(id), token })

export const remove: Delete<Job> = async (id, token) =>
  await typedFetch<Job>({
    input: inputWithId(id),
    init: { method: HttpMethods.DELETE },
    token,
  })

export const create: Post<Job, PostJob> = async (record, token) =>
  await typedFetch<Job>({
    input,
    init: {
      body: JSON.stringify(record),
      method: HttpMethods.POST,
    },
    token,
  })

export const update: Put<Job> = async (record, token) =>
  await typedFetch<Job>({
    input: inputWithId(record.id),
    init: {
      body: JSON.stringify(record),
      method: HttpMethods.PUT,
    },
    token,
  })

export const useJobSWR = () => {
  const { data, isError, isLoading } = useTypedSWR({
    url: input,
    fetcher: token => get(token),
  })
  return {
    isError,
    isLoading,
    jobs: data,
  }
}
