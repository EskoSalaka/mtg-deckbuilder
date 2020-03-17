import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'

import { useAuth } from '../AuthContext'

export default function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useAuth()
  let location = useLocation()

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
