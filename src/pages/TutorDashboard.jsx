import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../lib/apiClient'
import { clearTeacherAuth } from '../lib/authStorage'

export default function TutorDashboard() {
  const navigate = useNavigate()
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedSessionId, setSelectedSessionId] = useState(null)

  useEffect(() => {
    let alive = true
    apiRequest('/api/teachers/dashboard')
      .then((result) => {
        if (alive) setDashboard(result)
      })
      .catch((err) => {
        if (alive) setError(err.message || 'Unable to load your dashboard.')
      })
      .finally(() => {
        if (alive) setLoading(false)
      })
    return () => { alive = false }
  }, [])

  const schedule = dashboard?.todaysSchedule || []
  const selectedSession = schedule.find((session) => (session.bookingId ?? session.classId) === selectedSessionId) || schedule[0]

  function handleLogout() {
    clearTeacherAuth()
    navigate('/teacher/login', { replace: true })
  }

  return (
    <>
      <main className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Banner */}
        <div className="bg-hero-gradient py-10 text-white">
          <div className="section-wrap flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-white/70 text-sm">Teacher Dashboard</p>
              <h1 className="font-heading text-2xl md:text-3xl font-bold mt-1">{dashboard?.teacherName || 'Welcome'}</h1>
              <p className="text-white/70 text-sm mt-1">You have {dashboard?.classesToday ?? 0} classes scheduled today</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
              <button 
                onClick={() => navigate('/teacher/availability')}
                className="btn-outline-white text-xs sm:text-sm py-2 sm:py-2.5 px-3 sm:px-5 w-full sm:w-auto"
              >
                📅 Set Availability
              </button>
              <button className="btn-outline-white text-xs sm:text-sm py-2 sm:py-2.5 px-3 sm:px-5 w-full sm:w-auto">
                Mark Attendance
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
          {error && <p role="alert" className="mb-6 rounded-xl bg-rose-50 p-4 text-sm text-rose-700">{error}</p>}
          {loading && <p className="mb-6 text-sm text-slate-500">Loading your dashboard...</p>}
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Classes Today', value: dashboard?.classesToday ?? 0, icon: '📅', color: 'from-blue-500 to-cyan-500' },
              { label: 'Total Students', value: dashboard?.totalStudents ?? 0, icon: '🎓', color: 'from-purple-500 to-pink-500' },
              { label: 'Earnings (Month)', value: dashboard?.earningsThisMonth == null ? '—' : `£${dashboard.earningsThisMonth}`, icon: '💷', color: 'from-green-500 to-emerald-500' },
              { label: 'Avg. Rating', value: dashboard?.averageRating ?? '—', icon: '⭐', color: 'from-amber-500 to-orange-500' },
            ].map(s => (
              <div key={s.label} className="card p-5 card-hover">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-xl mb-3`}>{s.icon}</div>
                <p className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">{s.value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Today's Schedule */}
            <div className="md:col-span-2 lg:col-span-2 card p-6">
              <h2 className="font-heading font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-lg">📅</span> Tutor Session Schedule
              </h2>

              <div className="grid gap-4 grid-cols-1 md:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-3">
                  {schedule.map(session => (
                    <button
                      key={session.bookingId ?? session.classId}
                      type="button"
                      onClick={() => setSelectedSessionId(session.bookingId ?? session.classId)}
                      className={`w-full rounded-2xl border p-3.5 text-left transition-all ${
                        (selectedSession?.bookingId ?? selectedSession?.classId) === (session.bookingId ?? session.classId)
                          ? 'border-blue-500 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-900/20'
                          : 'border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-700/50 dark:hover:bg-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-bold text-white">
                          {session.studentName?.[0] || '?'}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <p className="truncate text-sm font-bold text-slate-800 dark:text-slate-100">{session.studentName}</p>
                            <span className="rounded-full bg-blue-500 px-2 py-0.5 text-[10px] font-bold text-white">{session.classType} · {session.status}</span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{session.subject}</p>
                          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{new Date(session.startTime).toLocaleString()} - {new Date(session.endTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {!loading && !schedule.length && <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">No classes scheduled for today.</p>}
                {selectedSession && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Session Details</p>
                      <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{selectedSession.subject} · {selectedSession.classType}</h3>
                    </div>
                    <span className="rounded-full bg-blue-500 px-2.5 py-1 text-[10px] font-bold text-white">{selectedSession.status}</span>
                  </div>

                  <div className="space-y-3 text-sm text-slate-700 dark:text-slate-200">
                    <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-2 dark:border-slate-700">
                      <span className="text-slate-500">Student</span>
                      <span className="font-semibold text-right">{selectedSession.studentName}</span>
                    </div>
                    <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-2 dark:border-slate-700">
                      <span className="text-slate-500">Subject</span>
                      <span className="font-semibold text-right">{selectedSession.subject}</span>
                    </div>
                    <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-2 dark:border-slate-700">
                      <span className="text-slate-500">Timing</span>
                      <span className="font-semibold text-right">{new Date(selectedSession.startTime).toLocaleString()} - {new Date(selectedSession.endTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-2 dark:border-slate-700">
                      <span className="text-slate-500">Duration</span>
                      <span className="font-semibold text-right">{Math.round((new Date(selectedSession.endTime) - new Date(selectedSession.startTime)) / 60000)} mins</span>
                    </div>
                    <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-2 dark:border-slate-700">
                      <span className="text-slate-500">Session Mode</span>
                      <span className="font-semibold text-right">{selectedSession.classType}</span>
                    </div>
                    <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-2 dark:border-slate-700">
                      <span className="text-slate-500">Parent</span>
                      <span className="font-semibold text-right">{selectedSession.studentEmail || '—'}</span>
                    </div>
                    <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-2 dark:border-slate-700">
                      <span className="text-slate-500">Contact</span>
                      <span className="font-semibold text-right">{selectedSession.studentPhone || '—'}</span>
                    </div>
                    <div className="pt-1">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Notes</p>
                      <p className="mt-2 text-sm leading-relaxed">—</p>
                    </div>
                    <div className="pt-1">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Resources</p>
                      <p className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-300">—</p>
                    </div>
                    {selectedSession.meetingLink && <a
                      href={selectedSession.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      Open class
                    </a>}
                  </div>
                </div>
                )}
              </div>
            </div>

            {/* Student Management */}
            <div className="md:col-span-2 lg:col-span-2 card p-6">
              <h2 className="font-heading font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-lg">🎓</span> My Students
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-slate-500 uppercase tracking-wider">
                      <th className="text-left pb-3">Student</th>
                      <th className="text-left pb-3">Subject</th>
                      <th className="text-left pb-3">Progress</th>
                      <th className="text-left pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {(dashboard?.allStudents || []).map((s, i) => (
                      <tr key={s.studentId ?? s.leadId ?? i}>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                              {s.studentName?.[0] || '?'}
                            </div>
                            <div>
                              <p className="font-medium text-slate-800 dark:text-slate-200 text-xs">{s.studentName}</p>
                              <p className="text-slate-400 text-xs">{s.classYear || s.email || '—'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 pr-4 text-xs text-slate-600 dark:text-slate-400">{s.subject || '—'}</td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500">{s.totalClasses} classes</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold px-2 py-0.5 rounded-full">{s.phone || 'Student'}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Assignment Review */}
            <div className="card p-6">
              <h2 className="font-heading font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-lg">📝</span> Assignment Review
              </h2>
              <div className="space-y-3">
                {schedule.filter((session) => session.meetingLink).map((session) => (
                  <a key={session.bookingId ?? session.classId} href={session.meetingLink} target="_blank" rel="noreferrer" className="block rounded-xl bg-slate-50 p-3 text-xs font-semibold text-blue-600 dark:bg-slate-700/50 dark:text-blue-300">
                {session.studentName} · {session.subject}
                  </a>
                ))}
                {!schedule.some((session) => session.meetingLink) && <p className="text-sm text-slate-500">No class links available.</p>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
