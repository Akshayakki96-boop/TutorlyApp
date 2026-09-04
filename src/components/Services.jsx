const SUBJECTS = [
  {
    icon: '📐',
    title: 'Maths Tuition',
    years: 'Year 1 – 10 & GCSE',
    color: 'from-blue-500 to-cyan-500',
    bgLight: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    accentColor: 'text-blue-700 dark:text-blue-300',
    features: [
      'One-to-one and small group support',
      'Personalised learning plans for every student',
      'GCSE maths tuition and exam preparation',
      'Progress tracking and regular parent feedback',
      'Flexible sessions for school, evenings and weekends',
    ],
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="section-wrap">
        <div className="text-center mb-14">
          <span className="section-tag">✏️ Our Services</span>
          <h2 className="section-heading">One-to-One and Small Group Support</h2>
          <p className="section-sub">
            Flexible maths tuition designed around how each student learns best.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {SUBJECTS.map(s => (
            <div
              key={s.title}
              className={`card card-hover border ${s.borderColor} ${s.bgLight} overflow-hidden`}
            >
              <div className={`h-1.5 w-full bg-gradient-to-r ${s.color}`} />

              <div className="p-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl shadow-md`}>
                    {s.icon}
                  </div>
                  <div>
                    <h3 className={`font-heading text-xl font-bold ${s.accentColor}`}>{s.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{s.years}</p>
                  </div>
                </div>

                <ul className="space-y-2.5 mt-4">
                  {s.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                      <svg className="w-4 h-4 mt-0.5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
