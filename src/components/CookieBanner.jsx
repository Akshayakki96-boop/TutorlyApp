import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('sb-cookies-accepted')) {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem('sb-cookies-accepted', 'true')
    document.cookie = 'userConsent=true; path=/; max-age=' + 60 * 60 * 24 * 30
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="alert"
      className="fixed bottom-0 left-0 right-0 z-50 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-sm text-white px-6 py-4 shadow-2xl"
    >
      <p className="text-sm text-slate-300 text-center sm:text-left max-w-2xl">
        🍪 We use cookies to improve your experience. By using our site, you accept our{' '}
        <a href="cookie-policy.html" className="text-blue-400 hover:text-blue-300 underline">
          cookie policy
        </a>.
      </p>
      <button
        onClick={accept}
        className="shrink-0 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-6 py-2 rounded-full transition-colors"
      >
        Accept
      </button>
    </div>
  )
}
