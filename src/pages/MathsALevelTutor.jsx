import { useEffect } from 'react'
import Footer from '../components/Footer'
import Chatbot from '../components/Chatbot'
import FAQAccordion from '../components/FAQAccordion'
import SchemaMarkup from '../components/SchemaMarkup'

const A_LEVEL_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'A Level Maths Tutor Online',
  serviceType: 'A-Level Maths Tuition and Online Maths Tutor Support',
  description: 'Experienced A-Level maths tutors helping students improve understanding, boost confidence and prepare for exams with personalised online tuition.',
  provider: {
    '@type': 'Organization',
    name: 'SkillBridge Tutors',
    url: 'https://skillbridgetutors.com/'
  },
  areaServed: 'United Kingdom',
  audience: {
    '@type': 'EducationalAudience',
    audienceType: 'A-Level mathematics students'
  },
  url: 'https://skillbridgetutors.com/maths-a-level-tutor',
  keywords: ['A Level Maths Tutor', 'Maths A Level Tutor', 'A Level maths tuition online', 'online A-Level maths tutor']
}

const WHY_FEATURES = [
  { icon: '🎯', title: 'One to one online tutoring',     desc: 'Full individual focus in every session.' },
  { icon: '👨‍🏫', title: 'Experienced A-Level tutors',    desc: 'Subject specialists for every exam board.' },
  { icon: '📅', title: 'Flexible lesson scheduling',     desc: 'Lessons planned around your timetable.' },
  { icon: '📈', title: 'Regular progress reviews',       desc: 'Track improvement at every stage.' },
  { icon: '📋', title: 'Topic-focused revision',         desc: 'Target exactly what needs the most work.' },
  { icon: '📝', title: 'Past paper practice',            desc: 'Exam-style questions with detailed feedback.' },
  { icon: '💬', title: 'Individual feedback after every lesson', desc: 'Actionable guidance to keep improving.' },
]

const PURE_MATHS = ['Algebra', 'Functions', 'Trigonometry', 'Calculus', 'Coordinate Geometry', 'Exponentials and Logarithms', 'Differentiation', 'Integration']
const STATISTICS = ['Probability', 'Statistical Distributions', 'Hypothesis Testing', 'Data Analysis']
const MECHANICS  = ['Motion', 'Forces', 'Kinematics', "Newton's Laws", 'Momentum']

const INTERACTIVE = [
  'Live problem solving',
  'Digital whiteboards',
  'Screen sharing',
  'Instant doubt resolution',
  'Homework discussions',
  'Practice worksheets',
]

const EXAM_ITEMS = [
  'Past paper practice',
  'Timed mock examinations',
  'Detailed feedback',
  'Error analysis',
  'Revision planning',
  'Examination strategies',
]

const BENEFITS = [
  'Personalised teaching',
  'Flexible lesson timings',
  'Better concentration',
  'Consistent academic support',
  'Lessons designed around individual learning goals',
]

const PERSONALISED_ITEMS = [
  'Understand concepts step by step',
  'Apply mathematical methods correctly',
  'Develop logical thinking',
  'Solve exam-style questions confidently',
  'Improve accuracy through regular practice',
]

function CheckItem({ children }) {
  return (
    <li className="flex items-start gap-3 bg-white dark:bg-slate-800 rounded-xl px-4 py-3 shadow-sm border border-slate-100 dark:border-slate-700">
      <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-white text-xs font-bold">✓</span>
      <span className="text-slate-700 dark:text-slate-200 font-medium text-sm">{children}</span>
    </li>
  )
}

function TopicPill({ color, children }) {
  const styles = {
    blue:   'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800',
    purple: 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-100 dark:border-purple-800',
    green:  'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-100 dark:border-green-800',
  }
  return (
    <span className={`px-4 py-2 rounded-full font-semibold text-sm border ${styles[color]}`}>{children}</span>
  )
}

export default function MathsALevelTutor() {
  useEffect(() => {
    document.title = 'A Level Maths Tutor Online, Maths A Level Tutor & Tuition Online'
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta) }
    meta.setAttribute('content', 'Get expert support from a Maths A Level Tutor Online at SkillBridge Tutors, with personalised A Level Maths Tuition to build confidence and prepare effectively for exams.')
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel', 'canonical'); document.head.appendChild(canonical) }
    canonical.setAttribute('href', 'https://skillbridgetutors.com/maths-a-level-tutor')
    return () => { const c = document.querySelector('link[rel="canonical"]'); if (c) c.remove() }
  }, [])

  return (
    <>
      <SchemaMarkup data={A_LEVEL_SCHEMA} />
      <main className="min-h-screen bg-white dark:bg-slate-950">

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-purple-700 pt-28 pb-20">
        <div className="section-wrap">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-sm font-semibold text-white/90 mb-6 border border-white/20">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                A-Level Maths Tuition
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                Maths A Level Tutor Online
              </h1>
              <p className="text-white/80 leading-relaxed text-lg mb-8">
                A-Level Maths can be demanding because each topic builds on the one before it. If a student misses an important concept, later chapters often become much harder to understand.
              </p>
              <button onClick={() => { window.location.href = '/#assessmentForm' }} className="btn-primary text-base py-3.5 px-8">Book Free Trial</button>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-2xl" />
              <img src="/Images/Carousel3.png" alt="A Level maths tutor online" className="relative rounded-2xl shadow-2xl w-full object-cover aspect-video" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="section-wrap">
          <div className="max-w-3xl mx-auto">
            <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-base mb-4">A-Level Maths can be demanding because each topic builds on the one before it. If a student misses an important concept, later chapters often become much harder to understand. At SkillBridge Tutors, we focus on building strong foundations before moving on to advanced topics. Through our personalised a level maths tuition, we help students improve their understanding, strengthen problem-solving skills, and prepare confidently for examinations. As a trusted maths a level tutor online, we support students studying Edexcel, AQA, OCR, CAIE, and other recognised curricula through one to one online lessons. Our approach is simple, structured, and designed around each student's individual learning needs.</p>
          </div>
        </div>
      </section>

      {/* ── Why Choose ── */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="section-wrap">
          <div className="text-center mb-12">
            <span className="section-tag">Why SkillBridge</span>
            <h2 className="section-heading">Why Choose SkillBridge Tutors?</h2>
            <p className="section-sub">We understand that every student learns differently. Some need extra support with calculus, while others may find mechanics or statistics more challenging. That is why our lessons are always personalised rather than following a fixed teaching pattern.</p>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-center max-w-2xl mx-auto mb-8 leading-relaxed">With SkillBridge Tutors, we provide:</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {WHY_FEATURES.map((f, i) => (
              <div key={i} className="card card-hover p-6 flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-2xl shrink-0">{f.icon}</div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{f.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-center max-w-2xl mx-auto leading-relaxed">Our aim is to help students improve their confidence while achieving better academic results through effective a level maths tuition.</p>
        </div>
      </section>

      {/* ── Personalised Learning ── */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="section-wrap">
          <div className="max-w-3xl mx-auto">
            <span className="section-tag">Tailored Approach</span>
            <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-4">Personalised Learning That Works</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">As your maths a level tutor online, we begin by understanding your current level, strengths, weak areas, and examination board. We then create a learning plan that focuses on the topics where you need the most support.</p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">Our lessons help students:</p>
            <ul className="grid sm:grid-cols-2 gap-3 mb-6">
              {PERSONALISED_ITEMS.map((p, i) => <CheckItem key={i}>{p}</CheckItem>)}
            </ul>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">This personalised approach makes our a level maths tuition both practical and effective.</p>
          </div>
        </div>
      </section>

      {/* ── Syllabus ── */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="section-wrap">
          <div className="text-center mb-12">
            <span className="section-tag">Full Syllabus</span>
            <h2 className="section-heading">Complete Coverage of the A-Level Maths Syllabus</h2>
            <p className="section-sub">We cover every major area of the syllabus.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6 border-t-4 border-blue-600">
              <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-4">Pure Mathematics</h3>
              <div className="flex flex-wrap gap-2">
                {PURE_MATHS.map((t, i) => <TopicPill key={i} color="blue">{t}</TopicPill>)}
              </div>
            </div>
            <div className="card p-6 border-t-4 border-purple-600">
              <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-4">Statistics</h3>
              <div className="flex flex-wrap gap-2">
                {STATISTICS.map((t, i) => <TopicPill key={i} color="purple">{t}</TopicPill>)}
              </div>
            </div>
            <div className="card p-6 border-t-4 border-green-600">
              <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-4">Mechanics</h3>
              <div className="flex flex-wrap gap-2">
                {MECHANICS.map((t, i) => <TopicPill key={i} color="green">{t}</TopicPill>)}
              </div>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-center mt-10 max-w-2xl mx-auto leading-relaxed">As an experienced a level maths tutor online, we explain each topic clearly before moving on to more challenging examination questions.</p>
        </div>
      </section>

      {/* ── Interactive + Exam Prep ── */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="section-wrap">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <span className="section-tag">Live Online Lessons</span>
              <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-4">Interactive Online Learning</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">Online tutoring should be engaging and easy to follow. Our virtual classroom allows students to ask questions, solve problems together, and receive instant explanations whenever needed. As a dedicated maths a level tutor online, we use interactive teaching methods such as:</p>
              <ul className="space-y-3 mb-6">
                {INTERACTIVE.map((b, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-white text-xs font-bold">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Our students also receive continued academic support between lessons whenever they need additional guidance.</p>
            </div>
            <div>
              <span className="section-tag">Exam Ready</span>
              <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-4">Focused Exam Preparation</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">Success in A-Level Maths depends on more than understanding formulas. Students also need strong exam techniques, time management skills, and confidence when solving unfamiliar questions.</p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">Our a level maths tuition includes:</p>
              <ol className="space-y-3 mb-4">
                {EXAM_ITEMS.map((e, i) => (
                  <li key={i} className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3 border border-slate-100 dark:border-slate-700">
                    <span className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-700 dark:text-purple-300 font-bold text-sm shrink-0">{i + 1}</span>
                    <span className="text-slate-700 dark:text-slate-200 font-medium">{e}</span>
                  </li>
                ))}
              </ol>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">These methods help students approach their exams with greater confidence and preparation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="section-wrap">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <img src="/Images/NewHeaderImage.jpg" alt="A Level maths support online" className="rounded-2xl shadow-xl w-full object-cover" />
            </div>
            <div>
              <span className="section-tag">Online Advantages</span>
              <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-4">Benefits of Choosing an A Level Maths Tutor Online</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">Many students learn better when lessons move at their own pace. Working with an a level maths tutor online allows students to study comfortably from home while receiving individual attention.</p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">Some of the advantages include:</p>
              <ul className="grid gap-3 mb-4">
                {BENEFITS.map((b, i) => <CheckItem key={i}>{b}</CheckItem>)}
              </ul>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Our focus is always on helping students make steady progress without unnecessary pressure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA: Ongoing Support + Learn With Us ── */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-purple-700">
        <div className="section-wrap text-center text-white">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Ongoing Support Throughout the Academic Year</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">Learning continues beyond weekly lessons. At SkillBridge Tutors, we support students with regular assignments, structured revision plans, and continuous progress monitoring. As your trusted maths a level tutor online, we work closely with students to set achievable goals and build lasting confidence. Our structured a level maths tuition ensures that every learner stays on track throughout the academic year.</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Learn With SkillBridge Tutors</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">At SkillBridge Tutors, we believe every student deserves personalised guidance and quality teaching. Whether you are aiming for higher grades, preparing for university admission, or simply looking to improve your understanding of Maths, we are here to help. If you are searching for a reliable maths a level tutor online, our experienced tutors provide personalised support, expert guidance, and structured a level maths tuition that helps students achieve their academic goals with confidence.</p>
          <button onClick={() => { window.location.href = '/#assessmentForm' }} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">Book Free Trial Session</button>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="section-wrap">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="section-tag">FAQs</span>
              <h2 className="section-heading">Frequently Asked Questions</h2>
            </div>
            <FAQAccordion
              faqs={[
                {
                  q: "How Can an Online Maths A-Level Tutor Help Students Improve Their Understanding?",
                  a: "As a maths a level tutor online, we explain difficult concepts step by step, identify learning gaps, provide personalised guidance, and help students gain confidence through regular practice."
                },
                {
                  q: "What Can Students Expect From A-Level Maths Tuition Online?",
                  a: "Our a level maths tuition includes one to one lessons, customised study plans, interactive teaching, homework support, regular assessments, and continuous feedback."
                },
                {
                  q: "How Does Online A-Level Maths Tutoring Support Exam Preparation?",
                  a: "We prepare students with past paper practice, mock examinations, revision plans, exam strategies, and detailed feedback to improve overall performance."
                },
                {
                  q: "Can Online A-Level Maths Tuition Help Students With Difficult Topics?",
                  a: "Yes. Our a level maths tuition breaks complex topics into manageable sections, making them easier to understand through guided explanations and additional practice."
                },
                {
                  q: "When Should a Student Consider Getting an A-Level Maths Tutor Online?",
                  a: "Students should consider working with an a level maths tutor online if they are struggling with specific topics, preparing for exams, aiming for higher grades, or looking for personalised academic support."
                },
                {
                  q: "How Can Students Get the Most Out of Online A-Level Maths Tutoring?",
                  a: "Students benefit the most by attending lessons regularly, completing assignments, asking questions, revising consistently, and practising past papers alongside our a level maths tuition program."
                }
              ]}
            />
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </main>
    </>
  )
}