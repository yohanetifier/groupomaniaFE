import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Signup from './components/Signup/Signup'
import HeaderConnectionPage from './components/HeaderConnectionPage/HeaderConnectionPage'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import { SecuredRoute } from './components/Login/Login'
import Profil from './components/Profil/Profil'
import UpdateProfile from './components/UpdateProfile/UpdateProfile'
import DeleteProfile from './components/DeleteProfile/DeleteProfile'
import ChangePassword from './components/ChangePassword/ChangePassword'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/">
        <HeaderConnectionPage />
        <Signup />
      </Route>
      <Route path="/login">
        <HeaderConnectionPage />
        <Login />
      </Route>
      <Switch>
        <SecuredRoute path="/home/:id">
          <Home />
        </SecuredRoute>
        <Route path="/profile/:id">
          <Profil />
        </Route>
        <Route path="/updateprofile/:id">
          <UpdateProfile />
        </Route>
      </Switch>
      <Route path="/deleteprofile/:id">
        <DeleteProfile />
      </Route>
      <Route path="/changepassword/:id">
        <ChangePassword />
      </Route>
      <Route path="/publication/:id">

      </Route>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
