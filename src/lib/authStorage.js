const ADMIN_TOKEN_KEY = 'skillbridge_admin_token'
const ADMIN_USER_KEY = 'skillbridge_admin_user'
const ADMIN_EXPIRY_KEY = 'skillbridge_admin_token_expires_at'
const STUDENT_TOKEN_KEY = 'skillbridge_student_token'
const STUDENT_USER_KEY = 'skillbridge_student_user'
const STUDENT_EXPIRY_KEY = 'skillbridge_student_token_expires_at'
const TEACHER_TOKEN_KEY = 'skillbridge_teacher_token'
const TEACHER_USER_KEY = 'skillbridge_teacher_user'
const TEACHER_EXPIRY_KEY = 'skillbridge_teacher_token_expires_at'

// Any logged-in session (student, teacher or admin) is valid for 1 hour.
// After that, the next auth check clears it and the user must log in again.
export const SESSION_DURATION_MS = 60 * 60 * 1000

function hasSessionExpired(expiryKey) {
  const expiresAt = Number(localStorage.getItem(expiryKey))
  return !expiresAt || Date.now() > expiresAt
}

export function saveAuth(token, user) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token)
  localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user ?? null))
  localStorage.setItem(ADMIN_EXPIRY_KEY, String(Date.now() + SESSION_DURATION_MS))
}

export function clearAuth() {
  localStorage.removeItem(ADMIN_TOKEN_KEY)
  localStorage.removeItem(ADMIN_USER_KEY)
  localStorage.removeItem(ADMIN_EXPIRY_KEY)
}

export function getToken() {
  return localStorage.getItem(ADMIN_TOKEN_KEY)
}

export function getUser() {
  const raw = localStorage.getItem(ADMIN_USER_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function isAuthenticated() {
  if (!getToken()) return false

  if (hasSessionExpired(ADMIN_EXPIRY_KEY)) {
    clearAuth()
    return false
  }

  return true
}

export function saveStudentAuth(token, user) {
  localStorage.setItem(STUDENT_TOKEN_KEY, token)
  localStorage.setItem(STUDENT_USER_KEY, JSON.stringify(user ?? null))
  localStorage.setItem(STUDENT_EXPIRY_KEY, String(Date.now() + SESSION_DURATION_MS))
}

// The auth API returns studentId/email/fullName at the top level (no nested user object)
export function buildStudentUser(result, fallbackEmail = '') {
  if (result?.user) return result.user

  return {
    id: result?.studentId ?? result?.id ?? null,
    email: result?.email || fallbackEmail,
    fullName: result?.fullName || '',
  }
}

export function clearStudentAuth() {
  localStorage.removeItem(STUDENT_TOKEN_KEY)
  localStorage.removeItem(STUDENT_USER_KEY)
  localStorage.removeItem(STUDENT_EXPIRY_KEY)
}

export function getStudentToken() {
  return localStorage.getItem(STUDENT_TOKEN_KEY)
}

export function getStudentUser() {
  const raw = localStorage.getItem(STUDENT_USER_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function isStudentAuthenticated() {
  if (!getStudentToken()) return false

  if (hasSessionExpired(STUDENT_EXPIRY_KEY)) {
    clearStudentAuth()
    return false
  }

  return true
}

export function saveTeacherAuth(token, user) {
  localStorage.setItem(TEACHER_TOKEN_KEY, token)
  localStorage.setItem(TEACHER_USER_KEY, JSON.stringify(user ?? null))
  localStorage.setItem(TEACHER_EXPIRY_KEY, String(Date.now() + SESSION_DURATION_MS))
}

export function clearTeacherAuth() {
  localStorage.removeItem(TEACHER_TOKEN_KEY)
  localStorage.removeItem(TEACHER_USER_KEY)
  localStorage.removeItem(TEACHER_EXPIRY_KEY)
}

export function getTeacherToken() {
  return localStorage.getItem(TEACHER_TOKEN_KEY)
}

export function isTeacherAuthenticated() {
  if (!getTeacherToken()) return false

  if (hasSessionExpired(TEACHER_EXPIRY_KEY)) {
    clearTeacherAuth()
    return false
  }

  return true
}
