import { useEffect, useMemo, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
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
  const [slotSearch, setSlotSearch] = useState('')
  const [bookingSearch, setBookingSearch] = useState('')
  const [slotPaginationModel, setSlotPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [bookingPaginationModel, setBookingPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [slotSortModel, setSlotSortModel] = useState([{ field: 'slotId', sort: 'asc' }])
  const [bookingSortModel, setBookingSortModel] = useState([{ field: 'startTime', sort: 'asc' }])
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

    const headers = ['bookingId', 'studentName', 'studentEmail', 'status', 'startTime', 'endTime', 'teacherName', 'meetingLink']
    const csvRows = [headers].concat(
      rows.map((booking) => {
        const bookingId = getValue(booking, ['bookingId', 'id', 'BookingId', 'Id'], '')
        const studentName = getValue(booking, ['studentName', 'fullName', 'StudentName', 'FullName'], '')
        const email = getValue(booking, ['studentEmail', 'email', 'Email'], '')
        const status = getValue(booking, ['status', 'Status'], '')
        const startTime = getValue(booking, ['startTime', 'StartTime'], '')
        const endTime = getValue(booking, ['endTime', 'EndTime'], '')
        const teacher = getValue(booking, ['teacherName', 'teacher', 'TeacherName', 'Teacher'], '')
        const meetingLink = getValue(booking, ['meetingLink', 'meetingUrl', 'MeetingLink', 'MeetingUrl'], '')

        return [bookingId, studentName, email, status, startTime, endTime, teacher, meetingLink]
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

  function getComparableValue(entity, key) {
    if (!entity) return ''

    const value = entity[key]
    if (value === undefined || value === null || value === '') return ''

    if (typeof value === 'number') return value
    if (value instanceof Date) return value.getTime()

    const date = new Date(value)
    if (!Number.isNaN(date.getTime())) return date.getTime()

    return String(value).toLowerCase()
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

  const slotRows = useMemo(() => {
    return slots.map((slot, index) => {
      const slotId = getId(slot) ?? index + 1
      const isAvailable = Boolean(getValue(slot, ['isAvailable', 'available', 'IsAvailable'], false))
      const startValue = getValue(slot, ['startTime', 'startUtc', 'StartTime', 'StartUtc'])
      const endValue = getValue(slot, ['endTime', 'endUtc', 'EndTime', 'EndUtc'])

      return {
        id: slotId,
        slotId,
        startTime: startValue,
        endTime: endValue,
        availability: isAvailable ? 'Available' : 'Unavailable',
        isAvailable,
      }
    })
  }, [slots])

  const filteredSlotRows = useMemo(() => {
    const query = slotSearch.trim().toLowerCase()
    if (!query) return slotRows

    return slotRows.filter((row) => {
      return [row.slotId, row.startTime, row.endTime, row.availability].some((value) =>
        String(value).toLowerCase().includes(query)
      )
    })
  }, [slotRows, slotSearch])

  const bookingRows = useMemo(() => {
    return filteredBookings.map((booking, index) => {
      const bookingId = getValue(booking, ['bookingId', 'id', 'BookingId', 'Id'], `row-${index}`)
      const studentName = getValue(booking, ['studentName', 'fullName', 'StudentName', 'FullName'])
      const email = getValue(booking, ['studentEmail', 'email', 'Email'], '')
      const status = getValue(booking, ['status', 'Status'])
      const startTime = getValue(booking, ['startTime', 'StartTime'], '')
      const endTime = getValue(booking, ['endTime', 'EndTime'], '')
      const teacher = getValue(booking, ['teacherName', 'teacher', 'TeacherName', 'Teacher'])
      const meetingLink = getValue(booking, ['meetingLink', 'meetingUrl', 'MeetingLink', 'MeetingUrl'], '')

      return {
        id: String(bookingId),
        bookingId: String(bookingId),
        studentName: String(studentName),
        studentEmail: String(email),
        status: String(status),
        startTime,
        endTime,
        teacher: String(teacher),
        meetingLink: String(meetingLink),
      }
    })
  }, [filteredBookings])

  const filteredBookingRows = useMemo(() => {
    const query = bookingSearch.trim().toLowerCase()
    if (!query) return bookingRows

    return bookingRows.filter((row) => {
      return [row.bookingId, row.studentName, row.studentEmail, row.status, row.teacher, row.startTime, row.endTime].some((value) =>
        String(value).toLowerCase().includes(query)
      )
    })
  }, [bookingRows, bookingSearch])

  const slotColumns = [
    { field: 'slotId', headerName: 'Slot ID', flex: 1, minWidth: 110, type: 'number' },
    { field: 'startTime', headerName: 'Start', flex: 1.3, minWidth: 200, valueGetter: (_, row) => row.startTime ? new Date(row.startTime).toISOString() : '', renderCell: (params) => <span>{formatDateTime(params.row.startTime)}</span> },
    { field: 'endTime', headerName: 'End', flex: 1.3, minWidth: 200, valueGetter: (_, row) => row.endTime ? new Date(row.endTime).toISOString() : '', renderCell: (params) => <span>{formatDateTime(params.row.endTime)}</span> },
    { field: 'availability', headerName: 'Availability', flex: 1, minWidth: 150, renderCell: (params) => (
      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${params.row.isAvailable ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>
        {params.row.availability}
      </span>
    ) },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      filterable: false,
      width: 160,
      renderCell: (params) => (
        <button
          type="button"
          onClick={() => setSlotAvailability(params.row.slotId, !params.row.isAvailable)}
          disabled={updatingSlotId === params.row.slotId}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-70"
        >
          {updatingSlotId === params.row.slotId ? 'Updating...' : params.row.isAvailable ? 'Set Unavailable' : 'Set Available'}
        </button>
      ),
    },
  ]

  const bookingColumns = [
    { field: 'bookingId', headerName: 'Booking ID', flex: 1, minWidth: 120 },
    {
      field: 'studentName',
      headerName: 'Student',
      flex: 1.5,
      minWidth: 180,
      renderCell: (params) => (
        <div>
          <div>{params.row.studentName || '—'}</div>
          {params.row.studentEmail && <div className="text-xs text-slate-500">{params.row.studentEmail}</div>}
        </div>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 130,
      renderCell: (params) => formatStatus(params.row.status),
    },
    {
      field: 'slot',
      headerName: 'Slot',
      flex: 1.5,
      minWidth: 220,
      valueGetter: (_, row) => row.startTime || row.endTime ? `${row.startTime || ''}${row.endTime ? ' - ' + row.endTime : ''}` : '',
      renderCell: (params) => (
        <div>
          <div>{formatDateTime(params.row.startTime)}</div>
          {params.row.endTime && <div className="text-xs text-slate-500">to {formatDateTime(params.row.endTime)}</div>}
        </div>
      ),
    },
    { field: 'teacher', headerName: 'Teacher', flex: 1, minWidth: 150 },
    {
      field: 'meetingLink',
      headerName: 'Meeting Link',
      flex: 1,
      minWidth: 120,
      sortable: false,
      renderCell: (params) => params.row.meetingLink ? (
        <a href={String(params.row.meetingLink)} target="_blank" rel="noreferrer" className="font-semibold text-blue-700 underline">
          Open
        </a>
      ) : '-',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      width: 200,
      renderCell: (params) => (
        <div className="flex flex-col gap-2 py-2">
          <button
            type="button"
            onClick={() => openBookingProfile(params.row)}
            className="rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            Open Profile
          </button>
          <button
            type="button"
            onClick={() => quickRescheduleBooking({ bookingId: params.row.bookingId, ...params.row })}
            disabled={processingBookingAction === `reschedule-${params.row.bookingId}`}
            className="rounded-lg border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 hover:bg-amber-100 disabled:opacity-70"
          >
            {processingBookingAction === `reschedule-${params.row.bookingId}` ? 'Rescheduling...' : 'Quick Reschedule'}
          </button>
          <button
            type="button"
            onClick={() => quickCancelBooking({ bookingId: params.row.bookingId, ...params.row })}
            disabled={processingBookingAction === `cancel-${params.row.bookingId}`}
            className="rounded-lg border border-rose-300 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100 disabled:opacity-70"
          >
            {processingBookingAction === `cancel-${params.row.bookingId}` ? 'Cancelling...' : 'Quick Cancel'}
          </button>
        </div>
      ),
    },
  ]

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

          <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
            <input
              value={slotSearch}
              onChange={(e) => setSlotSearch(e.target.value)}
              placeholder="Search slots..."
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div style={{ height: 420, width: '100%' }}>
            <DataGrid
              rows={filteredSlotRows}
              columns={slotColumns}
              loading={loadingSlots}
              pagination
              paginationModel={slotPaginationModel}
              onPaginationModelChange={setSlotPaginationModel}
              pageSizeOptions={[5, 10, 20, 50]}
              sortingMode="client"
              sortModel={slotSortModel}
              onSortModelChange={setSlotSortModel}
              disableRowSelectionOnClick
              sx={{
                border: 0,
                '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f8fafc', color: '#0f172a', fontWeight: 700 },
                '& .MuiDataGrid-row:hover': { backgroundColor: '#f8fafc' },
                '& .MuiDataGrid-footerContainer': { borderTop: '1px solid #e2e8f0' },
              }}
            />
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
              onClick={() => downloadCsv(filteredBookingRows, `demo-bookings-${bookingStatus.toLowerCase()}.csv`)}
              className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-900"
            >
              Export CSV
            </button>
          </div>
        </div>

        <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
          <input
            value={bookingSearch}
            onChange={(e) => setBookingSearch(e.target.value)}
            placeholder="Search bookings..."
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div style={{ height: 470, width: '100%' }}>
          <DataGrid
            rows={filteredBookingRows}
            columns={bookingColumns}
            loading={loadingBookings}
            pagination
            paginationModel={bookingPaginationModel}
            onPaginationModelChange={setBookingPaginationModel}
            pageSizeOptions={[5, 10, 20, 50]}
            sortingMode="client"
            sortModel={bookingSortModel}
            onSortModelChange={setBookingSortModel}
            disableRowSelectionOnClick
            getRowHeight={() => 'auto'}
            getEstimatedRowHeight={() => 130}
            sx={{
              border: 0,
              '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f8fafc', color: '#0f172a', fontWeight: 700 },
              '& .MuiDataGrid-row:hover': { backgroundColor: '#f8fafc' },
              '& .MuiDataGrid-cell': { alignItems: 'flex-start', paddingTop: '8px', paddingBottom: '8px' },
              '& .MuiDataGrid-footerContainer': { borderTop: '1px solid #e2e8f0' },
            }}
          />
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
