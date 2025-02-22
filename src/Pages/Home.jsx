import FAQSection from '../ComponentsUI/FAQSection'
import Hero from '../ComponentsUI/Hero'

import React from 'react'

function Home() {
  return (
    <div className='w-full min-h-screen overflow-hidden flex flex-col items-center justify-center'>
        <Hero/>
        <FAQSection/>
    </div>
  )
}

export default Home