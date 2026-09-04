const REASONS = [
  {
    icon: '👨‍🏫',
    title: 'Expert Tutors',
    desc: 'Experienced, background-verified tutors who explain concepts clearly and help students build steady progress.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: '🎯',
    title: 'Personalised Learning',
    desc: 'Every lesson is planned around the child’s needs, pace and goals so learning feels achievable and focused.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: '📚',
    title: 'Curriculum Focus',
    desc: 'Lessons align with the UK curriculum and GCSE board requirements, with support tailored to each year group.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: '⏱️',
    title: 'Flexible Scheduling',
    desc: 'Sessions can be arranged around school hours, evenings and weekends to fit busy family routines.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: '✨',
    title: 'Supportive Environment',
    desc: 'Learning is designed to feel encouraging rather than stressful, helping children gain confidence in maths over time.',
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    icon: '📈',
    title: 'Trackable Progress',
    desc: 'Parents receive regular feedback and progress updates so every improvement is measurable and clear.',
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    icon: '💷',
    title: 'Affordable Tuition',
    desc: 'Sessions start from £8 per hour, with bundle discounts available for families booking multiple lessons.',
    gradient: 'from-teal-500 to-green-500',
  },
  {
    icon: '🛡️',
    title: 'Risk-Free Trial',
    desc: 'Every new family can book one free trial class before enrolling, making the start simple and pressure-free.',
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
