import Footer from '../components/Footer'

const STATS = [
  { label: 'Classes Today',    value: '2',    icon: '📅', color: 'from-blue-500 to-cyan-500'   },
  { label: 'Total Students',   value: '24',   icon: '🎓', color: 'from-purple-500 to-pink-500' },
  { label: 'Earnings (Month)', value: '£960', icon: '💷', color: 'from-green-500 to-emerald-500'},
  { label: 'Avg. Rating',      value: '4.9',  icon: '⭐', color: 'from-amber-500 to-orange-500'},
]

const SCHEDULE = [
  { name: 'Riya Patel',       subject: 'Maths Yr 8',       time: '10:00 AM', status: 'Upcoming', statusColor: 'bg-blue-500'  },
  { name: 'Aarav Singh',      subject: 'GCSE Maths Yr 10',  time: '2:00 PM',  status: 'Upcoming', statusColor: 'bg-blue-500'  },
]

const STUDENTS = [
  { name: 'Riya Patel',   year: 'Year 8', subject: 'Maths',   progress: 82, status: 'Active'  },
  { name: 'Aarav Singh',  year: 'Year 10',subject: 'GCSE',    progress: 73, status: 'Active'  },
]

const ASSIGNMENTS = [
  { student: 'Riya Patel',   title: 'Algebra Worksheet',  status: 'Submitted', grade: 'A-'  },
  { student: 'Aarav Singh',  title: 'Past Paper Nov 2023', status: 'Reviewed',  grade: 'B+'  },
]

export default function TutorDashboard() {
  return (
    <>
      <main className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Banner */}
        <div className="bg-hero-gradient py-10 text-white">
          <div className="section-wrap flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-white/70 text-sm">Good morning 👋</p>
              <h1 className="font-heading text-2xl md:text-3xl font-bold mt-1">Tutor Dashboard</h1>
              <p className="text-white/70 text-sm mt-1">You have 2 classes scheduled today</p>
            </div>
            <button className="btn-outline-white text-sm py-2.5 px-5">
              Mark Attendance
            </button>
          </div>
        </div>

        <div className="section-wrap py-10">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {STATS.map(s => (
              <div key={s.label} className="card p-5 card-hover">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-xl mb-3`}>{s.icon}</div>
                <p className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">{s.value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Today's Schedule */}
            <div className="lg:col-span-2 card p-6">
              <h2 className="font-heading font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-lg">📅</span> Today's Schedule
              </h2>
              <div className="space-y-3">
                {SCHEDULE.map((c, i) => (
                  <div key={i} className="flex items-center gap-4 p-3.5 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {c.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{c.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{c.subject} · {c.time}</p>
                    </div>
                    <span className={`${c.statusColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>{c.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Earnings */}
            <div className="card p-6">
              <h2 className="font-heading font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-lg">💷</span> Earnings Overview
              </h2>
              <div className="space-y-3">
                {[
                  { label: 'This Week', value: '£240', change: '+12%', positive: true },
                  { label: 'This Month', value: '£960', change: '+8%', positive: true },
                  { label: 'Total Earned', value: '£4,320', change: '+15%', positive: true },
                ].map(e => (
                  <div key={e.label} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <div>
                      <p className="text-xs text-slate-500">{e.label}</p>
                      <p className="font-bold text-slate-900 dark:text-white text-lg">{e.value}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${e.positive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-rose-100 text-rose-700'}`}>
                      {e.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Management */}
            <div className="lg:col-span-2 card p-6">
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
                    {STUDENTS.map((s, i) => (
                      <tr key={i}>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                              {s.name[0]}
                            </div>
                            <div>
                              <p className="font-medium text-slate-800 dark:text-slate-200 text-xs">{s.name}</p>
                              <p className="text-slate-400 text-xs">{s.year}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 pr-4 text-xs text-slate-600 dark:text-slate-400">{s.subject}</td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-slate-100 dark:bg-slate-700 rounded-full h-1.5">
                              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${s.progress}%` }} />
                            </div>
                            <span className="text-xs text-slate-500">{s.progress}%</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold px-2 py-0.5 rounded-full">{s.status}</span>
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
                {ASSIGNMENTS.map((a, i) => (
                  <div key={i} className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-semibold text-slate-800 dark:text-slate-200 text-xs">{a.title}</p>
                      {a.grade !== '—' && (
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold px-2 py-0.5 rounded-full">{a.grade}</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{a.student}</p>
                    <p className={`text-xs font-medium mt-1 ${
                      a.status === 'Submitted' ? 'text-amber-500' :
                      a.status === 'Reviewed'  ? 'text-green-600' : 'text-slate-400'
                    }`}>{a.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
