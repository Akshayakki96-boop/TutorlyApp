import { Link } from 'react-router-dom'

export default function PaymentCancel() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-28 dark:bg-slate-950">
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-amber-600 dark:text-amber-300">PayPal payment</p>
        <h1 className="mt-3 font-heading text-3xl font-bold text-slate-900 dark:text-white">Payment cancelled</h1>
        <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">
          Your PayPal payment was cancelled or wasn’t completed. No payment has been confirmed for this attempt.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/student/payment" className="btn-primary">Try payment again</Link>
          <Link to="/student/login" className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">Go to student login</Link>
        </div>

        <Link to="/" className="mt-6 inline-block text-sm font-semibold text-blue-600 hover:underline dark:text-blue-300">Back to homepage</Link>
      </div>
    </main>
  )
}
