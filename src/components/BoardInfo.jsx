export default function BoardInfo() {
  return (
    <section id="board-info" className="py-16 bg-white dark:bg-slate-950">
      <div className="section-wrap max-w-3xl">
        {/* Free trial banner */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl px-8 py-4 shadow-lg text-base font-semibold">
            🎁 One Free Trial Class Available Before Enrollment!
          </div>
        </div>

        {/* GCSE board card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-glow-blue text-center">
          {/* decorative circles */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-white/5 rounded-full" />

          <span className="inline-block bg-white text-blue-700 font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
            GCSE Board
          </span>
          <h3 className="font-heading text-2xl font-bold mb-3">Specialised Tutoring for Years 1–10</h3>
          <p className="text-white/80 max-w-xl mx-auto leading-relaxed">
            We focus exclusively on the GCSE curriculum, offering expert guidance in Maths
            to help students excel in exams with confidence.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {['Year 1–6', 'Year 7–10', 'GCSE Prep', 'Maths'].map(t => (
              <span key={t} className="glass rounded-full px-4 py-1.5 text-sm font-medium">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
