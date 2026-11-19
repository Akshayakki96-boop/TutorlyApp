import { Link, useLocation } from 'react-router-dom'
import { isStudentAuthenticated } from '../lib/authStorage'

export default function PaymentSuccess() {
  const location = useLocation()
  const loggedIn = isStudentAuthenticated()
  const { orderId, paymentId } = location.state || {}

  return (
    <>
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 px-6 py-28">
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">Payment complete</p>
          <h1 className="mt-3 font-heading text-3xl font-bold text-slate-900 dark:text-white">Thank you for your payment</h1>
          <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">Your payment has been received successfully. Your account is now ready to use.</p>
          {orderId && <Reference orderId={orderId} paymentId={paymentId} />}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to={loggedIn ? '/student-dashboard' : '/student/login'} className="btn-primary">{loggedIn ? 'Back to dashboard' : 'Continue to student portal'}</Link>
            <Link to="/" className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">Back to homepage</Link>
          </div>
        </div>
      </main>
    </>
  )
}

function Reference({ orderId, paymentId }) {
  return (
    <div className="mx-auto mt-6 max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left text-sm dark:border-slate-700 dark:bg-slate-800/60">
      <div className="flex justify-between gap-4">
        <span className="text-slate-500 dark:text-slate-400">Order reference</span>
        <span className="max-w-[65%] truncate font-semibold text-slate-800 dark:text-slate-200" title={orderId}>{orderId}</span>
      </div>
      {paymentId && (
        <div className="mt-2 flex justify-between gap-4">
          <span className="text-slate-500 dark:text-slate-400">Payment reference</span>
          <span className="max-w-[65%] truncate font-semibold text-slate-800 dark:text-slate-200" title={paymentId}>{paymentId}</span>
        </div>
      )}
    </div>
  )
}
