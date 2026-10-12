import { useState } from 'react'

const DAYS_OF_WEEK = [
  { name: 'Sunday', value: 0 },
  { name: 'Monday', value: 1 },
  { name: 'Tuesday', value: 2 },
  { name: 'Wednesday', value: 3 },
  { name: 'Thursday', value: 4 },
  { name: 'Friday', value: 5 },
  { name: 'Saturday', value: 6 },
]

export default function AvailabilityCalendar({ availability = [], onSelectDay, onDeleteSlot, loading = false }) {
  const [expandedDay, setExpandedDay] = useState(null)

  // Group availability by day of week
  const slotsByDay = {}
  DAYS_OF_WEEK.forEach(day => {
    slotsByDay[day.value] = availability.filter(slot => slot.dayOfWeek === day.value)
  })

  function handleDeleteClick(slotId) {
    if (window.confirm('Are you sure you want to delete this availability slot?')) {
      onDeleteSlot(slotId)
    }
  }

  return (
    <div className="card p-6">
      <h2 className="font-heading font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <span className="text-lg">📅</span> Weekly Availability
      </h2>

      <div className="grid gap-3">
        {DAYS_OF_WEEK.map(day => {
          const slots = slotsByDay[day.value] || []
          const hasSlots = slots.length > 0
          const isExpanded = expandedDay === day.value

          return (
            <div
              key={day.value}
              className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
            >
              <button
                type="button"
                onClick={() => setExpandedDay(isExpanded ? null : day.value)}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                    {day.name.slice(0, 1)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{day.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {hasSlots ? `${slots.length} slot${slots.length !== 1 ? 's' : ''}` : 'No availability'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {hasSlots && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium">
                      ✓ Available
                    </span>
                  )}
                  <svg
                    className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-slate-200 dark:border-slate-700 px-4 py-4 bg-slate-50 dark:bg-slate-800/30">
                  {slots.length > 0 ? (
                    <div className="space-y-2">
                      {slots.map(slot => (
                        <div
                          key={slot.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">
                              {slot.startTime.substring(0, 5)} - {slot.endTime.substring(0, 5)}
                            </span>
                            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                              {calculateDuration(slot.startTime, slot.endTime)} hrs
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteClick(slot.id)}
                            disabled={loading}
                            className="text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 disabled:opacity-50 transition-colors p-1.5"
                            title="Delete slot"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 dark:text-slate-400 py-2">No availability set for this day</p>
                  )}
                  <button
                    type="button"
                    onClick={() => onSelectDay(day.value)}
                    className="mt-3 w-full px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors border border-blue-200 dark:border-blue-800"
                  >
                    + Add Slot
                  </button>
                </div>
              )}
            </div>
          )
        })}
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
  const hours = Math.floor(durationMinutes / 60)
  
  return hours === 0 ? '0.5' : hours
}
