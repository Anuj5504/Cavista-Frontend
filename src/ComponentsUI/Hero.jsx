import React from 'react'
import { Button } from 'flowbite-react'
import { FaArrowRight } from "react-icons/fa";
const Hero = () => {
return (
    <div className='align-middle grid grid-cols-1 md:grid-cols-2 gap-10 h-screen w-screen my-10 p-5'>

        <div className='flex flex-col gap-5 mx-auto my-auto text-center md:text-left'>
             <div className='font-extrabold text-4xl md:text-6xl'>Healthy</div>
             <div className='font-mono text-sm md:text-base'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa laborum ipsa, odit qui 
                    fugit maxime! Maxime nisi non explicabo ratione eligendi aliquid voluptas nesciunt ex assumenda! Quod nihil rerum optio?</div>
         <Button className='h-12 w-32 bg-blue-500 mx-auto md:mx-0'>Get Started  <div ><FaArrowRight /></div></Button>
         </div>

        <div className='flex flex-col gap-5 mx-auto my-auto'>
            Image
                <img src="" alt="Hero Image" className='w-full h-auto' />
        </div>

    </div>
)
}

export default Hero
