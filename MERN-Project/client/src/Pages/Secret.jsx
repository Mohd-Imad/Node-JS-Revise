import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import useAuth from './Components/useAuth'; // Import the useAuth hook
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Secret = () => {
  // Call the useAuth hook to enforce authentication
  useAuth()


  const [usersData, setUsersData] = useState(null);
  const navigate = useNavigate()

    useEffect(()=>{
      if(!Cookies.get('jwtCookie')){
        alert("Login to access this page...!") 
      console.log("Login to access this page...!") 
          navigate('/login')
      }
    },[])

  const getUsersData = async () => {
    try {
      const response = await Axios.get('http://127.0.0.1:7000/users');
      setUsersData(response.data);
    } catch (error) {
      console.log(error);
      // Handle the error according to your application's requirements
    }
  };

  return (
    <>
        <h1>Secret</h1>
        <p>This page is accessible only when the user is logged in</p>

        <button className="btn btn-success" onClick={getUsersData}>
          Get Data
        </button>

        {usersData && (
          <div>
            <h2>Users Data:</h2>
            <pre>{JSON.stringify(usersData, null, 2)}</pre>
          </div>
        )}
    </>
  );
};

export default Secret;
