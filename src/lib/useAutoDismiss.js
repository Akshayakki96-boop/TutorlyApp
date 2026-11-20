import { useEffect, useRef } from 'react'

const DEFAULT_DELAY_MS = 10000

/**
 * Auto-clears a transient alert/error/success message after `delayMs` (default 10s).
 * The timer (re)starts whenever `value` changes to a truthy value, and is cancelled
 * if the component unmounts or the value is cleared/changed before the timer fires.
 *
 * @param {*} value - the current message (string, or null/''), falsy values are ignored.
 * @param {(value: any) => void} clear - setter used to dismiss the message, e.g. () => setError('').
 * @param {number} [delayMs=10000]
 */
export function useAutoDismiss(value, clear, delayMs = DEFAULT_DELAY_MS) {
  const clearRef = useRef(clear)
  clearRef.current = clear

  useEffect(() => {
    if (!value) return undefined
    const timer = setTimeout(() => clearRef.current(), delayMs)
    return () => clearTimeout(timer)
  }, [value, delayMs])
}
