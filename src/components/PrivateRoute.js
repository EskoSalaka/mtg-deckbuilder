import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'

import { useAuth } from '../AuthContext'

export default function PrivateRoute({ component: Component, ...rest }) {
  const { user, isLoading } = useAuth()
  let location = useLocation()
  console.log('proute', user)

  if (isLoading) return null

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}
