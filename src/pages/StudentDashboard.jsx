import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const STATS = [
  { label: 'Classes This Week', value: '5', icon: '📅', color: 'from-blue-500 to-cyan-500' },
  { label: 'Assignments Due',   value: '2', icon: '📝', color: 'from-purple-500 to-pink-500' },
  { label: 'Progress Score',    value: '78%',icon: '📈', color: 'from-green-500 to-emerald-500' },
  { label: 'Attendance Rate',   value: '95%',icon: '✅', color: 'from-amber-500 to-orange-500' },
]

const UPCOMING = [
  { subject: 'Maths – Algebra',     tutor: 'Mr. Ahmed',  time: 'Today, 4:00 PM',      badge: 'Today',  badgeColor: 'bg-green-500' },
  { subject: 'Maths – Trigonometry',tutor: 'Mr. Ahmed',  time: 'Wed, 4:00 PM',        badge: 'Wed',    badgeColor: 'bg-slate-400' },
]

const ASSIGNMENTS = [
  { title: 'Algebra Worksheet',     subject: 'Maths',   due: 'Today',    status: 'Pending',   statusColor: 'text-rose-500'  },
  { title: 'Past Paper – November', subject: 'Maths',   due: 'Fri',      status: 'Not started',statusColor: 'text-slate-400' },
]

const PROGRESS = [
  { subject: 'Maths',   progress: 78, color: 'bg-blue-500'   },
  { subject: 'GCSE',    progress: 70, color: 'bg-green-500'  },
]

export default function StudentDashboard() {
  return (
    <>
      <main className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Banner */}
        <div className="bg-hero-gradient py-10 text-white">
          <div className="section-wrap flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-white/70 text-sm">Welcome back 👋</p>
              <h1 className="font-heading text-2xl md:text-3xl font-bold mt-1">Student Dashboard</h1>
              <p className="text-white/70 text-sm mt-1">Continue your learning journey</p>
            </div>
            <Link to="/#assessmentForm" className="btn-outline-white text-sm py-2.5 px-5">
              Book More Sessions
            </Link>
          </div>
        </div>

        <div className="section-wrap py-10">
          {/* Quick Stats */}
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
            {/* Upcoming Classes */}
            <div className="lg:col-span-2 card p-6">
              <h2 className="font-heading font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-lg">📅</span> Upcoming Classes
              </h2>
              <div className="space-y-3">
                {UPCOMING.map((c, i) => (
                  <div key={i} className="flex items-center gap-4 p-3.5 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {c.subject[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm truncate">{c.subject}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{c.tutor} · {c.time}</p>
                    </div>
                    <span className={`${c.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>{c.badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Tracker */}
            <div className="card p-6">
              <h2 className="font-heading font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-lg">📈</span> Progress Tracker
              </h2>
              <div className="space-y-4">
                {PROGRESS.map(p => (
                  <div key={p.subject}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-slate-700 dark:text-slate-300">{p.subject}</span>
                      <span className="font-bold text-slate-900 dark:text-white">{p.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5">
                      <div
                        className={`${p.color} h-2.5 rounded-full transition-all duration-700`}
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
                <p className="text-2xl font-extrabold font-heading text-blue-700 dark:text-blue-400">B+</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Overall Grade</p>
              </div>
            </div>

            {/* Assignments */}
            <div className="lg:col-span-2 card p-6">
              <h2 className="font-heading font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-lg">📝</span> Assignments
              </h2>
              <div className="space-y-3">
                {ASSIGNMENTS.map((a, i) => (
                  <div key={i} className="flex items-center gap-4 p-3.5 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-base">📄</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{a.title}</p>
                      <p className="text-xs text-slate-500">{a.subject} · Due {a.due}</p>
                    </div>
                    <span className={`${a.statusColor} text-xs font-semibold whitespace-nowrap`}>{a.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Attendance */}
            <div className="card p-6">
              <h2 className="font-heading font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-lg">✅</span> Attendance Summary
              </h2>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-28 h-28">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="10"/>
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#22c55e" strokeWidth="10"
                      strokeDasharray={`${2 * Math.PI * 40 * 0.95} ${2 * Math.PI * 40 * 0.05}`}
                      strokeLinecap="round"/>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-2xl font-extrabold font-heading text-green-600">95%</p>
                    <p className="text-xs text-slate-400">Attended</p>
                  </div>
                </div>
              </div>
              <div className="text-center text-xs text-slate-500 dark:text-slate-400">
                19 of 20 sessions attended
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
                  <p className="font-bold text-green-700 dark:text-green-400">19</p>
                  <p className="text-slate-500">Present</p>
                </div>
                <div className="bg-rose-50 dark:bg-rose-900/20 p-2 rounded-lg">
                  <p className="font-bold text-rose-600 dark:text-rose-400">1</p>
                  <p className="text-slate-500">Absent</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
                  <p className="font-bold text-blue-700 dark:text-blue-400">20</p>
                  <p className="text-slate-500">Total</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
