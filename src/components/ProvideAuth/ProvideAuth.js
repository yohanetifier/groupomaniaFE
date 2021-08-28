import { useState, createContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

export function SecuredRoute({ children, ...rest }) {
    if (localStorage.getItem('token')) {
      return <Route {...rest}>{children}</Route>
    } else {
      return <Redirect to="/login"></Redirect>
    }
  }

 


