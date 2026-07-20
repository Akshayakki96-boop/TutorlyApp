import { useState } from 'react'

const FAQS = [
  {
    q: 'How do I book a free demo class?',
    a: 'You can book a FREE demo class by filling the form on this page, or contact us directly at 📧 info@skillbridgetutors.com or 📞 +44 7451 295266.',
  },
  {
    q: 'What subjects do you offer?',
    a: 'We offer online tutoring in 📐 Maths for students from Year 1 to Year 10, including GCSE preparation.',
  },
  {
    q: 'Do you offer one-to-one and group classes?',
    a: 'Yes! We offer both one-to-one and small group classes, depending on your child\'s learning needs. Our classes are kept small to ensure personalised attention.',
  },
  {
    q: 'What are your fees?',
    a: 'Our tuition starts from £8 per hour. We also offer discounted bundles for multiple sessions. Check our Course Fees section for detailed pricing.',
  },
  {
    q: 'Do you provide GCSE exam preparation?',
    a: 'Yes, we specialise in GCSE exam preparation. We follow the UK curriculum and provide specialised GCSE tutoring in Maths with exam techniques and practice papers.',
  },
  {
    q: 'How do I enrol my child?',
    a: 'To enrol your child, simply submit the enquiry form on this page. Our team will contact you to understand your requirements, discuss your child\'s learning needs, and schedule classes accordingly.',
  },
  {
    q: "What's included in the tutoring service?",
    a: 'Our tutoring includes personalised learning plans, regular progress tracking, detailed feedback, one-on-one or small group sessions, and flexible scheduling to suit your family\'s needs.',
  },
  {
    q: 'Are the tutors qualified and experienced?',
    a: 'All our tutors are experienced, background-verified, and trained to teach according to UK curriculum standards. They bring expertise from classroom and one-to-one online teaching across Year 1 to Year 10.',
  },
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <section id="faq" className="py-20 bg-white dark:bg-slate-950">
      <div className="section-wrap max-w-3xl">
        <div className="text-center mb-14">
          <span className="section-tag">❓ FAQ</span>
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <p className="section-sub">Find answers to common questions from parents about our tutoring services</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, i) => (
            <div
              key={i}
              className={`card overflow-hidden transition-all duration-200 ${openIdx === i ? 'border-blue-300 dark:border-blue-700 shadow-md' : 'card-hover'}`}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                aria-expanded={openIdx === i}
              >
                <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm leading-snug">{item.q}</span>
                <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                  openIdx === i
                    ? 'bg-blue-600 text-white rotate-45'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${openIdx === i ? 'max-h-48' : 'max-h-0'}`}>
                <div className="px-6 pb-5">
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
