import { useEffect } from 'react'
import Footer from '../components/Footer'
import Chatbot from '../components/Chatbot'
import FAQAccordion from '../components/FAQAccordion'

const COURSE_TOPICS = [
  {
    title: 'Number Skills',
    desc: 'We help students understand fractions, decimals, percentages, ratios, and standard form. These topics are essential for success across the GCSE syllabus.',
  },
  {
    title: 'Algebra',
    desc: 'From simple equations to quadratic expressions, our GCSE maths tutor online lessons explain each concept step by step using clear examples and regular practice.',
  },
  {
    title: 'Geometry and Measures',
    desc: 'Students improve their understanding of shapes, angles, circles, area, volume, transformations, and trigonometry through guided learning with an online GCSE maths tutor.',
  },
  {
    title: 'Statistics and Probability',
    desc: 'We teach students how to interpret graphs, calculate averages, understand probability, and solve data-based questions with confidence.',
  },
]

const EXAM_ITEMS = [
  'Timed practice papers',
  'Topic-based revision',
  'Error analysis',
  'Exam technique guidance',
  'Confidence-building exercises',
]

const TEACHING_ITEMS = [
  'Individual learning plans',
  'Regular progress reviews',
  'Homework support',
  'Topic revision',
  'Exam preparation',
  'Confidence building',
  'Flexible scheduling',
]

function CheckItem({ children }) {
  return (
    <li className="flex items-start gap-3 bg-white dark:bg-slate-800 rounded-xl px-4 py-3 shadow-sm border border-slate-100 dark:border-slate-700">
      <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-white text-xs font-bold">✓</span>
      <span className="text-slate-700 dark:text-slate-200 font-medium text-sm">{children}</span>
    </li>
  )
}

export default function GCSEMathsTutor() {
  useEffect(() => {
    document.title = 'GCSE Maths Course Online, Online GCSE Maths Tutor, Tuition & Learning'
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta) }
    meta.setAttribute('content', 'Join a GCSE Maths Course Online with GCSE Maths Online Learning, expert GCSE Online Maths Tutor support and personalised GCSE Maths Tuition to boost confidence.')
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel', 'canonical'); document.head.appendChild(canonical) }
    canonical.setAttribute('href', 'https://skillbridgetutors.com/gcse-maths-tutor')
    return () => { const c = document.querySelector('link[rel="canonical"]'); if (c) c.remove() }
  }, [])

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-purple-700 pt-28 pb-20">
        <div className="section-wrap">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-sm font-semibold text-white/90 mb-6 border border-white/20">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                GCSE Maths Tuition
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                GCSE Maths Course Online with Personal Support That Fits Every Student
              </h1>
              <p className="text-white/80 leading-relaxed text-lg mb-8">
                Choosing the right GCSE maths course online can make a real difference to a student's progress. At Skill Bridge Tutors, we believe every learner deserves clear explanations, regular practice, and personal guidance.
              </p>
              <button onClick={() => { window.location.href = '/#assessmentForm' }} className="btn-primary text-base py-3.5 px-8">Book Free Trial</button>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-2xl" />
              <img src="/Images/NewHeaderImage.jpg" alt="GCSE maths online tutoring" className="relative rounded-2xl shadow-2xl w-full object-cover aspect-video" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="section-wrap">
          <div className="max-w-3xl mx-auto">
            <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-base mb-4">Choosing the right GCSE maths course online can make a real difference to a student's progress. At Skill Bridge Tutors, we believe every learner deserves clear explanations, regular practice, and personal guidance. Our experienced teachers provide structured lessons that match the GCSE syllabus while helping students build confidence one step at a time. Whether a student needs help with the basics or wants to aim for the highest grades, our GCSE maths tutor online service is designed to meet individual learning needs.</p>
            <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-base mb-4">Our approach focuses on understanding how each student learns. Instead of following the same method for everyone, we create lessons that match their pace and goals. Through GCSE maths online learning, students receive support from experienced teachers who explain topics in a simple and practical way. Every GCSE maths course online includes regular feedback, homework guidance, and exam-focused preparation.</p>
          </div>
        </div>
      </section>

      {/* ── Why Students Learn With Us ── */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="section-wrap">
          <div className="text-center mb-10">
            <span className="section-tag">Why SkillBridge</span>
            <h2 className="section-heading">Why Students Learn with Us</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">We know that every learner faces different challenges. Some struggle with algebra, while others need help with geometry or exam techniques. Our GCSE maths tuition is personalised so that each lesson focuses on the areas where improvement is needed most.</p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">When you work with a GCSE online maths tutor, you receive one-to-one attention without classroom distractions. This allows students to ask questions freely and learn at a comfortable pace. Our maths tutor GCSE online sessions are flexible, making it easier for families to arrange lessons around school and other commitments.</p>
          </div>
        </div>
      </section>

      {/* ── Structured Course ── */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="section-wrap">
          <div className="text-center mb-12">
            <span className="section-tag">Curriculum</span>
            <h2 className="section-heading">A Structured GCSE Maths Course</h2>
            <p className="section-sub">Our GCSE maths course online follows the current GCSE curriculum and prepares students for both Foundation and Higher Tier examinations. Lessons are planned carefully so students develop strong mathematical understanding before moving to more advanced topics.</p>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-center max-w-2xl mx-auto mb-8 leading-relaxed">Throughout our GCSE maths online learning, students cover:</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {COURSE_TOPICS.map((t, i) => (
              <div key={i} className="card p-6 border-l-4 border-blue-600">
                <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-2">{t.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Personalised + Home ── */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="section-wrap">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <span className="section-tag">One-to-One</span>
              <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-4">Personalised One-to-One Learning</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">Every student learns differently. That is why our GCSE maths tuition focuses on individual strengths and weaknesses rather than following a fixed classroom pace.</p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">Working with a GCSE online maths tutor allows students to receive immediate feedback whenever they make mistakes. Instead of waiting until the next lesson, they understand where they went wrong and how to improve straight away.</p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Our maths tutor GCSE online sessions also encourage students to ask questions without feeling embarrassed. This creates a relaxed learning environment where confidence grows naturally.</p>
            </div>
            <div>
              <span className="section-tag">Study from Home</span>
              <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-4">Learning from Home</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">One of the biggest advantages of GCSE maths online learning is convenience. Students can attend lessons from home while still receiving high-quality teaching.</p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">Our GCSE maths course online uses interactive resources, digital whiteboards, worked examples, and practice questions to make learning engaging. Students save travel time and can focus more on revision and homework.</p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Parents also appreciate the flexibility of scheduling lessons that fit around school, sports, and family commitments. An online GCSE maths tutor makes quality education accessible regardless of location.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Exam Prep ── */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="section-wrap">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <img src="/Images/Bannertutor.jpg" alt="GCSE exam preparation online" className="rounded-2xl shadow-xl w-full object-cover" />
            </div>
            <div>
              <span className="section-tag">Exam Ready</span>
              <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-4">Exam Preparation That Builds Confidence</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">Success in GCSE Maths requires more than understanding formulas. Students also need effective exam strategies.</p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">Our GCSE maths tutor online sessions include:</p>
              <ul className="grid gap-3 mb-4">
                {EXAM_ITEMS.map((e, i) => <CheckItem key={i}>{e}</CheckItem>)}
              </ul>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">This balanced approach helps students become familiar with the style of GCSE questions while improving accuracy and time management. During GCSE maths tuition, tutors regularly assess progress and adjust lesson plans whenever necessary. Students continue improving because teaching is based on their current performance rather than assumptions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Support + Why Families ── */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="section-wrap">
          <div className="grid lg:grid-cols-2 gap-14">
            <div>
              <span className="section-tag">All Abilities</span>
              <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-4">Support for Every Ability Level</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">Whether a student is working towards passing GCSE Maths or aiming for top grades, our GCSE maths online learning programme provides suitable support.</p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">A GCSE online maths tutor can simplify difficult concepts for students who need additional help, while also challenging higher-achieving learners with advanced problem-solving questions.</p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Our maths tutor GCSE online lessons encourage steady improvement without unnecessary pressure. Students learn at a pace that suits them while building long-term understanding.</p>
            </div>
            <div>
              <span className="section-tag">Trusted by Families</span>
              <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-4">Why Families Choose Skill Bridge Tutors</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">Families choose us because we combine structured teaching with personal attention. Every GCSE maths course online is designed around the student's learning needs rather than following a generic lesson plan.</p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">Our tutors explain mathematical ideas using simple language, provide regular practice, and monitor progress throughout the learning journey. Every GCSE maths tutor online lesson is focused, interactive, and designed to help students achieve measurable improvement.</p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Parents receive updates on progress, helping them stay informed about their child's development throughout the programme.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA / Teaching Approach ── */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-purple-700">
        <div className="section-wrap">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="text-white">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Our Teaching Approach</h2>
              <p className="text-white/80 leading-relaxed mb-4">Our teaching philosophy is simple. Students understand maths best when concepts are explained clearly and reinforced through regular practice.</p>
              <p className="text-white/80 leading-relaxed mb-4">Every GCSE maths tuition programme includes:</p>
              <p className="text-white/80 leading-relaxed mb-4">With guidance from an online GCSE maths tutor, students gradually become independent learners who approach mathematics with greater confidence.</p>
              <p className="text-white/80 leading-relaxed mb-4">Choosing a GCSE maths course online with Skill Bridge Tutors means choosing personalised teaching, flexible learning, and continuous academic support. Our experienced teachers are committed to helping students strengthen mathematical understanding through structured GCSE maths online learning and expert guidance. Whether you need a GCSE online maths tutor, an experienced maths tutor GCSE online, or reliable GCSE maths tuition, we are here to support every step of the GCSE journey with practical lessons that deliver lasting results.</p>
              <button onClick={() => { window.location.href = '/#assessmentForm' }} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">Book Free Trial Session</button>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-3">
                {TEACHING_ITEMS.map((t, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
                    <span className="text-green-300 font-bold text-sm">✓</span>
                    <span className="text-white text-sm font-medium">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
                  q: "What Is an Online GCSE Maths Tutor and How Can They Help Students?",
                  a: "An online GCSE maths tutor provides one-to-one lessons over the internet, helping students understand difficult topics, improve problem-solving skills, and prepare effectively for GCSE examinations."
                },
                {
                  q: "How Does GCSE Maths Tuition Online Help Students Prepare for GCSE Exams?",
                  a: "Our GCSE maths tuition focuses on syllabus coverage, regular revision, practice papers, exam strategies, and personalised support so students are fully prepared for their GCSE exams."
                },
                {
                  q: "What Topics Are Covered in GCSE Maths Online Learning?",
                  a: "Our GCSE maths online learning covers number, algebra, geometry, measures, probability, statistics, graphs, equations, trigonometry, and exam preparation for both Foundation and Higher Tier GCSE Maths."
                },
                {
                  q: "Is an Online GCSE Maths Tutor Suitable for Students of All Ability Levels?",
                  a: "Yes. A GCSE online maths tutor works with students of all abilities, providing lessons that match their current level while helping them achieve their academic goals."
                },
                {
                  q: "How Can GCSE Maths Tutoring Online Improve a Student's Confidence and Results?",
                  a: "Regular sessions with a maths tutor GCSE online improve understanding, reduce anxiety, strengthen exam techniques, and help students become more confident when solving mathematical problems."
                },
                {
                  q: "What Should Parents Look for When Choosing a GCSE Maths Tutor Online?",
                  a: "Parents should look for an experienced GCSE maths tutor online who offers personalised lesson plans, regular progress updates, flexible scheduling, curriculum knowledge, and a teaching style that matches the student's learning needs."
                }
              ]}
            />
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </main>
  )
}