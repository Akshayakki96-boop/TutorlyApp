import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { apiRequest } from '../lib/apiClient'

export default function StudentPayment() {
  const location = useLocation()
  const { studentId, email, fullName } = location.state || {}

  const [amount, setAmount] = useState('49')
  const [currency, setCurrency] = useState('GBP')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handlePayNow() {
    setError('')

    if (!studentId) {
      setError('Student reference is missing. Please register again.')
      return
    }

    const numericAmount = Number(amount)
    if (!numericAmount || numericAmount <= 0) {
      setError('Please enter a valid payment amount.')
      return
    }

    setLoading(true)

    try {
      const orderResult = await apiRequest('/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({ studentId, amount: numericAmount, currency }),
      })

      const approvalUrl = orderResult?.approvalUrl
      if (!approvalUrl) {
        throw new Error('Payment order was created without a redirect URL.')
      }

      // Hand off to PayPal; it redirects back to /payment/success or /payment/cancel.
      window.location.href = approvalUrl
    } catch (err) {
      setError(err.message || 'Unable to start the payment. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#0f766e_0%,_#0f172a_48%,_#020817_100%)] px-4 py-10">
      <div className="mx-auto max-w-xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.5)] backdrop-blur-xl sm:p-10">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200">
          <span>←</span> Back to home
        </Link>

        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300">Step 2 of 2</p>
          <h1 className="mt-2 text-3xl font-black text-white">Complete your enrollment</h1>
          <p className="mt-3 text-sm text-slate-300">
            {fullName ? `Hi ${fullName}, y` : 'Y'}our account has been created{email ? ` for ${email}` : ''}. Pay the one-time enrollment fee below to activate your student dashboard.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="amount">Amount</label>
              <input
                id="amount"
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="currency">Currency</label>
              <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} className="input-field">
                <option value="GBP">GBP (£)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div>
          )}

          <div className="mt-6">
            <button
              type="button"
              onClick={handlePayNow}
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-4 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Redirecting to PayPal...' : 'Pay now with PayPal'}
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate-300">
          Prefer to pay later?{' '}
          <Link className="font-semibold text-emerald-300 underline" to="/student/login">
            Skip for now and log in
          </Link>
        </p>
      </div>
    </div>
  )
}
