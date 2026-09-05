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
  subject: 'Mathematics',
}

const STEPS = [
  { id: 1, title: 'Account', description: 'Your login details', fields: ['fullName', 'email', 'password', 'phone'] },
  { id: 2, title: 'Student', description: 'Learning preferences', fields: ['classYear', 'subject'] },
  { id: 3, title: 'Guardian', description: 'Parent details', fields: ['parentFirstName', 'parentLastName'] },
]

export default function StudentRegister() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function onChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function validateStep(stepId) {
    const fields = STEPS.find((s) => s.id === stepId)?.fields || []
    const hasEmptyField = fields.some((field) => !form[field].trim())
    if (hasEmptyField) {
      setError('Please fill in every field before continuing.')
      return false
    }
    if (stepId === 1 && form.password.trim().length < 6) {
      setError('Password must be at least 6 characters.')
      return false
    }
    setError('')
    return true
  }

  function goBack() {
    setError('')
    setStep((prev) => Math.max(prev - 1, 1))
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (!validateStep(step)) return

    if (step < STEPS.length) {
      setStep((prev) => prev + 1)
      return
    }

    setError('')
    setLoading(true)

    try {
      const result = await apiRequest('/api/student/auth/register', {
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
        }),
      })

      const studentId = result?.id ?? result?.studentId ?? result?.user?.id ?? null

      navigate('/student/payment', {
        state: {
          studentId,
          email: form.email.trim(),
          fullName: form.fullName.trim(),
        },
      })
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
              <Link to="/" className="flex items-center gap-2">
                <img src="/Images/skillbridge_logo_only.png" alt="SkillBridge logo" className="h-9 w-9 rounded-lg bg-white/90 p-1" />
                <span className="font-heading text-lg font-bold text-white">SkillBridge Tutors</span>
              </Link>

              <span className="mt-8 inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-50">Create account</span>
              <h1 className="mt-4 text-4xl font-black text-white">Build your academic success plan.</h1>
              <p className="mt-4 max-w-md text-base text-emerald-50/90">Sign up for premium tutoring support, live classes, progress tracking, and a streamlined payment experience.</p>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-3 text-white">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-2.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4" />
                    </svg>
                  </span>
                  <p className="text-sm font-semibold text-emerald-50">Fast onboarding for parents and students</p>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-3 text-white">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </span>
                  <p className="text-sm font-semibold text-emerald-50">Dedicated progress tracking and lesson planning</p>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-3 text-white">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 2v8m0 0v2m0-2c-1.11 0-2.08-.402-2.599-1M5 12a7 7 0 1114 0 7 7 0 01-14 0z" />
                    </svg>
                  </span>
                  <p className="text-sm font-semibold text-emerald-50">Simple, secure payment and account management</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {['Maths', 'GCSE'].map((subject) => (
                <span key={subject} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-50">{subject}</span>
              ))}
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

              <ol className="mt-8 grid grid-cols-3 gap-2">
                {STEPS.map((s) => {
                  const isComplete = step > s.id
                  const isActive = step === s.id
                  return (
                    <li key={s.id} className="flex flex-col items-center text-center">
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition ${
                          isComplete
                            ? 'border-emerald-400 bg-emerald-400 text-slate-950'
                            : isActive
                              ? 'border-emerald-400 bg-transparent text-emerald-300'
                              : 'border-slate-700 bg-transparent text-slate-500'
                        }`}
                      >
                        {isComplete ? (
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          s.id
                        )}
                      </span>
                      <p className={`mt-2 text-xs font-bold ${isActive || isComplete ? 'text-white' : 'text-slate-500'}`}>{s.title}</p>
                      <p className="hidden text-[11px] text-slate-400 sm:block">{s.description}</p>
                    </li>
                  )
                })}
              </ol>
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 transition-all duration-300"
                  style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
                />
              </div>

              <form onSubmit={onSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
                {step === 1 && (
                  <>
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

                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="password">Password</label>
                      <input id="password" name="password" type="password" required minLength={6} value={form.password} onChange={onChange} className="input-field" placeholder="At least 6 characters" />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="classYear">Class year</label>
                      <input id="classYear" name="classYear" type="text" required value={form.classYear} onChange={onChange} className="input-field" placeholder="Year 11" />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="subject">Preferred subject</label>
                      <input id="subject" name="subject" type="text" required value={form.subject} readOnly className="input-field cursor-not-allowed opacity-75" />
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="parentFirstName">Parent first name</label>
                      <input id="parentFirstName" name="parentFirstName" type="text" required value={form.parentFirstName} onChange={onChange} className="input-field" placeholder="Parent first name" />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="parentLastName">Parent last name</label>
                      <input id="parentLastName" name="parentLastName" type="text" required value={form.parentLastName} onChange={onChange} className="input-field" placeholder="Parent last name" />
                    </div>

                  </>
                )}

                {error && <div className="md:col-span-2 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div>}

                <div className="md:col-span-2 flex gap-3">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={goBack}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3.5 text-sm font-bold text-slate-200 transition hover:bg-slate-800"
                    >
                      Back
                    </button>
                  )}

                  {step < STEPS.length ? (
                    <button
                      type="submit"
                      className="w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-4 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:brightness-110"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-4 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {loading ? 'Creating account...' : 'Create account'}
                    </button>
                  )}
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
