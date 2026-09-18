import { useAppAuth } from '@/useAppAuth'

export const useUserIdSWR = () => {
  const { user, isLoading, error } = useAppAuth()
  const userId = user?.sub
  if (!userId) throw new Error('A signed-in subject is required.')
  return { userId, isLoading, isError: Boolean(error) }
}
