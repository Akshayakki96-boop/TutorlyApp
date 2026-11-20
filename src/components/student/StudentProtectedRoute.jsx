import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isStudentAuthenticated } from '../../lib/authStorage'
import { useSessionExpiry } from '../../lib/useSessionExpiry'

export default function StudentProtectedRoute() {
  const location = useLocation()
  useSessionExpiry(isStudentAuthenticated, '/student/login')

  if (!isStudentAuthenticated()) {
    return <Navigate to="/student/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
