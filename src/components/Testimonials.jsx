const REVIEWS = [
  {
    text: '"SkillBridge Tutors helped my son gain confidence in Maths within just a few weeks. The tutor explained concepts clearly and tracked his progress regularly."',
    name: 'Mrs. Patel',
    role: 'Parent of Year 8 Student, London',
    stars: 5,
    initials: 'MP',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    text: '"I was struggling with GCSE Maths, but the personalised approach made a huge difference. I feel much more confident going into my exams."',
    name: 'Emily R.',
    role: 'GCSE Student, Manchester',
    stars: 5,
    initials: 'ER',
    gradient: 'from-green-500 to-emerald-500',
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="section-wrap">
        <div className="text-center mb-14">
          <span className="section-tag">💬 Testimonials</span>
          <h2 className="section-heading">What Parents &amp; Students Say</h2>
          <p className="section-sub">Trusted by families across the UK for quality Maths tuition</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map(r => (
            <div key={r.name} className="card card-hover p-7 flex flex-col">
              {/* Quote icon */}
              <svg className="w-8 h-8 text-blue-200 dark:text-blue-900 mb-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>

              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed italic flex-1">
                {r.text}
              </p>

              <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-700 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${r.gradient} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                  {r.initials}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">{r.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{r.role}</p>
                  <Stars count={r.stars} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall rating strip */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl px-6 py-3">
            <Stars count={5} />
            <span className="text-amber-700 dark:text-amber-300 font-bold text-sm">4.9 / 5.0</span>
            <span className="text-amber-600 dark:text-amber-400 text-sm">— Average Parent Rating</span>
          </div>
        </div>
      </div>
    </section>
  )
}
