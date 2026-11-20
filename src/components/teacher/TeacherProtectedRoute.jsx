import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isTeacherAuthenticated } from '../../lib/authStorage'
import { useSessionExpiry } from '../../lib/useSessionExpiry'

export default function TeacherProtectedRoute() {
  const location = useLocation()
  useSessionExpiry(isTeacherAuthenticated, '/teacher/login')

  if (!isTeacherAuthenticated()) {
    return <Navigate to="/teacher/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
