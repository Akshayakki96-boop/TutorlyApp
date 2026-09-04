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
import LeadPopup    from '../components/LeadPopup'
import SchemaMarkup from '../components/SchemaMarkup'

const HOME_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'SkillBridge Tutors',
  url: 'https://skillbridgetutors.com/',
  description: 'Online maths tuition for Year 1 to GCSE, with personalised support, exam preparation, flexible scheduling and affordable lessons from £8 per hour.',
  areaServed: ['United Kingdom', 'England', 'Scotland', 'Wales', 'Northern Ireland'],
  knowsAbout: ['Maths Tutoring', 'GCSE Maths', 'Online Learning', 'Exam Preparation', 'Personalised Learning'],
  sameAs: ['https://skillbridgetutors.com/']
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
