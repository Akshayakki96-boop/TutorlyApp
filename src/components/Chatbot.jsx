import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getChatbotResponse } from '../lib/chatbotResponses'

function Bubble({ msg }) {
  return (
    <div className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
      {msg.from === 'bot' && (
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs text-white mr-1.5 shrink-0 mt-0.5">
          🤖
        </div>
      )}
      <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
        msg.from === 'user'
          ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-br-sm'
          : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-sm'
      }`}>
        {msg.text}
        {msg.link && (
          <Link
            to={msg.link.href}
            className="mt-2 block font-semibold text-blue-700 underline dark:text-blue-300"
          >
            {msg.link.label}
          </Link>
        )}
      </div>
    </div>
  )
}

export default function Chatbot() {
  const [isOpen,   setIsOpen]   = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi 👋 I'm the SkillBridge Assistant. I can help you with Maths tutoring questions. How can I help today?" }
  ])
  const [input,    setInput]    = useState('')
  const bodyRef = useRef()

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [messages])

  function sendMessage() {
    const text = input.trim()
    if (!text) return
    setMessages(prev => [...prev, { from: 'user', text }])
    setInput('')
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', ...getChatbotResponse(text) }])
    }, 450)
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  return (
    <>
      {/* ── Toggle Button ── */}
      <button
        onClick={() => setIsOpen(p => !p)}
        aria-label="Open chat assistant"
        aria-haspopup="dialog"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-700 text-white shadow-glow-blue flex items-center justify-center text-2xl hover:scale-110 transition-transform duration-200 animate-pulse-slow"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : '💬'}
      </button>

      {/* ── Chat Panel ── */}
      <div
        role="dialog"
        aria-label="SkillBridge Chat Assistant"
        aria-hidden={!isOpen}
        className={`fixed bottom-24 right-6 z-40 w-80 sm:w-96 flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-purple-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">🤖</div>
            <div>
              <p className="text-white font-semibold text-sm">SkillBridge Chat</p>
              <p className="text-white/70 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" /> Online
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} aria-label="Close chat" className="text-white/70 hover:text-white">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div ref={bodyRef} className="bg-white dark:bg-slate-900 flex-1 overflow-y-auto px-3 py-4 space-y-1 min-h-[260px] max-h-72">
          {messages.map((m, i) => <Bubble key={i} msg={m} />)}
        </div>

        {/* Input */}
        <div className="bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 px-3 py-2.5 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask a question…"
            aria-label="Type your message"
            className="flex-1 text-sm bg-slate-50 dark:bg-slate-700 rounded-xl px-3 py-2 outline-none border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <button
            onClick={sendMessage}
            aria-label="Send message"
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white hover:scale-105 transition-transform shrink-0"
          >
            <svg className="w-4 h-4 rotate-45" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
