import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navigation from './components/Navigation'
import ScrollToTop from './components/ScrollToTop'
import CookieBanner from './components/CookieBanner'

const Home          = lazy(() => import('./pages/Home'))
const CourseCatalog = lazy(() => import('./pages/CourseCatalog'))
const StudentDash   = lazy(() => import('./pages/StudentDashboard'))
const TutorDash     = lazy(() => import('./pages/TutorDashboard'))
const ParentPortal  = lazy(() => import('./pages/ParentPortal'))
const Blogs         = lazy(() => import('./pages/Blogs'))

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
        <Navigation />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"                  element={<Home />} />
            <Route path="/courses"           element={<CourseCatalog />} />
            <Route path="/student-dashboard" element={<StudentDash />} />
            <Route path="/tutor-dashboard"   element={<TutorDash />} />
            <Route path="/parent-portal"     element={<ParentPortal />} />
            <Route path="/blogs"              element={<Blogs />} />
            <Route path="*"                  element={<Home />} />
          </Routes>
        </Suspense>
        <ScrollToTop />
        <CookieBanner />
      </BrowserRouter>
    </ThemeProvider>
  )
}
