const ADMIN_TOKEN_KEY = 'skillbridge_admin_token'
const ADMIN_USER_KEY = 'skillbridge_admin_user'
const STUDENT_TOKEN_KEY = 'skillbridge_student_token'
const STUDENT_USER_KEY = 'skillbridge_student_user'

export function saveAuth(token, user) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token)
  localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user ?? null))
}

export function clearAuth() {
  localStorage.removeItem(ADMIN_TOKEN_KEY)
  localStorage.removeItem(ADMIN_USER_KEY)
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
  return Boolean(getToken())
}

export function saveStudentAuth(token, user) {
  localStorage.setItem(STUDENT_TOKEN_KEY, token)
  localStorage.setItem(STUDENT_USER_KEY, JSON.stringify(user ?? null))
}

export function clearStudentAuth() {
  localStorage.removeItem(STUDENT_TOKEN_KEY)
  localStorage.removeItem(STUDENT_USER_KEY)
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
  return Boolean(getStudentToken())
}
