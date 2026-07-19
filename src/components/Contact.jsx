export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="section-wrap max-w-4xl">
        <div className="text-center mb-12">
          <span className="section-tag">📍 Contact</span>
          <h2 className="section-heading">Contact Us</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* ── Details ── */}
          <div className="space-y-4">
            {DETAILS.map(d => (
              <div key={d.label} className="card card-hover flex items-start gap-4 p-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-lg shrink-0">
                  {d.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">{d.label}</p>
                  {d.link ? (
                    <a href={d.link} target={d.target} rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
                      {d.value}
                    </a>
                  ) : (
                    <p className="text-sm text-slate-700 dark:text-slate-300">{d.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── Map ── */}
          <div className="card overflow-hidden">
            <iframe
              title="SkillBridge Tutors Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2406.731231567171!2d-1.4638475241256683!3d52.899262672163026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879f0fae13e600d%3A0x7f5047ba777e30af!2s76%20Carlen%20Dr%2C%20Allenton%2C%20Derby%2C%20UK!5e0!3m2!1sen!2sin!4v1758028552079!5m2!1sen!2sin"
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

const DETAILS = [
  {
    icon: '🏠',
    label: 'Address',
    value: '76 Carlen Drive, Osmaston, Derby, DE24 8XY, United Kingdom',
    link: null,
  },
  {
    icon: '💬',
    label: 'WhatsApp',
    value: '+44 7980 997368',
    link: 'https://wa.me/447980997368',
    target: '_blank',
  },
  {
    icon: '📧',
    label: 'Email',
    value: 'info@skillbridgetutors.com',
    link: 'mailto:info@skillbridgetutors.com',
    target: null,
  },
  {
    icon: '⏰',
    label: 'Contact Timings',
    value: 'Mon–Fri: 9 AM – 6 PM | Sat–Sun: 9 AM – 2 PM',
    link: null,
  },
]
