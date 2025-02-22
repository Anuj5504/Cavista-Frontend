import React from 'react'
import { useState } from 'react'
import Navbar from './ComponentsUI/Navbar'
import Hero from './ComponentsUI/Hero'
import HealthCare from './Pages/HealthCare';
import {Routes,Route} from 'react-router-dom';
import Login from './ComponentsUI/Family/Login';
import Family from './ComponentsUI/Family/Family';
import Register from './ComponentsUI/Family/Register';

function App() {


  return (
    <>
      <div>
        <Navbar />
        <Navbar></Navbar>
        <Routes>

          <Route path="/" element = {<Hero></Hero> } ></Route>
          <Route path="/HealthCare" element = {<HealthCare></HealthCare> } ></Route>
          <Route path="/login-patient" element={<Family/>}></Route>
          <Route path="/register-patient" element={<Register/>}></Route>
        </Routes> 
      </div>
    </>
  )
}

export default App
