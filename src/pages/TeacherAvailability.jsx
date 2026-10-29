import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AvailabilityCalendar from '../components/AvailabilityCalendar'
import TimeSlotForm from '../components/TimeSlotForm'
import { apiRequest } from '../lib/apiClient'
import { clearTeacherAuth } from '../lib/authStorage'

export default function TeacherAvailability() {
  const navigate = useNavigate()
  const [availability, setAvailability] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [selectedDay, setSelectedDay] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  // Load availability on mount
  useEffect(() => {
    let alive = true

    async function loadAvailability() {
      try {
        setLoading(true)
        setError('')
        const data = await apiRequest('/api/teachers/availability')
        if (alive) {
          setAvailability(data || [])
        }
      } catch (err) {
        if (alive) {
          setError(err.message || 'Failed to load availability')
        }
      } finally {
        if (alive) {
          setLoading(false)
        }
      }
    }

    loadAvailability()
    return () => { alive = false }
  }, [])

  async function handleAddSlot(slotData) {
    try {
      setSubmitting(true)
      setError('')

      const response = await apiRequest('/api/teachers/availability', {
        method: 'POST',
        body: JSON.stringify(slotData),
      })

      // Add the new slot to the list
      setAvailability([...availability, response])
      setSuccess('Availability slot added successfully!')
      setSelectedDay(null)

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.message || 'Failed to add availability slot')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDeleteSlot(slotId) {
    try {
      setSubmitting(true)
      setError('')

      await apiRequest(`/api/teachers/availability/${slotId}`, {
        method: 'DELETE',
      })

      // Remove the slot from the list
      setAvailability(availability.filter(slot => slot.id !== slotId))
      setSuccess('Availability slot deleted successfully!')

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.message || 'Failed to delete availability slot')
    } finally {
      setSubmitting(false)
    }
  }

  function handleLogout() {
    clearTeacherAuth()
    navigate('/teacher/login', { replace: true })
  }

  function handleBackToDashboard() {
    navigate('/tutor-dashboard')
  }

  return (
    <>
      <main className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Banner */}
        <div className="bg-hero-gradient py-10 text-white">
          <div className="section-wrap flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-white/70 text-sm">Teacher Portal</p>
              <h1 className="font-heading text-2xl md:text-3xl font-bold mt-1">Set Your Availability</h1>
              <p className="text-white/70 text-sm mt-1">Define when you're available for classes each week</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleBackToDashboard}
                className="btn-outline-white text-sm py-2.5 px-5"
              >
                ← Back to Dashboard
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
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-500 dark:text-slate-400">Loading your availability...</p>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Calendar */}
              <div className="lg:col-span-2">
                <AvailabilityCalendar
                  availability={availability}
                  onSelectDay={setSelectedDay}
                  onDeleteSlot={handleDeleteSlot}
                  loading={submitting}
                />
              </div>

              {/* Info Card */}
              <div className="card p-6 h-fit">
                <h3 className="font-heading font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-lg">📌</span> Quick Guide
                </h3>

                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-1">How it works</p>
                    <p className="text-slate-600 dark:text-slate-300">
                      Set your weekly availability pattern. This schedule repeats every week. Admins will use your availability to schedule classes.
                    </p>
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                    <p className="font-semibold text-slate-900 dark:text-white mb-1">Operating hours</p>
                    <p className="text-slate-600 dark:text-slate-300">06:00 - 22:00 (UK time)</p>
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                    <p className="font-semibold text-slate-900 dark:text-white mb-1">Slot rules</p>
                    <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                      <li>✓ Minimum 30 minutes</li>
                      <li>✓ Maximum 4 hours</li>
                      <li>✓ No overlapping times</li>
                    </ul>
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                    <p className="font-semibold text-slate-900 dark:text-white mb-2">📊 Your stats</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg text-center">
                        <p className="font-bold text-blue-600 dark:text-blue-300">{availability.length}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Total Slots</p>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg text-center">
                        <p className="font-bold text-purple-600 dark:text-purple-300">{getUniqueDays(availability)}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Days Covered</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {selectedDay !== null && (
        <TimeSlotForm
          dayOfWeek={selectedDay}
          onSubmit={handleAddSlot}
          onCancel={() => setSelectedDay(null)}
          loading={submitting}
        />
      )}

    </>
  )
}

function getUniqueDays(availability) {
  const uniqueDays = new Set(availability.map(slot => slot.dayOfWeek))
  return uniqueDays.size
}
