import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-6 py-20">
      <div className="max-w-xl w-full text-center rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600 dark:text-blue-300 font-semibold mb-4">404</p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Page not found</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
          The page you’re looking for doesn’t exist or may have moved. Please check the URL and try again.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/" className="btn-primary">Back to homepage</Link>
          <Link to="/blogs" className="inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 px-6 py-3 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            Explore blogs
          </Link>
        </div>
      </div>
    </main>
  )
}
