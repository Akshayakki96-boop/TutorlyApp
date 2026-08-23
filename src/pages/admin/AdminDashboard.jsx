import { useEffect, useState } from 'react'
import { getApiBaseUrl, apiRequest } from '../../lib/apiClient'

export default function AdminDashboard() {
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
    <section>
      <h1 className="text-3xl font-black text-slate-900">Dashboard</h1>
      <p className="mt-2 text-slate-600">Backend base URL: <span className="font-semibold">{getApiBaseUrl()}</span></p>

      {error && <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Leads" value={loading ? '...' : stats.leads} tone="blue" />
        <StatCard label="Teachers" value={loading ? '...' : stats.teachers} tone="teal" />
        <StatCard label="Demo Slots" value={loading ? '...' : stats.slots} tone="amber" />
        <StatCard label="Demo Bookings" value={loading ? '...' : stats.bookings} tone="indigo" />
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h2 className="text-lg font-bold text-slate-900">Quick Notes</h2>
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
