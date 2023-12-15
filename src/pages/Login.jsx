import React from 'react'
import image from '../assets/Images/login.webp'
import { useState } from 'react'
import frame from '../assets/Images/frame.png'
import CTAButton from '../components/core/HomePage/CTAButton'

const Login = () => {

    const tabNames = [
        'Student',
        'Instructor'
        
    ]

    const [currentTab, setCurrentTab] = useState(tabNames[0])

  return (
    <div className='w-11/12 mx-auto flex text-white justify-evenly mt-[5%] gap-14'>

        <div className='flex flex-col gap-4 w-[30%]'>
            <h1 className='text-4xl font-semibold'>Welcome Back</h1>
            <p>Build skills for today, tomorrow, and beyond. <span className='text-blue-100 italic'>Education to future-proof your career.</span></p>

            <div className='flex bg-richblack-800 rounded-full w-fit border-b-[1px] border-[#FFFFFF2E] mt-4'>
            {tabNames.map((element, index) => (
                <div key={index} className={`${currentTab===element ? 'bg-richblack-900' : 'bg-richblack-800'} rounded-full m-2 py-[1px] px-2
                text-richblack-100 hover:bg-richblack-900 hover:cursor-pointer transition-all duration-200`} onClick={() => setCurrentTab(element)}
                >
                    {element}
                </div>
            ))}
            </div>

            <div>
                {/* pending */}
            </div>

            <CTAButton active={true}>Sign in</CTAButton>


        </div>

        <div>
           <img src={image} className='relative z-10'/>
           <img src={frame} className='absolute -z-0 -translate-y-[96%] translate-x-6'/>
        </div>

        

    </div>
  )
}

export default Login