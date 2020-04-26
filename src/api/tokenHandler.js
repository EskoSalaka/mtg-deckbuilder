export function setAuthToken(authToken) {
  document.cookie = 'access_token=[123]'
}

export function getAuthToken() {
  return localStorage.getItem('auth_token')
}
