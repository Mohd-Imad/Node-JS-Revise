import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import ResetPassword from './Pages/Login/ResetPassword/ResetPassword'
import Popup from './Pages/HOC Components/Popup/Popup'
import Home from './Pages/HomePage/Home'

const App = () => {

  let RegisterComponent = Popup(Register)
  let LoginComponent = Popup(Login)
  let ResetPasswordComponent=Popup(ResetPassword)

  return <>
    <Router>
    <Home />
      <Routes>
        <Route path='/login' element={<LoginComponent />} />
        <Route path='/reset' element={<ResetPasswordComponent />} />
        <Route path='/register' element={<RegisterComponent />} />
      </Routes>
    </Router>
  </>
}

export default App
