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

    // Handle the response - new flow allows login even without payment
    if (result?.token) {
      // User has token - log them in
      const isPaymentCompleted = result?.paymentCompleted === true
      
      // Save auth token
      saveStudentAuth(result.token, result?.user || { email: result?.email })
      
      onSuccess?.({ 
        isNewUser: false, 
        token: result.token,
        paymentCompleted: isPaymentCompleted,
        studentId: result.studentId 
      })
      
      // Check if profile needs completion (new Google users)
      try {
        const profileResult = await apiRequest('/api/student/auth/profile')
        const isProfileComplete = profileResult?.profileComplete === true
        
        // If profile incomplete, redirect to completion page first
        if (!isProfileComplete) {
          navigate?.('/student/profile-completion', { replace: true })
        } else {
          // Navigate to dashboard (payment banner will show if payment not completed)
          navigate?.(redirectPath, { replace: true })
        }
      } catch (profileErr) {
        // If profile check fails, go to dashboard anyway
        navigate?.(redirectPath, { replace: true })
      }
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
  const { onSuccess, onError, navigate, redirectPath = '/student-dashboard' } = options

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

    // New flow: All users get token and can login
    // Payment is optional but shows banner in dashboard
    if (result?.token) {
      // User created and authenticated
      const isPaymentCompleted = result?.paymentCompleted === true
      
      // Save auth token
      saveStudentAuth(result.token, result?.user || { email: result?.email })
      
      onSuccess?.({ 
        isNewUser: true, 
        token: result.token,
        paymentCompleted: isPaymentCompleted,
        studentId: result.studentId 
      })
      
      // Navigate to dashboard - payment banner will show if payment not completed
      navigate?.(redirectPath, { 
        state: {
          showPaymentBanner: !isPaymentCompleted,
          paymentRequired: true
        },
        replace: true 
      })
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
