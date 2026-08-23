import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiRequest } from '../../lib/apiClient'

export default function AdminLeadDetail() {
  const { id } = useParams()
  const [lead, setLead] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true

    async function loadDetail() {
      setLoading(true)
      setError('')
      try {
        const result = await apiRequest(`/api/leads/${id}`)
        if (alive) setLead(result)
      } catch (err) {
        if (alive) setError(err.message || 'Unable to fetch lead detail.')
      } finally {
        if (alive) setLoading(false)
      }
    }

    loadDetail()
    return () => {
      alive = false
    }
  }, [id])

  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-slate-900">Lead Detail</h1>
        <Link to="/admin/leads" className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
          Back to Leads
        </Link>
      </div>

      {loading && <p className="mt-4 text-slate-600">Loading lead...</p>}
      {error && <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

      {!loading && !error && lead && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
            <h2 className="font-bold text-slate-900">Lead #{lead.id ?? id}</h2>
          </div>
          <dl className="grid gap-3 p-4 sm:grid-cols-2">
            <Detail label="Full name" value={lead.fullName} />
            <Detail label="Email" value={lead.email} />
            <Detail label="Phone" value={lead.phone} />
            <Detail label="Subject" value={lead.subject} />
            <Detail label="Query" value={lead.query} wide />
          </dl>
        </div>
      )}
    </section>
  )
}

function Detail({ label, value, wide = false }) {
  return (
    <div className={wide ? 'sm:col-span-2' : ''}>
      <dt className="text-xs uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800">{value || '-'}</dd>
    </div>
  )
}
