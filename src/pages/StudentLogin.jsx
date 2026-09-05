import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { apiRequest } from '../lib/apiClient'
import { saveStudentAuth } from '../lib/authStorage'

export default function StudentLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const redirectPath = location.state?.from?.pathname || '/student-dashboard'

  function onChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await apiRequest('/api/student/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      })

      const token = result?.token || result?.jwt || result?.accessToken
      if (!token) {
        throw new Error('Login succeeded but no token was returned.')
      }

      saveStudentAuth(token, result?.user || { email: form.email.trim() })
      navigate(redirectPath, { replace: true })
    } catch (err) {
      setError(err.message || 'Unable to sign in. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#1d4ed8_0%,_#0f172a_45%,_#020817_100%)] px-4 py-10">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(15,23,42,0.5)] backdrop-blur-xl">
        <div className="grid lg:grid-cols-2">
          <div className="hidden bg-[linear-gradient(135deg,#1e3a8a,#2563eb,#7c3aed)] p-10 lg:flex lg:flex-col lg:justify-between">
            <div>
              <Link to="/" className="flex items-center gap-2">
                <img src="/Images/skillbridge_logo_only.png" alt="SkillBridge logo" className="h-9 w-9 rounded-lg bg-white/90 p-1" />
                <span className="font-heading text-lg font-bold text-white">SkillBridge Tutors</span>
              </Link>

              <span className="mt-8 inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100">Student Portal</span>
              <h1 className="mt-4 text-4xl font-black text-white">Welcome back to your learning journey.</h1>
              <p className="mt-4 max-w-md text-base text-blue-100/90">Join live 1-to-1 lessons, chat with your tutor, and track every milestone in one dedicated student dashboard.</p>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3 text-white">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.55-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.45.894L15 14M4 6h9a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
                    </svg>
                  </span>
                  <p className="text-sm font-semibold text-blue-50">Live 1-to-1 video lessons with expert tutors</p>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3 text-white">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </span>
                  <p className="text-sm font-semibold text-blue-50">Homework, resources and revision notes in one place</p>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3 text-white">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </span>
                  <p className="text-sm font-semibold text-blue-50">Real-time progress reports for you and your parents</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-2">
                {['Maths', 'GCSE'].map((subject) => (
                  <span key={subject} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-blue-50">{subject}</span>
                ))}
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white">
                  <p className="text-2xl font-black">5+</p>
                  <p className="mt-1 text-sm text-blue-100/80">Weekly lessons</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white">
                  <p className="text-2xl font-black">95%</p>
                  <p className="mt-1 text-sm text-blue-100/80">Attendance</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/70 p-6 sm:p-8 lg:p-10">
            <div className="mx-auto max-w-md">
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
                <span>←</span> Back to home
              </Link>

              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">Secure access</p>
                <h2 className="mt-2 text-3xl font-black text-white">Student Login</h2>
              </div>

              <form onSubmit={onSubmit} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="email">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={onChange}
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={form.password}
                    onChange={onChange}
                    placeholder="Enter your password"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none"
                  />
                  <div className="mt-2 text-right">
                    <Link to="/student/reset-password" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">
                      Forgot password?
                    </Link>
                  </div>
                </div>

                {error && (
                  <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 px-4 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </form>

              <p className="mt-6 text-sm text-slate-300">
                Need an account?{' '}
                <Link className="font-semibold text-cyan-300 underline" to="/student/register">
                  Create one here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
