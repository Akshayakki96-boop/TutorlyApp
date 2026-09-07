import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Chatbot from '../components/Chatbot'
import { Link } from 'react-router-dom'

const COURSES = [
  {
    id: 1,
    title: 'Maths Tuition – Year 1 to 6',
    description: 'Building strong foundations and clear understanding of core concepts. Younger students focus on number confidence and problem-solving habits early.',
    subject: 'Maths',
    grades: 'Year 1–6',
    level: 'Primary',
    duration: '1 hr / session',
    price: 'From £8 / session',
    originalPrice: '£9 / session',
    rating: 4.9,
    reviews: 48,
    icon: '📐',
    gradient: 'from-blue-500 to-cyan-500',
    tags: ['Number', 'Geometry', 'Fractions', 'Problem Solving'],
  },
  {
    id: 2,
    title: 'Maths Tuition – Year 7 to 10',
    description: 'Strengthen topics before they become harder to catch up on later. Practising problem-solving techniques through guided practice with one-to-one attention.',
    subject: 'Maths',
    grades: 'Year 7–10',
    level: 'Secondary',
    duration: '1 hr / session',
    price: 'From £8 / session',
    originalPrice: '£9 / session',
    rating: 4.9,
    reviews: 62,
    icon: '📐',
    gradient: 'from-blue-600 to-indigo-600',
    tags: ['Algebra', 'Trigonometry', 'GCSE Prep', 'Exam Technique'],
  },
  {
    id: 3,
    title: 'GCSE Maths Intensive',
    description: 'Intensive, exam-focused support including past papers and revision techniques designed to boost grades. Preparing for exams with timed practice.',
    subject: 'Maths',
    grades: 'Year 10',
    level: 'GCSE',
    duration: '1–2 hrs / session',
    price: 'From £14 / hour',
    originalPrice: 'From £16 / hour',
    rating: 4.9,
    reviews: 53,
    icon: '🏆',
    gradient: 'from-amber-500 to-orange-500',
    tags: ['GCSE', 'Past Papers', 'Exam Technique', 'Intensive Revision'],
    bestValue: true,
  },
]

const SUBJECTS = ['All', 'Maths']
const LEVELS   = ['All', 'Primary', 'Secondary', 'GCSE']

const WHY_CHOOSE = [
  {
    title: 'One-to-one attention',
    description: 'Each student gets a tutor\'s full focus. There is no getting lost in a large classroom.',
    icon: '👤',
  },
  {
    title: 'Personalised learning plans',
    description: 'Every child is different. Tutors build a plan around the student\'s strengths and weak spots, then track progress with regular feedback.',
    icon: '📋',
  },
  {
    title: 'Flexible scheduling',
    description: 'Sessions fit around school, clubs, and family life, including evenings and weekends.',
    icon: '⏰',
  },
  {
    title: 'Affordable pricing',
    description: 'Lessons start from £8 per session, with bundle discounts for families who book multiple sessions.',
    icon: '💷',
  },
]

const FAQS = [
  {
    q: 'What types of online math courses are available for UK students?',
    a: 'SkillBridge Tutors offers maths courses for Year 1 to Year 10, plus dedicated GCSE preparation aligned with UK exam boards.',
  },
  {
    q: 'How can students learn maths online according to their year group?',
    a: 'Tutors build lessons around each student\'s current year group and ability, covering foundational topics for younger students and exam-focused content for older ones.',
  },
  {
    q: 'What can students expect from mathematics online classes?',
    a: 'Students get one-to-one or small group sessions, a personalised study plan, regular progress tracking, and clear feedback after each lesson.',
  },
  {
    q: 'Can students study maths online to strengthen their core concepts?',
    a: 'Yes. Tutors focus on concept clarity and problem-solving skills before moving on to more advanced or exam-style work.',
  },
  {
    q: 'How do online math courses support different levels of maths ability?',
    a: 'Courses are tailored to each student, so a struggling learner and a high achiever both receive a plan matched to their pace and goals.',
  },
  {
    q: 'Can students learn maths online with a personalised learning plan?',
    a: 'Yes. Every student receives an individual study plan, along with ongoing feedback so parents can track improvement over time.',
  },
]

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

  useEffect(() => {
    document.title = 'Mathematics Online Classes with SkillBridge Tutors'

    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }

    metaDescription.setAttribute(
      'content',
      'Explore mathematics online classes for UK students Years 1–10 and GCSE. One-to-one maths tuition with personalised learning plans, flexible scheduling from £8/session, and a free trial class. Qualified UK tutors with 10+ years experience.'
    )
  }, [])

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
              Mathematics Online Classes with SkillBridge Tutors
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Finding the right maths support can feel like a puzzle. SkillBridge Tutors makes it simple. As a trusted UK tuition platform, we run mathematics online classes for students from Year 1 right through to GCSE, helping them build real confidence one session at a time.
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
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Lessons start from £8 per session, bundle discounts are available, and every family can begin with a free trial class before enrolling.
            </p>
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

          {/* Who Are SkillBridge Tutors Section */}
          <div className="mt-16 bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-700">
            <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Who Are SkillBridge Tutors?
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-4">
              SkillBridge Tutors is a team of qualified, experienced tutors based in the UK. We focus only on maths, which means every lesson is planned with real subject expertise. Our tutors have over ten years of teaching experience, and each one is background-verified before they ever meet a student.
            </p>
            <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
              The platform covers every year group from Year 1 to Year 10, along with dedicated GCSE preparation. Whether a child needs help with basic number skills or is preparing for exam papers, SkillBridge Tutors offers online math courses built around where the student actually is.
            </p>
          </div>

          {/* Why Learn Maths Online Section */}
          <div className="mt-16">
            <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-4 text-center">
              Why Learn Maths Online with SkillBridge Tutors
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-center mb-10 max-w-2xl mx-auto">
              Many parents wonder if online lessons can really match in-person tuition. With the right structure, they can work even better. Families who want to learn maths online choose SkillBridge Tutors for a few clear reasons.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_CHOOSE.map((item, idx) => (
                <div key={idx} className="card p-6 text-center">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-heading font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What Happens Section */}
          <div className="mt-16 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/20 rounded-2xl p-8 md:p-12">
            <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-4">
              What Happens When You Study Maths Online
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-6">
              Parents often ask what a typical lesson looks like. When a student decides to study maths online with SkillBridge Tutors, the process starts with a <span className="font-semibold">free trial class</span>. This gives families a chance to meet a tutor and see how the platform works, with no commitment needed.
            </p>
            <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-6">
              After the trial, tutors build a study plan based on the student's year group and current level. Lessons in these mathematics online classes focus on three areas:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                <span className="text-slate-700 dark:text-slate-300"><strong>Building strong foundations</strong> and clear understanding of core concepts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                <span className="text-slate-700 dark:text-slate-300"><strong>Practising problem-solving techniques</strong> through guided practice</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                <span className="text-slate-700 dark:text-slate-300"><strong>Preparing for exams</strong> with past papers and timed practice, especially for GCSE students</span>
              </li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
              Every session ends with feedback, so parents always know how their child is progressing.
            </p>
          </div>

          {/* Online Courses for Every Year Group */}
          <div className="mt-16">
            <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Online Math Courses for Every Year Group
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-8">
              SkillBridge Tutors designs its online math courses around the UK National Curriculum and GCSE boards. This matters because it keeps lessons relevant to what students are actually being taught in school.
            </p>
            <div className="space-y-4">
              <div className="card p-6 border-l-4 border-blue-500">
                <h3 className="font-heading font-bold text-slate-900 dark:text-white mb-2">Years 1 to 6</h3>
                <p className="text-slate-700 dark:text-slate-300">Younger students focus on building number confidence and problem-solving habits early.</p>
              </div>
              <div className="card p-6 border-l-4 border-indigo-500">
                <h3 className="font-heading font-bold text-slate-900 dark:text-white mb-2">Years 7 to 10</h3>
                <p className="text-slate-700 dark:text-slate-300">Students work on strengthening topics before they become harder to catch up on later.</p>
              </div>
              <div className="card p-6 border-l-4 border-amber-500">
                <h3 className="font-heading font-bold text-slate-900 dark:text-white mb-2">GCSE Students</h3>
                <p className="text-slate-700 dark:text-slate-300">Get intensive, exam-focused support, including past papers and revision techniques designed to boost grades.</p>
              </div>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mt-8">
              Courses are matched to each student's actual level, not a one-size-fits-all approach.
            </p>
          </div>

          {/* Supportive Learning Approach */}
          <div className="mt-16 bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-700">
            <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-4">
              A Supportive Way to Study Maths Online
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-4">
              What sets SkillBridge Tutors apart is the emphasis on <strong>confidence, not just correct answers</strong>. Our team describes the approach as <em>"engaging and stress-free,"</em> with tutors trained to encourage students rather than pressure them.
            </p>
            <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-4">
              Parent reviews echo this, with families reporting steady progress after choosing to study maths online with a tutor who understands their child's pace.
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mt-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">⭐</span>
                <span className="font-heading font-bold text-slate-900 dark:text-white text-xl">4.9 out of 5</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300">Parent rating with a free trial class and one-to-one options, SkillBridge Tutors gives families a low-risk way to try mathematics online classes before committing.</p>
            </div>
          </div>

          {/* FAQs Section */}
          <div className="mt-16">
            <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {FAQS.map((faq, idx) => (
                <details key={idx} className="card cursor-pointer group">
                  <summary className="p-6 font-heading font-bold text-slate-900 dark:text-white flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <span>{faq.q}</span>
                    <span className="text-xl group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-700 mt-2 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
            <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-2">
              Not sure which course is right?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-5">
              Book a free trial class and meet a tutor before you enrol, with no commitment required.
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
