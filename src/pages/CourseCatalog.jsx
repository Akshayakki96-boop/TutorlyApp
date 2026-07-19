import { useState } from 'react'
import Footer from '../components/Footer'
import Chatbot from '../components/Chatbot'
import { Link } from 'react-router-dom'

const COURSES = [
  {
    id: 1,
    title: 'Maths Tuition – Year 1 to 6',
    description: 'Foundational Maths from counting and number bonds to fractions, geometry, and statistics. Personalised support for every child.',
    subject: 'Maths',
    grades: 'Year 1–6',
    level: 'Primary',
    duration: '1 hr / session',
    price: '£8 / hr',
    originalPrice: '£9 / hr',
    rating: 4.9,
    reviews: 48,
    icon: '📐',
    gradient: 'from-blue-500 to-cyan-500',
    tags: ['Number', 'Geometry', 'Fractions', 'Statistics'],
  },
  {
    id: 2,
    title: 'Maths Tuition – Year 7 to 10',
    description: 'Advanced Maths covering algebra, trigonometry, calculus foundations, and data handling aligned with the GCSE curriculum.',
    subject: 'Maths',
    grades: 'Year 7–10',
    level: 'Secondary',
    duration: '1 hr / session',
    price: '£8 / hr',
    originalPrice: '£9 / hr',
    rating: 4.9,
    reviews: 62,
    icon: '📐',
    gradient: 'from-blue-600 to-indigo-600',
    tags: ['Algebra', 'Trigonometry', 'GCSE Prep', 'Exam Technique'],
  },
  {
    id: 3,
    title: 'GCSE Exam Preparation',
    description: 'Intensive GCSE preparation for Maths with past papers, exam technique coaching, and timed practice sessions.',
    subject: 'Maths',
    grades: 'Year 10',
    level: 'GCSE',
    duration: '1–2 hrs / session',
    price: '£8 / hr',
    originalPrice: '£9 / hr',
    rating: 4.9,
    reviews: 53,
    icon: '🏆',
    gradient: 'from-amber-500 to-orange-500',
    tags: ['GCSE', 'Past Papers', 'Exam Technique', 'Intensive'],
  },
]

const SUBJECTS = ['All', 'Maths']
const LEVELS   = ['All', 'Primary', 'Secondary', 'GCSE']

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(s => (
        <svg key={s} className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
      <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">{rating} ({rating >= 5 ? 'Perfect' : 'Excellent'})</span>
    </div>
  )
}

export default function CourseCatalog() {
  const [activeSubject, setActiveSubject] = useState('All')
  const [activeLevel,   setActiveLevel]   = useState('All')

  const filtered = COURSES.filter(c =>
    (activeSubject === 'All' || c.subject === activeSubject) &&
    (activeLevel   === 'All' || c.level === activeLevel)
  )

  const scrollToEnrol = () =>
    window.location.href = '/#assessmentForm'

  return (
    <>
      <main className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Hero */}
        <div className="bg-hero-gradient py-16 text-white text-center">
          <div className="section-wrap">
            <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              📚 Course Catalogue
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold mb-4">
              Explore Our Courses
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Expert-led Maths tuition for Year 1–10 and GCSE. Starting from £8/hr.
            </p>
          </div>
        </div>

        <div className="section-wrap py-12">
          {/* Filters */}
          <div className="card p-5 mb-8">
            <div className="flex flex-wrap gap-6 items-center">
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Subject</p>
                <div className="flex flex-wrap gap-2">
                  {SUBJECTS.map(s => (
                    <button
                      key={s}
                      onClick={() => setActiveSubject(s)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                        activeSubject === s
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-600'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Level</p>
                <div className="flex flex-wrap gap-2">
                  {LEVELS.map(l => (
                    <button
                      key={l}
                      onClick={() => setActiveLevel(l)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                        activeLevel === l
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-600'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
            Showing <strong>{filtered.length}</strong> course{filtered.length !== 1 ? 's' : ''}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(course => (
              <div key={course.id} className={`card card-hover flex flex-col overflow-hidden relative ${course.bestValue ? 'border-2 border-green-400' : ''}`}>
                {course.bestValue && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    Best Value
                  </div>
                )}

                {/* Thumbnail */}
                <div className={`h-32 bg-gradient-to-br ${course.gradient} flex items-center justify-center text-5xl`}>
                  {course.icon}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-heading font-bold text-slate-900 dark:text-white text-sm leading-snug">{course.title}</h3>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{course.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {course.tags.slice(0,3).map(t => (
                      <span key={t} className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <StarRating rating={course.rating} />

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                      <div>
                        <span className="text-xl font-extrabold font-heading text-blue-700 dark:text-blue-400">{course.price}</span>
                        <span className="text-xs text-slate-400 line-through ml-2">{course.originalPrice}</span>
                      </div>
                      <button onClick={scrollToEnrol} className="btn-primary text-xs py-2 px-4">
                        Enrol Now
                      </button>
                    </div>

                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                      <span>⏱ {course.duration}</span>
                      <span>|</span>
                      <span>📅 {course.grades}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-lg font-semibold">No courses match your filters</p>
              <button onClick={() => { setActiveSubject('All'); setActiveLevel('All') }} className="btn-primary mt-4">
                Clear Filters
              </button>
            </div>
          )}

          <div className="mt-12 text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
            <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-2">
              Not sure which course is right?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-5">
              Book a free demo class — our tutors will assess your child and recommend the best path.
            </p>
            <button onClick={scrollToEnrol} className="btn-primary animate-blink">
              Book Free Demo
            </button>
          </div>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}
