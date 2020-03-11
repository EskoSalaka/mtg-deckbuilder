import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import auth from '../services/auth'

import CircularProgress from '@material-ui/core/CircularProgress'
import Loading from './Common/Loading'

export default function PrivateRoute({ component: Component, ...rest }) {
  const [isLoggedIn, error, isLoading] = auth.useIsLoggedIn()
  let location = useLocation()

  if (isLoading) return <Loading />

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoading ? (
          <CircularProgress />
        ) : isLoggedIn ? (
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
