import React, { createContext, useState, useEffect } from 'react'
import Loading from './components/Common/Loading'
import authService from './services/auth'

const authContext = createContext({})

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isGlobalLoading, setIsGlobalLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setIsGlobalLoading(true)

      const userResp = await authService.getUser()
      setUser(userResp)
      setIsGlobalLoading(false)
      setIsLoading(false)
    }
    if (!user) {
      fetchData()
    }
  }, [])

  const logout = async () => {
    setIsGlobalLoading(true)
    await authService.logout()
    setUser(null)
    setIsGlobalLoading(false)
  }

  const login = async (email, password) => {
    setIsLoading(true)
    let loginResponse = await authService.login(email, password)

    if (loginResponse.status === 'Success') {
      setUser(loginResponse.user)
    }
    setIsLoading(false)
    return loginResponse
  }

  if (isGlobalLoading) return <Loading />

  return (
    <authContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </authContext.Provider>
  )
}

const useAuth = () => React.useContext(authContext)

export { AuthProvider, useAuth }
