import { useEffect, useRef, useState } from 'react'

const TURNSTILE_SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
let turnstileLoader

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile)
  if (turnstileLoader) return turnstileLoader

  turnstileLoader = new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${TURNSTILE_SCRIPT_URL}"]`)
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.turnstile), { once: true })
      existingScript.addEventListener('error', reject, { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = TURNSTILE_SCRIPT_URL
    script.async = true
    script.defer = true
    script.onload = () => resolve(window.turnstile)
    script.onerror = () => reject(new Error('Unable to load Cloudflare Turnstile.'))
    document.head.appendChild(script)
  })

  return turnstileLoader
}

export default function Turnstile({ onTokenChange, onFailure }) {
  const containerRef = useRef(null)
  const widgetIdRef = useRef(null)
  const [error, setError] = useState('')
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim() || '0x4AAAAAAEqFtXy7xI8IhXRe'

  useEffect(() => {
    let active = true

    const handleFailure = () => {
      onFailure?.(true)
      onTokenChange('')
      setError('Verification could not be completed. Please try again. The form can still be submitted manually.')
    }

    loadTurnstile()
      .then((turnstile) => {
        if (!active || !containerRef.current || !turnstile) return

        widgetIdRef.current = turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token) => {
            onFailure?.(false)
            onTokenChange(token)
          },
          'expired-callback': () => {
            onFailure?.(true)
            onTokenChange('')
          },
          'error-callback': handleFailure,
        })
      })
      .catch(() => {
        if (active) {
          onFailure?.(true)
          setError('Verification could not be loaded. Please refresh and try again. The form can still be submitted manually.')
        }
      })

    return () => {
      active = false
      if (window.turnstile && widgetIdRef.current !== null) {
        window.turnstile.remove(widgetIdRef.current)
      }
    }
  }, [onTokenChange, siteKey])

  return (
    <div>
      <div ref={containerRef} />
      {error && <p className="mt-2 text-xs text-rose-500">{error}</p>}
    </div>
  )
}
