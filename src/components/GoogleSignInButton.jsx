import { GoogleLogin } from '@react-oauth/google'
import { formatGoogleAuthError } from '../lib/googleAuthUtils'

/**
 * GoogleSignInButton - Reusable component for Google OAuth sign-in
 * 
 * @param {object} props
 * @param {Function} props.onSuccess - Callback when sign-in succeeds
 * @param {Function} props.onError - Callback when sign-in fails
 * @param {string} props.text - Button text variant ('signin_with', 'signup_with', 'signin', etc.)
 * @param {string} props.theme - Theme variant ('outline' or 'filled_blue')
 * @param {string} props.size - Size variant ('large', 'medium', 'small')
 * @param {string} props.locale - Language locale
 * @param {boolean} props.isLoading - Show loading state
 * @param {string} props.containerClass - CSS class for container
 */
export default function GoogleSignInButton({
  onSuccess,
  onError,
  text = 'signin_with',
  theme = 'outline',
  size = 'large',
  locale = 'en',
  isLoading = false,
  containerClass = '',
}) {
  const handleError = (error) => {
    const formattedError = formatGoogleAuthError(error)
    onError?.(new Error(formattedError))
  }

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3.5 ${containerClass}`}>
        <svg className="h-5 w-5 animate-spin text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="ml-2 text-sm font-semibold text-slate-300">Processing...</span>
      </div>
    )
  }

  return (
    <div className={containerClass}>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={handleError}
        text={text}
        theme={theme}
        size={size}
        locale={locale}
        width="100%"
      />
    </div>
  )
}
