import { useEffect } from 'react'
import Hero         from '../components/Hero'
import Intro        from '../components/Intro'
import BoardInfo    from '../components/BoardInfo'
import Services     from '../components/Services'
import Fees         from '../components/Fees'
import Referral     from '../components/Referral'
import BookingTeam  from '../components/BookingTeam'
import About        from '../components/About'
import WhyChooseUs  from '../components/WhyChooseUs'
import Testimonials from '../components/Testimonials'
import FAQ          from '../components/FAQ'
import Contact      from '../components/Contact'
import Footer       from '../components/Footer'
import Chatbot      from '../components/Chatbot'
import LeadPopup         from '../components/LeadPopup'
import SchemaMarkup     from '../components/SchemaMarkup'
import LearningResources from '../components/LearningResources'

const HOME_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://skillbridgetutors.com/#organization',
      name: 'SkillBridge Tutors',
      url: 'https://skillbridgetutors.com/',
      logo: 'https://skillbridgetutors.com/Images/skillbridge_logo_only.png',
      image: 'https://skillbridgetutors.com/Images/NewHeaderImage.jpg',
      email: 'info@skillbridgetutors.com',
      telephone: '+44 7451 295266',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '76 Carlen Drive, Osmaston',
        addressLocality: 'Derby',
        addressRegion: 'Derbyshire',
        postalCode: 'DE24 8XY',
        addressCountry: 'GB'
      }
    },
    {
      '@type': 'WebSite',
      '@id': 'https://skillbridgetutors.com/#website',
      url: 'https://skillbridgetutors.com/',
      name: 'SkillBridge Tutors',
      publisher: {
        '@id': 'https://skillbridgetutors.com/#organization'
      }
    },
    {
      '@type': 'Service',
      '@id': 'https://skillbridgetutors.com/#service',
      name: 'Online Maths Tuition',
      serviceType: 'Online Maths Tutoring',
      provider: {
        '@id': 'https://skillbridgetutors.com/#organization'
      },
      areaServed: {
        '@type': 'Country',
        name: 'United Kingdom'
      },
      url: 'https://skillbridgetutors.com/'
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://skillbridgetutors.com/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How can online maths tuition improve a student\'s confidence?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When a child gets one-to-one attention and works at their own pace, mistakes feel less daunting. Regular praise and steady progress through online maths tuition help students trust their own ability over time.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can online maths tuition support students with difficult maths topics?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Tutors break down tricky topics into smaller, manageable steps, revisiting concepts until the student feels secure before moving on.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does personalised maths tuition help different learning needs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Personalised maths tuition adapts to how each child learns best, whether that means more visual examples, extra practice, or a slower pace through new material.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can online maths tuition help students prepare for school maths exams?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Definitely. Structured revision, past papers and focused practice sessions help students walk into exams feeling prepared rather than anxious.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does online maths tuition develop problem-solving skills?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tutors encourage students to work through problems step by step, building reasoning skills that carry over into other subjects too.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can online maths tuition help students improve their maths grades?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'With consistent sessions, tracked progress and targeted support on weak areas, many students see noticeable grade improvement within a few months.'
          }
        }
      ]
    }
  ]
}

export default function Home() {
  useEffect(() => {
    document.title = "Maths Tuition | UK's Trusted Online Tuition Platform"

    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }

    metaDescription.setAttribute(
      'content',
      "Expert online maths tuition for Year 1 to GCSE with personalised support, affordable lessons from £8 per hour and a free trial class."
    )
  }, [])

  return (
    <>
      <SchemaMarkup data={HOME_SCHEMA} />
      <LeadPopup />
      <main>
        <Hero />
        <Intro />
        <BoardInfo />
        <LearningResources />
        <Services />
        <Fees />
        <Referral />
        <BookingTeam />
        <About />
        <WhyChooseUs />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}
