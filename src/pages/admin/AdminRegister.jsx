import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiRequest } from '../../lib/apiClient'

export default function AdminRegister() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function onChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      await apiRequest('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(form),
      })

      setSuccess('Registration successful. You can now login.')
      setTimeout(() => navigate('/admin/login'), 800)
    } catch (err) {
      setError(err.message || 'Unable to register right now.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(130deg,#1e1b4b,#0f766e_45%,#0f172a)] px-4 py-10">
      <div className="mx-auto max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-100">SkillBridge Security</p>
        <h1 className="mt-3 text-3xl font-black text-white">Admin Registration</h1>

        <form onSubmit={onSubmit} className="mt-7 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-emerald-50" htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={form.fullName}
              onChange={onChange}
              className="w-full rounded-xl border border-white/30 bg-white/95 px-4 py-2.5 text-slate-900"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-emerald-50" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={onChange}
              className="w-full rounded-xl border border-white/30 bg-white/95 px-4 py-2.5 text-slate-900"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-emerald-50" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              minLength={6}
              required
              value={form.password}
              onChange={onChange}
              className="w-full rounded-xl border border-white/30 bg-white/95 px-4 py-2.5 text-slate-900"
            />
          </div>

          {error && <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
          {success && <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-300 px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="mt-5 text-sm text-emerald-100">
          Already have credentials?{' '}
          <Link className="font-semibold text-white underline" to="/admin/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
