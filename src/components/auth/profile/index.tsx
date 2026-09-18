import { useAppAuth as useAuth0 } from '@/useAppAuth'

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    <div>
      {isAuthenticated ? (
        <>
          <img src={user?.picture} alt={user?.name} />
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
        </>
      ) : (
        'Sign in'
      )}
    </div>
  )
}

export default Profile
