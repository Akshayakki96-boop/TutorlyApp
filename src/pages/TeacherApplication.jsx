import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import Swal from 'sweetalert2'
import { apiRequest } from '../lib/apiClient'

export default function TeacherApplication() {
  const formRef = useRef()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subjects: '',
    message: '',
    qualificationDetails: '',
  })

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    // Validate required fields
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.subjects.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please fill in Name, Email, Phone, and Subjects.',
      })
      setLoading(false)
      return
    }

    try {
      Swal.fire({
        title: 'Processing...',
        text: 'Submitting your application',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      })

      // Submit application to API
      await apiRequest('/api/teacher/auth/apply', {
        method: 'POST',
        body: JSON.stringify(formData),
      })

      // Send confirmation email via EmailJS
      emailjs.sendForm('service_9g63c7d', 'template_teacher_apply', formRef.current, 'qCaCx47HrSPJ9YwIO')
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Application Submitted!',
            text: 'Thank you for applying. We will review your application and contact you soon.',
          })
          setFormData({
            fullName: '',
            email: '',
            phone: '',
            subjects: '',
            message: '',
            qualificationDetails: '',
          })
          if (formRef.current) formRef.current.reset()
        })
        .catch(err => {
          console.error('Email notification failed', err)
          Swal.fire({
            icon: 'success',
            title: 'Application Submitted!',
            text: 'Your application has been received. We will contact you soon.',
          })
        })
    } catch (error) {
      console.error('Application submission failed', error)
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: error?.message || 'Unable to submit application. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Join Our Team</h1>
          <p className="text-blue-200 text-lg">Apply to become a tutor at SkillBridge</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 md:px-8 py-8">
            <h2 className="text-2xl font-bold text-white">Teacher Application Form</h2>
            <p className="text-blue-100 text-sm mt-1">Tell us about your teaching experience and qualifications</p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Smith"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+44 7700 123456"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Subjects */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Subject(s) You Can Teach <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="subjects"
                value={formData.subjects}
                onChange={handleChange}
                placeholder="e.g., Maths, English, Science"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Qualifications */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Qualifications & Certifications
              </label>
              <textarea
                name="qualificationDetails"
                value={formData.qualificationDetails}
                onChange={handleChange}
                placeholder="E.g., Bachelor's in Mathematics, PGCE, GCSEs, A-Levels, etc."
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Experience & Message */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Teaching Experience & Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your teaching experience, why you want to join, and what makes you a great tutor..."
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? '🔄 Submitting Application...' : '✅ Submit Application'}
            </button>

            {/* Terms */}
            <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4">
              By submitting, you agree to our terms and conditions. We will review your application and contact you shortly.
            </p>
          </form>
        </div>

        {/* Benefits */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🎓</div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Flexible Hours</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Set your own schedule and teach at your pace</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Competitive Rates</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Earn attractive rates for your expertise</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Grow With Us</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Join a platform helping students succeed</p>
          </div>
        </div>
      </div>
    </div>
  )
}
