import React from 'react'
import image from '../../../assets/Images/Instructor.png'
import HighlightText from '../../common/HighlightText'
import { FaArrowRight } from "react-icons/fa";
import CTAButton from '../../common/CTAButton';

const InstructorSection = () => {
  return (
    <div className='w-11/12 mx-auto lg:m-16 flex items-center justify-around lg:flex-row flex-col'>


        <div className='w-[40%]  hidden lg:block'>
          <img src={image} className='relative z-10'/>
          
        </div>

        <div className='flex flex-col lg:w-[50%] gap-8 lg:pl-[5%] mt-6 lg:mt-0'>
          <div className='font-bold text-4xl'>
            <p className='text-white'>Become an</p>
            <HighlightText text={'instructor'}></HighlightText>
          </div>
          <p className='text-richblack-100 w-[85%]'>Instructors from around the world teach millions of students on StudyNotion. 
          We provide the tools and skills to teach what you love.</p>
          <div className='lg:hidden'>
            <img src={image} className='relative z-10'/>
          
          </div>
          <div className='w-fit'>
            <CTAButton active={true} linkto={'/signup'}>
              <div className='flex items-center gap-2'>
                <p>Start Learning Today</p>
                <FaArrowRight></FaArrowRight>
              </div>
            </CTAButton>
          </div>
        </div>


    </div>
  )
}

export default InstructorSection