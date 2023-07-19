import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie';

const Navbar = () => {

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      // Make a POST request to the logout route on the server
      await axios.post('http://127.0.0.1:7000/logout');

      // Redirect to the login page or any other page after successful logout
    //   localStorage.removeItem('token')
    Cookies.remove('jwtCookie') 
    {alert("Logout Successful")}
      navigate('/login');
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  return <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <Link class="navbar-brand mb-0 h1" to="/">Navbar</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/secret">Secret</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/users">Register</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/login">Login</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" onClick={handleLogout}  to="#" >logout</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  </>
}

export default Navbar