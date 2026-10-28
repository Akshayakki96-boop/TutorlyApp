import { useEffect } from 'react'
import { setPageMeta } from '../lib/metaTagManager'
import SchemaMarkup from '../components/SchemaMarkup'

const CONTACT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact SkillBridge Tutors',
  url: 'https://skillbridgetutors.com/contact',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    telephone: '+44-123-456-7890',
    email: 'support@skillbridgetutors.com',
    availableLanguage: ['en-GB']
  }
}

const contactMethods = [
  {
    icon: '📍',
    title: 'Address',
    description: 'Visit us in person',
    value: '76 Carlen Drive, Osmaston, Derby, DE24 8XY, United Kingdom',
    type: 'address'
  },
  {
    icon: '💬',
    title: 'WhatsApp',
    description: 'Chat with us on WhatsApp',
    value: '+44 7451 295266',
    type: 'whatsapp'
  },
  {
    icon: '📧',
    title: 'Email',
    description: 'Send us a detailed message',
    value: 'info@skillbridgetutors.com',
    type: 'email'
  },
  {
    icon: '📱',
    title: 'Phone',
    description: 'Call us during business hours',
    value: '+44 7451 295266',
    type: 'phone'
  }
]

export default function ContactUs() {
  useEffect(() => {
    setPageMeta({
      title: 'Contact Us | SkillBridge Tutors',
      description: 'Get in touch with SkillBridge Tutors. We\'re here to answer your questions about our online maths tutoring services.',
      canonicalUrl: 'https://skillbridgetutors.com/contact'
    })
  }, [])

  return (
    <>
      <SchemaMarkup data={CONTACT_SCHEMA} />
      <main className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-slate-900 to-slate-800 text-white py-20">
          <div className="section-wrap">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-heading text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                Get In Touch
              </h1>
              <p className="text-xl text-slate-200">
                Have questions? We're here to help. Reach out to our team anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="section-wrap py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactMethods.map((method, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{method.icon}</div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                  {method.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  {method.description}
                </p>
                <p className="font-semibold text-blue-600 dark:text-blue-400 text-sm break-all">
                  {method.value}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Information */}
          <div className="max-w-3xl mx-auto">
            {/* Info */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-8">
                Why Contact Us?
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <span className="text-2xl">🤔</span> Questions About Services?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Unsure which tutoring option is right for you? Our team can guide you through our services and find the perfect fit.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <span className="text-2xl">💡</span> Special Requests?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Need something specific? We offer customised tutoring packages tailored to your exact requirements.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <span className="text-2xl">🎓</span> Student Support
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Already a student? We're here to support you and ensure your tutoring experience is excellent.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <span className="text-2xl">👨‍🏫</span> Tutor Opportunities
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Interested in joining our team? We're always looking for passionate educators to join SkillBridge Tutors.
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                    Response Time
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    We typically respond to all enquiries within 24 business hours. For urgent matters, please call us directly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Office Hours */}
        <div className="bg-white dark:bg-slate-900 py-16 border-t border-slate-200 dark:border-slate-800">
          <div className="section-wrap">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                Office Hours
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                    Weekdays
                  </h3>
                  <div className="space-y-2 text-slate-600 dark:text-slate-400">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                    Weekends
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Saturday - Sunday: 9:00 AM - 2:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="section-wrap py-20">
          <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Find Us on the Map
          </h2>
          <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2395.4831234567!2d-1.4751234!3d52.9123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879e1234567890ab%3A0x1234567890abcdef!2s76%20Carlen%20Drive%2C%20Osmaston%2C%20Derby%20DE24%208XY!5e0!3m2!1sen!2suk!4v1234567890123"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SkillBridge Tutors Location - Derby"
            />
          </div>
        </div>

        {/* Ready to Get Started CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
          <div className="section-wrap text-center">
            <h2 className="font-heading text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
              Book a free trial session with one of our expert tutors today and see the difference personalised learning can make.
            </p>
            <button
              onClick={() => window.open('https://wa.me/447451295266?text=Hi%20SkillBridge%20Tutors%2C%20I%27d%20like%20to%20book%20a%20free%20trial%20session.', '_blank', 'noopener,noreferrer')}
              className="inline-block bg-white text-blue-600 font-bold text-lg py-4 px-12 rounded-full shadow-xl hover:shadow-2xl hover:bg-slate-50 transition-all duration-200 hover:scale-105"
            >
              📚 Book Your First Session on WhatsApp
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
