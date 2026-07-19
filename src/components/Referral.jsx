export default function Referral() {
  const scrollToForm = () =>
    document.querySelector('#assessmentForm')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="referral-program" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="section-wrap max-w-4xl">
        <div className="text-center mb-12">
          <span className="section-tag">🤝 Referral Program</span>
          <h2 className="section-heading">Share the Learning Journey</h2>
          <p className="section-sub">
            If your child is enjoying their sessions with SkillBridge Tutors, why not share the experience with a friend?
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          {/* For Friend */}
          <div className="card card-hover p-7 border-l-4 border-l-blue-500">
            <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              📘 For Your Friend
            </h3>
            <ul className="space-y-2.5">
              {['Personalised learning support', 'Structured academic guidance', 'A confident start to their journey'].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                  <svg className="w-4 h-4 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* For You */}
          <div className="card card-hover p-7 border-l-4 border-l-purple-500">
            <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              🌟 For You
            </h3>
            <ul className="space-y-2.5">
              {['Recognition as a valued parent', 'Priority updates on new programs', 'Continued academic support partnership'].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                  <svg className="w-4 h-4 text-purple-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card p-7 text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-5 max-w-lg mx-auto">
            Simply ask your friend to mention your name when they enquire or enrol. Our team will take care of the rest.
          </p>
          <button onClick={scrollToForm} className="btn-primary">
            Refer a Friend
          </button>
        </div>
      </div>
    </section>
  )
}
