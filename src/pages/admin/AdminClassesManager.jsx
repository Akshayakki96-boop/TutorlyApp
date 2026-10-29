import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../../lib/apiClient'
import { clearAuth } from '../../lib/authStorage'

const DAYS_OF_WEEK = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
}

export default function AdminClassesManager() {
  const navigate = useNavigate()
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [rescheduleModal, setRescheduleModal] = useState(null)
  const [rescheduleData, setRescheduleData] = useState({ startTime: '', endTime: '', reason: '' })
  const [rescheduling, setRescheduling] = useState(false)

  useEffect(() => {
    loadClasses()
  }, [])

  async function loadClasses() {
    try {
      setLoading(true)
      setError('')
      const response = await apiRequest('/api/admin/scheduling/regular-classes')
      setClasses(response || [])
    } catch (err) {
      console.error('Failed to load classes:', err)
      setError(err.message || 'Could not load classes list. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function openRescheduleModal(classItem) {
    setRescheduleModal(classItem)
    const startDateTime = new Date(classItem.startTime)
    const endDateTime = new Date(classItem.endTime)
    setRescheduleData({
      startTime: `${String(startDateTime.getHours()).padStart(2, '0')}:${String(startDateTime.getMinutes()).padStart(2, '0')}`,
      endTime: `${String(endDateTime.getHours()).padStart(2, '0')}:${String(endDateTime.getMinutes()).padStart(2, '0')}`,
      reason: '',
    })
  }

  function closeRescheduleModal() {
    setRescheduleModal(null)
    setRescheduleData({ startTime: '', endTime: '', reason: '' })
  }

  async function handleReschedule(e) {
    e.preventDefault()

    if (!rescheduleData.startTime || !rescheduleData.endTime) {
      setError('Both start and end times are required')
      return
    }

    const [startHour, startMin] = rescheduleData.startTime.split(':').map(Number)
    const [endHour, endMin] = rescheduleData.endTime.split(':').map(Number)
    const startMinutes = startHour * 60 + startMin
    const endMinutes = endHour * 60 + endMin

    if (endMinutes <= startMinutes) {
      setError('End time must be after start time')
      return
    }

    if ((endMinutes - startMinutes) < 30) {
      setError('Minimum class duration is 30 minutes')
      return
    }

    try {
      setRescheduling(true)
      setError('')

      // Calculate new start and end DateTime
      const currentStart = new Date(rescheduleModal.startTime)
      const newStartDate = new Date(currentStart)
      newStartDate.setHours(startHour, startMin, 0, 0)

      const newEndDate = new Date(currentStart)
      newEndDate.setHours(endHour, endMin, 0, 0)

      const payload = {
        startTime: newStartDate.toISOString(),
        endTime: newEndDate.toISOString(),
        reason: rescheduleData.reason || null,
      }

      await apiRequest(`/api/admin/scheduling/regular-classes/${rescheduleModal.classId || rescheduleModal.id}/reschedule`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      })

      setSuccess('Class rescheduled successfully!')
      closeRescheduleModal()
      setTimeout(() => {
        loadClasses()
        setSuccess('')
      }, 1500)
    } catch (err) {
      const message = err.message || 'Failed to reschedule class'
      setError(message.includes('not found') ? 'Class not found.' : message)
    } finally {
      setRescheduling(false)
    }
  }

  function handleLogout() {
    clearAuth()
    navigate('/admin/login', { replace: true })
  }

  function handleBackToAdmin() {
    navigate('/admin')
  }

  return (
    <>
      <main className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Banner */}
        <div className="bg-hero-gradient py-10 text-white">
          <div className="section-wrap flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-white/70 text-sm">Admin Portal</p>
              <h1 className="font-heading text-2xl md:text-3xl font-bold mt-1">Manage Classes</h1>
              <p className="text-white/70 text-sm mt-1">View and reschedule classes as needed</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleBackToAdmin}
                className="btn-outline-white text-sm py-2.5 px-5"
              >
                ← Back to Admin
              </button>
              <button
                onClick={handleLogout}
                className="btn-outline-white text-sm py-2.5 px-5 hover:bg-white/20 transition-colors"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>

        <div className="section-wrap py-10">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800" role="alert">
              <p className="text-sm text-rose-700 dark:text-rose-300 flex items-start gap-2">
                <span className="text-lg">⚠️</span>
                <span>{error}</span>
              </p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-700 dark:text-green-300 flex items-start gap-2">
                <span className="text-lg">✅</span>
                <span>{success}</span>
              </p>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-12 card p-6">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-500 dark:text-slate-400">Loading classes...</p>
              </div>
            </div>
          ) : classes.length === 0 ? (
            <div className="card p-8 text-center">
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">📚 No classes found</p>
              <p className="text-sm text-slate-500 dark:text-slate-500 mb-6">
                Start by creating a new class through the "Find Teachers" option.
              </p>
              <button
                onClick={() => navigate('/admin/schedule/find-teachers')}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                + Create New Class
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {classes.length} Class{classes.length !== 1 ? 'es' : ''}
                </h2>
                <button
                  onClick={() => navigate('/admin/schedule/find-teachers')}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  + Create New Class
                </button>
              </div>

              {classes.map(classItem => (
                <div
                  key={classItem.classId || classItem.id}
                  className="card p-6 hover:shadow-lg transition-shadow dark:hover:shadow-lg/20"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        {classItem.subject || 'Class'}
                      </h3>
                      <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <p>
                          <span className="font-semibold">👤 Student:</span> {classItem.studentName || classItem.studentFullName || 'N/A'}
                          {classItem.studentEmail && (
                            <span className="text-xs text-slate-500 dark:text-slate-500 ml-2">({classItem.studentEmail})</span>
                          )}
                        </p>
                        <p>
                          <span className="font-semibold">👨‍🏫 Teacher:</span> {classItem.teacherName || classItem.teacherFullName || 'N/A'}
                        </p>
                        <p>
                          <span className="font-semibold">📚 Subject:</span> {classItem.subject || 'N/A'}
                        </p>
                        <p>
                          <span className="font-semibold">🔄 Pattern:</span>{' '}
                          {classItem.recurrencePattern || 'Weekly'}
                        </p>
                        {classItem.status && (
                          <p>
                            <span className="font-semibold">Status:</span>{' '}
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold ${
                                classItem.status === 'Scheduled'
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                  : classItem.status === 'Cancelled'
                                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                              }`}
                            >
                              {classItem.status}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">
                        Schedule
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-500">Current Time</p>
                          <p className="text-lg font-bold text-slate-900 dark:text-white">
                            {formatTime(classItem.startTime)} - {formatTime(classItem.endTime)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-500">Date</p>
                          <p className="text-sm text-slate-700 dark:text-slate-300">
                            {formatDate(classItem.startTime)}
                          </p>
                        </div>
                        {classItem.meetingLink && (
                          <a
                            href={classItem.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            🎥 Join Meeting
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() => openRescheduleModal(classItem)}
                      className="flex-1 px-4 py-2 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors text-sm"
                    >
                      🔄 Reschedule
                    </button>
                    <button
                      onClick={() => {
                        if (classItem.meetingLink) {
                          window.open(classItem.meetingLink, '_blank')
                        }
                      }}
                      disabled={!classItem.meetingLink}
                      className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                    >
                      📹 View Meeting
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reschedule Modal */}
        {rescheduleModal && (
          <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Reschedule Class
              </h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-6">
                <p className="text-xs text-blue-700 dark:text-blue-300 mb-1">
                  <span className="font-semibold">📚 Subject: </span>
                  {rescheduleModal.subject || 'Class'}
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300 mb-1">
                  <span className="font-semibold">👤 Student: </span>
                  {rescheduleModal.studentName || rescheduleModal.studentFullName || 'Student'}
                  {rescheduleModal.studentEmail && (
                    <span className="ml-1">({rescheduleModal.studentEmail})</span>
                  )}
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  <span className="font-semibold">👨‍🏫 Teacher: </span>
                  {rescheduleModal.teacherName || rescheduleModal.teacherFullName || 'Teacher'}
                </p>
              </div>

              <form onSubmit={handleReschedule} className="space-y-4">
                <div>
                  <label htmlFor="startTime" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    Start Time *
                  </label>
                  <input
                    id="startTime"
                    type="time"
                    value={rescheduleData.startTime}
                    onChange={e =>
                      setRescheduleData(prev => ({ ...prev, startTime: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label htmlFor="endTime" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    End Time *
                  </label>
                  <input
                    id="endTime"
                    type="time"
                    value={rescheduleData.endTime}
                    onChange={e =>
                      setRescheduleData(prev => ({ ...prev, endTime: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label htmlFor="reason" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    Reason (Optional)
                  </label>
                  <textarea
                    id="reason"
                    value={rescheduleData.reason}
                    onChange={e =>
                      setRescheduleData(prev => ({ ...prev, reason: e.target.value }))
                    }
                    placeholder="Why is this class being rescheduled?"
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 resize-none"
                    rows="3"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeRescheduleModal}
                    disabled={rescheduling}
                    className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={rescheduling}
                    className="flex-1 px-4 py-2 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                  >
                    {rescheduling ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Rescheduling...
                      </>
                    ) : (
                      '✓ Reschedule'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </>
  )
}

function formatTime(dateString) {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
