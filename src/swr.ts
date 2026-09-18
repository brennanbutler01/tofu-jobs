import useSWR from 'swr'
import { useAppAuth as useAuth0 } from '@/useAppAuth'

type WithUserId = { id?: string; isRequired?: boolean }

interface Props<T> {
  url: string
  fetcher: (token: string, userId?: string) => Promise<T>
  userId?: WithUserId
}

const useTypedSWR = <T>({ url, fetcher, userId }: Props<T>) => {
  const { getAccessTokenSilently } = useAuth0()

  if (userId?.isRequired && !userId?.id) throw new Error('user id is required')

  const { isLoading, error, data, isValidating } = useSWR(url, async () =>
    fetcher(await getAccessTokenSilently(), userId?.id)
  )
  return {
    data,
    isLoading: isLoading || isValidating,
    isError: error && !data,
  }
}
export default useTypedSWR
