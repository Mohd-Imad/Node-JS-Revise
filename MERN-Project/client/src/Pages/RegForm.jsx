import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const RegForm = () => {
  const [user, setUser] = useState({
    fname: '',
    lname: '',
    mobile: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (user.fname.trim() === '') {
      newErrors.fname = 'First name is required';
      valid = false;
    }

    if (user.mobile.trim() === '') {
      newErrors.mobile = 'Mobile number is required';
      valid = false;
    } else if (!/^\d+$/.test(user.mobile)) {
      newErrors.mobile = 'Mobile number should contain only digits';
      valid = false;
    }

    if (user.email.trim() === '') {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (user.password.trim() === '') {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (user.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      valid = false;
    }

    if (user.confirm_password.trim() === '') {
      newErrors.confirm_password = 'Confirm password is required';
      valid = false;
    } else if (user.password !== user.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const token = Cookies.get('jwtCookie'); // Use the correct cookie name 'jwtCookie'
  console.log(token);

  const api = axios.create({
    baseURL: 'http://127.0.0.1:7000', // Your API base URL without '/users'
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await api.post('/users', user); // Use the 'api' instance to make the request
        Cookies.set('jwtCookie', response.data.token, { expires: 1 });
        alert('Registration successful...!', response.data);
        console.log('Registration successful...!', response.data);

        // Reset form
        setUser({
          fname: '',
          lname: '',
          mobile: '',
          email: '',
          password: '',
          confirm_password: ''
        });
        setErrors({});
        navigate('/login');
      } catch (error) {
        if (error.response && error.response.status === 409) {
          // Handle conflict error (409) when a user with the same email already exists
          alert('User with this email already exists. Please use a different email.');
        } else {
          // Handle other errors
          alert('Registration error..!', error.message);
        }
        console.error('Registration error...!', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="container mt-5">
      <div className="col-6">
        <div className="card">
          <div className="card-header bg-dark text-light">
            <h2>Registration</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="fname" className="form-label">
                  First name
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.fname && 'is-invalid'}`}
                  id="fname"
                  name="fname"
                  value={user.fname}
                  onChange={handleInputChange}
                  required
                />
                {errors.fname && <div className="invalid-feedback">{errors.fname}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="lname" className="form-label">
                  Last name (optional)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lname"
                  name="lname"
                  value={user.lname}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  Mobile
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.mobile && 'is-invalid'}`}
                  id="mobile"
                  name="mobile"
                  value={user.mobile}
                  onChange={handleInputChange}
                  required
                />
                {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.email && 'is-invalid'}`}
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  required
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className={`form-control ${errors.password && 'is-invalid'}`}
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                  required
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="confirm_password" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className={`form-control ${errors.confirm_password && 'is-invalid'}`}
                  id="confirm_password"
                  name="confirm_password"
                  value={user.confirm_password}
                  onChange={handleInputChange}
                  required
                />
                {errors.confirm_password && (
                  <div className="invalid-feedback">{errors.confirm_password}</div>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegForm;
