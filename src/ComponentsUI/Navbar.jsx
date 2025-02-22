import React from 'react'
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='m-4 flex justify-between h-18 font-mono'>
      <Link to="/" >Logo</Link>

      <div >
        <ul class="list-none" className='flex flex-row justify-between gap-4' >
          <Link to="/" className='hover:bg-blue-400 border-none rounded-2xl p-1 cursor-pointer'>Overview</Link>
          <Link to="/" className='hover:bg-blue-400 border-none rounded-2xl p-1 cursor-pointer'>Patient Matrics</Link>
          <Link to="/" className='hover:bg-blue-400 border-none rounded-2xl p-1 cursor-pointer'>Appointments</Link>
          <Link to="/" className='hover:bg-blue-400 border-none rounded-2xl p-1 cursor-pointer'>Financials</Link>
      </ul>
      </div>

      <div><Button className='bg-blue-400'>Login/Signup</Button></div>
    </div>
  )
}

export default Navbar
