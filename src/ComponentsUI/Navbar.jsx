import React from 'react'
import { Button } from 'flowbite-react'
const Navbar = () => {
  return (
    <div className='m-4 flex justify-between h-18 font-mono'>
      <div>Logo</div>

      <div >
        <ul class="list-none" className='flex flex-row justify-between gap-4' >
          <li className='hover:bg-blue-400 border-none rounded-2xl p-1 cursor-pointer'>Overview</li>
          <li className='hover:bg-blue-400 border-none rounded-2xl p-1 cursor-pointer'>Patient Matrics</li>
          <li className='hover:bg-blue-400 border-none rounded-2xl p-1 cursor-pointer'>Appointments</li>
          <li className='hover:bg-blue-400 border-none rounded-2xl p-1 cursor-pointer'>Financials</li>
      </ul>
      </div>

      <div><Button className='bg-blue-400'>Login/Signup</Button></div>
    </div>
  )
}

export default Navbar
