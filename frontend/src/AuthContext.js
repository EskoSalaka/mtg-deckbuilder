import React, { createContext, useState, useEffect } from 'react'
import Loading from './components/Common/Loading'
import authService from './services/auth'

const authContext = createContext({})

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loginResponse, setLoginResponse] = useState(null)
  console.log(user)

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
  }, [])

  const logout = async () => {
    setIsLoading(true)
    await authService.logout()
    setUser(null)
    setIsLoading(false)
  }

  const login = async (email, password) => {
    setIsLoading(true)
    let loginResponse = await authService.login(email, password)

    if (loginResponse.status === 'Success') {
      setUser(loginResponse.user)
    }
    setLoginResponse(loginResponse)

    setIsLoading(false)
  }

  if (isLoading) return <Loading />

  return (
    <authContext.Provider value={{ user, login, loginResponse, logout }}>
      {children}
    </authContext.Provider>
  )
}

const useAuth = () => React.useContext(authContext)

export { AuthProvider, useAuth }
