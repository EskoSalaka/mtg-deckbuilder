import React, { createContext, useEffect, useState } from 'react'
import Loading from '../components/Common/Loading'
import { useApi } from './apiClient'

const authContext = createContext({})

const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null)

  const [{ response: userResponse, loading: userLoading, error: userError }, refecthUser] = useApi(
    '/user'
  )
  const [{ response: loginResponse, loading: loginLoading, error: loginError }, login] = useApi(
    {
      url: '/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
    { manual: true }
  )

  const [{ response: logoutResponse, loading: logoutLoading, error: logoutError }, logout] = useApi(
    {
      url: '/logout',
      method: 'POST',
    },
    { manual: true }
  )

  const [
    { response: signupResponse, loading: signuptLoading, error: signupError },
    signup,
  ] = useApi(
    {
      url: '/signup',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
    { manual: true }
  )

  useEffect(() => {
    if (loginResponse?.status === 200) {
      console.log('login fired', loginResponse)
      refecthUser()
    }
  }, [loginResponse, refecthUser])

  useEffect(() => {
    if (logoutResponse) {
      setuser(null)
    }
  }, [logoutResponse, refecthUser])

  useEffect(() => {
    if (userResponse?.status === 200) {
      setuser(userResponse.data.user)
    }
  }, [userResponse])

  useEffect(() => {
    if (userError) {
      setuser(null)
    }
  }, [userError])

  if (userLoading) return <Loading />

  return (
    <authContext.Provider
      value={{
        user: user,
        useLogin: [{ response: loginResponse, loading: loginLoading, error: loginError }, login],
        useLogout: [
          { response: logoutResponse, loading: logoutLoading, error: logoutError },
          logout,
        ],
        useSignup: [
          { response: signupResponse, loading: signuptLoading, error: signupError },
          signup,
        ],
      }}
    >
      {children}
    </authContext.Provider>
  )
}

const useAuth = () => React.useContext(authContext)

export { AuthProvider, useAuth }
