import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setPageMeta } from '../lib/metaTagManager'
import SchemaMarkup from '../components/SchemaMarkup'

const SERVICES_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://skillbridgetutors.com/'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Services',
      item: 'https://skillbridgetutors.com/services'
    }
  ]
}

const services = [
  {
    id: 1,
    title: 'One-to-One Tutoring',
    description: 'Personalised learning sessions tailored to each student\'s pace and learning style. Our tutors focus on individual gaps and build confidence through targeted support.',
    features: ['Flexible scheduling', 'Personalised approach', 'Progress tracking', 'Exam preparation'],
    icon: '👨‍🎓'
  },
  {
    id: 2,
    title: 'Small Group Sessions',
    description: 'Learn alongside peers in small, manageable groups. Collaboration and peer learning enhance understanding while maintaining individual attention.',
    features: ['Group dynamics', 'Cost-effective', 'Social learning', 'Competitive motivation'],
    icon: '👥'
  },
  {
    id: 3,
    title: 'GCSE Exam Preparation',
    description: 'Comprehensive preparation for GCSE Maths exams. We cover all topics, practice past papers, and develop exam techniques for maximum performance.',
    features: ['Full syllabus coverage', 'Past paper practice', 'Mock exams', 'Exam technique training'],
    icon: '📚'
  },
  {
    id: 4,
    title: 'A Level Maths Tuition',
    description: 'Advanced mathematics support for A Level students. From Pure Mathematics to Statistics and Mechanics, we provide structured guidance for exam success.',
    features: ['Topic specialisation', 'Problem-solving skills', 'University preparation', 'Flexible modules'],
    icon: '🔬'
  },
  {
    id: 5,
    title: 'Primary Maths Tuition',
    description: 'Foundation building for primary students. We make maths fun and engaging while developing core numeracy and problem-solving skills.',
    features: ['Age-appropriate content', 'Fun and engaging', 'Building confidence', 'Strong foundations'],
    icon: '🎯'
  },
  {
    id: 6,
    title: 'Online Maths Courses',
    description: 'Structured, self-paced online courses covering various maths topics. Access lessons anytime, anywhere with recorded content and practice questions.',
    features: ['Self-paced learning', 'Flexible access', 'Progress tracking', 'Lifetime access'],
    icon: '💻'
  }
]

export default function Services() {
  useEffect(() => {
    setPageMeta({
      title: 'Our Services | SkillBridge Tutors',
      description: 'Discover our comprehensive range of online maths tutoring services including one-to-one sessions, group tutoring, GCSE and A Level preparation, and online courses.',
      canonicalUrl: 'https://skillbridgetutors.com/services'
    })
  }, [])

  return (
    <>
      <SchemaMarkup data={SERVICES_SCHEMA} />
      <main className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-slate-900 to-slate-800 text-white py-20">
          <div className="section-wrap">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-heading text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                Our Services
              </h1>
              <p className="text-xl text-slate-200">
                Comprehensive online maths tutoring solutions designed to help every student succeed
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="section-wrap py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <div
                key={service.id}
                className="bg-white dark:bg-slate-900 rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 border border-slate-200 dark:border-slate-800"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  {service.description}
                </p>
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="bg-white dark:bg-slate-900 py-20">
          <div className="section-wrap">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                Why Choose Our Services?
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Expert Tutors
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Background-verified, experienced educators with proven track records in delivering results.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Personalised Learning
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Every student gets tailored teaching that matches their pace, style, and learning goals.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                    Proven Results
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Students consistently achieve grade improvements and build lasting confidence in maths.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Flexible & Convenient
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Online sessions that fit your schedule. Learn from anywhere at a time that suits you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
          <div className="section-wrap text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Book a free trial session with one of our expert tutors today and see the difference personalised learning can make.
            </p>
            <Link to="/student/register" className="inline-block bg-white text-blue-700 font-bold text-lg py-4 px-10 rounded-lg shadow-xl hover:shadow-2xl hover:bg-slate-50 transition-all duration-200 no-underline">
              📚 Book Your First Session
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
