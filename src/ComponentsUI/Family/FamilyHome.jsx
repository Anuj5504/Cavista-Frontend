import React from 'react'
import JoinFamily from './JoinFamily'
import CreateFamily from './CreateFamily'

const FamilyHome = (userData) => {
    console.log(userData)
  return (
    <div>
       {userData.userData.role==='admin'? <CreateFamily/>:<JoinFamily/>}
   
       
    </div>
  )
}

export default FamilyHome