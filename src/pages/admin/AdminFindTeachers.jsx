import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TeacherSuggestionList from '../../components/TeacherSuggestionList'
import { apiRequest } from '../../lib/apiClient'
import { clearAuth } from '../../lib/authStorage'

const DAYS_OF_WEEK = [
  { name: 'Sunday', value: 0 },
  { name: 'Monday', value: 1 },
  { name: 'Tuesday', value: 2 },
  { name: 'Wednesday', value: 3 },
  { name: 'Thursday', value: 4 },
  { name: 'Friday', value: 5 },
  { name: 'Saturday', value: 6 },
]

export default function AdminFindTeachers() {
  const navigate = useNavigate()
  const [dayOfWeek, setDayOfWeek] = useState(1) // Monday
  const [startTime, setStartTime] = useState('09:00')
  const [endTime, setEndTime] = useState('10:00')
  const [teachers, setTeachers] = useState([])
  const [selectedTeacherId, setSelectedTeacherId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function validateForm() {
    setError('')

    if (!startTime || !endTime) {
      setError('Both start and end times are required')
      return false
    }

    const [startHour, startMin] = startTime.split(':').map(Number)
    const [endHour, endMin] = endTime.split(':').map(Number)

    const startMinutes = startHour * 60 + startMin
    const endMinutes = endHour * 60 + endMin

    if (endMinutes <= startMinutes) {
      setError('End time must be after start time')
      return false
    }

    const durationMinutes = endMinutes - startMinutes
    if (durationMinutes < 30) {
      setError('Minimum class duration is 30 minutes')
      return false
    }

    return true
  }

  async function handleSearch(e) {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setSearching(true)
      setError('')
      setTeachers([])
      setSelectedTeacherId(null)

      // Format times as query parameters in HH:mm format
      const response = await apiRequest(
        `/api/admin/scheduling/suggestions?dayOfWeek=${dayOfWeek}&startTime=${startTime}&endTime=${endTime}`
      )

      console.log('Teacher suggestions response:', response)

      setTeachers(response || [])

      if (response.length === 0) {
        setError('No teachers available for this time slot. Try a different day or time.')
      }
    } catch (err) {
      setError(err.message || 'Failed to search for teachers')
    } finally {
      setSearching(false)
    }
  }

  function handleSelectTeacher(teacherId) {
    console.log('handleSelectTeacher called with:', teacherId)
    setSelectedTeacherId(teacherId)
    setSuccess('')
  }

  function handleProceed() {
    if (!selectedTeacherId) {
      setError('Please select a teacher')
      return
    }

    // Navigate to assign class page with selected teacher
    const teacher = teachers.find(t => t.teacherId === selectedTeacherId)
    navigate('/admin/schedule/assign-class', {
      state: {
        teacher,
        dayOfWeek,
        startTime: `${startTime}:00`,
        endTime: `${endTime}:00`,
      },
    })
  }

  function handleLogout() {
    clearAuth()
    navigate('/admin/login', { replace: true })
  }

  function handleBackToAdmin() {
    navigate('/admin')
  }

  const dayName = DAYS_OF_WEEK.find(d => d.value === dayOfWeek)?.name || 'Unknown'

  return (
    <>
      <main className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Banner */}
        <div className="bg-hero-gradient py-10 text-white">
          <div className="section-wrap flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-white/70 text-sm">Admin Portal</p>
              <h1 className="font-heading text-2xl md:text-3xl font-bold mt-1">Find Available Teachers</h1>
              <p className="text-white/70 text-sm mt-1">Search for teachers available at a specific time</p>
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

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Search Form */}
            <div className="lg:col-span-1">
              <div className="card p-6">
                <h2 className="font-heading font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-lg">🔍</span> Search Criteria
                </h2>

                <form onSubmit={handleSearch} className="space-y-4">
                  <div>
                    <label htmlFor="dayOfWeek" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                      Day of Week *
                    </label>
                    <select
                      id="dayOfWeek"
                      value={dayOfWeek}
                      onChange={e => setDayOfWeek(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400"
                    >
                      {DAYS_OF_WEEK.map(day => (
                        <option key={day.value} value={day.value}>
                          {day.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="startTime" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                      Start Time *
                    </label>
                    <input
                      id="startTime"
                      type="time"
                      value={startTime}
                      onChange={e => setStartTime(e.target.value)}
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
                      value={endTime}
                      onChange={e => setEndTime(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400"
                    />
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      <span className="font-semibold">Duration: </span>
                      {calculateDuration(startTime, endTime)} hours
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={searching}
                    className="w-full px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                  >
                    {searching ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>🔍 Search</>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-2">
              {loading ? (
                <div className="flex items-center justify-center py-12 card p-6">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-500 dark:text-slate-400">Loading teachers...</p>
                  </div>
                </div>
              ) : teachers.length > 0 ? (
                <>
                  <TeacherSuggestionList
                    teachers={teachers}
                    selectedTeacherId={selectedTeacherId}
                    onSelectTeacher={handleSelectTeacher}
                    loading={searching}
                  />

                  <button
                    onClick={() => {
                      console.log('Proceed button clicked. selectedTeacherId:', selectedTeacherId)
                      handleProceed()
                    }}
                    disabled={!selectedTeacherId || searching}
                    className="w-full mt-4 px-4 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    → Proceed to Assign Class
                  </button>
                </>
              ) : searching === false && teachers.length === 0 && dayOfWeek !== null ? (
                <div className="card p-6">
                  <div className="text-center py-8">
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      Click the search button to find available teachers
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </main>

    </>
  )
}

function calculateDuration(startTime, endTime) {
  const [startHour, startMin] = startTime.split(':').map(Number)
  const [endHour, endMin] = endTime.split(':').map(Number)

  const startMinutes = startHour * 60 + startMin
  const endMinutes = endHour * 60 + endMin

  const durationMinutes = endMinutes - startMinutes
  const hours = durationMinutes / 60

  return hours.toFixed(1)
}
