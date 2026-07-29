import { useState, useRef, useEffect } from 'react'

export default function FAQAccordion({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => {
    setOpenIndex(prev => (prev === i ? null : i))
  }

  return (
    <div className="space-y-3">
      {faqs.map((item, i) => (
        <div key={i} className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
          <button
            aria-expanded={openIndex === i}
            aria-controls={`faq-panel-${i}`}
            id={`faq-toggle-${i}`}
            onClick={() => toggle(i)}
            className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-900 text-left"
          >
            <span className="font-medium text-slate-900 dark:text-white">{item.q}</span>
            <span className="ml-3 w-6 h-6 flex items-center justify-center text-slate-500">
              {openIndex === i ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M12 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
          </button>

          <div
            id={`faq-panel-${i}`}
            role="region"
            aria-labelledby={`faq-toggle-${i}`}
            className="bg-white dark:bg-slate-900 px-4 overflow-hidden transition-all duration-300"
            style={{ maxHeight: openIndex === i ? 500 : 0 }}
          >
            <div className={`text-slate-700 dark:text-slate-200 ${openIndex === i ? 'py-3' : 'py-0'}`}>
              {item.a}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
