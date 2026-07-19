import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import Swal from 'sweetalert2'

const YEARS    = ['Year 1','Year 2','Year 3','Year 4','Year 5','Year 6','Year 7','Year 8','Year 9','Year 10']
const SUBJECTS = ['Maths']

const TEAM_HIGHLIGHTS = [
  'Over 10 years of teaching experience in Maths',
  'Expertise from Year 1 to Year 10 across UK curriculum',
  'Skilled in classroom and one-to-one online tuition',
  'Focus on confidence, problem-solving, and lifelong learning',
]

export default function BookingTeam() {
  const formRef     = useRef()
  const [canSubmit, setCanSubmit] = useState(false)

  function checkValidity() {
    if (!formRef.current) return
    const required = [...formRef.current.querySelectorAll('input[required], select[required]')]
    setCanSubmit(required.every(el => el.value.trim() !== ''))
  }

  function handleSubmit(e) {
    e.preventDefault()
    Swal.fire({ title: 'Processing…', text: 'Your request is in progress', allowOutsideClick: false, didOpen: () => Swal.showLoading() })

    // Notify admin
    emailjs.sendForm('service_9g63c7d', 'template_yzrpqsb', formRef.current, 'qCaCx47HrSPJ9YwIO')
      .then(() => console.log('Admin notified'))
      .catch(err => console.error('Admin notify failed', err))

    // Auto-reply to user
    emailjs.sendForm('service_9g63c7d', 'template_w5u46de', formRef.current, 'qCaCx47HrSPJ9YwIO')
      .then(() => {
        Swal.fire({ icon: 'success', title: 'Thank you!', text: 'Your request has been submitted. A confirmation has been sent to your email.' })
        formRef.current.reset()
        setCanSubmit(false)
      })
      .catch(err => {
        Swal.fire({ icon: 'error', title: 'Oops…', text: 'Failed to send auto-reply.\n' + JSON.stringify(err) })
      })
  }

  return (
    <section id="booking-team-section" className="py-20 bg-white dark:bg-slate-950">
      <div className="section-wrap">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ── Our Team ── */}
          <div>
            <span className="section-tag">🎥 Meet the Team</span>
            <h2 className="section-heading text-left mt-2 mb-6">Hear from Our Team</h2>

            {/* Video placeholder */}
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900 to-purple-900 aspect-video flex flex-col items-center justify-center mb-7 shadow-glow-blue">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-3">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p className="text-white font-semibold">Team Video Coming Soon</p>
              <p className="text-white/60 text-sm mt-1">Our tutors in action</p>
            </div>

            <blockquote className="border-l-4 border-blue-500 pl-4 text-slate-600 dark:text-slate-400 italic mb-6">
              "We are committed to making learning engaging and stress-free for every student."
            </blockquote>

            <ul className="space-y-3">
              {TEAM_HIGHLIGHTS.map(h => (
                <li key={h} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <svg className="w-4 h-4 mt-0.5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Booking Form ── */}
          <div id="assessmentForm">
            <span className="section-tag">📩 Get in Touch</span>
            <h2 className="section-heading text-left mt-2 mb-6">Send Your Query</h2>

            <div className="card p-7">
              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5" htmlFor="firstName">
                      First Name <span className="text-rose-500">*</span>
                    </label>
                    <input id="firstName" type="text" name="firstName" required
                      className="input-field" placeholder="Jane" onChange={checkValidity}/>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5" htmlFor="lastName">
                      Last Name <span className="text-rose-500">*</span>
                    </label>
                    <input id="lastName" type="text" name="lastName" required
                      className="input-field" placeholder="Smith" onChange={checkValidity}/>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5" htmlFor="childYear">
                      Class Year <span className="text-rose-500">*</span>
                    </label>
                    <select id="childYear" name="childYear" required className="input-field" onChange={checkValidity} defaultValue="">
                      <option value="" disabled>Select Year</option>
                      {YEARS.map(y => <option key={y}>{y}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5" htmlFor="subject">
                      Subject <span className="text-rose-500">*</span>
                    </label>
                    <select id="subject" name="subject" required className="input-field" onChange={checkValidity} defaultValue="">
                      <option value="" disabled>Select Subject</option>
                      {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5" htmlFor="phone">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input id="phone" type="tel" name="phone" required
                      className="input-field" placeholder="+44 7000 000000" onChange={checkValidity}/>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5" htmlFor="email">
                      Email <span className="text-rose-500">*</span>
                    </label>
                    <input id="email" type="email" name="email" required
                      className="input-field" placeholder="jane@example.com" onChange={checkValidity}/>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5" htmlFor="description">
                    Additional Info <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <textarea id="description" name="description" rows={3}
                    className="input-field resize-none"
                    placeholder="Tell us about your child's learning needs…"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="btn-primary w-full justify-center mt-5 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Submit Enquiry
                </button>

                <p className="text-center text-xs text-slate-400 mt-3">
                  🔒 Your data is safe. We never share your information.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
