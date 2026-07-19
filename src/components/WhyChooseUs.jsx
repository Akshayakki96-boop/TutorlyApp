const REASONS = [
  {
    icon: '👨‍🏫',
    title: 'Expert Tutors',
    desc: 'Highly qualified, experienced, and trained to teach according to UK boards with proven methods.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: '🎯',
    title: 'Personalised Learning',
    desc: 'Every child receives a tailored study plan and one-on-one attention to maximise their potential.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: '📚',
    title: 'Curriculum-Focused',
    desc: 'Aligned with GCSE, Cambridge, IB, and the National Curriculum for structured exam readiness.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: '⏱️',
    title: 'Flexible Scheduling',
    desc: 'Learn at your own pace with sessions that fit around school and family time, including evenings and weekends.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: '✨',
    title: 'Interactive & Engaging',
    desc: 'Lessons that make learning enjoyable, motivating, and stress-free — students actually look forward to classes.',
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    icon: '📈',
    title: 'Proven Results',
    desc: 'Improved grades, exam readiness, and stronger academic confidence — backed by parent testimonials.',
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    icon: '💷',
    title: 'Affordable Plans',
    desc: 'Quality tuition starting from £8/hour. Bundle packages offer extra savings — no compromise on quality.',
    gradient: 'from-teal-500 to-green-500',
  },
  {
    icon: '🛡️',
    title: 'Safe & Verified',
    desc: 'All tutors are background-verified and trained to provide a safe, supportive learning environment.',
    gradient: 'from-slate-500 to-slate-700',
  },
]

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 bg-white dark:bg-slate-950">
      <div className="section-wrap">
        <div className="text-center mb-14">
          <span className="section-tag">⭐ Why Us?</span>
          <h2 className="section-heading">Why Students Choose Us</h2>
          <p className="section-sub">
            Choosing the right tutor can shape a student's future. We go beyond traditional teaching.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REASONS.map(r => (
            <div key={r.title} className="card card-hover p-5 text-center group">
              <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-2xl bg-gradient-to-br ${r.gradient} shadow-md group-hover:scale-110 transition-transform duration-200`}>
                {r.icon}
              </div>
              <h3 className="font-heading font-bold text-slate-900 dark:text-white text-sm mb-2">{r.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
