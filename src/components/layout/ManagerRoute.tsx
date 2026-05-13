import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function ManagerRoute() {
  const { isLoggedIn, user } = useAuth()

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  if (!user?.venueManager) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ManagerRoute