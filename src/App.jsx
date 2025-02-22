import React from 'react'
import { useState } from 'react'
import Navbar from './ComponentsUI/Navbar'
import Hero from './ComponentsUI/Hero'
import Family from './ComponentsUI/Family/Family'
function App() {


  return (
    <>
      <div>
        <Navbar/>
        {/* <Hero/> */}
        <Family/>
      </div>
    </>
  )
}

export default App
