import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'

import { useAuth } from '../api/auth'
import Loading from './Common/Loading'

export default function PrivateRoute({ comp: Component, ...rest }) {
  const { user, userLoading } = useAuth()
  let location = useLocation()

  if (userLoading) return <Loading />

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
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
