import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getApiBaseUrl, apiRequest } from '../../lib/apiClient'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [stats, setStats] = useState({ leads: 0, teachers: 0, slots: 0, bookings: 0 })

  useEffect(() => {
    let alive = true

    async function loadStats() {
      setLoading(true)
      setError('')
      try {
        const [leads, teachers, slots, bookings] = await Promise.all([
          apiRequest('/api/leads').catch(() => []),
          apiRequest('/api/teachers').catch(() => []),
          apiRequest('/api/demo/admin/slots').catch(() => []),
          apiRequest('/api/demo/admin/bookings').catch(() => []),
        ])

        if (!alive) return

        setStats({
          leads: Array.isArray(leads) ? leads.length : 0,
          teachers: Array.isArray(teachers) ? teachers.length : 0,
          slots: Array.isArray(slots) ? slots.length : 0,
          bookings: Array.isArray(bookings) ? bookings.length : 0,
        })
      } catch (err) {
        if (alive) setError(err.message || 'Failed to load dashboard stats.')
      } finally {
        if (alive) setLoading(false)
      }
    }

    loadStats()
    return () => {
      alive = false
    }
  }, [])

  return (
    <section className="w-full">
      <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Dashboard</h1>
      <p className="mt-2 text-sm sm:text-base text-slate-600 break-words">Backend base URL: <span className="font-semibold break-all">{getApiBaseUrl()}</span></p>

      {error && <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

      <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Leads" value={loading ? '...' : stats.leads} tone="blue" />
        <StatCard label="Teachers" value={loading ? '...' : stats.teachers} tone="teal" />
        <StatCard label="Demo Slots" value={loading ? '...' : stats.slots} tone="amber" />
        <StatCard label="Demo Bookings" value={loading ? '...' : stats.bookings} tone="indigo" />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-5">
          <h2 className="text-base sm:text-lg font-bold text-blue-900">📅 Create New Class</h2>
          <p className="mt-2 text-sm text-blue-800">Search for available teachers and schedule classes</p>
          <button
            onClick={() => navigate('/admin/schedule/find-teachers')}
            className="mt-4 w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm sm:text-base font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            🔍 Find Teachers & Schedule
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-amber-50 to-amber-100 p-4 sm:p-5">
          <h2 className="text-base sm:text-lg font-bold text-amber-900">🔄 Manage Classes</h2>
          <p className="mt-2 text-sm text-amber-800">View all classes and reschedule as needed</p>
          <button
            onClick={() => navigate('/admin/schedule/classes')}
            className="mt-4 w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm sm:text-base font-semibold text-white hover:bg-amber-700 transition-colors"
          >
            📋 View & Reschedule Classes
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
        <h2 className="text-base sm:text-lg font-bold text-slate-900">Quick Notes</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li>Use the sidebar to manage all endpoint groups.</li>
          <li>Auth pages are direct URL access only: /admin/login and /admin/register.</li>
          <li>All protected requests include your saved Bearer token automatically.</li>
        </ul>
      </div>
    </section>
  )
}

function StatCard({ label, value, tone }) {
  const toneClass = {
    blue: 'from-blue-50 to-blue-100 border-blue-200 text-blue-900',
    teal: 'from-teal-50 to-teal-100 border-teal-200 text-teal-900',
    amber: 'from-amber-50 to-amber-100 border-amber-200 text-amber-900',
    indigo: 'from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-900',
  }[tone]

  return (
    <div className={`rounded-2xl border bg-gradient-to-br p-5 ${toneClass}`}>
      <p className="text-sm font-semibold opacity-80">{label}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  )
}
