import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setPageMeta } from '../lib/metaTagManager'
import SchemaMarkup from '../components/SchemaMarkup'

const ABOUT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SkillBridge Tutors',
  url: 'https://skillbridgetutors.com',
  logo: 'https://skillbridgetutors.com/logo.png',
  description: 'Professional online maths tutoring platform connecting students with expert tutors across the UK.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'support@skillbridgetutors.com'
  },
  areaServed: {
    '@type': 'Country',
    name: 'United Kingdom'
  }
}

const values = [
  {
    title: 'Excellence',
    description: 'We maintain the highest standards in tutoring quality, tutor expertise, and student outcomes.'
  },
  {
    title: 'Accessibility',
    description: 'Making quality education affordable and accessible to students across the UK regardless of location.'
  },
  {
    title: 'Personalisation',
    description: 'Every student is unique. We tailor our approach to individual learning styles and goals.'
  },
  {
    title: 'Integrity',
    description: 'Transparent communication, honest feedback, and ethical practices in everything we do.'
  }
]

export default function AboutUs() {
  useEffect(() => {
    setPageMeta({
      title: 'About Us | SkillBridge Tutors',
      description: 'Learn about SkillBridge Tutors - the UK\'s leading online maths tutoring platform dedicated to helping students build confidence and achieve success.',
      canonicalUrl: 'https://skillbridgetutors.com/about'
    })
  }, [])

  return (
    <>
      <SchemaMarkup data={ABOUT_SCHEMA} />
      <main className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-slate-900 to-slate-800 text-white py-20">
          <div className="section-wrap">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-heading text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                About SkillBridge Tutors
              </h1>
              <p className="text-xl text-slate-200">
                Empowering students across the UK with expert online maths tutoring since our founding
              </p>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="section-wrap py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Our Story
              </h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                SkillBridge Tutors was founded with a simple mission: to make quality maths education accessible to every student, regardless of their location or background.
              </p>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                We recognised that traditional classroom settings don't work for everyone. Some students need extra time, others need a different explanation, and many simply need someone who believes in their potential. That's why we built a platform that connects students with expert tutors who genuinely care about their progress.
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                Today, we're proud to serve hundreds of students across the UK, helping them overcome maths anxiety, improve their grades, and discover that maths can actually be enjoyable.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-slate-100 dark:from-blue-900 dark:to-slate-800 rounded-xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-24 h-24 mx-auto text-blue-600 dark:text-blue-400 mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-1.429 5.951 1.429a1 1 0 001.169-1.409l-7-14z" />
                </svg>
                <p className="text-slate-600 dark:text-slate-300 font-semibold">
                  Building Confidence Through Expert Tutoring
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Who Are We Section */}
        <div className="section-wrap py-20">
          <div className="text-center mb-14">
            <span className="section-tag">📝 About Us</span>
            <h2 className="font-heading text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Who Are We
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                  👨‍🎓
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                We are a team of passionate and highly qualified tutors dedicated to providing <span className="font-semibold text-blue-600 dark:text-blue-400">high-quality online tuition</span> in <span className="font-semibold">Maths</span>. Our programs are designed for students from <span className="font-semibold">Year 1 to Year 10</span>, helping them build strong academic foundations and the confidence to succeed. With <span className="font-semibold">over 10 years of teaching experience</span>, our team covers the <span className="font-semibold">full UK curriculum from Year 1 right through to GCSE</span>.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                  📚
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                We specialise in preparing students for the <span className="font-semibold text-blue-600 dark:text-blue-400">GCSE Board</span>, ensuring that every lesson is aligned with the latest curriculum requirements. Whether improving exam techniques, understanding core concepts, or boosting grades, our structured approach makes learning clear, engaging and effective.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                  💚
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                At the heart of our teaching is <span className="font-semibold text-blue-600 dark:text-blue-400">personalised learning</span>. Each student receives individual attention, a tailored study plan, and ongoing feedback to track progress. Our tutors bring both expertise and enthusiasm to every session, making lessons interactive and motivating.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                  🎯
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                With our focus on <span className="font-semibold text-blue-600 dark:text-blue-400">quality, reliability, and results</span>, we have become a trusted choice for families across the UK looking for affordable and effective online tuition.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="section-wrap py-20">
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-4 text-center">
              Our Core Values
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-center">
              These principles guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800">
                <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white dark:bg-slate-900 py-20">
          <div className="section-wrap">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Our Team
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Led by experienced educators and curriculum specialists dedicated to student success
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-slate-50 dark:from-blue-900 dark:to-slate-800 rounded-xl p-12">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl">
                    👨‍🏫
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">Curriculum Experts</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Background-verified tutors with years of teaching experience
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl">
                    📊
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">Data Specialists</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Tracking progress and ensuring continuous improvement
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl">
                    💼
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">Support Team</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Dedicated to ensuring the best experience for every student
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
          <div className="section-wrap text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">Join Hundreds of Successful Students</h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Experience the difference that personalised, expert tutoring can make in your maths journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/student/register" className="inline-block bg-white text-blue-700 font-bold text-lg py-4 px-10 rounded-lg shadow-xl hover:shadow-2xl hover:bg-slate-50 transition-all duration-200 no-underline">
                🚀 Get Started Today
              </Link>
              <Link to="/services" className="inline-block bg-white text-blue-700 font-bold text-lg py-4 px-10 rounded-lg shadow-xl hover:shadow-2xl hover:bg-slate-50 transition-all duration-200 no-underline">
                📚 Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
