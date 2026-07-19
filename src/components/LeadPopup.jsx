import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import Swal from 'sweetalert2'

const YEARS    = ['Year 1','Year 2','Year 3','Year 4','Year 5','Year 6','Year 7','Year 8','Year 9','Year 10']
const SUBJECTS = ['Maths']

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [canSubmit, setCanSubmit] = useState(false)
  const formRef = useRef()

  useEffect(() => {
    const seen = sessionStorage.getItem('sb-popup-shown')
    if (!seen) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        sessionStorage.setItem('sb-popup-shown', '1')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  function close() { setIsOpen(false) }

  function checkValidity() {
    if (!formRef.current) return
    const required = [...formRef.current.querySelectorAll('input[required], select[required]')]
    setCanSubmit(required.every(el => el.value.trim() !== ''))
  }

  function handleSubmit(e) {
    e.preventDefault()
    Swal.fire({ title: 'Processing…', allowOutsideClick: false, didOpen: () => Swal.showLoading() })
    emailjs.sendForm('service_9g63c7d', 'template_yzrpqsb', formRef.current, 'qCaCx47HrSPJ9YwIO')
      .then(() => {
        Swal.fire({ icon: 'success', title: 'Thank you!', text: 'Your request has been submitted.' })
        formRef.current.reset()
        setCanSubmit(false)
        close()
      })
      .catch(() => {
        Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to submit form. Please try again.' })
      })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[8000] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Book Free Demo">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={close} />
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Close */}
        <button
          onClick={close}
          aria-label="Close popup"
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors z-10"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-purple-700 p-6 rounded-t-2xl text-white text-center">
          <div className="text-4xl mb-2">🎓</div>
          <h2 className="font-heading text-xl font-bold">Book Your Free Demo</h2>
          <p className="text-white/80 text-sm mt-1">No commitment — try before you enrol!</p>
        </div>

        {/* Form */}
        <div className="p-6">
          <form ref={formRef} onSubmit={handleSubmit} noValidate>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">First Name *</label>
                  <input type="text" name="firstName" required placeholder="Jane" className="input-field text-sm py-2.5" onChange={checkValidity}/>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Last Name *</label>
                  <input type="text" name="lastName" required placeholder="Smith" className="input-field text-sm py-2.5" onChange={checkValidity}/>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Class Year *</label>
                <select name="childYear" required className="input-field text-sm py-2.5" onChange={checkValidity} defaultValue="">
                  <option value="" disabled>Select Year</option>
                  {YEARS.map(y => <option key={y}>{y}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Subject *</label>
                <select name="subject" required className="input-field text-sm py-2.5" onChange={checkValidity} defaultValue="Maths">
                  <option value="" disabled>Select Subject</option>
                  {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Phone Number *</label>
                <input type="tel" name="phone" required placeholder="+44 7000 000000" className="input-field text-sm py-2.5" onChange={checkValidity}/>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Email *</label>
                <input type="email" name="email" required placeholder="jane@example.com" className="input-field text-sm py-2.5" onChange={checkValidity}/>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Description</label>
                <textarea name="description" rows={2} placeholder="Any additional details…" className="input-field text-sm py-2.5 resize-none"/>
              </div>
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="btn-primary w-full justify-center mt-4 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
            >
              Submit
            </button>
            <p className="text-center text-xs text-slate-400 mt-2">🔒 We'll never share your info</p>
          </form>
        </div>
      </div>
    </div>
  )
}
