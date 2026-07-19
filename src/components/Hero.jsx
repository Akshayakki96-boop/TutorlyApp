import { useNavigate } from 'react-router-dom'

const STATS = [
  { value: 'Free',  label: 'Trial Class — No Commitment', icon: '🎁' },
  { value: '1:1',   label: 'Personal Tutor Attention',    icon: '👨‍🏫' },
  { value: 'Yr 1–GCSE', label: 'All Year Groups Covered', icon: '🎓' },
  { value: '£8',    label: 'Starting Per Session',        icon: '💷' },
]

export default function Hero() {
  const navigate = useNavigate()

  const scrollToForm = () =>
    document.querySelector('#assessmentForm')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-hero-gradient">
      {/* dot-grid overlay */}
      <div className="absolute inset-0 hero-pattern pointer-events-none" />

      {/* Gradient blobs */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="section-wrap relative z-10 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Text ── */}
          <div className="text-white animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-sm font-semibold text-white/90 mb-6 border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              UK's Trusted Online Tuition Platform
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-tight mb-6">
              Learn from{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Expert Tutors
              </span>
              <br />Anytime, Anywhere
            </h1>

            <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-4 max-w-lg">
              One-to-one and group tutoring in Maths for Year 1–10 and GCSE.
              Flexible schedules, proven results.
            </p>

            {/* Price badge */}
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8">
              <span className="text-green-300 text-lg font-bold">💷 From £8.00 Per Session</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={scrollToForm}
                className="btn-primary text-base py-3.5 px-8 animate-blink"
              >
                Book Free Demo
              </button>
              <button
                onClick={() => navigate('/courses')}
                className="btn-outline-white text-base py-3.5 px-8"
              >
                Explore Courses
              </button>
            </div>

            {/* Trust row */}
            <div className="flex items-center gap-3 mt-8">
              <div className="flex -space-x-2">
                {['🧑', '👩', '👦', '👧'].map((e, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center text-sm">
                    {e}
                  </div>
                ))}
              </div>
              <p className="text-white/80 text-sm">
                <strong className="text-white">Now enrolling</strong> — secure your free trial today
              </p>
            </div>
          </div>

          {/* ── Right: Hero Image + Overlays ── */}
          <div className="hidden lg:flex justify-center items-center animate-float">
            <div className="relative w-full max-w-md">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-3xl blur-2xl" />

              {/* Image */}
              <div className="relative glass rounded-3xl p-3 shadow-2xl">
                <img
                  src="/Images/NewHeaderImage.jpg"
                  alt="Expert tutor helping a student one-to-one"
                  className="rounded-2xl w-full object-cover object-center"
                  style={{ maxHeight: '420px' }}
                  loading="eager"
                  width={480}
                  height={420}
                />

                {/* Bottom gradient overlay with year groups */}
                <div className="absolute bottom-3 left-3 right-3 bg-gradient-to-t from-black/90 via-black/70 to-transparent rounded-b-2xl px-4 pt-10 pb-4">
                  <p className="text-white text-xs font-bold uppercase tracking-wider mb-2">Year Groups Covered</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Yr 1','Yr 2','Yr 3','Yr 4','Yr 5','Yr 6','Yr 7','Yr 8','Yr 9','Yr 10','GCSE'].map((yr, i) => (
                      <span
                        key={yr}
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          yr === 'GCSE'
                            ? 'bg-yellow-400 text-yellow-900'
                            : i < 6
                            ? 'bg-blue-600 text-white'
                            : 'bg-purple-600 text-white'
                        }`}
                      >
                        {yr}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top-left: Rating badge */}
              <div className="absolute -top-4 -left-4 bg-white rounded-xl px-4 py-2.5 shadow-xl border border-slate-200">
                <p className="text-slate-800 text-xs font-bold">⭐ 4.9 / 5.0</p>
                <p className="text-slate-500 text-xs">Parent Rating</p>
              </div>

              {/* Top-right: Free trial badge */}
              <div className="absolute -top-4 -right-4 bg-green-500 rounded-xl px-4 py-2.5 shadow-lg">
                <p className="text-white text-xs font-bold">🆓 Free Trial</p>
                <p className="text-white/80 text-xs">No commitment</p>
              </div>

              {/* Right-side: Price pill */}
              <div className="absolute top-1/2 -right-6 -translate-y-1/2 bg-white rounded-xl px-4 py-3 shadow-xl text-center border border-slate-200">
                <p className="text-slate-500 text-xs font-medium">From</p>
                <p className="font-heading font-extrabold text-brand-600 text-2xl leading-none">£8</p>
                <p className="text-slate-500 text-xs font-medium">/ session</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div className="relative z-10 bg-white/10 backdrop-blur-sm border-t border-white/10">
        <div className="section-wrap py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {STATS.map(s => (
              <div key={s.label} className="group">
                <p className="text-3xl mb-0.5">{s.icon}</p>
                <p className="text-2xl font-extrabold font-heading text-white">{s.value}</p>
                <p className="text-white/70 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
