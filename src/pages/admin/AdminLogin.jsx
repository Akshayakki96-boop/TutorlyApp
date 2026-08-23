import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { apiRequest } from '../../lib/apiClient'
import { saveAuth } from '../../lib/authStorage'

export default function AdminLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const redirectPath = location.state?.from?.pathname || '/admin'

  function onChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(form),
      })

      const token = result?.token || result?.jwt || result?.accessToken
      if (!token) {
        throw new Error('Login succeeded but token was not returned by API.')
      }

      saveAuth(token, result?.user || { email: form.email })
      navigate(redirectPath, { replace: true })
    } catch (err) {
      setError(err.message || 'Unable to login. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(140deg,#0f172a,#1d4ed8_45%,#0f766e)] px-4 py-10">
      <div className="mx-auto max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">SkillBridge Security</p>
        <h1 className="mt-3 text-3xl font-black text-white">Admin Login</h1>
        <p className="mt-2 text-sm text-cyan-100/90">Direct URL only. This page is intentionally hidden from the public site navigation.</p>

        <form onSubmit={onSubmit} className="mt-7 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-cyan-50" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={onChange}
              className="w-full rounded-xl border border-white/30 bg-white/95 px-4 py-2.5 text-slate-900 outline-none ring-0 focus:border-cyan-300"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-cyan-50" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={onChange}
              className="w-full rounded-xl border border-white/30 bg-white/95 px-4 py-2.5 text-slate-900 outline-none ring-0 focus:border-cyan-300"
            />
          </div>

          {error && <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-cyan-300 px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-5 text-sm text-cyan-100">
          Need an admin account?{' '}
          <Link className="font-semibold text-white underline" to="/admin/register">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}
