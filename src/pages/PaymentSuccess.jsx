import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { apiRequest } from '../lib/apiClient'

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('token')?.trim() || ''
  const payerId = searchParams.get('PayerID')?.trim() || searchParams.get('PayPalID')?.trim() || ''
  const [status, setStatus] = useState(orderId ? 'loading' : 'error')
  const [error, setError] = useState(orderId ? '' : 'The PayPal order reference is missing from this return URL.')

  useEffect(() => {
    if (!orderId) return

    let active = true

    async function capturePayment() {
      try {
        await apiRequest('/api/payments/capture', {
          method: 'POST',
          body: JSON.stringify({ orderId }),
        })
        if (active) setStatus('success')
      } catch (err) {
        if (active) {
          setError(err.message || 'We could not confirm this PayPal payment.')
          setStatus('error')
        }
      }
    }

    capturePayment()
    return () => {
      active = false
    }
  }, [orderId])

  return (
    <>
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 px-6 py-28">
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-12">
          {status === 'loading' && (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 dark:border-blue-900 dark:border-t-blue-300" />
              </div>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-300">PayPal payment</p>
              <h1 className="mt-3 font-heading text-3xl font-bold text-slate-900 dark:text-white">Confirming your payment</h1>
              <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">Please wait while we securely confirm your PayPal transaction.</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">Payment complete</p>
              <h1 className="mt-3 font-heading text-3xl font-bold text-slate-900 dark:text-white">Thank you for your payment</h1>
              <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">Your PayPal payment has been received successfully. Your account is now ready to use.</p>
              <Reference orderId={orderId} payerId={payerId} />
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/student/login" className="btn-primary">Continue to student portal</Link>
                <Link to="/" className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">Back to homepage</Link>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-rose-600 dark:text-rose-300">Payment confirmation</p>
              <h1 className="mt-3 font-heading text-3xl font-bold text-slate-900 dark:text-white">We could not confirm your payment</h1>
              <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">{error}</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/student/payment" className="btn-primary">Return to payment</Link>
                <Link to="/" className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">Back to homepage</Link>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  )
}

function Reference({ orderId, payerId }) {
  return (
    <div className="mx-auto mt-6 max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left text-sm dark:border-slate-700 dark:bg-slate-800/60">
      <div className="flex justify-between gap-4">
        <span className="text-slate-500 dark:text-slate-400">PayPal order</span>
        <span className="max-w-[65%] truncate font-semibold text-slate-800 dark:text-slate-200" title={orderId}>{orderId}</span>
      </div>
      {payerId && (
        <div className="mt-2 flex justify-between gap-4">
          <span className="text-slate-500 dark:text-slate-400">Payer reference</span>
          <span className="max-w-[65%] truncate font-semibold text-slate-800 dark:text-slate-200" title={payerId}>{payerId}</span>
        </div>
      )}
    </div>
  )
}
