import { useState, useEffect } from 'react'

const DAYS_OF_WEEK = [
  { name: 'Sunday', value: 0 },
  { name: 'Monday', value: 1 },
  { name: 'Tuesday', value: 2 },
  { name: 'Wednesday', value: 3 },
  { name: 'Thursday', value: 4 },
  { name: 'Friday', value: 5 },
  { name: 'Saturday', value: 6 },
]

export default function TimeSlotForm({ dayOfWeek, onSubmit, onCancel, loading = false }) {
  const [startTime, setStartTime] = useState('09:00')
  const [endTime, setEndTime] = useState('10:00')
  const [error, setError] = useState('')

  const dayName = DAYS_OF_WEEK.find(d => d.value === dayOfWeek)?.name || 'Unknown'

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
      setError('Minimum slot duration is 30 minutes')
      return false
    }

    return true
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Convert to HH:mm:ss format for API
    const startTimeFormatted = `${startTime}:00`
    const endTimeFormatted = `${endTime}:00`

    onSubmit({
      dayOfWeek,
      startTime: startTimeFormatted,
      endTime: endTimeFormatted,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-md w-full p-6">
        <h3 className="font-heading font-bold text-slate-900 dark:text-white mb-1">Add Availability</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{dayName}</p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800">
            <p className="text-sm text-rose-700 dark:text-rose-300">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="startTime" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Start Time
            </label>
            <input
              id="startTime"
              type="time"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Operating hours: 06:00 - 22:00</p>
          </div>

          <div>
            <label htmlFor="endTime" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              End Time
            </label>
            <input
              id="endTime"
              type="time"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Must be after start time</p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-xs text-blue-700 dark:text-blue-300">
              <span className="font-semibold">Duration: </span>
              {calculateDuration(startTime, endTime)} hours
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-700/50 disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Adding...
                </>
              ) : (
                <>+ Add Slot</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
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
