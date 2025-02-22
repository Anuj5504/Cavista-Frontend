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

                    <div className='flex w-40 justify-center items-center  bg-blue-500 rounded-lg'>
                    <Button className=' bg-blue-500 hover:bg-blue-500'>Get Started </Button>
                    <div ><FaArrowRight className='' /></div>

                    </div>
              
  
         </div>

        <div className='flex flex-col gap-5 mx-auto my-auto'>
                <img src="https://cdn.prod.website-files.com/65f6ba266e0d7c8372e4b4cf/65fbb9b8ced567ebab4eab0a_banner.webp" alt="Hero Image" className='w-full h-auto' />
        </div>

    </div>
)
}

export default Hero
