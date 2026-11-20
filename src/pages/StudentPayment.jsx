import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { apiRequest } from '../lib/apiClient'
import { openRazorpayCheckout } from '../lib/razorpayClient'
import { PAYMENT_CURRENCY, PAYMENT_PACKAGES, findPaymentPackage } from '../data/paymentPackages'
import { useAutoDismiss } from '../lib/useAutoDismiss'

export default function StudentPayment() {
  const location = useLocation()
  const navigate = useNavigate()
  const { studentId, email, fullName } = location.state || {}

  const [packageId, setPackageId] = useState(PAYMENT_PACKAGES[0].id)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  useAutoDismiss(error, () => setError(''))

  async function handlePayNow() {
    setError('')

    if (!studentId) {
      setError('Student reference is missing. Please register again.')
      return
    }

    const selectedPackage = findPaymentPackage(packageId)

    setLoading(true)

    let order
    try {
      order = await apiRequest('/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({ studentId, amount: selectedPackage.amount, currency: PAYMENT_CURRENCY }),
      })
    } catch (err) {
      setError(err.message || 'Unable to start the payment. Please try again.')
      setLoading(false)
      return
    }

    let result
    try {
      result = await openRazorpayCheckout({
        order,
        student: { name: order.studentName || fullName, email: order.studentEmail || email, contact: order.studentPhone },
        description: 'Enrollment fee',
      })
    } catch (err) {
      // Covers both a dismissed modal ("cancelled") and a real decline from the bank
      // or Razorpay's risk engine (payment.failed). An order was created on the
      // backend either way, so it must be marked failed/cancelled here - otherwise it
      // stays stuck in "Created" status even though the payment never went through.
      try {
        await apiRequest('/api/payments/cancel', {
          method: 'POST',
          body: JSON.stringify({ razorpayOrderId: order.orderId }),
        })
      } catch (cancelErr) {
        console.error('Failed to update payment status after a failed/cancelled checkout:', cancelErr)
      }
      if (err.message === 'cancelled') {
        navigate('/payment/cancel')
      } else {
        setError(err.message || 'Payment failed. Please try again.')
      }
      setLoading(false)
      return
    }

    try {
      await apiRequest('/api/payments/verify', {
        method: 'POST',
        body: JSON.stringify({
          razorpayOrderId: result.orderId,
          razorpayPaymentId: result.paymentId,
          razorpaySignature: result.signature,
        }),
      })

      navigate('/payment/success', { state: { orderId: result.orderId, paymentId: result.paymentId } })
    } catch (err) {
      // Payment was accepted by Razorpay but we could not verify it with our backend.
      // Do not auto-cancel the order here: the charge may have actually succeeded,
      // so surface the issue instead of mislabeling a possibly-successful payment.
      setError(err.message || 'We could not confirm your payment. Please contact support with your payment details before retrying.')
    } finally {
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
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="package">Package</label>
            <select id="package" value={packageId} onChange={(e) => setPackageId(e.target.value)} className="input-field">
              {PAYMENT_PACKAGES.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.label} — £{pkg.amount}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-slate-400">{findPaymentPackage(packageId).description}</p>
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
              {loading ? 'Processing payment...' : 'Pay now'}
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
