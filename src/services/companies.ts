import { typedFetch } from '@/fetch'
import { Company, DeleteConstraintException, PostCompany } from '@/models'
import { Delete, Get, GetOne, Post, Put } from '@/services/types'
import { HttpMethods } from '@/http'
import useTypedSWR from '@/swr'

const input = `${import.meta.env.VITE_BACKEND_API}/Company`
const inputWithId = (id: number) => `${input}/${id}`
export const get: Get<Company> = async token => {
  return await typedFetch<Company[]>({ input, token })
}

export const getOne: GetOne<Company> = async (id, token) =>
  await typedFetch<Company>({ input: inputWithId(id), token })

export const remove: Delete<Company | DeleteConstraintException> = async (
  id,
  token
) =>
  await typedFetch<Company | DeleteConstraintException>({
    input: inputWithId(id),
    init: { method: HttpMethods.DELETE },
    token,
  })

export const create: Post<Company, PostCompany> = async (record, token) =>
  await typedFetch<Company>({
    input,
    init: {
      body: JSON.stringify(record),
      method: HttpMethods.POST,
    },
    token,
  })

export const update: Put<Company> = async (record, token) =>
  await typedFetch<Company>({
    input: inputWithId(record.id),
    init: {
      body: JSON.stringify(record),
      method: HttpMethods.PUT,
    },
    token,
  })

export const useCompanySWR = () => {
  // const { userId } = useUserIdSWR()
  const { data, isError, isLoading } = useTypedSWR({
    url: input,
    fetcher: token => get(token),
    // userId: {
    //   isRequired: true,
    //   id,
    // },
  })
  return {
    isError,
    isLoading,
    companies: data,
  }
}
