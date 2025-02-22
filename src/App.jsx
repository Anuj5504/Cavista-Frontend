import React from 'react'
import { useState } from 'react'
import Navbar from './ComponentsUI/Navbar'
import Hero from './ComponentsUI/Hero'
import HealthCare from './Pages/HealthCare';
import { Routes, Route } from 'react-router-dom';
import Login from './ComponentsUI/Family/Login';
import Family from './ComponentsUI/Family/Family';
import Register from './ComponentsUI/Family/Register';
import HealthLogin from './ComponentsUI/HealthCare/HealthLogin';
import HealthRegister from './ComponentsUI/HealthCare/HealthRegister';
import CareLogin from './ComponentsUI/CareGiver/CareLogin';
import CareRegister from './ComponentsUI/CareGiver/CareRegister';
import Footer from './ComponentsUI/Footer';
function App() {


  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Hero></Hero>} ></Route>
          <Route path="/HealthCare" element={<HealthCare></HealthCare>} ></Route>
          <Route path="/login-patient" element={<Family />}></Route>
          <Route path="/register-patient" element={<Register />}></Route>
          {/* <Route path="/home" element={<Home/>}></Route> */}
          <Route path="/login-healthprovider" element={<HealthLogin />}></Route>
          <Route path="/register-healthprovider" element={<HealthRegister />}></Route>
          <Route path="/login-caregiver" element={<CareLogin />}></Route>
          <Route path="/register-caregiver" element={<CareRegister />}></Route>
        </Routes>
        {/* <Footer/> */}
      </div>
    </>
  )
}

export default App
