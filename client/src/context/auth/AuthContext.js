import React, { createContext, useReducer } from 'react'
import AuthReducer from './AuthReducer'

const initialState = {
  token: window.localStorage.getItem('token'),
  userRegistered: false,
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null
}
export const AuthContext = createContext()

export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState)

  const loadUser = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'x-auth-token': window.localStorage.getItem('token')
      }
    }
    try {
      const response = await window.fetch('/dunzo/auth/user', options)
      const data = await response.json()
      console.log('DATA:', data)
      if(data.msg) {
      console.log('LOAD USER DATA:', data)
        dispatch({ type: 'LOGOUT' })
        return
      }
      dispatch({
        type: 'LOAD_USER',
        payload: data
      })
    } catch (err) {
      dispatch({ type: 'ERROR' })
    }
  }

  const register = async (formData) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }
    try {
      const response = await window.fetch('/dunzo/users/register/', options)
      const data = await response.json()
      if (data) {
        dispatch({
          type: 'REGISTER',
          payload: data
        })
        // loadUser()
      } else {
        dispatch({
          type: 'ERROR',
          payload: data
        })
      }
    } catch (err) {
      console.log('ERROR', err)
    }
  }

  const login = async (formData) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }
    try {
      const response = await window.fetch('/dunzo/auth/', options)
      const data = await response.json()
      if (data.token) {
        dispatch({ type: 'LOGIN', payload: data })
        // loadUser()
      } else {
        dispatch({
          type: 'ERROR',
          payload: data
        })
      }
    } catch (err) {
      console.log('ERROR', err)
    }
  }
  // Logout
  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }
  return (
    <AuthContext.Provider value={{
      token: state.token,
      userRegistered: state.userRegistered,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      error: state.error,
      loading: state.loading,
      login: login,
      logout: logout,
      register: register,
      loadUser: loadUser
    }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
