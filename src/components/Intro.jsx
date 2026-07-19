export default function Intro() {
  return (
    <section id="intro" className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="section-wrap">
        <div className="text-center mb-10">
          <span className="section-tag">🇬🇧 Trusted UK Tuition</span>
          <h2 className="section-heading">Expert Online Maths Tutors<br />for Year 1–10 and GCSE</h2>
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

        {/* CTA strip */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl px-8 py-5 shadow-glow-blue max-w-2xl w-full">
            <span className="text-3xl">🌟</span>
            <p className="text-base font-medium leading-snug text-left">
              Start your journey today with a <strong>trusted platform</strong> for online tuition in the UK. Expert tutors, structured learning, and proven success — your child will build{' '}
              <em>long-term skills</em> for academic and personal success.
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
    text: 'Looking for the best Maths tutor? SkillBridge Tutors connects students with highly qualified tutors who make learning simple, effective, and engaging.',
  },
  {
    icon: '📅',
    text: 'With trusted online tuition UK, we offer flexible, affordable lessons that fit around your schedule – whether preparing for exams, improving grades, or building confidence in key subjects.',
  },
  {
    icon: '📐',
    text: 'Our Maths tutors specialise in both foundational skills and advanced problem-solving, helping students build confidence, master key concepts, and prepare for exams.',
  },
  {
    icon: '🎯',
    text: 'We provide a personalised approach – tailored learning plans, progress tracking, and regular feedback to ensure measurable results.',
  },
  {
    icon: '🤝',
    text: "Unlike other tutoring services, SkillBridge Tutors creates a supportive environment where learning feels motivating rather than stressful.",
  },
  {
    icon: '💡',
    text: 'As one of the best online tutoring sites in the UK, we combine quality, reliability, and results with affordable hourly rates, flexible packages, and discounted bundles.',
  },
]
