import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiRequest } from '../lib/apiClient'
import { clearStudentAuth, getStudentUser } from '../lib/authStorage'

export default function StudentDashboard() {
  const navigate = useNavigate()
  const [student, setStudent] = useState(() => getStudentUser() || { fullName: 'Student' })
  const [payments, setPayments] = useState([])
  const [dashboard, setDashboard] = useState(null)
  const [loadingDashboard, setLoadingDashboard] = useState(true)
  const [paymentDueDate, setPaymentDueDate] = useState(null)
  const [isPaymentDue, setIsPaymentDue] = useState(false)
  const [showAlternativePayment, setShowAlternativePayment] = useState(false)
  const [paymentForm, setPaymentForm] = useState({ amount: '149', currency: 'GBP' })
  const [loadingPayments, setLoadingPayments] = useState(false)
  const [paying, setPaying] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const currentStudent = getStudentUser() || { fullName: 'Student' }
    setStudent(currentStudent)

    let alive = true
    apiRequest('/api/students/dashboard')
      .then((result) => {
        if (!alive) return
        setDashboard(result)
        setStudent(result)
      })
      .catch((err) => {
        if (alive) setError(err.message || 'Unable to load your dashboard.')
      })
      .finally(() => { if (alive) setLoadingDashboard(false) })

    if (currentStudent?.id) {
      void loadPayments(currentStudent.id)
      void checkPaymentDueDate(currentStudent.id)
    }
    return () => { alive = false }
  }, [])

  async function loadPayments(studentId) {
    setLoadingPayments(true)
    setError('')

    try {
      const result = await apiRequest(`/api/payments/student/${studentId}`)
      setPayments(Array.isArray(result) ? result : [])
    } catch (err) {
      setError(err.message || 'Unable to load payment records.')
    } finally {
      setLoadingPayments(false)
    }
  }

  async function checkPaymentDueDate(studentId) {
    try {
      const result = await apiRequest(`/api/payments/due-date/${studentId}`)
      if (result?.dueDate) {
        const dueDate = new Date(result.dueDate)
        setPaymentDueDate(dueDate)
        
        const now = new Date()
        const daysUntilDue = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24))
        
        setIsPaymentDue(daysUntilDue <= 7 && daysUntilDue >= 0)
      }
    } catch (err) {
      console.error('Error checking payment due date:', err)
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

      const approvalUrl = orderResult?.approvalUrl
      if (!approvalUrl) {
        throw new Error('Payment order was created without a redirect URL.')
      }

      // Hand off to PayPal; it redirects back to /payment/success or /payment/cancel.
      window.location.href = approvalUrl
    } catch (err) {
      setError(err.message || 'Unable to process the payment right now.')
      setPaying(false)
    }
  }

  function handleLogout() {
    clearStudentAuth()
    navigate('/student/login', { replace: true })
  }

  const stats = useMemo(() => [
    { label: 'Total Classes', value: dashboard?.totalClasses ?? 0, icon: '📅', tone: 'from-blue-500 to-cyan-500' },
    { label: 'Completed', value: dashboard?.completedClasses ?? 0, icon: '✅', tone: 'from-violet-500 to-purple-500' },
    { label: 'Upcoming', value: dashboard?.upcomingClasses ?? 0, icon: '📈', tone: 'from-emerald-500 to-teal-500' },
    { label: 'Subject', value: dashboard?.subject || '—', icon: '📚', tone: 'from-amber-500 to-orange-500' },
  ], [dashboard])

  const totalPaid = payments.reduce((sum, payment) => {
    return payment.status === 'Paid' ? sum + Number(payment.amount || 0) : sum
  }, 0)

  return (
    <main className="min-h-screen bg-slate-100 pt-20 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="section-wrap pb-12">
        <div className="mb-8 rounded-[32px] bg-[linear-gradient(135deg,#0f172a,#1d4ed8_38%,#7c3aed_100%)] p-4 sm:p-6 md:p-8 text-white shadow-[0_24px_60px_rgba(37,99,235,0.28)]">
          <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-blue-100">Welcome back</p>
              <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-black">{dashboard?.studentName || student?.fullName || 'Student Dashboard'}</h1>
              <p className="mt-2 max-w-xl text-xs sm:text-sm text-blue-100/90 md:text-base">Keep your studies on track with lessons, progress updates, and payment management in one place.</p>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button type="button" onClick={handleLogout} className="inline-flex items-center justify-center rounded-full bg-white px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-slate-900 hover:bg-slate-100">Logout</button>
            </div>
          </div>
        </div>

        {error && <div className="mb-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-200">{error}</div>}
        {success && <div className="mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-200">{success}</div>}
        {loadingDashboard && <p className="mb-6 text-sm text-slate-500">Loading your classes...</p>}

        <div className="mb-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="card card-hover p-5">
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${item.tone} text-xl shadow-lg`}>{item.icon}</div>
              <p className="text-3xl font-black text-slate-900 dark:text-white">{item.value}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <section className="card p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">Upcoming lessons</h2>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{dashboard?.upcomingClasses ?? 0} scheduled</span>
              </div>

              <div className="space-y-3">
                {(dashboard?.todaysClasses || []).concat(dashboard?.upcomingClassesList || []).map((item) => (
                  <div key={item.classId} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-700 dark:bg-slate-800/60">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 text-lg font-bold text-white">{item.subject?.charAt(0) || 'C'}</div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-slate-800 dark:text-slate-100">{item.subject}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.teacherName} · {new Date(item.startTime).toLocaleString()}</p>
                    </div>
                    <span className="rounded-full bg-blue-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">{item.status}</span>
                  </div>
                ))}
                {!loadingDashboard && !(dashboard?.todaysClasses?.length || dashboard?.upcomingClassesList?.length) && <p className="text-sm text-slate-500">No upcoming classes scheduled.</p>}
              </div>
            </section>

            <section className="card p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">Progress overview</h2>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">82% avg</span>
              </div>

              <div className="space-y-5">
                {(dashboard?.pastClasses || []).map((row) => (
                  <div key={row.subject}>
                    <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-200">
                      <span>{row.subject} · {row.teacherName}</span>
                      <span>{row.status}</span>
                    </div>
                    <p className="text-xs text-slate-500">{new Date(row.startTime).toLocaleString()}</p>
                  </div>
                ))}
                {!dashboard?.pastClasses?.length && <p className="text-sm text-slate-500">No past classes yet.</p>}
              </div>
            </section>

            <section className="card p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">Assignments</h2>
                <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">Updated</span>
              </div>

              <div className="space-y-3">
                {(dashboard?.todaysClasses || []).map((item) => (
                  <div key={item.classId} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-700 dark:bg-slate-800/60">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-lg dark:bg-amber-900/30">📄</div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-slate-800 dark:text-slate-100">{item.subject} class</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.teacherName} · {item.recurrencePattern || item.status}</p>
                    </div>
                    {item.meetingLink && <a href={item.meetingLink} target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-600">Join</a>}
                  </div>
                ))}
                {!dashboard?.todaysClasses?.length && <p className="text-sm text-slate-500">No classes today.</p>}
              </div>
            </section>
          </div>

          <div className="space-y-6 lg:col-span-1">
            <section className="card p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">Billing &amp; payments</h2>
                <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-200">{payments.length} records</span>
              </div>

              {isPaymentDue ? (
                <form onSubmit={handlePayNow} className="space-y-4">
                  <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 p-3.5 dark:border-amber-900/60 dark:bg-amber-900/20">
                    <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">⚠️ Payment Due Soon</p>
                    <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                      Your payment is due on {paymentDueDate?.toLocaleDateString()}
                    </p>
                  </div>

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
              ) : (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/60 dark:bg-emerald-900/20">
                    <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">✓ Payment Status</p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                      No payment due at this time. Your admin will notify you when payment is required.
                    </p>
                  </div>

                  {!showAlternativePayment ? (
                    <div className="space-y-2.5">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        To request a session or ask about payment, contact your admin:
                      </p>
                      <a 
                        href="mailto:info@skillbridgetutors.com" 
                        className="inline-flex w-full items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100 dark:border-blue-900/60 dark:bg-blue-900/20 dark:text-blue-200"
                      >
                        📧 info@skillbridgetutors.com
                      </a>
                      <button 
                        type="button"
                        onClick={() => setShowAlternativePayment(true)}
                        className="w-full rounded-xl border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-semibold text-violet-700 hover:bg-violet-100 dark:border-violet-900/60 dark:bg-violet-900/20 dark:text-violet-200"
                      >
                        💳 Make a payment
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handlePayNow} className="space-y-3">
                      <div>
                        <label className="mb-2 block text-xs font-semibold text-slate-700 dark:text-slate-200">Amount</label>
                        <input
                          type="number"
                          step="0.01"
                          min="1"
                          value={paymentForm.amount}
                          onChange={(e) => setPaymentForm((prev) => ({ ...prev, amount: e.target.value }))}
                          className="input-field text-sm"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-semibold text-slate-700 dark:text-slate-200">Currency</label>
                        <select value={paymentForm.currency} onChange={(e) => setPaymentForm((prev) => ({ ...prev, currency: e.target.value }))} className="input-field text-sm">
                          <option value="GBP">GBP</option>
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                        </select>
                      </div>

                      <div className="flex gap-2">
                        <button type="submit" disabled={paying} className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-3 py-2 text-xs font-bold text-white shadow-lg shadow-violet-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70">
                          {paying ? 'Processing...' : 'Pay'}
                        </button>
                        <button 
                          type="button"
                          onClick={() => setShowAlternativePayment(false)}
                          className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

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
                <a href="mailto:info@skillbridgetutors.com" className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-100 dark:border-blue-900/60 dark:bg-blue-900/20 dark:text-blue-200">📧 Contact admin via email</a>
                <Link to="/courses" className="rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700 hover:bg-violet-100 dark:border-violet-900/60 dark:bg-violet-900/20 dark:text-violet-200">Browse courses</Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
