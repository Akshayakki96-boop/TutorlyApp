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
              <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100">Student Portal</span>
              <h1 className="mt-8 text-4xl font-black text-white">Welcome back to your learning journey.</h1>
              <p className="mt-4 max-w-md text-base text-blue-100/90">Track your lessons, monitor progress, and manage your payments in one premium student dashboard.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
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
