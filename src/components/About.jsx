export default function About() {
  return (
    <section id="about" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="section-wrap max-w-4xl">
        <div className="text-center mb-12">
          <span className="section-tag">🏫 About Us</span>
          <h2 className="section-heading">Who Are We</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="card p-7 card-hover">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl mb-4 shadow-md">
              🎓
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              We are a team of passionate and highly qualified tutors dedicated to providing{' '}
              <strong>high-quality online tuition</strong> in <strong>Maths</strong>.
              Our programs are designed for students from <strong>Year 1 to Year 10</strong>, helping them build
              strong academic foundations and the confidence to succeed.
            </p>
          </div>

          <div className="card p-7 card-hover">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl mb-4 shadow-md">
              📋
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              We specialise in preparing students for the <strong>GCSE Board</strong>, ensuring that every lesson
              is aligned with the latest curriculum requirements. Whether improving exam techniques, understanding
              core concepts, or boosting grades, our structured approach makes learning clear, engaging and effective.
            </p>
          </div>

          <div className="card p-7 card-hover">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-2xl mb-4 shadow-md">
              🤲
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              At the heart of our teaching is <strong>personalised learning</strong>. Each student receives
              individual attention, a tailored study plan, and ongoing feedback to track progress. Our tutors
              bring both expertise and enthusiasm to every session, making lessons interactive and motivating.
            </p>
          </div>

          <div className="card p-7 card-hover">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-2xl mb-4 shadow-md">
              🏆
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              With our focus on <strong>quality, reliability, and results</strong>, we have become a trusted choice
              for families across the UK looking for affordable and effective online tuition.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
