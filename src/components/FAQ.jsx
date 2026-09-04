import { useState } from 'react'

const FAQS = [
  {
    q: 'How can online maths tuition improve a student’s confidence?',
    a: 'When a child gets one-to-one attention and works at their own pace, mistakes feel less daunting. Regular praise and steady progress through online maths tuition help students trust their own ability over time.',
  },
  {
    q: 'Can online maths tuition support students with difficult maths topics?',
    a: 'Yes. Tutors break down tricky topics into smaller, manageable steps, revisiting concepts until the student feels secure before moving on.',
  },
  {
    q: 'How does personalised maths tuition help different learning needs?',
    a: 'Personalised maths tuition adapts to how each child learns best, whether that means more visual examples, extra practice, or a slower pace through new material.',
  },
  {
    q: 'Can online maths tuition help students prepare for school maths exams?',
    a: 'Definitely. Structured revision, past papers and focused practice sessions help students walk into exams feeling prepared rather than anxious.',
  },
  {
    q: 'How does online maths tuition develop problem-solving skills?',
    a: 'Tutors encourage students to work through problems step by step, building reasoning skills that carry over into other subjects too.',
  },
  {
    q: 'Can online maths tuition help students improve their maths grades?',
    a: 'With consistent sessions, tracked progress and targeted support on weak areas, many students see noticeable grade improvement within a few months.',
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
