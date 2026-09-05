import { getToken, getStudentToken } from './authStorage'

const envApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim()

const API_BASE_URL = (envApiBaseUrl
  ? envApiBaseUrl
  : import.meta.env.PROD
    ? 'https://api.skillbridgetutors.com'
    : 'http://localhost:5000'
).replace(/\/$/, '')

export async function apiRequest(path, options = {}) {
  // Student/payment routes must prefer the student token so a stale admin
  // session in the same browser doesn't get sent instead.
  const isStudentRoute = path.startsWith('/api/student') || path.startsWith('/api/payments')
  const token = isStudentRoute
    ? getStudentToken() || getToken()
    : getToken() || getStudentToken()
  const headers = {
    ...(options.headers || {}),
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  })

  const contentType = response.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const payload = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    const message =
      typeof payload === 'string'
        ? payload
        : payload?.message || payload?.title || 'Request failed'

    const error = new Error(message)
    error.status = response.status
    error.payload = payload
    throw error
  }

  return payload
}

export function getApiBaseUrl() {
  return API_BASE_URL
}
