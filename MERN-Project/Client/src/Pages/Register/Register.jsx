import React, { useState, useEffect } from 'react'
import './Register.css'
import { Link } from 'react-router-dom'
import validation from './RegisterValidation'
import Axios from 'axios'

const Register = () => {

  const [values, setValues] = useState({
    fname: '',
    lname: '',
    mobile: '',
    email: '',
    password: '',
    confirm_password: '',
  })
  const [errors, setErrors] = useState({})
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    if (refresh) { setErrors(validation(values)) }
  }, [values])


  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const RegisterHandler = (e) => {
    setRefresh(true)
    e.preventDefault()
    setErrors(validation(values))
    let url = 'http://localhost:7000/users'
    let allValues = values.fname !== "" && values.mobile !== "" && values.email !== "" && values.password !== "" && values.confirm_password !== ""
    // console.log(allValues)
    if (Object.keys(errors).length === 0 && !allValues) {
      Axios.post(url, values).then(() => {
        console.log(values)
      })
        .catch((e) => { console.log(e);})
    }
  }

  return <>
    <div className='Register-page-wrapper'>
      <div className='register-header'>
      <h1 className='register-heading'>Registration</h1>
      </div>
      <div className="register-container">
        <form onSubmit={RegisterHandler} className='register-form'>
          <div className="register-content name-wrapper">
            <div className="name-cols">
              <label className='register-label'>FirstName <span style={{ color: 'red' }}>*</span></label>
              <input type="text" name='fname' value={values.fname} className='register-input' onChange={changeHandler} />
              <p style={{ color: 'red' }}>{errors.fname}</p>
            </div>
            <div className="name-cols">
              <label className='register-label'>LastName (optional)</label>
              <input type="text" name='lname' value={values.lname} className='register-input' onChange={changeHandler} />
            </div>
          </div>
          <div className="register-content">
            <label className='register-label'>Mobile Number <span style={{ color: 'red' }}>*</span></label>
            <input type="number" name='mobile' value={values.mobile} className='register-input' onChange={changeHandler} />
            <p style={{ color: 'red' }}>{errors.mobile}</p>
          </div>
          <div className="register-content">
            <label className='register-label'>Email ID <span style={{ color: 'red' }}>*</span></label>
            <input type="text" name='email' value={values.email} className='register-input' onChange={changeHandler} />
            <p style={{ color: 'red' }}>{errors.email}</p>
          </div>
          <div className="register-content">
            <label className='register-label'>Password <span style={{ color: 'red' }}>*</span></label>
            <input type="password" name='password' value={values.password} className='register-input' onChange={changeHandler} />
            <p style={{ color: 'red' }}>{errors.password}</p>
          </div>
          <div className="register-content">
            <label className='register-label'>Confirm Password <span style={{ color: 'red' }}>*</span></label>
            <input type="password" name='confirm_password' value={values.confirm_password} className='register-input' onChange={changeHandler} />
            <p style={{ color: 'red' }}>{errors.confirm_password}</p>
          </div>
          <div className="submit-register-cont">
            <input type="submit" value='Register' className='register-btn' />
            <span className="exist-account-msg">Already have an account? <Link to='/login' className='navigate'>Login</Link></span>
          </div>
        </form>
      </div>
    </div>
  </>
}

export default Register
