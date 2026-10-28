import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getChatbotResponse } from '../lib/chatbotResponses'

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const nextMessageId = useRef(2)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hi! 👋 Welcome to SkillBridge Tutors. How can we help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')

  const handleSendMessage = () => {
    const text = inputValue.trim()
    if (!text) return

    setMessages(prev => [
      ...prev,
      {
        id: nextMessageId.current++,
        text,
        sender: 'user',
        timestamp: new Date()
      }
    ])
    setInputValue('')

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
        id: nextMessageId.current++,
          ...getChatbotResponse(text),
          sender: 'bot',
          timestamp: new Date()
        }
      ])
    }, 450)
  }

  const handleWhatsApp = () => {
    window.open('https://wa.me/447451295266?text=Hi%20SkillBridge%20Tutors', '_blank')
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-200 hover:scale-110 flex items-center justify-center text-3xl z-40 cursor-pointer border-4 border-white dark:border-slate-800"
        title="Open chat"
      >
        💬
      </button>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-28 right-6 w-96 max-w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden z-40 border border-slate-200 dark:border-slate-700 flex flex-col max-h-96">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-lg">
                👋
              </div>
              <div>
                <h3 className="font-bold text-sm">SkillBridge Support</h3>
                <p className="text-xs text-blue-100">Typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors"
              title="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-800">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-bl-none border border-slate-200 dark:border-slate-600'
                  }`}
                >
                  {message.text}
                  {message.link && (
                    <Link
                      to={message.link.href}
                      className="mt-2 block font-semibold text-blue-700 underline dark:text-blue-300"
                    >
                      {message.link.label}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="border-t border-slate-200 dark:border-slate-700 p-3 bg-white dark:bg-slate-900 space-y-2">
            <button
              onClick={handleWhatsApp}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
            >
              📱 Chat on WhatsApp
            </button>
          </div>

          {/* Input */}
          <div className="border-t border-slate-200 dark:border-slate-700 p-3 bg-white dark:bg-slate-900 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
              title="Send message"
            >
              📤
            </button>
          </div>
        </div>
      )}
    </>
  )
}
