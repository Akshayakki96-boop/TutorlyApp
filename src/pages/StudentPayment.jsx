import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { apiRequest } from '../lib/apiClient'

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID?.trim()

export default function StudentPayment() {
  const location = useLocation()
  const navigate = useNavigate()
  const { studentId, email, fullName } = location.state || {}

  const [amount, setAmount] = useState('49')
  const [currency, setCurrency] = useState('GBP')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [sdkReady, setSdkReady] = useState(false)
  const buttonsContainerRef = useRef(null)

  // Load the PayPal JS SDK once so we can render the Buttons widget for this order.
  useEffect(() => {
    if (!PAYPAL_CLIENT_ID || success) return

    const existingScript = document.getElementById('paypal-sdk')
    if (existingScript) {
      setSdkReady(true)
      return
    }

    const script = document.createElement('script')
    script.id = 'paypal-sdk'
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=${currency}`
    script.async = true
    script.onload = () => setSdkReady(true)
    script.onerror = () => setError('Unable to load PayPal. Please refresh and try again.')
    document.body.appendChild(script)
  }, [currency, success])

  useEffect(() => {
    if (!sdkReady || success || !window.paypal || !buttonsContainerRef.current) return

    buttonsContainerRef.current.innerHTML = ''

    const buttons = window.paypal.Buttons({
      style: { layout: 'vertical', color: 'blue', shape: 'pill', label: 'pay' },
      createOrder: async () => {
        setError('')
        const numericAmount = Number(amount)
        if (!numericAmount || numericAmount <= 0) {
          setError('Please enter a valid payment amount.')
          throw new Error('Invalid amount')
        }

        const orderResult = await apiRequest('/api/payments/create-order', {
          method: 'POST',
          body: JSON.stringify({ studentId, amount: numericAmount, currency }),
        })

        const orderId = orderResult?.orderId || orderResult?.id || orderResult?.paymentOrderId
        if (!orderId) {
          throw new Error('Payment order was created without a valid reference ID.')
        }
        return String(orderId)
      },
      onApprove: async (data) => {
        await apiRequest('/api/payments/capture', {
          method: 'POST',
          body: JSON.stringify({ orderId: data.orderID, studentId }),
        })
        setSuccess(true)
      },
      onError: () => {
        setError('Payment could not be completed. Please try again.')
      },
    })

    buttons.render(buttonsContainerRef.current)

    return () => buttons.close?.()
  }, [sdkReady, amount, currency, studentId, success])

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#0f766e_0%,_#0f172a_48%,_#020817_100%)] px-4 py-10">
      <div className="mx-auto max-w-xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.5)] backdrop-blur-xl sm:p-10">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200">
          <span>←</span> Back to home
        </Link>

        {success ? (
          <div className="mt-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="mt-4 text-2xl font-black text-white">Payment successful</h1>
            <p className="mt-2 text-sm text-slate-300">Your enrollment fee has been received. You can now log in to access your student dashboard.</p>
            <button
              type="button"
              onClick={() => navigate('/student/login')}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-4 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:brightness-110"
            >
              Continue to login
            </button>
          </div>
        ) : (
          <>
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
                {PAYPAL_CLIENT_ID ? (
                  <div ref={buttonsContainerRef} />
                ) : (
                  <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
                    PayPal is not configured yet. Set VITE_PAYPAL_CLIENT_ID to enable payments here.
                  </div>
                )}
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-slate-300">
              Prefer to pay later?{' '}
              <Link className="font-semibold text-emerald-300 underline" to="/student/login">
                Skip for now and log in
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
