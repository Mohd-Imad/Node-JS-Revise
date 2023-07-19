import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import Navbar from './Pages/Components/Navbar';
import RegForm from './Pages/RegForm';
import LoginForm from './Pages/LoginForm';
import Secret from './Pages/Secret';

function App() {
  return (
    <>
    <Router>
        <Navbar/> 
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/users' element={<RegForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/secret' element={<Secret />} />
        </Routes>
    </Router>

    </>
  );
}

export default App;
