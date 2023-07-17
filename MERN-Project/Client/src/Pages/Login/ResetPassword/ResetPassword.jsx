import React from 'react'
import './ResetPassword.css'

const ResetPassword = () => {
  return <>
    <form className='reset-form'>
      <h1 className='reset-heading'>Reset Password</h1>
      <span className="lost-password-msg">Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.</span>
      <div className="reset-content">
        <label className='reset-label'>Username or email</label>
        <input type="text" className='reset-input' />
      </div>
      <div className="submit-form-cont">
        <input type="submit" value='Reset password' className='reset-btn' />
      </div>
    </form>
  </>
}

export default ResetPassword
