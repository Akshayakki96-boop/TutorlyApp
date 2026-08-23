import { useEffect, useState } from 'react'
import { apiRequest } from '../../lib/apiClient'

export default function AdminDemo() {
  const [slotFilter, setSlotFilter] = useState({ fromUtc: '', toUtc: '' })
  const [slots, setSlots] = useState([])
  const [bookings, setBookings] = useState([])
  const [bookingStatus, setBookingStatus] = useState('All')
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [loadingBookings, setLoadingBookings] = useState(false)
  const [newSlot, setNewSlot] = useState({ startTime: '', endTime: '', isAvailable: true })
  const [creatingSlot, setCreatingSlot] = useState(false)
  const [updatingSlotId, setUpdatingSlotId] = useState(null)
  const [teacherCheck, setTeacherCheck] = useState({ slotId: '', subject: '' })
  const [checkingTeacher, setCheckingTeacher] = useState(false)
  const [teacherResult, setTeacherResult] = useState(null)
  const [processingBookingAction, setProcessingBookingAction] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  function buildQuery(params) {
    const query = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        query.set(key, String(value))
      }
    })

    const queryString = query.toString()
    return queryString ? `?${queryString}` : ''
  }

  function getId(entity) {
    return entity?.id ?? entity?.slotId ?? entity?.SlotId ?? null
  }

  function getValue(entity, keys, fallback = '-') {
    for (const key of keys) {
      if (entity?.[key] !== undefined && entity?.[key] !== null && entity?.[key] !== '') {
        return entity[key]
      }
    }

    return fallback
  }

  function toLocalInputValue(value) {
    if (!value) return ''
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return ''
    const offset = date.getTimezoneOffset()
    const local = new Date(date.getTime() - offset * 60 * 1000)
    return local.toISOString().slice(0, 16)
  }

  function toUtcIso(localDateTime) {
    if (!localDateTime) return ''
    const date = new Date(localDateTime)
    if (Number.isNaN(date.getTime())) return ''
    return date.toISOString()
  }

  function formatDateTime(value) {
    if (!value) return '—'

    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return String(value)

    try {
      return new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      }).format(date)
    } catch (error) {
      return new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date)
    }
  }

  function formatStatus(status) {
    const label = String(status || 'Unknown')
    const tones = {
      Booked: 'bg-emerald-100 text-emerald-700',
      Rescheduled: 'bg-amber-100 text-amber-700',
      Cancelled: 'bg-rose-100 text-rose-700',
    }

    return (
      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${tones[label] || 'bg-slate-200 text-slate-700'}`}>
        {label}
      </span>
    )
  }

  function downloadCsv(rows, filename) {
    if (!rows.length) {
      setError('No bookings available to export.')
      return
    }

    const headers = ['bookingId', 'studentName', 'email', 'status', 'slot', 'teacher', 'meetingLink']
    const csvRows = [headers].concat(
      rows.map((booking) => {
        const bookingId = getValue(booking, ['bookingId', 'id', 'BookingId', 'Id'], '')
        const studentName = getValue(booking, ['studentName', 'fullName', 'StudentName', 'FullName'], '')
        const email = getValue(booking, ['email', 'Email'], '')
        const status = getValue(booking, ['status', 'Status'], '')
        const slot = getValue(booking, ['slot', 'slotTime', 'Slot', 'SlotTime'], '')
        const teacher = getValue(booking, ['teacherName', 'teacher', 'TeacherName', 'Teacher'], '')
        const meetingLink = getValue(booking, ['meetingLink', 'meetingUrl', 'MeetingLink', 'MeetingUrl'], '')

        return [bookingId, studentName, email, status, slot, teacher, meetingLink]
          .map((value) => `"${String(value ?? '').replace(/"/g, '""')}"`)
          .join(',')
      })
    )

    const csv = csvRows.join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  }

  async function loadSlots() {
    setLoadingSlots(true)
    setError('')

    try {
      const result = await apiRequest(`/api/demo/admin/slots${buildQuery(slotFilter)}`)
      const sorted = Array.isArray(result)
        ? [...result].sort((a, b) => {
            const left = Number(getId(a) ?? 0)
            const right = Number(getId(b) ?? 0)
            return left - right
          })
        : []
      setSlots(sorted)
    } catch (err) {
      setError(err.message || 'Unable to load demo slots.')
    } finally {
      setLoadingSlots(false)
    }
  }

  useEffect(() => {
    loadSlots()
    loadBookings('All')
  }, [])

  function clearMessages() {
    setError('')
    setMessage('')
  }

  async function createSlot(e) {
    e.preventDefault()
    clearMessages()
    setCreatingSlot(true)

    try {
      await apiRequest('/api/demo/admin/slots', {
        method: 'POST',
        body: JSON.stringify({
          startTime: toUtcIso(newSlot.startTime),
          endTime: toUtcIso(newSlot.endTime),
          isAvailable: Boolean(newSlot.isAvailable),
        }),
      })
      setMessage('New demo slot created successfully.')
      setNewSlot({ startTime: '', endTime: '', isAvailable: true })
      await loadSlots()
    } catch (err) {
      setError(err.message || 'Failed to create slot.')
    } finally {
      setCreatingSlot(false)
    }
  }

  async function setSlotAvailability(slotId, isAvailable) {
    clearMessages()
    setUpdatingSlotId(slotId)

    try {
      await apiRequest(`/api/demo/admin/slots/${slotId}/availability`, {
        method: 'PATCH',
        body: JSON.stringify({
          isAvailable,
        }),
      })
      setMessage(`Slot #${slotId} marked as ${isAvailable ? 'available' : 'unavailable'}.`)
      await loadSlots()
    } catch (err) {
      setError(err.message || 'Failed to update slot availability.')
    } finally {
      setUpdatingSlotId(null)
    }
  }

  async function checkTeacherAvailability(e) {
    e.preventDefault()
    clearMessages()
    setCheckingTeacher(true)

    try {
      const query = buildQuery({
        slotId: Number(teacherCheck.slotId),
        subject: teacherCheck.subject,
      })
      const result = await apiRequest(`/api/demo/admin/teachers/available${query}`)
      setTeacherResult(result)
      setMessage('Teacher availability fetched successfully.')
    } catch (err) {
      setTeacherResult(null)
      setError(err.message || 'Unable to fetch available teacher for selected slot and subject.')
    } finally {
      setCheckingTeacher(false)
    }
  }

  async function loadBookings(status = bookingStatus) {
    setLoadingBookings(true)
    setError('')

    try {
      const query = status === 'All' ? '' : buildQuery({ status })
      const result = await apiRequest(`/api/demo/admin/bookings${query}`)
      setBookings(Array.isArray(result) ? result : [])
    } catch (err) {
      setError(err.message || 'Unable to load demo bookings.')
    } finally {
      setLoadingBookings(false)
    }
  }

  async function quickCancelBooking(booking) {
    const bookingId = getValue(booking, ['bookingId', 'id', 'BookingId', 'Id'])
    if (!bookingId) {
      setError('This booking does not have an ID so it cannot be cancelled.')
      return
    }

    const confirmed = window.confirm(`Cancel demo booking #${bookingId}?`)
    if (!confirmed) return

    setProcessingBookingAction(`cancel-${bookingId}`)
    setError('')

    try {
      await apiRequest('/api/demo/cancel', {
        method: 'POST',
        body: JSON.stringify({
          bookingId: Number(bookingId),
          reason: 'Admin quick cancel from dashboard',
        }),
      })
      setMessage(`Booking #${bookingId} has been cancelled.`)
      await loadBookings(bookingStatus)
    } catch (err) {
      setError(err.message || 'Unable to cancel booking.')
    } finally {
      setProcessingBookingAction(null)
    }
  }

  async function quickRescheduleBooking(booking) {
    const bookingId = getValue(booking, ['bookingId', 'id', 'BookingId', 'Id'])
    if (!bookingId) {
      setError('This booking does not have an ID so it cannot be rescheduled.')
      return
    }

    const newSlotId = window.prompt('Enter the new slot ID for this booking:')
    if (!newSlotId || Number.isNaN(Number(newSlotId))) {
      setError('A valid new slot ID is required for rescheduling.')
      return
    }

    setProcessingBookingAction(`reschedule-${bookingId}`)
    setError('')

    try {
      await apiRequest('/api/demo/reschedule', {
        method: 'POST',
        body: JSON.stringify({
          bookingId: Number(bookingId),
          newSlotId: Number(newSlotId),
          reason: 'Admin quick reschedule from dashboard',
        }),
      })
      setMessage(`Booking #${bookingId} has been rescheduled to slot #${newSlotId}.`)
      await loadBookings(bookingStatus)
    } catch (err) {
      setError(err.message || 'Unable to reschedule booking.')
    } finally {
      setProcessingBookingAction(null)
    }
  }

  function openBookingProfile(booking) {
    const email = getValue(booking, ['email', 'Email'], '')
    const profileUrl = getValue(booking, ['profileUrl', 'studentProfileUrl', 'ProfileUrl', 'StudentProfileUrl'], '')
    const studentId = getValue(booking, ['studentId', 'userId', 'StudentId', 'UserId'], '')

    if (profileUrl) {
      window.open(profileUrl, '_blank', 'noopener,noreferrer')
      return
    }

    if (studentId) {
      window.open(`/admin/leads/${studentId}`, '_blank', 'noopener,noreferrer')
      return
    }

    if (email) {
      window.location.href = `mailto:${email}`
      return
    }

    setMessage('No student profile URL or linked record is available for this booking.')
  }

  const filteredBookings = bookingStatus === 'All' ? bookings : bookings.filter((booking) => {
    const status = getValue(booking, ['status', 'Status'], '').toString()
    return status === bookingStatus
  })

  return (
    <section>
      <h1 className="text-3xl font-black text-slate-900">Demo Management</h1>
      <p className="mt-2 text-slate-600">Manage slots, availability, teacher mapping, and bookings using /api/demo/admin/* endpoints.</p>

      {error && <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
      {message && <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p>}

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 xl:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">
            <h2 className="text-lg font-bold text-slate-900">Admin Slots</h2>
            <button onClick={loadSlots} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">Refresh</button>
          </div>

          <div className="grid gap-3 border-b border-slate-200 p-4 sm:grid-cols-2">
            <Input
              label="From (UTC filter)"
              name="slot-from"
              type="datetime-local"
              value={toLocalInputValue(slotFilter.fromUtc)}
              onChange={(e) => setSlotFilter((p) => ({ ...p, fromUtc: toUtcIso(e.target.value) }))}
            />
            <Input
              label="To (UTC filter)"
              name="slot-to"
              type="datetime-local"
              value={toLocalInputValue(slotFilter.toUtc)}
              onChange={(e) => setSlotFilter((p) => ({ ...p, toUtc: toUtcIso(e.target.value) }))}
            />
            <div className="sm:col-span-2">
              <button
                type="button"
                onClick={loadSlots}
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
              >
                Apply Slot Filters
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100 text-left text-slate-700">
                <tr>
                  <th className="px-4 py-2.5">Slot ID</th>
                  <th className="px-4 py-2.5">Start</th>
                  <th className="px-4 py-2.5">End</th>
                  <th className="px-4 py-2.5">Availability</th>
                  <th className="px-4 py-2.5">Action</th>
                </tr>
              </thead>
              <tbody>
                {loadingSlots && (
                  <tr>
                    <td className="px-4 py-3 text-slate-500" colSpan={5}>Loading slots...</td>
                  </tr>
                )}
                {!loadingSlots && slots.length === 0 && (
                  <tr>
                    <td className="px-4 py-3 text-slate-500" colSpan={5}>No slots found for this filter.</td>
                  </tr>
                )}
                {!loadingSlots && slots.map((slot, index) => {
                  const slotId = getId(slot) ?? `row-${index}`
                  const isAvailable = Boolean(getValue(slot, ['isAvailable', 'available', 'IsAvailable'], false))
                  const startValue = getValue(slot, ['startTime', 'startUtc', 'StartTime', 'StartUtc'])
                  const endValue = getValue(slot, ['endTime', 'endUtc', 'EndTime', 'EndUtc'])

                  return (
                    <tr key={slotId} className="border-t border-slate-200">
                      <td className="px-4 py-2.5 font-semibold text-slate-800">{slotId}</td>
                      <td className="px-4 py-2.5">
                        <div>{formatDateTime(startValue)}</div>
                        <div className="text-xs text-slate-500">{startValue ? 'UTC' : ''}</div>
                      </td>
                      <td className="px-4 py-2.5">
                        <div>{formatDateTime(endValue)}</div>
                        <div className="text-xs text-slate-500">{endValue ? 'UTC' : ''}</div>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${isAvailable ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>
                          {isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        {typeof slotId === 'number' || (typeof slotId === 'string' && slotId !== '') ? (
                          <button
                            type="button"
                            onClick={() => setSlotAvailability(slotId, !isAvailable)}
                            disabled={updatingSlotId === slotId}
                            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-70"
                          >
                            {updatingSlotId === slotId ? 'Updating...' : isAvailable ? 'Set Unavailable' : 'Set Available'}
                          </button>
                        ) : (
                          '-'
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <form onSubmit={createSlot} className="rounded-2xl border border-slate-200 p-4">
          <h2 className="text-lg font-bold text-slate-900">Create Slot</h2>
          <div className="mt-3 space-y-3">
            <Input
              label="Start Time"
              name="slot-start"
              type="datetime-local"
              required
              value={newSlot.startTime}
              onChange={(e) => setNewSlot((p) => ({ ...p, startTime: e.target.value }))}
            />
            <Input
              label="End Time"
              name="slot-end"
              type="datetime-local"
              required
              value={newSlot.endTime}
              onChange={(e) => setNewSlot((p) => ({ ...p, endTime: e.target.value }))}
            />
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={newSlot.isAvailable}
                onChange={(e) => setNewSlot((p) => ({ ...p, isAvailable: e.target.checked }))}
              />
              Slot available
            </label>
          </div>
          <button type="submit" disabled={creatingSlot} className="mt-3 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-700 disabled:opacity-70">
            {creatingSlot ? 'Creating...' : 'Create Slot'}
          </button>
        </form>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <form onSubmit={checkTeacherAvailability} className="rounded-2xl border border-slate-200 p-4">
          <h2 className="text-lg font-bold text-slate-900">Find Available Teacher</h2>
          <p className="mt-1 text-xs text-slate-500">GET /api/demo/admin/teachers/available?slotId={"{id}"}&subject={"{subject}"}</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Input
              label="Slot ID"
              name="teacher-slot-id"
              required
              value={teacherCheck.slotId}
              onChange={(e) => setTeacherCheck((p) => ({ ...p, slotId: e.target.value }))}
            />
            <Input
              label="Subject"
              name="teacher-subject"
              required
              value={teacherCheck.subject}
              onChange={(e) => setTeacherCheck((p) => ({ ...p, subject: e.target.value }))}
            />
          </div>
          <button type="submit" disabled={checkingTeacher} className="mt-3 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-70">
            {checkingTeacher ? 'Checking...' : 'Check Teacher'}
          </button>

          <div className="mt-4">
            {!teacherResult && <p className="text-sm text-slate-500">No teacher check result yet.</p>}
            {teacherResult && (
              <pre className="max-h-64 overflow-auto rounded-xl bg-slate-900 p-3 text-xs text-slate-100">{JSON.stringify(teacherResult, null, 2)}</pre>
            )}
          </div>
        </form>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h2 className="text-lg font-bold text-slate-900">Teacher Availability Control</h2>
          <p className="mt-2 text-sm text-slate-600">
            For active/inactive teacher control and subject updates, use the Teachers section which calls PUT /api/teachers/{'{id}'}.
          </p>
          <a href="/admin/teachers" className="mt-3 inline-flex rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-900">
            Open Teachers Management
          </a>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3">
          <h2 className="text-lg font-bold text-slate-900">Demo Bookings</h2>
          <div className="flex items-center gap-2">
            <select
              value={bookingStatus}
              onChange={(e) => setBookingStatus(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
            >
              <option value="All">All</option>
              <option value="Booked">Booked</option>
              <option value="Rescheduled">Rescheduled</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button
              type="button"
              onClick={async () => {
                await loadBookings(bookingStatus)
              }}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={() => downloadCsv(filteredBookings, `demo-bookings-${bookingStatus.toLowerCase()}.csv`)}
              className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-900"
            >
              Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 text-left text-slate-700">
              <tr>
                <th className="px-4 py-2.5">Booking ID</th>
                <th className="px-4 py-2.5">Student</th>
                <th className="px-4 py-2.5">Status</th>
                <th className="px-4 py-2.5">Slot</th>
                <th className="px-4 py-2.5">Teacher</th>
                <th className="px-4 py-2.5">Meeting Link</th>
                <th className="px-4 py-2.5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loadingBookings && (
                <tr>
                  <td className="px-4 py-3 text-slate-500" colSpan={7}>Loading bookings...</td>
                </tr>
              )}
              {!loadingBookings && filteredBookings.length === 0 && (
                <tr>
                  <td className="px-4 py-3 text-slate-500" colSpan={7}>No bookings found for selected status.</td>
                </tr>
              )}
              {!loadingBookings && filteredBookings.map((booking, index) => {
                const bookingId = getValue(booking, ['bookingId', 'id', 'BookingId', 'Id'], `row-${index}`)
                const studentName = getValue(booking, ['studentName', 'fullName', 'StudentName', 'FullName'])
                const email = getValue(booking, ['email', 'Email'], '')
                const status = getValue(booking, ['status', 'Status'])
                const slot = getValue(booking, ['slot', 'slotTime', 'Slot', 'SlotTime'], '')
                const slotText = slot === ''
                  ? `${getValue(booking, ['slotStart', 'slotStartTime', 'SlotStart', 'SlotStartTime'], '')} - ${getValue(booking, ['slotEnd', 'slotEndTime', 'SlotEnd', 'SlotEndTime'], '')}`.trim()
                  : String(slot)
                const teacher = getValue(booking, ['teacherName', 'teacher', 'TeacherName', 'Teacher'])
                const meetingLink = getValue(booking, ['meetingLink', 'meetingUrl', 'MeetingLink', 'MeetingUrl'], '')

                return (
                  <tr key={String(bookingId)} className="border-t border-slate-200 align-top">
                    <td className="px-4 py-2.5 font-semibold text-slate-800">{String(bookingId)}</td>
                    <td className="px-4 py-2.5">
                      <div>{String(studentName)}</div>
                      {email && <div className="text-xs text-slate-500">{String(email)}</div>}
                    </td>
                    <td className="px-4 py-2.5">{formatStatus(status)}</td>
                    <td className="px-4 py-2.5">
                      <div>{formatDateTime(slotText)}</div>
                      {slotText && <div className="text-xs text-slate-500">Local / UTC</div>}
                    </td>
                    <td className="px-4 py-2.5">{String(teacher)}</td>
                    <td className="px-4 py-2.5">
                      {meetingLink ? (
                        <a href={String(meetingLink)} target="_blank" rel="noreferrer" className="font-semibold text-blue-700 underline">
                          Open
                        </a>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => openBookingProfile(booking)}
                          className="rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                        >
                          Open Profile
                        </button>
                        <button
                          type="button"
                          onClick={() => quickRescheduleBooking(booking)}
                          disabled={processingBookingAction === `reschedule-${bookingId}`}
                          className="rounded-lg border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 hover:bg-amber-100 disabled:opacity-70"
                        >
                          {processingBookingAction === `reschedule-${bookingId}` ? 'Rescheduling...' : 'Quick Reschedule'}
                        </button>
                        <button
                          type="button"
                          onClick={() => quickCancelBooking(booking)}
                          disabled={processingBookingAction === `cancel-${bookingId}`}
                          className="rounded-lg border border-rose-300 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100 disabled:opacity-70"
                        >
                          {processingBookingAction === `cancel-${bookingId}` ? 'Cancelling...' : 'Quick Cancel'}
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
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
