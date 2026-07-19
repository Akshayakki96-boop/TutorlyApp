import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const CHILD = {
  name: 'Emily Smith',
  year: 'Year 8',
  subjects: ['Maths'],
  tutor: 'Mr. Ahmed',
  nextClass: 'Today, 4:00 PM',
  attendance: 95,
  overallProgress: 80,
}

const STATS = [
  { label: 'Attendance Rate', value: '95%',  icon: '✅', color: 'from-green-500 to-emerald-500'  },
  { label: 'Sessions Completed', value: '19',icon: '📅', color: 'from-blue-500 to-cyan-500'      },
  { label: 'Average Score',   value: 'B+',   icon: '📈', color: 'from-purple-500 to-pink-500'    },
  { label: 'Fees This Month', value: '£112', icon: '💷', color: 'from-amber-500 to-orange-500'   },
]

const PROGRESS = [
  { subject: 'Maths',   value: 78, color: 'bg-blue-500'   },
]

const UPCOMING = [
  { subject: 'Maths',   tutor: 'Mr. Ahmed',  time: 'Today, 4:00 PM'    },
]

const FEES = [
  { month: 'May 2026',   amount: '£112', status: 'Paid',    statusColor: 'text-green-600' },
  { month: 'Apr 2026',   amount: '£112', status: 'Paid',    statusColor: 'text-green-600' },
  { month: 'Jun 2026',   amount: '£112', status: 'Due',     statusColor: 'text-amber-600' },
]

const MESSAGES = [
  { from: 'Mr. Ahmed',  text: 'Emily did great in today\'s algebra session!',      time: '2h ago'   },
  { from: 'SkillBridge',text: 'Your June session schedule has been confirmed.',     time: '3d ago'   },
]

export default function ParentPortal() {
  return (
    <>
      <main className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Banner */}
        <div className="bg-hero-gradient py-10 text-white">
          <div className="section-wrap flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-white/70 text-sm">Parent Portal 👨‍👩‍👧</p>
              <h1 className="font-heading text-2xl md:text-3xl font-bold mt-1">Welcome, Mrs. Smith</h1>
              <p className="text-white/70 text-sm mt-1">Monitoring: {CHILD.name} · {CHILD.year} · {CHILD.subjects.join(' & ')}</p>
            </div>
            <Link to="/#assessmentForm" className="btn-outline-white text-sm py-2.5 px-5">
              Book More Sessions
            </Link>
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
            {/* Child Progress */}
            <div className="card p-6">
              <h2 className="font-heading font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-lg">📈</span> {CHILD.name}'s Progress
              </h2>
              <div className="flex items-center justify-center mb-5">
                <div className="relative w-28 h-28">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="10"/>
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="10"
                      strokeDasharray={`${2 * Math.PI * 40 * CHILD.overallProgress / 100} ${2 * Math.PI * 40 * (1 - CHILD.overallProgress / 100)}`}
                      strokeLinecap="round"/>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-2xl font-extrabold font-heading text-blue-600">{CHILD.overallProgress}%</p>
                    <p className="text-xs text-slate-400">Overall</p>
                  </div>
                </div>
              </div>
              {PROGRESS.map(p => (
                <div key={p.subject} className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600 dark:text-slate-400 text-xs font-medium">{p.subject}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">{p.value}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                    <div className={`${p.color} h-2 rounded-full`} style={{ width: `${p.value}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Upcoming Classes */}
            <div className="card p-6">
              <h2 className="font-heading font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-lg">📅</span> Upcoming Classes
              </h2>
              <div className="space-y-3">
                {UPCOMING.map((c, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                        {c.subject[0]}
                      </div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{c.subject}</p>
                    </div>
                    <p className="text-xs text-slate-500">{c.tutor}</p>
                    <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-1">{c.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tutor Communication */}
            <div className="card p-6">
              <h2 className="font-heading font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-lg">💬</span> Messages
              </h2>
              <div className="space-y-3">
                {MESSAGES.map((m, i) => (
                  <div key={i} className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-slate-800 dark:text-slate-200 text-xs">{m.from}</p>
                      <p className="text-slate-400 text-xs">{m.time}</p>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{m.text}</p>
                  </div>
                ))}
              </div>
              <a href="mailto:info@skillbridgetutors.com"
                className="mt-4 w-full btn-secondary justify-center text-sm py-2.5">
                Contact Tutor
              </a>
            </div>

            {/* Fee Management */}
            <div className="lg:col-span-3 card p-6">
              <h2 className="font-heading font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-lg">💷</span> Fee Management
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700">
                      <th className="text-left pb-3">Month</th>
                      <th className="text-left pb-3">Amount</th>
                      <th className="text-left pb-3">Status</th>
                      <th className="text-left pb-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {FEES.map((f, i) => (
                      <tr key={i}>
                        <td className="py-3 text-slate-700 dark:text-slate-300 text-sm">{f.month}</td>
                        <td className="py-3 font-bold text-slate-900 dark:text-white">{f.amount}</td>
                        <td className="py-3">
                          <span className={`font-semibold text-sm ${f.statusColor}`}>{f.status}</span>
                        </td>
                        <td className="py-3">
                          {f.status === 'Due' ? (
                            <button className="btn-primary text-xs py-1.5 px-4">Pay Now</button>
                          ) : (
                            <span className="text-xs text-slate-400">Receipt ↓</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
