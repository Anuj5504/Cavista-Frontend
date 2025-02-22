import React from 'react'
import { useState } from 'react'
import FamilyMember from './ComponentsUI/FamilyMembers'
import Family from './ComponentsUI/FamilyMenu'
import Chart from 'chart.js/auto';
import FamilyDashboard from './ComponentsUI/FamilyDashboard';
import Navbar from './ComponentsUI/Navbar'
import Hero from './ComponentsUI/Hero'
import HealthCare from './Pages/HealthCare';
import {Routes,Route} from 'react-router-dom';
function App() {


  return (
    <>
      <div>
       <FamilyDashboard/>
        <Navbar></Navbar>
        <Routes>

          <Route path="/" element = {<Hero></Hero> } ></Route>
          <Route path="/HealthCare" element = {<HealthCare></HealthCare> } ></Route>
       

        </Routes>
      </div>
    </>
  )
}

export default App
