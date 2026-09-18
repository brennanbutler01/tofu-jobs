import { typedFetch } from '@/fetch'
import { Delete, Get, GetOne, Post, Put } from '@/services/types'
import { HttpMethods } from '@/http'
import useTypedSWR from '@/swr'
import { Interview, PostInterview } from '@/models/interviews'

const input = `${import.meta.env.VITE_BACKEND_API}/Interview`
const inputWithId = (id: number) => `${input}/${id}`
export const get: Get<Interview> = async token => {
  return await typedFetch<Interview[]>({ input, token })
}

export const getOne: GetOne<Interview> = async (id, token) =>
  await typedFetch<Interview>({ input: inputWithId(id), token })

export const remove: Delete<Interview> = async (id, token) =>
  await typedFetch<Interview>({
    input: inputWithId(id),
    init: { method: HttpMethods.DELETE },
    token,
  })

export const create: Post<Interview, PostInterview> = async (record, token) =>
  await typedFetch<Interview>({
    input,
    init: {
      body: JSON.stringify(record),
      method: HttpMethods.POST,
    },
    token,
  })

export const update: Put<Interview> = async (record, token) =>
  await typedFetch<Interview>({
    input: inputWithId(record.id),
    init: {
      body: JSON.stringify(record),
      method: HttpMethods.PUT,
    },
    token,
  })

export const useInterviewSWR = () => {
  const { data, isError, isLoading } = useTypedSWR({
    url: input,
    fetcher: token => get(token),
  })

  return {
    isError,
    isLoading,
    interviews: data,
  }
}
