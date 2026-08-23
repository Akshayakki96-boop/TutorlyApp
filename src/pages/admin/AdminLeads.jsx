import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiRequest } from '../../lib/apiClient'

const EMPTY_FORM = {
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  query: '',
}

export default function AdminLeads() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function loadLeads() {
    setLoading(true)
    setError('')
    try {
      const result = await apiRequest('/api/leads')
      setLeads(Array.isArray(result) ? result : [])
    } catch (err) {
      setError(err.message || 'Unable to fetch leads.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadLeads()
  }, [])

  function onChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      await apiRequest('/api/leads', {
        method: 'POST',
        body: JSON.stringify(form),
      })
      setForm(EMPTY_FORM)
      await loadLeads()
    } catch (err) {
      setError(err.message || 'Unable to create lead.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section>
      <h1 className="text-3xl font-black text-slate-900">Leads</h1>
      <p className="mt-2 text-slate-600">Create and inspect leads via /api/leads and /api/leads/{'{id}'}.</p>

      {error && <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 p-4 lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-900">Create Lead</h2>
          <div className="mt-4 space-y-3">
            <Input label="Full name" name="fullName" value={form.fullName} onChange={onChange} required />
            <Input label="Email" name="email" type="email" value={form.email} onChange={onChange} required />
            <Input label="Phone" name="phone" value={form.phone} onChange={onChange} required />
            <Input label="Subject" name="subject" value={form.subject} onChange={onChange} required />
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="query">Query</label>
              <textarea
                id="query"
                name="query"
                required
                rows={4}
                value={form.query}
                onChange={onChange}
                className="w-full rounded-xl border border-slate-300 px-3 py-2"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving ? 'Saving...' : 'Create Lead'}
          </button>
        </form>

        <div className="overflow-hidden rounded-2xl border border-slate-200 lg:col-span-3">
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">
            <h2 className="text-lg font-bold text-slate-900">All Leads</h2>
            <button onClick={loadLeads} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">Refresh</button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100 text-left text-slate-700">
                <tr>
                  <th className="px-4 py-2.5">ID</th>
                  <th className="px-4 py-2.5">Name</th>
                  <th className="px-4 py-2.5">Email</th>
                  <th className="px-4 py-2.5">Subject</th>
                  <th className="px-4 py-2.5">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td className="px-4 py-3 text-slate-500" colSpan={5}>Loading leads...</td>
                  </tr>
                )}
                {!loading && leads.length === 0 && (
                  <tr>
                    <td className="px-4 py-3 text-slate-500" colSpan={5}>No leads found.</td>
                  </tr>
                )}
                {!loading && leads.map((lead) => (
                  <tr key={lead.id || `${lead.email}-${lead.fullName}`} className="border-t border-slate-200">
                    <td className="px-4 py-2.5 font-medium">{lead.id ?? '-'}</td>
                    <td className="px-4 py-2.5">{lead.fullName || '-'}</td>
                    <td className="px-4 py-2.5">{lead.email || '-'}</td>
                    <td className="px-4 py-2.5">{lead.subject || '-'}</td>
                    <td className="px-4 py-2.5">
                      {lead.id ? (
                        <Link className="font-semibold text-blue-700 underline" to={`/admin/leads/${lead.id}`}>
                          View
                        </Link>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor={props.name}>{label}</label>
      <input
        id={props.name}
        {...props}
        className="w-full rounded-xl border border-slate-300 px-3 py-2"
      />
    </div>
  )
}
