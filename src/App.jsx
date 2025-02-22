import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FamilyMenu from './ComponentsUI/FamilyMenu'
import FamilyDashboard from './ComponentsUI/FamilyDashboard'
import FamilyMembers from './ComponentsUI/FamilyMembers'
import MyFamilyHealth from './ComponentsUI/MyFamilyHealth'
import Navbar from './ComponentsUI/Navbar'
import Hero from './ComponentsUI/Hero'
import HealthCare from './Pages/HealthCare'
import Family from './Pages/Family'

const App = () => {
  return (
    <>

      
        <Navbar></Navbar>
        <Routes>

          <Route path="/" element = {<Hero></Hero> } ></Route>
          <Route path='/FamilyDashboard' element={<FamilyDashboard></FamilyDashboard>}></Route>
          <Route path='/Family' element={<Family></Family>} ></Route>
          <Route path="HealthCare" element={<HealthCare></HealthCare>}></Route>
       

        </Routes>

    </>

  )
}

export default App
