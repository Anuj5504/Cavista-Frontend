import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FamilyMenu from './ComponentsUI/FamilyMenu'
import FamilyDashboard from './ComponentsUI/FamilyDashboard'
import FamilyMembers from './ComponentsUI/FamilyMembers'
import MyFamilyHealth from './ComponentsUI/MyFamilyHealth'
import Navbar from './ComponentsUI/Navbar'
import Hero from './ComponentsUI/Hero'
import HealthCare from './Pages/HealthCare'

const App = () => {
  return (
    <>
    {/* <Router>
      <div className="flex">
        <div className="w-64 fixed h-screen">
          <FamilyMenu />
        </div>
        <div className="flex-1 ml-64">
          <Routes>
            <Route path="/" element={<FamilyDashboard />} />
            <Route path="/family-members" element={<FamilyMembers />} />
            <Route path="/family-health" element={<MyFamilyHealth />} />
          </Routes>
        </div>
      </div>
    </Router> */}
    <FamilyDashboard/>
    <FamilyMembers/>
    <FamilyMenu/>
    </>
  )
}

export default App
