import { useState } from 'react'

const PRIVACY_CONTENT = {
  title: 'Privacy Policy – SkillBridge Tutors',
  date: 'September 1, 2025',
  sections: [
    { heading: 'About Us', body: 'We provide high-quality online tuition for Maths, tailored for students from Year 1 to Year 10.' },
    { heading: 'Information We Collect', body: 'Personal Information (Name, email, phone), Student Information (Age, school year), Payment Information (processed securely), Usage Data.' },
    { heading: 'How We Use Your Information', body: 'To provide and improve tuition services, schedule sessions, communicate with parents, process payments securely, and ensure a personalised learning experience.' },
    { heading: 'Data Sharing', body: 'We do not sell or rent your data. We only share with tutors, service providers, or legal authorities if required.' },
    { heading: 'Data Security', body: 'We use strong security measures but cannot guarantee 100% security online.' },
    { heading: 'Your Rights', body: 'You may access, update, or request deletion of your data, and opt out of marketing communications anytime.' },
    { heading: "Children's Privacy", body: 'Our services require parental consent. We do not knowingly collect info from children under 13 without parental permission.' },
    { heading: 'Contact Us', body: '📧 info@skillbridgetutors.com' },
  ],
}

const TERMS_CONTENT = {
  title: 'Terms & Conditions – SkillBridge Tutors',
  date: 'September 1, 2025',
  sections: [
    { heading: 'Introduction', body: 'Welcome to SkillBridge Tutors. By accessing or using our website or services, you agree to comply with these Terms and Conditions.' },
    { heading: 'Use of Services', body: 'Our services are for online tuition in Maths for Year 1–10. You agree to use our platform for lawful purposes only.' },
    { heading: 'Registration & Accounts', body: 'Parents or guardians must register on behalf of their children. You are responsible for accurate information and account confidentiality.' },
    { heading: 'Payments & Refunds', body: 'All payments must be made per the pricing on our website. Refunds are subject to our cancellation policy.' },
    { heading: 'Session Rules', body: 'Students are expected to attend sessions on time and maintain respectful behaviour toward tutors.' },
    { heading: 'Intellectual Property', body: 'All tutoring materials remain the intellectual property of SkillBridge Tutors for personal educational use only.' },
    { heading: 'Limitation of Liability', body: 'SkillBridge Tutors is not liable for indirect or consequential damages from use of our services.' },
    { heading: 'Contact Us', body: '📧 info@skillbridgetutors.com' },
  ],
}

function Modal({ content, onClose }) {
  return (
    <div className="fixed inset-0 z-[9000] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-slate-800 flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700 rounded-t-2xl">
          <h2 className="font-heading font-bold text-slate-900 dark:text-white text-lg">{content.title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors" aria-label="Close">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-500">Effective Date: {content.date}</p>
          {content.sections.map(s => (
            <div key={s.heading}>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{s.heading}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Footer() {
  const [modal, setModal] = useState(null) // null | 'privacy' | 'terms'

  return (
    <>
      <footer className="bg-slate-900 dark:bg-slate-950 text-white">
        <div className="section-wrap py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <img src="/Images/skillbridge_logo_only.png" alt="SkillBridge logo" className="h-8 w-auto" loading="lazy"/>
                <span className="font-heading font-bold text-lg">SkillBridge Tutors</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Connecting students with expert tutors for online Maths tuition across the UK.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-widest text-slate-400 mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { label: 'Home', href: '#' },
                  { label: 'About Us', href: '#about' },
                  { label: 'Services', href: '#services' },
                  { label: 'Course Fees', href: '#fees' },
                  { label: 'Contact', href: '#contact' },
                ].map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="text-slate-400 hover:text-white text-sm transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dashboards */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-widest text-slate-400 mb-4">Portals</h4>
              <ul className="space-y-2">
                {[
                  { label: 'Student Dashboard', href: '/student-dashboard' },
                  { label: 'Tutor Dashboard', href: '/tutor-dashboard' },
                  { label: 'Parent Portal', href: '/parent-portal' },
                  { label: 'Course Catalog', href: '/courses' },
                ].map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="text-slate-400 hover:text-white text-sm transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-widest text-slate-400 mb-4">Contact</h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li>
                  <a href="mailto:info@skillbridgetutors.com" className="hover:text-white transition-colors flex items-center gap-2">
                    📧 info@skillbridgetutors.com
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/447451295266" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                    💬 +44 7451 295266
                  </a>
                </li>
                <li className="flex items-center gap-2">⏰ Mon–Fri: 9 AM – 6 PM</li>
                <li className="flex items-center gap-2 text-xs">Sat–Sun: 9 AM – 2 PM</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © 2026 SkillBridge Tutors – Connecting Students with the Right Guidance.
            </p>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <button onClick={() => setModal('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
              <span>|</span>
              <button onClick={() => setModal('terms')} className="hover:text-white transition-colors">Terms & Conditions</button>
              <span>|</span>
              <a href="cookie-policy.html" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {modal === 'privacy' && <Modal content={PRIVACY_CONTENT} onClose={() => setModal(null)} />}
      {modal === 'terms'   && <Modal content={TERMS_CONTENT}   onClose={() => setModal(null)} />}
    </>
  )
}
