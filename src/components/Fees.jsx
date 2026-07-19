const PLANS = [
  {
    badge: 'Save up to 10%',
    badgeColor: 'bg-rose-500',
    title: 'Starting from £8',
    subtitle: 'per hour',
    forLabel: 'For 12 sessions',
    original: 'Original Price: £9 / hour',
    highlight: false,
    features: ['Maths', '12 session bundle', 'Personalised plan', 'Progress reports'],
  },
  {
    badge: 'GCSE Intensive',
    badgeColor: 'bg-blue-600',
    title: 'Starting from £14',
    subtitle: 'per hour',
    forLabel: 'GCSE Maths Intensive (per hour)',
    original: 'Original Price: £16 / hour',
    highlight: true,
    features: ['Year 10 & GCSE focused', 'Past papers & exam technique', 'Timed practice sessions', 'Priority support'],
  },
]

export default function Fees() {
  const scrollToForm = () =>
    document.querySelector('#assessmentForm')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="fees" className="py-20 bg-white dark:bg-slate-950">
      <div className="section-wrap">
        <div className="text-center mb-14">
          <span className="section-tag">💷 Pricing</span>
          <h2 className="section-heading">Course Fees</h2>
          <p className="section-sub">
            Quality tuition at rates every family can access — transparent, affordable, no hidden fees
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-8 max-w-3xl mx-auto items-stretch">
          {PLANS.map((p, i) => (
            <div
              key={p.title}
              className={`relative flex-1 card card-hover flex flex-col overflow-hidden
                ${p.highlight ? 'border-2 border-blue-500 shadow-glow-blue scale-[1.03]' : ''}
              `}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Badge */}
              <span className={`absolute top-0 right-0 ${p.badgeColor} text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl`}>
                {p.badge}
              </span>

              <div className="p-7 pt-9 flex flex-col h-full">
                <div className="mb-4">
                  <p className="text-4xl font-extrabold font-heading text-brand-600 dark:text-blue-400 leading-none">
                    {p.title}
                    <span className="text-xl font-semibold text-slate-500 dark:text-slate-400 ml-1">{p.subtitle}</span>
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-300">{p.forLabel}</p>
                  <p className="text-sm text-slate-400 line-through mt-1">{p.original}</p>
                </div>

                <ul className="space-y-2 my-5 flex-1">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <svg className="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={scrollToForm}
                  className={p.highlight ? 'btn-primary justify-center w-full' : 'btn-secondary justify-center w-full'}
                >
                  Enrol Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
          🎁 <strong>One FREE trial class</strong> available before enrollment — no commitment required
        </p>
      </div>
    </section>
  )
}
