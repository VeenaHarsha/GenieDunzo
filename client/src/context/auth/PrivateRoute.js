import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import {AuthContext} from './AuthContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loadUser} = useContext(AuthContext)
 
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated && loadUser ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/'}} />
        )}
    />
  )
}

export default PrivateRoute