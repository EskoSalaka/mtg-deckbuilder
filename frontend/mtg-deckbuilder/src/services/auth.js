import axios from "axios"
const baseURL = "http://localhost:5000/api"

const formUrlEncoded = x =>
  Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, "")

function setAuthToken(authToken) {
  localStorage.setItem("auth_token", authToken)
}

function getAuthToken() {
  return localStorage.getItem("auth_token")
}

function isLoggedIn_f() {
  return getAuthToken() ? true : false
}

async function login(email, password) {
  try {
    const response = await axios({
      method: "post",
      url: `${baseURL}/login`,
      data: formUrlEncoded({ email: email, password: password }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })

    setAuthToken(response.data.auth_token)

    return response.data
  } catch (error) {
    return error.response.data
  }
}

async function verify_auth() {
  try {
    console.log(localStorage)

    const response = await axios({
      method: "get",
      url: `${baseURL}/verify_auth`,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      }
    })

    return response.data
  } catch (error) {
    return error.response.data
  }
}

async function logout() {
  try {
    const response = await axios({
      method: "post",
      url: `${baseURL}/logout`,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      }
    })

    setAuthToken("")

    return response.data
  } catch (error) {
    setAuthToken("")
    return error.response.data
  }
}

async function signup(username, email, password) {
  try {
    const response = await axios({
      method: "post",
      url: `${baseURL}/signup`,
      data: formUrlEncoded({ username: username, email: email, password: password }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })

    setAuthToken(response.data.auth_token)

    return response.data
  } catch (error) {
    return error.response.data
  }
}

export default { login, logout, signup, verify_auth, isLoggedIn_f }
