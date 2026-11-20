import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// How often to re-check the session while a protected dashboard stays open.
// Small relative to the 1-hour session length so an idle tab is logged out
// soon after the session actually expires, without waiting for a refresh
// or the next user action.
const CHECK_INTERVAL_MS = 30 * 1000

/**
 * Enforces the 1-hour session limit on a protected dashboard route.
 * `isValid` (e.g. isStudentAuthenticated) already clears the stored
 * token/user once it detects the session has expired - this hook just makes
 * sure that check keeps running periodically while the page stays mounted,
 * and redirects to `loginPath` the moment it comes back false.
 */
export function useSessionExpiry(isValid, loginPath) {
  const navigate = useNavigate()

  useEffect(() => {
    const id = setInterval(() => {
      if (!isValid()) {
        navigate(loginPath, { replace: true })
      }
    }, CHECK_INTERVAL_MS)

    return () => clearInterval(id)
  }, [isValid, loginPath, navigate])
}
