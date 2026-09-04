import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isStudentAuthenticated } from '../../lib/authStorage'

export default function StudentProtectedRoute() {
  const location = useLocation()

  if (!isStudentAuthenticated()) {
    return <Navigate to="/student/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
