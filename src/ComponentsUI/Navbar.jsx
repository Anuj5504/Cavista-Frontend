import React from 'react'
import { Button } from 'flowbite-react'
const Navbar = () => {
  return (
    <div className='m-4 flex justify-between h-18 font-mono'>
      <div>Logo</div>

      <div >
        <ul class="list-none" className='flex flex-row justify-between' >
          <li>Overview</li>
          <li>Patient Matrics</li>
          <li>Appointments</li>
          <li>Financials</li>
 
      </ul>
      </div>

      <div><Button className='bg-blue-400'>Login/Signup</Button></div>
    </div>
  )
}

export default Navbar
