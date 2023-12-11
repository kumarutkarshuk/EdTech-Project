import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from '../components/core/HomePage/CTAButton'
//importing video to be used in src attribute
import banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'


const Home = () => {
  return (
    //hw -> finishing
    <div>
        {/* section 1 */}
        <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent'>
            {/* header is left */}

            <Link to='/signup'>
           
                <div className='group mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit mt-16 p-1'>
                    <div className='flex items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future With Coding Skills
                <HighlightText text='Coding Skills'></HighlightText>
            </div>

            <div className='w-[90%] text-center text-lg font-bold text-richblack-300 mt-4'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className='flex gap-7 mt-8' >
                <CTAButton active={true} linkto='/signup'>Learn More</CTAButton>

                <CTAButton linkto='/login' active={false}>Book a Demo</CTAButton>
            </div>

            <div className='shadow-blue-200 mx-3 my-12'>
                <video src={banner} muted loop autoPlay></video>
            </div>

            
            <div>
                <CodeBlocks position='lg:flex-row' 
                heading={<div className='text-4xl font-semibold'>Unlock your <HighlightText text='coding potential'></HighlightText> with our online course
                </div>}
                subheading='Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'
                ctabtn1={{btnText: 'try it yourself', linkto:'/signup', active:true}}
                ctabtn2={{btnText: 'learn more', linkto:'/login', active:false}}
                codeblock='<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n'
                codeColor='text-yellow-25'
                >
                </CodeBlocks>
            </div>

            <div>
                <CodeBlocks position='lg:flex-row-reverse' 
                heading={<div className='text-4xl font-semibold'>Unlock your <HighlightText text='coding potential'></HighlightText> with our online course
                </div>}
                subheading='Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'
                ctabtn1={{btnText: 'try it yourself', linkto:'/signup', active:true}}
                ctabtn2={{btnText: 'learn more', linkto:'/login', active:false}}
                codeblock='<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n'
                codeColor='text-yellow-25'
                >
                </CodeBlocks>
            </div>
            
            


        




        {/* section 2 */}
        {/* section 3 */}
        {/* footer */}
        </div>
    </div>
  )
}

export default Home