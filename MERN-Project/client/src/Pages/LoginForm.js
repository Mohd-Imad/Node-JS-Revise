import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


const LoginForm = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

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
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post('http://127.0.0.1:7000/login', user);
        
        alert('Login successful:', response.data);
        console.log('Login successful:', response.data);

        // Reset form
        setUser({
          email: '',
          password: ''
        });
        setErrors({});
        setIsLoggedIn(true);
        navigate('/')
      } catch (error) {
        alert('Login error:', error);
        console.error('Login error:', error);
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

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert("Logout Success")
    console.log("Logout Success")
    // Route to the login page or another appropriate route
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <div className="col-4">
        <div className="card">
          <div className="card-header bg-dark text-light">
            <h2>Login Form</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
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
              <div className="mb-2">
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
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <button type="button" className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
