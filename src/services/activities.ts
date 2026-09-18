import { typedFetch } from '@/fetch'
import { Activity, DeleteConstraintException, PostActivity } from '@/models'
import { Delete, Get, GetOne, Post, Put } from '@/services/types'
import { HttpMethods } from '@/http'
import useTypedSWR from '@/swr'

const input = `${import.meta.env.VITE_BACKEND_API}/Activity`
const inputWithId = (id: number) => `${input}/${id}`
export const get: Get<Activity> = async token => {
  return await typedFetch<Activity[]>({ input, token })
}

export const getOne: GetOne<Activity> = async (id, token) =>
  await typedFetch<Activity>({ input: inputWithId(id), token })

export const remove: Delete<Activity | DeleteConstraintException> = async (
  id,
  token
) =>
  await typedFetch<Activity | DeleteConstraintException>({
    input: inputWithId(id),
    init: { method: HttpMethods.DELETE },
    token,
  })

export const create: Post<Activity, PostActivity> = async (record, token) =>
  await typedFetch<Activity>({
    input,
    init: {
      body: JSON.stringify(record),
      method: HttpMethods.POST,
    },
    token,
  })

export const update: Put<Activity> = async (record, token) =>
  await typedFetch<Activity>({
    input: inputWithId(record.id),
    init: {
      body: JSON.stringify(record),
      method: HttpMethods.PUT,
    },
    token,
  })

export const useActivitySWR = () => {
  const { data, isError, isLoading } = useTypedSWR({
    url: input,
    fetcher: token => get(token),
  })
  return {
    isError,
    isLoading,
    activities: data,
  }
}
