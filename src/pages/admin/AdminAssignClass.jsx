import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Footer from '../../components/Footer'
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

export default function AdminAssignClass() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state || {}

  // Unpack state from previous page
  const { teacher, dayOfWeek, startTime, endTime } = state

  // Form state
  const [startDate, setStartDate] = useState(getTodayOrNextDayOfWeek(dayOfWeek || 1))
  const [students, setStudents] = useState([])
  const [selectedStudentId, setSelectedStudentId] = useState('')
  const [meetingLink, setMeetingLink] = useState('')
  const [meetingLinkAuto, setMeetingLinkAuto] = useState(true)
  const [recurrencePattern] = useState('Weekly')
  const [notes, setNotes] = useState('')

  // UI state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loadingStudents, setLoadingStudents] = useState(false)

  // Load students on mount
  useEffect(() => {
    loadStudents()
  }, [])

  // Validate required state
  useEffect(() => {
    if (!teacher || !dayOfWeek || !startTime || !endTime) {
      setError('Missing class details. Please go back and search for teachers.')
      setTimeout(() => {
        navigate('/admin/schedule/find-teachers')
      }, 2000)
    }
  }, [teacher, dayOfWeek, startTime, endTime, navigate])

  async function loadStudents() {
    try {
      setLoadingStudents(true)
      // Load only active students
      let response = []
      try {
        response = await apiRequest('/api/admin/scheduling/students?isActive=true')
      } catch (err) {
        // Fallback to /api/admin/students if query param not supported
        try {
          response = await apiRequest('/api/admin/students')
        } catch (fallbackErr) {
          // Final fallback to /api/leads if /api/admin/students doesn't exist
          console.log('Falling back to /api/leads for students')
          response = await apiRequest('/api/leads')
        }
      }
      
      setStudents(response || [])
    } catch (err) {
      console.error('Failed to load students:', err)
      setError('Could not load students list. Please try again.')
    } finally {
      setLoadingStudents(false)
    }
  }

  function validateForm() {
    setError('')

    if (!selectedStudentId) {
      setError('Please select a student')
      return false
    }

    if (!startDate) {
      setError('Please select a start date')
      return false
    }

    // Validate start date matches day of week
    const date = new Date(startDate)
    const dateDay = date.getDay()
    if (dateDay !== dayOfWeek) {
      setError(`Selected date must be a ${DAYS_OF_WEEK[dayOfWeek]}`)
      return false
    }

    if (!meetingLinkAuto && !meetingLink) {
      setError('Please enter a meeting link or enable auto-generation')
      return false
    }

    return true
  }

  function formatDateTime(dateStr, timeStr) {
    // Format as ISO datetime
    // timeStr already includes seconds from AdminFindTeachers (HH:mm:ss)
    return `${dateStr}T${timeStr}`
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setLoading(true)
      setError('')

      const payload = {
        studentId: Number(selectedStudentId),
        teacherId: Number(teacher.teacherId),
        subject: 'Math',
        startTime: formatDateTime(startDate, startTime),
        endTime: formatDateTime(startDate, endTime),
        recurrencePattern,
        meetingLink: meetingLinkAuto ? null : meetingLink,
        notes: notes?.trim() || undefined,
      }

      const response = await apiRequest('/api/admin/scheduling/regular-classes', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      setSuccess('Class created successfully! Redirecting to admin dashboard...')

      // Show the meeting link if auto-generated
      if (response.meetingLink) {
        console.log('Meeting link created:', response.meetingLink)
      }

      setTimeout(() => {
        navigate('/admin')
      }, 2000)
    } catch (err) {
      // Handle specific error cases from API
      const message = err.message || 'Failed to create class'

      if (message.includes('conflict') || message.includes('already has a class')) {
        setError('Teacher or student already has a class at this time')
      } else if (message.includes('availability')) {
        setError('Teacher is not available at this time')
      } else if (message.includes('date')) {
        setError('Invalid date selected. Please check the date and day of week.')
      } else {
        setError(message)
      }
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() {
    clearAuth()
    navigate('/admin/login', { replace: true })
  }

  function handleBackToSearch() {
    navigate('/admin/schedule/find-teachers')
  }

  const selectedStudent = students.find(s => s.id === selectedStudentId)
  const selectedStudentName = selectedStudent?.name || ''

  if (error && !teacher) {
    return (
      <>
        <main className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950">
          <div className="section-wrap py-20">
            <div className="card p-6 max-w-md mx-auto text-center">
              <p className="text-rose-600 dark:text-rose-400 text-sm">{error}</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <main className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Banner */}
        <div className="bg-hero-gradient py-10 text-white">
          <div className="section-wrap flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-white/70 text-sm">Admin Portal</p>
              <h1 className="font-heading text-2xl md:text-3xl font-bold mt-1">Assign Class to Student</h1>
              <p className="text-white/70 text-sm mt-1">Create a regular class between teacher and student</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={handleBackToSearch}
                className="btn-outline-white text-xs sm:text-sm py-2 sm:py-2.5 px-3 sm:px-5 w-full sm:w-auto"
              >
                ← Back to Search
              </button>
              <button
                onClick={handleLogout}
                className="btn-outline-white text-xs sm:text-sm py-2 sm:py-2.5 px-3 sm:px-5 w-full sm:w-auto hover:bg-white/20 transition-colors"
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:order-none">
            {/* Assignment Form - comes first on mobile */}
            <div className="lg:col-span-2 lg:order-2">
              <div className="card p-6 space-y-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                    👨‍🏫 Teacher
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-white">{teacher?.teacherName || teacher?.name || 'Unknown'}</p>
                  {teacher?.qualification && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">{teacher.qualification}</p>
                  )}
                </div>

                <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                    📅 Schedule
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {DAYS_OF_WEEK[dayOfWeek]} {startTime?.substring(0, 5)}-{endTime?.substring(0, 5)}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Repeats: Weekly
                  </p>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      <span className="font-semibold">ℹ️ Note: </span>
                      This class will repeat every week on this day and time. Both teacher and student can join via the meeting link.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Class Details Summary - comes second on mobile */}
            <div className="lg:col-span-1 lg:order-1">
              <form onSubmit={handleSubmit} className="card p-6">
                <h2 className="font-heading font-bold text-slate-900 dark:text-white mb-6">Assign to Student</h2>

                <div className="space-y-6">
                  {/* Student Selection */}
                  <div>
                    <label htmlFor="studentId" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                      Select Student *
                    </label>
                    <select
                      id="studentId"
                      value={selectedStudentId}
                      onChange={e => setSelectedStudentId(e.target.value)}
                      disabled={loadingStudents}
                      className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 disabled:opacity-50"
                    >
                      <option value="">
                        {loadingStudents ? 'Loading students...' : 'Choose a student'}
                      </option>
                      {students.map(student => {
                        const displayName = student.fullName || student.name || 'Unknown'
                        const displayEmail = student.email || ''
                        return (
                          <option key={student.id} value={student.id}>
                            {displayName} ({displayEmail})
                          </option>
                        )
                      })}
                    </select>
                    {selectedStudent && (
                      <div className="mt-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                        <p className="text-xs text-blue-600 dark:text-blue-300 mb-2">
                          <span className="font-semibold">📝 Student: </span>
                          {selectedStudent.fullName || selectedStudent.name || 'Unknown'}
                        </p>
                        <p className="text-xs text-blue-600 dark:text-blue-300">
                          <span className="font-semibold">📧 Email: </span>
                          {selectedStudent.email}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Start Date */}
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                      Start Date ({DAYS_OF_WEEK[dayOfWeek]}) *
                    </label>
                    <input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400"
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Selected date must be a {DAYS_OF_WEEK[dayOfWeek]}
                    </p>
                  </div>

                  {/* Meeting Link */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <input
                        id="autoMeetingLink"
                        type="checkbox"
                        checked={meetingLinkAuto}
                        onChange={e => setMeetingLinkAuto(e.target.checked)}
                        className="w-4 h-4 border-slate-300 rounded text-blue-600 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-blue-400"
                      />
                      <label htmlFor="autoMeetingLink" className="text-sm font-semibold text-slate-900 dark:text-white">
                        Auto-generate Meeting Link (Jitsi)
                      </label>
                    </div>

                    {!meetingLinkAuto && (
                      <div>
                        <label htmlFor="meetingLink" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                          Meeting Link *
                        </label>
                        <input
                          id="meetingLink"
                          type="url"
                          placeholder="https://meet.jitsi.com/..."
                          value={meetingLink}
                          onChange={e => setMeetingLink(e.target.value)}
                          className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400"
                        />
                      </div>
                    )}

                    {meetingLinkAuto && (
                      <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                        <p className="text-xs text-green-700 dark:text-green-300">
                          <span className="font-semibold">✓ Meeting link will be generated automatically</span>
                          <br />A Jitsi room will be created and shared with both teacher and student.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Recurrence - Read Only */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                      Recurrence Pattern
                    </label>
                    <div className="px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-100 dark:bg-slate-700/50">
                      <p className="text-slate-900 dark:text-white">Weekly (Every {DAYS_OF_WEEK[dayOfWeek]})</p>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      In v1, classes repeat weekly on the same day and time
                    </p>
                  </div>

                  {/* Notes */}
                  <div>
                    <label htmlFor="classNotes" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                      Notes (Optional)
                    </label>
                    <textarea
                      id="classNotes"
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      rows={4}
                      placeholder="Add any classroom notes, learning goals, or reminders for this class"
                      className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 resize-none"
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <button
                      type="button"
                      onClick={handleBackToSearch}
                      disabled={loading}
                      className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-700/50 disabled:opacity-50 transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-4 py-2.5 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>✓ Create Class</>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

// Helper: Get today or next occurrence of day of week
function getTodayOrNextDayOfWeek(dayOfWeek) {
  const today = new Date()
  const todayDay = today.getDay()
  let daysAhead = dayOfWeek - todayDay

  if (daysAhead <= 0) {
    daysAhead += 7
  }

  const result = new Date(today.setDate(today.getDate() + daysAhead))
  return result.toISOString().split('T')[0]
}
