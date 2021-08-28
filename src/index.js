import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import Signup from './components/Signup/Signup'
import HeaderConnectionPage from './components/HeaderConnectionPage/HeaderConnectionPage'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import { SecuredRoute } from './components/ProvideAuth/ProvideAuth'
import Profil from './components/Profil/Profil'
import UpdateProfile from './components/UpdateProfile/UpdateProfile'
import DeleteProfile from './components/DeleteProfile/DeleteProfile'
import ChangePassword from './components/ChangePassword/ChangePassword'
import Post from './components/Post/Post'
import PostCard from './components/PostCard/PostCard'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Switch>
        <SecuredRoute path="/home/:id/">
          <Home />
        </SecuredRoute>
        <SecuredRoute path="/profile/:id">
          <Profil />
        </SecuredRoute>
        <SecuredRoute path="/updateprofile/:id">
          <UpdateProfile />
        </SecuredRoute>
        {/* </Switch> */}
        <SecuredRoute path="/deleteprofile/:id">
          <DeleteProfile />
        </SecuredRoute>
        <SecuredRoute path="/changepassword/:id">
          <ChangePassword />
        </SecuredRoute>
        <SecuredRoute path="/publication/:id">
          <Post />
        </SecuredRoute>
        <SecuredRoute path="/post/:id">
          <PostCard />
        </SecuredRoute>
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
