import axios from 'axios'
import { useState, useEffect } from 'react'
const baseURL = 'http://localhost:3000/api'

const formUrlEncoded = (x) =>
  Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')

function setAuthToken(authToken) {
  localStorage.setItem('auth_token', authToken)
}

function getAuthToken() {
  return localStorage.getItem('auth_token')
}

async function login(email, password) {
  try {
    const response = await axios({
      method: 'post',
      url: `${baseURL}/login`,
      data: formUrlEncoded({ email: email, password: password }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    setAuthToken(response.data.auth_token)

    return response.data
  } catch (error) {
    return error.response.data
  }
}

async function verifyAuth() {
  try {
    const response = await axios({
      method: 'get',
      url: `${baseURL}/verify_auth`,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      }
    })

    if (response.data.status === 'Success') return true
    else return false
  } catch (error) {
    return false
  }
}

async function getUser() {
  try {
    const response = await axios({
      method: 'get',
      url: `${baseURL}/user`,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      }
    })

    console.log(response.data)

    return response.data.user
  } catch (error) {
    return null
  }
}

async function logout() {
  try {
    const response = await axios({
      method: 'post',
      url: `${baseURL}/logout`,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      }
    })

    setAuthToken('')

    return response.data
  } catch (error) {
    setAuthToken('')
    return error.response.data
  }
}

async function signup(username, email, password) {
  try {
    const response = await axios({
      method: 'post',
      url: `${baseURL}/signup`,
      data: formUrlEncoded({
        username: username,
        email: email,
        password: password
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    setAuthToken(response.data.auth_token)

    return response.data
  } catch (error) {
    return error.response.data
  }
}

const useGetUser = () => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `${baseURL}/user`,
          headers: {
            Authorization: `Bearer ${getAuthToken()}`
          }
        })

        setUser(response.data.user)
        setIsLoading(false)
      } catch (error) {
        setError(error)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])
  return [user, error, isLoading]
}

const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `${baseURL}/verify_auth`,
          headers: {
            Authorization: `Bearer ${getAuthToken()}`
          }
        })

        response.data.status === 'Success' ? setIsLoggedIn(true) : setIsLoggedIn(false)

        setIsLoading(false)
      } catch (error) {
        setError(error)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])
  return [isLoggedIn, error, isLoading]
}

export default {
  getAuthToken,
  login,
  logout,
  signup,
  verifyAuth,
  getUser,
  useGetUser,
  useIsLoggedIn
}
