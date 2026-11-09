import { saveStudentAuth } from './authStorage'
import { apiRequest } from './apiClient'

/**
 * Get the Google OAuth Client ID from environment or config
 */
export function getGoogleClientId() {
  return import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'
}

/**
 * Handle Google Sign In response
 * @param {CredentialResponse} credentialResponse - Response from Google OAuth
 * @param {object} options - Navigation and callback options
 * @param {Function} options.onSuccess - Callback on successful login
 * @param {Function} options.onError - Callback on error
 * @param {object} options.navigate - React Router navigate function
 * @param {string} options.redirectPath - Path to redirect after successful login
 * @returns {Promise<void>}
 */
export async function handleGoogleSignIn(credentialResponse, options = {}) {
  const { onSuccess, onError, navigate, redirectPath = '/student-dashboard' } = options

  try {
    if (!credentialResponse?.credential) {
      throw new Error('No credential received from Google')
    }

    // Call backend to verify token and authenticate
    const result = await apiRequest('/api/student/auth/google-signin', {
      method: 'POST',
      body: JSON.stringify({
        idToken: credentialResponse.credential,
      }),
    })

    // Handle the response based on whether user exists
    if (result?.token) {
      // Existing user or new user with payment already completed
      // User is authenticated and has a token
      saveStudentAuth(result.token, result?.user || { email: result?.email })
      onSuccess?.({ isNewUser: false, token: result.token })
      navigate?.(redirectPath, { replace: true })
    } else if (result?.studentId) {
      // New user created - awaiting payment
      // Store the registration data and redirect to payment
      const studentData = {
        studentId: result.studentId,
        email: result?.email,
        fullName: result?.fullName,
        authProvider: 'google',
      }
      navigate?.('/student/payment', { 
        state: studentData,
        replace: true 
      })
      onSuccess?.({ isNewUser: true, studentId: result.studentId })
    } else if (result?.error) {
      throw new Error(result.error)
    } else {
      throw new Error('Unexpected response from server')
    }
  } catch (error) {
    const errorMessage = error?.message || 'Google sign-in failed. Please try again.'
    console.error('Google Sign-In Error:', error)
    onError?.(new Error(errorMessage))
  }
}

/**
 * Handle Google Sign Up response (for registration flow)
 * Similar to handleGoogleSignIn but used in registration context
 */
export async function handleGoogleSignUp(credentialResponse, options = {}) {
  const { onSuccess, onError, navigate, redirectPath = '/student/payment' } = options

  try {
    if (!credentialResponse?.credential) {
      throw new Error('No credential received from Google')
    }

    // Call backend to register and verify token
    const result = await apiRequest('/api/student/auth/google-signin', {
      method: 'POST',
      body: JSON.stringify({
        idToken: credentialResponse.credential,
      }),
    })

    if (result?.studentId) {
      // New user created - awaiting payment
      const studentData = {
        studentId: result.studentId,
        email: result?.email,
        fullName: result?.fullName,
        authProvider: 'google',
      }
      navigate?.(redirectPath, { 
        state: studentData,
        replace: true 
      })
      onSuccess?.({ isNewUser: true, studentId: result.studentId })
    } else if (result?.token) {
      // Existing user with payment completed
      saveStudentAuth(result.token, result?.user || { email: result?.email })
      navigate?.(redirectPath, { replace: true })
      onSuccess?.({ isNewUser: false, token: result.token })
    } else if (result?.error) {
      throw new Error(result.error)
    } else {
      throw new Error('Registration failed. Please try again.')
    }
  } catch (error) {
    const errorMessage = error?.message || 'Google sign-up failed. Please try again.'
    console.error('Google Sign-Up Error:', error)
    onError?.(new Error(errorMessage))
  }
}

/**
 * Format error message for display
 */
export function formatGoogleAuthError(error) {
  if (!error) return ''

  // Common OAuth errors
  if (error.message?.includes('popup_closed_by_user')) {
    return 'Sign-in was cancelled.'
  }
  if (error.message?.includes('access_denied')) {
    return 'Access was denied. Please check your Google account permissions.'
  }
  if (error.message?.includes('already exists')) {
    return 'This email is already registered with a different authentication method.'
  }
  if (error.message?.includes('Invalid token')) {
    return 'The authentication token is invalid. Please try again.'
  }

  return error.message || 'An error occurred during authentication.'
}
