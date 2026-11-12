import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Testimonials from '../components/Testimonials'
import { setPageMeta } from '../lib/metaTagManager'

export default function TestimonialsPage() {
  useEffect(() => {
    setPageMeta({
      title: 'Parent & Student Testimonials | SkillBridge Tutors',
      description: 'Read what parents and students say about SkillBridge Tutors online maths tuition, from Year 1 to GCSE, with personalised one-to-one lessons.',
      canonicalUrl: 'https://skillbridgetutors.com/testimonials/',
      keywords: 'maths tuition testimonials, online maths tutor reviews, parent reviews, GCSE maths tutor feedback'
    })
  }, [])

  return (
    <main className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="bg-hero-gradient py-16 text-white text-center">
        <div className="section-wrap">
          <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            💬 Testimonials
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold mb-4">What Parents &amp; Students Say</h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">Trusted by families across the UK for quality Maths tuition.</p>
        </div>
      </div>

      <Testimonials showHeading={false} />

      <section className="pb-20">
        <div className="section-wrap">
          <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
            <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">Ready to see the difference?</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Start with a free trial class. No commitment, just a personalised lesson with one of our tutors.</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/contact" className="btn-primary">Book a Free Trial</Link>
              <Link to="/courses" className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">Explore Courses</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
