import { typedFetch } from '@/fetch'
import { Delete, Get, GetOne, Post, Put } from '@/services/types'
import { HttpMethods } from '@/http'
import useTypedSWR from '@/swr'
import { CoverLetter, PostCoverLetter } from '@/models/coverLetter'

const input = `${import.meta.env.VITE_BACKEND_API}/CoverLetter`
const inputWithId = (id: number) => `${input}/${id}`
export const get: Get<CoverLetter> = async token => {
  return await typedFetch<CoverLetter[]>({ input, token })
}

export const getOne: GetOne<CoverLetter> = async (id, token) =>
  await typedFetch<CoverLetter>({ input: inputWithId(id), token })

export const remove: Delete<CoverLetter> = async (id, token) =>
  await typedFetch<CoverLetter>({
    input: inputWithId(id),
    init: { method: HttpMethods.DELETE },
    token,
  })

export const create: Post<CoverLetter, PostCoverLetter> = async (
  record,
  token
) =>
  await typedFetch<CoverLetter>({
    input,
    init: {
      body: JSON.stringify(record),
      method: HttpMethods.POST,
    },
    token,
  })

export const update: Put<CoverLetter> = async (record, token) =>
  await typedFetch<CoverLetter>({
    input: inputWithId(record.id),
    init: {
      body: JSON.stringify(record),
      method: HttpMethods.PUT,
    },
    token,
  })

export const useCoverLetterSWR = () => {
  const { data, isError, isLoading } = useTypedSWR({
    url: input,
    fetcher: token => get(token),
  })

  return {
    isError,
    isLoading,
    coverLetters: data,
  }
}
