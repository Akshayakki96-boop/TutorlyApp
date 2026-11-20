import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isAuthenticated } from '../../lib/authStorage'
import { useSessionExpiry } from '../../lib/useSessionExpiry'

export default function ProtectedRoute() {
  const location = useLocation()
  useSessionExpiry(isAuthenticated, '/admin/login')

  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
