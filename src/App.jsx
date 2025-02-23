import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FamilyMenu from './ComponentsUI/FamilyMenu'
// import FamilyDashboard from './ComponentsUI/FamilyDashboard' 
import FamilyMembers from './ComponentsUI/FamilyMembers'
import MyFamilyHealth from './ComponentsUI/MyFamilyHealth'
import Navbar from './ComponentsUI/Navbar'
import Hero from './ComponentsUI/Hero'
import HealthCare from './Pages/HealthCare';
import Login from './ComponentsUI/Family/Login';
import Family from './ComponentsUI/Family/Family';
import Register from './ComponentsUI/Family/Register';
import HealthLogin from './ComponentsUI/HealthCare/HealthLogin';
import HealthRegister from './ComponentsUI/HealthCare/HealthRegister';
import CareLogin from './ComponentsUI/CareGiver/CareLogin';
import CareRegister from './ComponentsUI/CareGiver/CareRegister';
import Caregiver from './Pages/Caregiver';
import Footer from './ComponentsUI/Footer';
import FamDashboard from './Pages/Family';
import Home from './Pages/Home'
import AssignTask from './Caregiver/AssignTask'
import TalkAI from './TalkAI';

const hardcodedToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1EzTlQiLCJzdWIiOiJDSEYyUzkiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJlY2cgcnNldCByaXJuIHJveHkgcnBybyBybnV0IHJzbGUgcmNmIHJhY3QgcnJlcyBybG9jIHJ3ZWkgcmhyIHJ0ZW0iLCJleHAiOjE3NDAyOTE1NDEsImlhdCI6MTc0MDI2Mjc0MX0.PJmxNXndGpKMLBgyrl_qNh8SdA4i0zoAIqC65n5ZaOc";
localStorage.setItem("fitbitToken", hardcodedToken);


const App = () => {
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home></Home>} ></Route>
          <Route path="/home" element={<Home></Home>} ></Route>
          <Route path="/HealthCare" element={<HealthCare></HealthCare>} ></Route>
          <Route path="/login-patient" element={<Family />}></Route>
          <Route path="/register-patient" element={<Register />}></Route>
          {/* <Route path="/home" element={<Home/>}></Route> */}
          <Route path="/login-healthprovider" element={<HealthLogin />}></Route>
          <Route path="/register-healthprovider" element={<HealthRegister />}></Route>
          <Route path="/login-caregiver" element={<CareLogin />}></Route>
          <Route path="/register-caregiver" element={<CareRegister />}></Route>
          <Route path="/family" element={<FamDashboard />}></Route>
          <Route path="/healthproviderdashboard" element={<HealthCare />}></Route>
          <Route path="/caregiver" element={<Caregiver />}></Route>
          <Route path="/caregiver/assign-task/:id" element={<AssignTask />} />
          <Route path="/talk-ai" element={<TalkAI />} />

        </Routes>
        <Footer />
      </div>
    </>

  )
}
export default App;
