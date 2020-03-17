import React, { createContext, useState, useEffect } from 'react'
import Loading from './components/Common/Loading'
import authService from './services/auth'

const authContext = createContext({})

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const userResp = await authService.getUser()
      setUser(userResp)
      setIsLoading(false)
    }
    if (!user) {
      fetchData()
    }
  }, [user])

  const logout = async () => {
    setIsLoading(true)
    await authService.logout()
    setUser(null)
    setIsLoading(false)
  }

  const login = async (email, password) => {
    let loginResponse = await authService.login(email, password)

    if (loginResponse.status === 'Success') {
      setUser(loginResponse.user)
    }

    return loginResponse
  }

  if (isLoading) return <Loading />

  return <authContext.Provider value={{ user, login, logout }}>{children}</authContext.Provider>
}

const useAuth = () => React.useContext(authContext)

export { AuthProvider, useAuth }
