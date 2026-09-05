import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { apiRequest } from '../lib/apiClient'

const initialForm = {
  email: '',
  token: '',
  newPassword: '',
  confirmPassword: '',
}

export default function StudentResetPassword() {
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState({
    ...initialForm,
    token: searchParams.get('token') || '',
  })
  const [step, setStep] = useState(searchParams.get('token') ? 2 : 1)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  function onChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function requestReset(e) {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      await apiRequest('/api/student/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email: form.email.trim() }),
      })
      setStep(2)
      setMessage('If an account exists for that email, a reset token has been sent. Enter it below to choose a new password.')
    } catch (err) {
      setError(err.message || 'Unable to request a password reset.')
    } finally {
      setLoading(false)
    }
  }

  async function resetPassword(e) {
    e.preventDefault()
    setError('')
    setMessage('')

    if (form.newPassword.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (form.newPassword !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      await apiRequest('/api/student/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({
          token: form.token.trim(),
          newPassword: form.newPassword,
        }),
      })
      setMessage('Your password has been reset. You can now sign in with your new password.')
      setForm((prev) => ({ ...prev, token: '', newPassword: '', confirmPassword: '' }))
    } catch (err) {
      setError(err.message || 'Unable to reset your password. Check the token and try again.')
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
              <h1 className="mt-4 text-4xl font-black text-white">Get back to learning with secure account access.</h1>
              <p className="mt-4 max-w-md text-base text-blue-100/90">Request a reset token and choose a new password for your SkillBridge student account.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Maths', 'GCSE'].map((subject) => (
                <span key={subject} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-blue-50">{subject}</span>
              ))}
            </div>
          </div>

          <div className="bg-slate-950/70 p-6 sm:p-8 lg:p-10">
            <div className="mx-auto max-w-md">
              <Link to="/student/login" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
                <span>←</span> Back to login
              </Link>

              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">Account recovery</p>
                <h2 className="mt-2 text-3xl font-black text-white">Reset password</h2>
                <p className="mt-2 text-sm text-slate-400">
                  {step === 1 ? 'Enter your email to request a password reset token.' : 'Choose a new password for your account.'}
                </p>
              </div>

              {step === 1 ? (
                <form onSubmit={requestReset} className="mt-8 space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="email">Email address</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={onChange} placeholder="you@example.com" className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none" />
                  </div>
                  <Feedback error={error} message={message} />
                  <button type="submit" disabled={loading} className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 px-4 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70">
                    {loading ? 'Sending token...' : 'Send reset token'}
                  </button>
                </form>
              ) : (
                <form onSubmit={resetPassword} className="mt-8 space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="newPassword">New password</label>
                    <input id="newPassword" name="newPassword" type="password" required minLength={6} value={form.newPassword} onChange={onChange} placeholder="At least 6 characters" className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="confirmPassword">Confirm new password</label>
                    <input id="confirmPassword" name="confirmPassword" type="password" required minLength={6} value={form.confirmPassword} onChange={onChange} placeholder="Re-enter your new password" className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none" />
                  </div>
                  <Feedback error={error} message={message} />
                  <button type="submit" disabled={loading} className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 px-4 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70">
                    {loading ? 'Resetting password...' : 'Reset password'}
                  </button>
                  <button type="button" onClick={() => { setStep(1); setError(''); setMessage('') }} className="w-full text-sm font-semibold text-cyan-300 hover:text-cyan-200">
                    Request a new reset email
                  </button>
                </form>
              )}

              <p className="mt-6 text-sm text-slate-300">
                Remember your password?{' '}
                <Link className="font-semibold text-cyan-300 underline" to="/student/login">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Feedback({ error, message }) {
  if (error) return <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div>
  if (message) return <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{message}</div>
  return null
}
