/**
 * Server-side rendering entry point.
 *
 * Uses DIRECT (non-lazy) imports so every page component is available
 * synchronously when React's renderToString traverses the tree.
 *
 * The client build (App.jsx) still uses React.lazy for code-splitting;
 * this file is only used during the post-build pre-render step.
 */
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Routes, Route, Outlet } from 'react-router-dom'
import { Suspense } from 'react'

import { ThemeProvider } from './context/ThemeContext'
import Navigation    from './components/Navigation'
import ScrollToTop   from './components/ScrollToTop'
import CookieBanner  from './components/CookieBanner'

// Eager imports — no React.lazy() here so renderToString captures full HTML
import Home             from './pages/Home'
import CourseCatalog    from './pages/CourseCatalog'
import Blogs            from './pages/Blogs'
import BlogDetail       from './pages/BlogDetail'
import GCSEMathsTutor   from './pages/GCSEMathsTutor'
import MathsALevelTutor from './pages/MathsALevelTutor'
import MathsTutor       from './pages/MathsTutor'

export function render(url) {
  return renderToString(
    <ThemeProvider>
      <StaticRouter location={url}>
        <Navigation />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/"                    element={<Home />} />
            <Route path="/courses"             element={<CourseCatalog />} />
            <Route path="/blogs"               element={<Blogs />} />
            <Route path="/blogs/:slug"         element={<BlogDetail />} />
            <Route path="/gcse-maths-tutor"    element={<GCSEMathsTutor />} />
            <Route path="/maths-a-level-tutor" element={<MathsALevelTutor />} />
            <Route path="/maths-tutor"         element={<MathsTutor />} />
            <Route path="*"                    element={<Home />} />
          </Routes>
        </Suspense>
        <ScrollToTop />
        <CookieBanner />
      </StaticRouter>
    </ThemeProvider>
  )
}
