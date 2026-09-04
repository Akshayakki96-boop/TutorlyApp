import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiRequest } from '../lib/apiClient'

const initialForm = {
  fullName: '',
  email: '',
  password: '',
  phone: '',
  parentFirstName: '',
  parentLastName: '',
  classYear: '',
  subject: '',
  address: '',
}

export default function StudentRegister() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
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
      await apiRequest('/api/student/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          email: form.email.trim(),
          fullName: form.fullName.trim(),
          phone: form.phone.trim(),
          parentFirstName: form.parentFirstName.trim(),
          parentLastName: form.parentLastName.trim(),
          classYear: form.classYear.trim(),
          subject: form.subject.trim(),
          address: form.address.trim(),
        }),
      })

      setSuccess('Registration successful. Redirecting to login...')
      window.setTimeout(() => navigate('/student/login'), 900)
    } catch (err) {
      setError(err.message || 'Unable to register. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#0f766e_0%,_#0f172a_48%,_#020817_100%)] px-4 py-10">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(15,23,42,0.45)] backdrop-blur-xl">
        <div className="grid lg:grid-cols-[1fr_1.2fr]">
          <div className="hidden bg-[linear-gradient(135deg,#0f766e,#14b8a6,#0891b2)] p-10 lg:flex lg:flex-col lg:justify-between">
            <div>
              <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-50">Create account</span>
              <h1 className="mt-8 text-4xl font-black text-white">Build your academic success plan.</h1>
              <p className="mt-4 max-w-md text-base text-emerald-50/90">Sign up for premium tutoring support, live classes, progress tracking, and a streamlined payment experience.</p>
            </div>

            <div className="space-y-3 text-sm text-emerald-50/90">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4">Fast onboarding for parents and students</div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4">Dedicated progress tracking and lesson planning</div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4">Simple, secure payment and account management</div>
            </div>
          </div>

          <div className="bg-slate-950/80 p-6 sm:p-8 lg:p-10">
            <div className="mx-auto max-w-2xl">
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200">
                <span>←</span> Back to home
              </Link>

              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300">Student registration</p>
                <h2 className="mt-2 text-3xl font-black text-white">Sign up</h2>
              </div>

              <form onSubmit={onSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="fullName">Full name</label>
                  <input id="fullName" name="fullName" type="text" required value={form.fullName} onChange={onChange} className="input-field" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="email">Email address</label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={onChange} className="input-field" placeholder="student@email.com" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" required value={form.phone} onChange={onChange} className="input-field" placeholder="07123 456789" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="password">Password</label>
                  <input id="password" name="password" type="password" required minLength={6} value={form.password} onChange={onChange} className="input-field" placeholder="At least 6 characters" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="classYear">Class year</label>
                  <input id="classYear" name="classYear" type="text" value={form.classYear} onChange={onChange} className="input-field" placeholder="Year 11" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="subject">Preferred subject</label>
                  <input id="subject" name="subject" type="text" value={form.subject} onChange={onChange} className="input-field" placeholder="Mathematics" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="parentFirstName">Parent first name</label>
                  <input id="parentFirstName" name="parentFirstName" type="text" value={form.parentFirstName} onChange={onChange} className="input-field" placeholder="Parent first name" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="parentLastName">Parent last name</label>
                  <input id="parentLastName" name="parentLastName" type="text" value={form.parentLastName} onChange={onChange} className="input-field" placeholder="Parent last name" />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="address">Address</label>
                  <textarea id="address" name="address" rows={3} value={form.address} onChange={onChange} className="input-field" placeholder="Your address" />
                </div>

                {error && <div className="md:col-span-2 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div>}
                {success && <div className="md:col-span-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{success}</div>}

                <div className="md:col-span-2">
                  <button type="submit" disabled={loading} className="w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-4 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70">
                    {loading ? 'Creating account...' : 'Create account'}
                  </button>
                </div>
              </form>

              <p className="mt-6 text-sm text-slate-300">
                Already have an account?{' '}
                <Link className="font-semibold text-emerald-300 underline" to="/student/login">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
