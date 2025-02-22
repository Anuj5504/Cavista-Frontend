import React, { useState } from 'react'
import Login from './Login'
import FamilyHome from './FamilyHome'
import Register from './Register';

const Family = () => {
    const [step, setstep] = useState(0);
    const [login, setlogin] = useState(0);
    const [userData, setuserData] = useState({
        name:"",
        email:"",   
        role:"" ,
        password:""
    });
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <div className='w-[50vw] h-[70vh]'>
            {step===0 && login===0 && <Login userData={userData} setuserData={setuserData} step={step} setstep={setstep} setlogin={setlogin}/> }
            {step===0 && login===1 && <Register userData={userData} setuserData={setuserData} step={step} setstep={setstep} setlogin={setlogin}/> }
            {step===1 && <FamilyHome userData={userData} step={step} setstep={setstep}/> }
        </div>

    </div>
  )
}

export default Family