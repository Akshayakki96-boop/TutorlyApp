import { useEffect } from 'react'
import Footer from '../components/Footer'
import Chatbot from '../components/Chatbot'
import FAQAccordion from '../components/FAQAccordion'
import SchemaMarkup from '../components/SchemaMarkup'

const MATHS_TUTOR_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Online Mathematics Tutors',
  serviceType: 'Private Maths Tutor and Online Maths Tutoring',
  description: 'Expert online mathematics tutors providing personalised maths tuition, flexible scheduling, targeted revision and support for school and exam success.',
  provider: {
    '@type': 'Organization',
    name: 'SkillBridge Tutors',
    url: 'https://skillbridgetutors.com/'
  },
  areaServed: 'United Kingdom',
  audience: {
    '@type': 'EducationalAudience',
    audienceType: 'Primary, secondary and GCSE mathematics learners'
  },
  url: 'https://skillbridgetutors.com/maths-tutor',
  keywords: ['online mathematics tutors', 'maths tuition online', 'private maths tutor', 'online maths tutoring']
}

const WHY_FEATURES = [
  { icon: '🎯', title: 'One-to-one live lessons',        desc: 'Full individual attention in every session.' },
  { icon: '👨‍🏫', title: 'Experienced & vetted tutors',   desc: 'Carefully selected and curriculum-matched.' },
  { icon: '📅', title: 'Flexible scheduling',            desc: 'Book lessons that fit your family routine.' },
  { icon: '📈', title: 'Regular progress tracking',      desc: 'Monitor improvement every step of the way.' },
  { icon: '📋', title: 'Personalised lesson plans',      desc: 'Lessons built around individual goals.' },
  { icon: '📚', title: 'Homework & exam support',        desc: 'Coursework, tests and revision all covered.' },
]

const LEVELS = [
  'Primary Mathematics', 'Secondary Mathematics', 'GCSE Maths',
  'IGCSE Maths', 'A Level Maths', 'Further Maths', 'Exam revision and practice papers',
]

const FLEX_BENEFITS = [
  'Easy online scheduling',
  'Interactive virtual classrooms',
  'Digital whiteboards',
  'Instant feedback',
  'Recorded learning strategies',
  'Consistent weekly sessions',
]

const EXAM_STEPS = [
  'Time management',
  'Exam strategies',
  'Common mistake correction',
  'Past paper practice',
  'Revision techniques',
]

function CheckItem({ children }) {
  return (
    <li className="flex items-start gap-3 bg-white dark:bg-slate-800 rounded-xl px-4 py-3 shadow-sm border border-slate-100 dark:border-slate-700">
      <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-white text-xs font-bold">✓</span>
      <span className="text-slate-700 dark:text-slate-200 font-medium text-sm">{children}</span>
    </li>
  )
}

export default function MathsTutor() {
  useEffect(() => {
    document.title = 'Online Mathematics Tutors | Maths Tutoring & Private Tuition'
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta) }
    meta.setAttribute('content', 'Find expert Online Mathematics Tutors for personalised Online Maths Tutoring, Maths Tuition, and support from a dedicated Private Maths Tutor for exam success.')
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel', 'canonical'); document.head.appendChild(canonical) }
    canonical.setAttribute('href', 'https://skillbridgetutors.com/maths-tutor')
    return () => { const c = document.querySelector('link[rel="canonical"]'); if (c) c.remove() }
  }, [])

  return (
    <>
      <SchemaMarkup data={MATHS_TUTOR_SCHEMA} />
      <main className="min-h-screen bg-white dark:bg-slate-950">

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-purple-700 pt-28 pb-20">
        <div className="section-wrap">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-sm font-semibold text-white/90 mb-6 border border-white/20">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Private Maths Tuition
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                Private Maths Tutor for Personalised Online Learning
              </h1>
              <p className="text-white/80 leading-relaxed text-lg mb-8">
                Every child learns maths in a different way. Some students need extra practice, while others need someone to explain difficult topics with patience.
              </p>
              <button onClick={() => { window.location.href = '/#assessmentForm' }} className="btn-primary text-base py-3.5 px-8">Book Free Trial</button>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-2xl" />
              <img src="/Images/Bannertutor.jpg" alt="Private maths tutor helping student online" className="relative rounded-2xl shadow-2xl w-full object-cover aspect-video" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="section-wrap">
          <div className="max-w-3xl mx-auto">
            <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-base mb-4">Every child learns maths in a different way. Some students need extra practice, while others need someone to explain difficult topics with patience. At SkillBridge Tutors, I make learning simple, structured, and enjoyable through personalized lessons designed around every student's pace and goals. Whether your child needs regular support or exam preparation, I can connect you with experienced online mathematics tutors who focus on building confidence as well as academic success. My approach to online maths tutoring is flexible, interactive, and centred on real progress. With one-to-one lessons, students receive the attention they need to understand concepts instead of simply memorising formulas. I also provide maths tuition online that fits around busy school and family schedules.</p>
          </div>
        </div>
      </section>

      {/* ── Why Choose ── */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="section-wrap">
          <div className="text-center mb-12">
            <span className="section-tag">Why SkillBridge</span>
            <h2 className="section-heading">Why Choose SkillBridge Tutors?</h2>
            <p className="section-sub">At SkillBridge Tutors, I believe every student deserves individual attention. That's why every private maths tutor works closely with students to understand their strengths, identify learning gaps, and create a study plan that delivers measurable improvement.</p>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-center max-w-2xl mx-auto mb-8 leading-relaxed">When you learn with my online mathematics tutors, you benefit from:</p>
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
          <p className="text-slate-600 dark:text-slate-300 text-center max-w-2xl mx-auto leading-relaxed">My online maths tutoring sessions are designed to keep students engaged while making difficult topics easier to understand.</p>
        </div>
      </section>

      {/* ── Personalised Learning ── */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="section-wrap">
          <div className="max-w-3xl mx-auto">
            <span className="section-tag">Tailored Approach</span>
            <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-4">Personalised Learning That Fits Every Student</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">No two learners are the same. Some students need help with algebra, while others struggle with geometry, statistics, or problem solving. My private maths tutor creates lessons that focus on exactly what each learner needs.</p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">With maths tuition online, students can:</p>
            <ul className="grid sm:grid-cols-2 gap-3 mb-6">
              <CheckItem>Improve classroom understanding</CheckItem>
              <CheckItem>Strengthen weak topics</CheckItem>
              <CheckItem>Build confidence before exams</CheckItem>
              <CheckItem>Learn effective problem-solving methods</CheckItem>
              <CheckItem>Develop independent learning habits</CheckItem>
            </ul>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Because lessons are personalised, students often gain confidence much faster than they do in large classroom settings.</p>
          </div>
        </div>
      </section>

      {/* ── Levels Covered ── */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="section-wrap">
          <div className="text-center mb-10">
            <span className="section-tag">All Levels</span>
            <h2 className="section-heading">Expert Online Mathematics Tutors for Every Level</h2>
            <p className="section-sub">My team of online mathematics tutors supports students across different age groups and academic levels. Whether your child is in primary school or preparing for advanced examinations, I provide guidance that matches the curriculum.</p>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-center max-w-2xl mx-auto mb-6 leading-relaxed">My tutors support students with:</p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {LEVELS.map((l, i) => (
              <span key={i} className="px-5 py-2.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold text-sm border border-blue-100 dark:border-blue-800">{l}</span>
            ))}
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-center max-w-2xl mx-auto leading-relaxed">Every online maths tutoring lesson focuses on concept clarity before moving on to practice and revision.</p>
        </div>
      </section>

      {/* ── Flexible Tuition ── */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="section-wrap">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="section-tag">Online Convenience</span>
              <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-4">Flexible Maths Tuition Online That Works Around You</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">Learning should fit into your family's routine. My maths tuition online allows students to study from home without travelling to coaching centres.</p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">The benefits include:</p>
              <ul className="space-y-3 mb-6">
                {FLEX_BENEFITS.map((b, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0 text-white text-xs font-bold">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">With online mathematics tutors, students can continue learning from anywhere while maintaining regular progress.</p>
            </div>
            <div>
              <img src="/Images/Carousel3.png" alt="Online maths tuition from home" className="rounded-2xl shadow-xl w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Confidence + Exam Prep ── */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="section-wrap">
          <div className="grid lg:grid-cols-2 gap-14">
            <div>
              <span className="section-tag">Confidence Building</span>
              <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-4">Building Confidence Through Online Maths Tutoring</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">Success in maths comes from understanding concepts rather than memorising answers. My online maths tutoring focuses on explaining each topic step by step until students feel comfortable solving problems independently.</p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">A dedicated private maths tutor encourages students to ask questions freely without feeling rushed or judged. This supportive environment often helps students become more confident in school as well.</p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Through regular assessments, my online mathematics tutors monitor improvement and adjust lessons whenever necessary.</p>
            </div>
            <div>
              <span className="section-tag">Exam Ready</span>
              <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-4">Exam Preparation with Structured Support</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">Preparing for important exams requires more than completing worksheets. My maths tuition online includes structured revision plans, topic-wise practice, mock exams, and detailed feedback.</p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">During online maths tutoring, students learn:</p>
              <ol className="space-y-3 mb-4">
                {EXAM_STEPS.map((e, i) => (
                  <li key={i} className="flex items-center gap-4 bg-white dark:bg-slate-800 rounded-xl px-4 py-3 border border-slate-100 dark:border-slate-700">
                    <span className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-700 dark:text-purple-300 font-bold text-sm shrink-0">{i + 1}</span>
                    <span className="text-slate-700 dark:text-slate-200 font-medium">{e}</span>
                  </li>
                ))}
              </ol>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">This organised approach helps students enter exams with greater confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-purple-700">
        <div className="section-wrap text-center text-white">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">A Learning Experience That Grows with Your Child</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-4 text-lg leading-relaxed">At SkillBridge Tutors, I focus on long-term improvement rather than short-term results. My online mathematics tutors encourage logical thinking, problem-solving skills, and independent learning that continue beyond the classroom.</p>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">Whether your child needs weekly lessons or intensive exam preparation, my private maths tutor provides personalised guidance every step of the way. With flexible maths tuition online and engaging online maths tutoring, students receive the support they need to achieve their academic goals while enjoying the learning process.</p>
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
                  q: "What Does a Private Maths Tutor Teach and How Can They Support Students?",
                  a: "A private maths tutor teaches topics based on the student's curriculum, explains difficult concepts, provides personalised practice, helps with homework, and prepares students for tests and examinations while building confidence."
                },
                {
                  q: "Why Choose Online Mathematics Tutors for One-to-One Learning?",
                  a: "Online mathematics tutors provide individual attention, flexible scheduling, customised lesson plans, and regular feedback. Students receive lessons tailored to their learning style, making progress faster than in many traditional classroom settings."
                },
                {
                  q: "How Can Online Maths Tutoring Make Learning Maths Easier?",
                  a: "Online maths tutoring allows students to learn at their own pace, ask unlimited questions, receive immediate explanations, and practise concepts through interactive lessons from the comfort of home."
                },
                {
                  q: "What Age Groups Can Benefit From Maths Tuition Online?",
                  a: "Maths tuition online is suitable for primary school students, secondary students, GCSE and IGCSE learners, A Level students, and anyone looking to strengthen their mathematical understanding."
                },
                {
                  q: "Can Online Maths Tutoring Help Students Prepare for Important Exams?",
                  a: "Yes. Online maths tutoring includes structured revision, past paper practice, exam strategies, regular assessments, and personalised guidance to help students perform confidently in important examinations."
                },
                {
                  q: "How Do I Find the Best Maths Tutor for My Child's Learning Needs?",
                  a: "Look for experienced tutors who offer personalised lesson plans, one-to-one teaching, flexible scheduling, progress tracking, and a teaching style that matches your child's learning needs. SkillBridge Tutors provides experienced tutors who focus on both academic improvement and student confidence."
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