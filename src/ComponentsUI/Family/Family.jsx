import React, { useState } from 'react'
import Login from './Login'
import FamilyHome from './FamilyHome'

const Family = () => {
    const [step, setstep] = useState(0);
    const [userData, setuserData] = useState({
        email:"",   
        role:"" ,
        password:""
    });
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <div className='w-[50vw] h-[70vh]'>
            {step===0 && <Login userData={userData} setuserData={setuserData} step={step} setstep={setstep}/> }
            {step===1 && <FamilyHome userData={userData} step={step} setstep={setstep}/> }
        </div>

    </div>
  )
}

export default Family