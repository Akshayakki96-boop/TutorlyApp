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
      "Boost your child's confidence with expert maths tuition from the UK's trusted online tuition platform. Personalised lessons, experienced tutors, and proven results."
    )
  }, [])

  return (
    <>
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
