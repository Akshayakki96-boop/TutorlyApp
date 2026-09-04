import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiRequest } from '../lib/apiClient'
import { clearStudentAuth, getStudentUser } from '../lib/authStorage'

const defaultUpcoming = [
  { subject: 'Mathematics – Algebra', tutor: 'Mr. Ahmed', time: 'Today, 4:00 PM', badge: 'Today', badgeColor: 'bg-emerald-500' },
  { subject: 'GCSE Physics – Mechanics', tutor: 'Ms. Khan', time: 'Wed, 5:00 PM', badge: 'Wed', badgeColor: 'bg-sky-500' },
  { subject: 'Exam Technique Workshop', tutor: 'Ms. Collins', time: 'Fri, 3:30 PM', badge: 'Fri', badgeColor: 'bg-violet-500' },
]

const defaultProgress = [
  { subject: 'Mathematics', progress: 82, color: 'from-blue-500 to-cyan-500' },
  { subject: 'Physics', progress: 74, color: 'from-emerald-500 to-teal-500' },
  { subject: 'Chemistry', progress: 68, color: 'from-violet-500 to-fuchsia-500' },
]

const defaultAssignments = [
  { title: 'Algebra worksheet', subject: 'Mathematics', due: 'Today', status: 'Pending', tone: 'text-amber-600 bg-amber-100' },
  { title: 'Past paper review', subject: 'Physics', due: 'Thu', status: 'In progress', tone: 'text-blue-600 bg-blue-100' },
  { title: 'Topic summary notes', subject: 'Chemistry', due: 'Sun', status: 'Draft', tone: 'text-violet-600 bg-violet-100' },
]

const samplePayments = [
  { id: 101, amount: 149.0, status: 'Paid', createdAt: '2026-08-28T10:30:00Z' },
  { id: 102, amount: 89.0, status: 'Pending', createdAt: '2026-09-01T12:00:00Z' },
]

export default function StudentDashboard() {
  const navigate = useNavigate()
  const [student, setStudent] = useState(() => getStudentUser() || { fullName: 'Student' })
  const [payments, setPayments] = useState(samplePayments)
  const [paymentForm, setPaymentForm] = useState({ amount: '149', currency: 'GBP' })
  const [loadingPayments, setLoadingPayments] = useState(false)
  const [paying, setPaying] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const currentStudent = getStudentUser() || { fullName: 'Student' }
    setStudent(currentStudent)

    if (currentStudent?.id) {
      void loadPayments(currentStudent.id)
    }
  }, [])

  async function loadPayments(studentId) {
    setLoadingPayments(true)
    setError('')

    try {
      const result = await apiRequest(`/api/payments/student/${studentId}`)
      if (Array.isArray(result) && result.length) {
        setPayments(result)
        return
      }
      setPayments(samplePayments)
    } catch {
      setPayments(samplePayments)
    } finally {
      setLoadingPayments(false)
    }
  }

  async function handlePayNow(e) {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!student?.id) {
      setError('Student profile is missing. Please log in again.')
      return
    }

    const amount = Number(paymentForm.amount)
    if (!amount || amount <= 0) {
      setError('Please enter a valid payment amount.')
      return
    }

    setPaying(true)

    try {
      const orderResult = await apiRequest('/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({
          studentId: Number(student.id),
          amount,
          currency: paymentForm.currency || 'GBP',
        }),
      })

      const orderId = orderResult?.orderId || orderResult?.id || orderResult?.paymentOrderId
      if (!orderId) {
        throw new Error('Payment order was created without a valid reference ID.')
      }

      await apiRequest('/api/payments/capture', {
        method: 'POST',
        body: JSON.stringify({ orderId: String(orderId) }),
      })

      setSuccess('Payment completed successfully. Your receipt has been updated.')
      await loadPayments(student.id)
    } catch (err) {
      setError(err.message || 'Unable to process the payment right now.')
    } finally {
      setPaying(false)
    }
  }

  function handleLogout() {
    clearStudentAuth()
    navigate('/student/login', { replace: true })
  }

  const stats = useMemo(() => [
    { label: 'Classes This Week', value: '5', icon: '📅', tone: 'from-blue-500 to-cyan-500' },
    { label: 'Assignments Due', value: '3', icon: '📝', tone: 'from-violet-500 to-purple-500' },
    { label: 'Progress Score', value: '82%', icon: '📈', tone: 'from-emerald-500 to-teal-500' },
    { label: 'Attendance', value: '95%', icon: '✅', tone: 'from-amber-500 to-orange-500' },
  ], [])

  const totalPaid = payments.reduce((sum, payment) => {
    return payment.status === 'Paid' ? sum + Number(payment.amount || 0) : sum
  }, 0)

  return (
    <main className="min-h-screen bg-slate-100 pt-20 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="section-wrap pb-12">
        <div className="mb-8 rounded-[32px] bg-[linear-gradient(135deg,#0f172a,#1d4ed8_38%,#7c3aed_100%)] p-6 text-white shadow-[0_24px_60px_rgba(37,99,235,0.28)] md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-100">Welcome back</p>
              <h1 className="mt-2 text-3xl font-black md:text-4xl">{student?.fullName || 'Student Dashboard'}</h1>
              <p className="mt-2 max-w-xl text-sm text-blue-100/90 md:text-base">Keep your studies on track with lessons, progress updates, and payment management in one place.</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/#assessmentForm" className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/15">Book a session</Link>
              <button type="button" onClick={handleLogout} className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-900 hover:bg-slate-100">Logout</button>
            </div>
          </div>
        </div>

        {error && <div className="mb-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-200">{error}</div>}
        {success && <div className="mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-200">{success}</div>}

        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="card card-hover p-5">
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${item.tone} text-xl shadow-lg`}>{item.icon}</div>
              <p className="text-3xl font-black text-slate-900 dark:text-white">{item.value}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
          <div className="space-y-6">
            <section className="card p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">Upcoming lessons</h2>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">3 scheduled</span>
              </div>

              <div className="space-y-3">
                {defaultUpcoming.map((item, index) => (
                  <div key={`${item.subject}-${index}`} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-700 dark:bg-slate-800/60">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 text-lg font-bold text-white">{item.subject.charAt(0)}</div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-slate-800 dark:text-slate-100">{item.subject}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.tutor} • {item.time}</p>
                    </div>
                    <span className={`${item.badgeColor} rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white`}>{item.badge}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="card p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">Progress overview</h2>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">82% avg</span>
              </div>

              <div className="space-y-5">
                {defaultProgress.map((row) => (
                  <div key={row.subject}>
                    <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-200">
                      <span>{row.subject}</span>
                      <span>{row.progress}%</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                      <div className={`h-full rounded-full bg-gradient-to-r ${row.color}`} style={{ width: `${row.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="card p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">Assignments</h2>
                <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">Updated</span>
              </div>

              <div className="space-y-3">
                {defaultAssignments.map((item) => (
                  <div key={item.title} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-700 dark:bg-slate-800/60">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-lg dark:bg-amber-900/30">📄</div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-slate-800 dark:text-slate-100">{item.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.subject} • Due {item.due}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${item.tone}`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="card p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">Billing &amp; payments</h2>
                <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-200">{payments.length} records</span>
              </div>

              <form onSubmit={handlePayNow} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    value={paymentForm.amount}
                    onChange={(e) => setPaymentForm((prev) => ({ ...prev, amount: e.target.value }))}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Currency</label>
                  <select value={paymentForm.currency} onChange={(e) => setPaymentForm((prev) => ({ ...prev, currency: e.target.value }))} className="input-field">
                    <option value="GBP">GBP</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>

                <button type="submit" disabled={paying} className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70">
                  {paying ? 'Processing...' : 'Pay now'}
                </button>
              </form>

              <div className="mt-5 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                  <span>Total paid</span>
                  <span className="text-xl font-black text-slate-900 dark:text-white">£{totalPaid.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {loadingPayments ? (
                  <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500 dark:bg-slate-800/60">Loading payment records...</div>
                ) : (
                  payments.map((payment) => (
                    <div key={payment.id ?? `${payment.amount}-${payment.createdAt}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-700 dark:bg-slate-800/60">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Payment #{payment.id ?? 'N/A'}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(payment.createdAt || Date.now()).toLocaleDateString()}</p>
                        </div>
                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${payment.status === 'Paid' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200'}`}>{payment.status}</span>
                      </div>
                      <p className="mt-3 text-lg font-black text-slate-900 dark:text-white">£{Number(payment.amount || 0).toFixed(2)}</p>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section className="card p-6">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Quick actions</h2>
              <div className="mt-4 grid gap-3">
                <Link to="/#assessmentForm" className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-100 dark:border-blue-900/60 dark:bg-blue-900/20 dark:text-blue-200">Schedule a lesson</Link>
                <Link to="/courses" className="rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700 hover:bg-violet-100 dark:border-violet-900/60 dark:bg-violet-900/20 dark:text-violet-200">Browse courses</Link>
                <Link to="/parent-portal" className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 dark:border-emerald-900/60 dark:bg-emerald-900/20 dark:text-emerald-200">Parent portal</Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
