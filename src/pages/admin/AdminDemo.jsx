import { useEffect, useState } from 'react'
import { apiRequest } from '../../lib/apiClient'

const BOOK_DEFAULT = '{\n  "slotId": 1,\n  "studentName": "",\n  "email": "",\n  "phone": "",\n  "subject": ""\n}'

export default function AdminDemo() {
  const [slots, setSlots] = useState([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [bookPayload, setBookPayload] = useState(BOOK_DEFAULT)
  const [reschedule, setReschedule] = useState({ bookingId: '', newSlotId: '', reason: '' })
  const [cancel, setCancel] = useState({ bookingId: '', reason: '' })
  const [savingBook, setSavingBook] = useState(false)
  const [savingReschedule, setSavingReschedule] = useState(false)
  const [savingCancel, setSavingCancel] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function loadSlots() {
    setLoadingSlots(true)
    setError('')

    try {
      const result = await apiRequest('/api/demo/slots')
      setSlots(Array.isArray(result) ? result : [])
    } catch (err) {
      setError(err.message || 'Unable to load demo slots.')
    } finally {
      setLoadingSlots(false)
    }
  }

  useEffect(() => {
    loadSlots()
  }, [])

  function clearMessages() {
    setError('')
    setMessage('')
  }

  async function submitBook(e) {
    e.preventDefault()
    clearMessages()
    setSavingBook(true)

    try {
      const parsed = JSON.parse(bookPayload)
      await apiRequest('/api/demo/book', {
        method: 'POST',
        body: JSON.stringify(parsed),
      })
      setMessage('Demo booking request sent successfully.')
    } catch (err) {
      setError(err.message || 'Booking failed. Ensure payload JSON is valid.')
    } finally {
      setSavingBook(false)
    }
  }

  async function submitReschedule(e) {
    e.preventDefault()
    clearMessages()
    setSavingReschedule(true)

    try {
      await apiRequest('/api/demo/reschedule', {
        method: 'POST',
        body: JSON.stringify({
          bookingId: Number(reschedule.bookingId),
          newSlotId: Number(reschedule.newSlotId),
          reason: reschedule.reason || null,
        }),
      })
      setMessage('Demo reschedule submitted successfully.')
    } catch (err) {
      setError(err.message || 'Reschedule failed.')
    } finally {
      setSavingReschedule(false)
    }
  }

  async function submitCancel(e) {
    e.preventDefault()
    clearMessages()
    setSavingCancel(true)

    try {
      await apiRequest('/api/demo/cancel', {
        method: 'POST',
        body: JSON.stringify({
          bookingId: Number(cancel.bookingId),
          reason: cancel.reason || null,
        }),
      })
      setMessage('Demo cancellation submitted successfully.')
    } catch (err) {
      setError(err.message || 'Cancellation failed.')
    } finally {
      setSavingCancel(false)
    }
  }

  return (
    <section>
      <h1 className="text-3xl font-black text-slate-900">Demo Management</h1>
      <p className="mt-2 text-slate-600">Use /api/demo/slots, /api/demo/book, /api/demo/reschedule, and /api/demo/cancel.</p>

      {error && <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
      {message && <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p>}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">
            <h2 className="text-lg font-bold text-slate-900">Available Slots</h2>
            <button onClick={loadSlots} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">Refresh</button>
          </div>
          <div className="p-4">
            {loadingSlots && <p className="text-sm text-slate-500">Loading slots...</p>}
            {!loadingSlots && slots.length === 0 && <p className="text-sm text-slate-500">No slots returned.</p>}
            {!loadingSlots && slots.length > 0 && (
              <pre className="max-h-80 overflow-auto rounded-xl bg-slate-900 p-3 text-xs text-slate-100">{JSON.stringify(slots, null, 2)}</pre>
            )}
          </div>
        </div>

        <form onSubmit={submitBook} className="rounded-2xl border border-slate-200 p-4">
          <h2 className="text-lg font-bold text-slate-900">Book Demo</h2>
          <p className="mt-1 text-xs text-slate-500">Endpoint accepts open schema; edit payload as needed.</p>
          <textarea
            rows={14}
            value={bookPayload}
            onChange={(e) => setBookPayload(e.target.value)}
            className="mt-3 w-full rounded-xl border border-slate-300 px-3 py-2 font-mono text-xs"
          />
          <button type="submit" disabled={savingBook} className="mt-3 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-70">
            {savingBook ? 'Submitting...' : 'Submit Booking'}
          </button>
        </form>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <form onSubmit={submitReschedule} className="rounded-2xl border border-slate-200 p-4">
          <h2 className="text-lg font-bold text-slate-900">Reschedule Demo</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Input label="Booking ID" name="bookingId" required value={reschedule.bookingId} onChange={(e) => setReschedule((p) => ({ ...p, bookingId: e.target.value }))} />
            <Input label="New Slot ID" name="newSlotId" required value={reschedule.newSlotId} onChange={(e) => setReschedule((p) => ({ ...p, newSlotId: e.target.value }))} />
          </div>
          <div className="mt-3">
            <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="reason-res">Reason</label>
            <textarea id="reason-res" rows={3} value={reschedule.reason} onChange={(e) => setReschedule((p) => ({ ...p, reason: e.target.value }))} className="w-full rounded-xl border border-slate-300 px-3 py-2" />
          </div>
          <button type="submit" disabled={savingReschedule} className="mt-3 rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-amber-700 disabled:opacity-70">
            {savingReschedule ? 'Submitting...' : 'Reschedule'}
          </button>
        </form>

        <form onSubmit={submitCancel} className="rounded-2xl border border-slate-200 p-4">
          <h2 className="text-lg font-bold text-slate-900">Cancel Demo</h2>
          <div className="mt-3">
            <Input label="Booking ID" name="bookingId-cancel" required value={cancel.bookingId} onChange={(e) => setCancel((p) => ({ ...p, bookingId: e.target.value }))} />
          </div>
          <div className="mt-3">
            <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="reason-cancel">Reason</label>
            <textarea id="reason-cancel" rows={3} value={cancel.reason} onChange={(e) => setCancel((p) => ({ ...p, reason: e.target.value }))} className="w-full rounded-xl border border-slate-300 px-3 py-2" />
          </div>
          <button type="submit" disabled={savingCancel} className="mt-3 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-rose-700 disabled:opacity-70">
            {savingCancel ? 'Submitting...' : 'Cancel Demo'}
          </button>
        </form>
      </div>
    </section>
  )
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor={props.name}>{label}</label>
      <input {...props} id={props.name} className="w-full rounded-xl border border-slate-300 px-3 py-2" />
    </div>
  )
}
