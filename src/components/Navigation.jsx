import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const NAV_LINKS = [
  { label: 'About Us',    href: '#about',      page: '/' },
  { label: 'Services',    href: '#services',   page: '/' },
  { label: 'GCSE Board',  href: '#board-info', page: '/' },
  { label: 'Course Fees', href: '#fees',       page: '/' },
  { label: 'Courses',     href: '/courses',    page: null },
  { label: 'Blogs',       href: '/blogs',      page: null },
  { label: 'Contact Us',  href: '#contact',    page: '/' },
]

const DASHBOARD_LINKS = [
  { label: '🎓 Student Dashboard', href: '/student-dashboard' },
  { label: '📋 Tutor Dashboard',   href: '/tutor-dashboard'   },
  { label: '👨‍👩‍👧 Parent Portal',    href: '/parent-portal'     },
]

export default function Navigation() {
  const { isDark, toggle } = useTheme()
  const [isOpen,      setIsOpen]      = useState(false)
  const [isScrolled,  setIsScrolled]  = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const location  = useLocation()
  const navigate  = useNavigate()
  const isHome    = location.pathname === '/'
  const servicesRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [location])

  useEffect(() => {
    function handleClickOutside(e) {
      if (!servicesRef.current) return
      if (!servicesRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [showDropdown])

  function handleNavClick(link) {
    setIsOpen(false)
    setShowDropdown(false)
    if (link.page === null) {
      navigate(link.href)
      return
    }
    if (isHome) {
      const el = document.querySelector(link.href)
      el?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/' + link.href)
    }
  }

  function handleBookDemo() {
    setIsOpen(false)
    if (isHome) {
      document.querySelector('#assessmentForm')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/#assessmentForm')
    }
  }

  const navBase = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled || !isHome
      ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md'
      : 'bg-transparent'
  }`

  return (
    <header className={navBase} role="banner">
      <div className="section-wrap">
        <div className="flex items-center justify-between h-16 md:h-18">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="SkillBridge Tutors home">
            <img
              src="/Images/skillbridge_logo_only.png"
              alt="SkillBridge logo"
              className="h-9 w-auto"
              loading="eager"
            />
            <span className={`font-heading font-bold text-lg tracking-wide hidden sm:block ${
              isScrolled || !isHome ? 'text-brand-600 dark:text-white' : 'text-white'
            }`}>
              SkillBridge Tutors
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map(link => {
              if (link.label === 'Services') {
                return (
                  <div
                    key="services"
                    className="relative"
                    ref={servicesRef}
                    onMouseEnter={() => setShowDropdown(true)}
                  >
                    <button
                      onClick={() => setShowDropdown(s => !s)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                        isScrolled || !isHome
                          ? 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                      aria-haspopup="true"
                      aria-expanded={showDropdown}
                    >
                      Services
                    </button>

                    <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-transform duration-150 ${showDropdown ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
                      <button onClick={() => { setShowDropdown(false); navigate('/gcse-maths-tutor') }} className="w-full text-left block px-4 py-3 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">GCSE Maths Tutor</button>
                      <button onClick={() => { setShowDropdown(false); navigate('/maths-a-level-tutor') }} className="w-full text-left block px-4 py-3 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">Maths A Level Tutor</button>
                      <button onClick={() => { setShowDropdown(false); navigate('/maths-tutor') }} className="w-full text-left block px-4 py-3 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">Maths Tutor</button>
                    </div>
                  </div>
                )
              }

              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    isScrolled || !isHome
                      ? 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </button>
              )
            })}

          </nav>

          {/* ── Right Actions ── */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled || !isHome
                  ? 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                </svg>
              )}
            </button>

            <button
              onClick={handleBookDemo}
              className="btn-primary text-sm py-2.5 px-5 animate-blink"
            >
              Book Free Demo
            </button>
          </div>

          {/* ── Mobile Controls ── */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className={`p-2 rounded-lg ${isScrolled || !isHome ? 'text-slate-600 dark:text-slate-400' : 'text-white/80'}`}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                </svg>
              )}
            </button>
            <button
              onClick={() => setIsOpen(p => !p)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className={`p-2 rounded-lg ${isScrolled || !isHome ? 'text-slate-600 dark:text-slate-400' : 'text-white'}`}
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-4 py-3 space-y-1">
          {NAV_LINKS.map(link => {
            if (link.label === 'Services') {
              return (
                <div key="mobile-services" className="space-y-1">
                  <button className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300" onClick={() => { /* noop - expand in future */ }}>
                    Services
                  </button>
                  <div className="pl-4">
                    <button onClick={() => handleNavClick({ href: '/gcse-maths-tutor', page: null })} className="w-full text-left block px-4 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800">GCSE Maths Tutor</button>
                    <button onClick={() => handleNavClick({ href: '/maths-a-level-tutor', page: null })} className="w-full text-left block px-4 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800">Maths A Level Tutor</button>
                    <button onClick={() => handleNavClick({ href: '/maths-tutor', page: null })} className="w-full text-left block px-4 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800">Maths Tutor</button>
                  </div>
                </div>
              )
            }

            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {link.label}
              </button>
            )
          })}
          <button
            onClick={handleBookDemo}
            className="w-full mt-2 btn-primary justify-center"
          >
            Book Free Demo
          </button>
        </div>
      </div>
    </header>
  )
}
