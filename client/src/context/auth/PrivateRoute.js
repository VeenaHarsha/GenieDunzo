import React, { useContext, useEffect } from 'react'
import { Route, Redirect, useLocation, useHistory  } from 'react-router-dom'
import { AuthContext } from './AuthContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token, isAuthenticated } = useContext(AuthContext)
  const history = useHistory()
  const location = useLocation()
  useEffect(() => {
    token && history.push(location.pathname)
  }, [])

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )}
    />
  )
}

export default PrivateRoute
