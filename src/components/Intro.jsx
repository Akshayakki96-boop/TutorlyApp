export default function Intro() {
  return (
    <section id="intro" className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="section-wrap">
        <div className="text-center mb-10">
          <span className="section-tag">🇬🇧 Trusted UK Tuition</span>
          <h2 className="section-heading">Why Choose SkillBridge Tutors for Maths Tuition?</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {POINTS.map((pt, i) => (
            <div
              key={i}
              className="card card-hover flex gap-4 p-5 rounded-2xl"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className="text-2xl shrink-0 mt-0.5">{pt.icon}</span>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{pt.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex flex-col items-start gap-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl px-8 py-6 shadow-glow-blue max-w-3xl w-full text-left">
            <div className="flex gap-3 items-start">
              <span className="text-3xl shrink-0">🌟</span>
              <div>
                <p className="text-base font-medium leading-relaxed">
                  Finding the right tutor can make all the difference to how a child feels about maths. SkillBridge Tutors connects families with experienced, background-verified tutors who focus on clear explanations and steady progress. Their team brings <strong>over 10 years of teaching experience</strong>, covering the full UK curriculum from Year 1 right through to GCSE.
                </p>
              </div>
            </div>
            <p className="text-base font-medium leading-relaxed border-t border-white/30 pt-4">
              Unlike generic online classes, SkillBridge Tutors builds a personalised learning plan for each student. Every lesson comes with progress tracking and regular feedback, so parents always know how their child is doing.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

const POINTS = [
  {
    icon: '🔍',
    text: 'SkillBridge Tutors supports children from Year 1 through to Year 10 and GCSE, with lessons built around the full UK curriculum and each student’s learning needs.',
  },
  {
    icon: '📅',
    text: 'Every lesson comes with progress tracking and regular feedback, so parents always know how their child is doing and what to focus on next.',
  },
  {
    icon: '📐',
    text: 'Our tutors cover foundational skills and advanced problem-solving, helping students build confidence, master key concepts, and prepare for exams with greater clarity.',
  },
  {
    icon: '🎯',
    text: 'Unlike generic online classes, SkillBridge Tutors builds a personalised learning plan for each student so progress feels steady and achievable.',
  },
  {
    icon: '🤝',
    text: 'Students can choose between one-to-one sessions and small group classes, depending on the learning style that helps them feel most supported.',
  },
  {
    icon: '💡',
    text: 'With affordable pricing, flexible scheduling and a free trial class, SkillBridge Tutors makes quality maths support accessible for busy families.',
  },
]
