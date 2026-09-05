import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navigation from './components/Navigation'
import ScrollToTop from './components/ScrollToTop'
import CookieBanner from './components/CookieBanner'
import ProtectedRoute from './components/admin/ProtectedRoute'
import StudentProtectedRoute from './components/student/StudentProtectedRoute'
import AdminLayout from './components/admin/AdminLayout'

const Home = lazy(() => import('./pages/Home'))
const CourseCatalog = lazy(() => import('./pages/CourseCatalog'))
const StudentDash = lazy(() => import('./pages/StudentDashboard'))
const StudentLogin = lazy(() => import('./pages/StudentLogin'))
const StudentRegister = lazy(() => import('./pages/StudentRegister'))
const StudentPayment = lazy(() => import('./pages/StudentPayment'))
const TutorDash = lazy(() => import('./pages/TutorDashboard'))
const ParentPortal = lazy(() => import('./pages/ParentPortal'))
const Blogs = lazy(() => import('./pages/Blogs'))
const BlogDetail = lazy(() => import('./pages/BlogDetail'))
const GCSEMathsTutor = lazy(() => import('./pages/GCSEMathsTutor'))
const MathsALevelTutor = lazy(() => import('./pages/MathsALevelTutor'))
const MathsTutor = lazy(() => import('./pages/MathsTutor'))
const NotFound = lazy(() => import('./pages/NotFound'))
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminRegister = lazy(() => import('./pages/admin/AdminRegister'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminLeads = lazy(() => import('./pages/admin/AdminLeads'))
const AdminLeadDetail = lazy(() => import('./pages/admin/AdminLeadDetail'))
const AdminTeachers = lazy(() => import('./pages/admin/AdminTeachers'))
const AdminDemo = lazy(() => import('./pages/admin/AdminDemo'))
const AdminRetellWebhook = lazy(() => import('./pages/admin/AdminRetellWebhook'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-medium">Loading…</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </ThemeProvider>
  )
}

function AppShell() {
  const location = useLocation()
  const isAdminPath = location.pathname.startsWith('/admin')
  const isStudentAuthPath = ['/student/login', '/student/register', '/student/payment'].includes(location.pathname)

  return (
    <>
      {!isAdminPath && !isStudentAuthPath && <Navigation />}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CourseCatalog />} />

          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/register" element={<StudentRegister />} />
          <Route path="/student/payment" element={<StudentPayment />} />
          <Route element={<StudentProtectedRoute />}>
            <Route path="/student-dashboard" element={<StudentDash />} />
          </Route>

          <Route path="/tutor-dashboard" element={<TutorDash />} />
          <Route path="/parent-portal" element={<ParentPortal />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />
          <Route path="/gcse-maths-tutor" element={<GCSEMathsTutor />} />
          <Route path="/maths-a-level-tutor" element={<MathsALevelTutor />} />
          <Route path="/maths-tutor" element={<MathsTutor />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/leads" element={<AdminLeads />} />
              <Route path="/admin/leads/:id" element={<AdminLeadDetail />} />
              <Route path="/admin/teachers" element={<AdminTeachers />} />
              <Route path="/admin/demo" element={<AdminDemo />} />
              <Route path="/admin/retell-webhook" element={<AdminRetellWebhook />} />
            </Route>
          </Route>

          <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {!isAdminPath && !isStudentAuthPath && <ScrollToTop />}
      {!isAdminPath && !isStudentAuthPath && <CookieBanner />}
    </>
  )
}
