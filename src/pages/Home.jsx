import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from '../components/core/HomePage/CTAButton' //call-to-action button
//importing video to be used in src attribute
import banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LearningALanguage from '../components/core/HomePage/LearningALanguage'
import Footer from '../components/common/Footer'
import InstructorSection from '../components/core/HomePage/InstructorSection';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import image from '../assets/Images/boxoffice.png'


const Home = () => {
  return (
    
    <div>
        {/* section 1 */}
        <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent z-0'>
            {/* navbar is left which might be in common*/}

            <Link to='/signup'>
           
                <div className='group mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit mt-16 p-1 border-b-[1px] border-[#FFFFFF2E]'>
                    <div className='flex items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight />
                    </div>
                </div>

            </Link>

            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future with
                <HighlightText text={'Coding Skills'}></HighlightText>
            </div>

            <div className='w-[90%] text-center text-lg font-bold text-richblack-300 mt-4'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className='flex gap-7 mt-8' >
                <CTAButton active={true} linkto='/signup'>Learn More</CTAButton>

                <CTAButton linkto='/login' active={false}>Book a Demo</CTAButton>
            </div>

            
            <div className='lg:shadow-[-15px_-10px_100px_rgba(8,_112,_184,_0.7)] shadow-[-5px_-5px_100px_rgba(8,_112,_184,_0.7)] mx-3 my-12 w-[85%] relative'>

                <div className='z-10 shadow-[15px_15px_0px_0px_white] hidden lg:block'><video src={banner} muted loop autoPlay></video></div>
                <img src={image} className='lg:hidden'/>
                
            </div>

            

            
            <div>
                <CodeBlocks position='lg:flex-row'
                heading={<div className='text-4xl font-semibold'>Unlock your <HighlightText text={'coding potential'}></HighlightText> with our online courses.
                </div>}
                subheading={'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'}
                ctabtn1={{btnText: 'Try it Yourself', linkto:'/signup', active:true}}
                ctabtn2={{btnText: 'Learn More', linkto:'/login', active:false}}
                
                
                >
                </CodeBlocks>
            </div>

            <div>
                <CodeBlocks position='lg:flex-row-reverse' 
                heading={<div className='text-4xl font-semibold'>Start<HighlightText text={'coding in seconds'}></HighlightText>
                </div>}
                subheading={`Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.`}
                ctabtn1={{btnText: 'Continue Lesson', linkto:'/signup', active:true}}
                ctabtn2={{btnText: 'Learn More', linkto:'/login', active:false}}
                >
                </CodeBlocks>
            </div>
            
            
            

            <ExploreMore/>

        
        </div>

        {/* section 2*/}

        <div className='bg-pure-greys-5 text-richblack-700'>

            <div className='homepage_bg h-[300px] -mt-[50%] lg:mt-0'>

                <div className='w-11/12 h-full flex items-end gap-5 mx-auto text-white justify-center pb-10'>
                    
                        <CTAButton active={true} linkto={'/signup'}>
                        <div className='flex items-center gap-3'>
                            Explore Full Catalog
                            <FaArrowRight/>
                        </div>
                        </CTAButton>
                        <CTAButton active={false} linkto={'/signup'}>Learn More</CTAButton>
                    
                </div>
                
            </div>

            <div className='flex w-11/12 mx-auto lg:h-[300px] lg:flex-row flex-col lg:pt-0 p-4'>
                <div className='flex text-4xl font-semibold items-center'>
                    <p>Get the skills you need for a <HighlightText text={'job that is in demand.'}/></p>
                    
                </div>

                
                <div className='flex flex-col gap-8 justify-center lg:mt-12 lg:w-[80%] mt-4'>
                    <p>
                        The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                    </p>
                    <div className='w-fit'>
                        <CTAButton active={true} linkto={'/signup'}>Learn More</CTAButton>
                    </div>
                    
                </div>
                    
            </div>

            <div className='w-11/12 mx-auto mb-[10%]'>
                <TimelineSection></TimelineSection>
            </div>
           
           <LearningALanguage></LearningALanguage>

        </div>

        {/* section 3 */}
        <InstructorSection/>
        <div className='lg:text-4xl text-2xl font-semibold text-white w-11/12 lg:text-center p-10 mx-auto'>
            Reviews from other learners
        </div>

        {/* slider */}



        {/* footer*/}
        <Footer/>
        
        

    </div>
  )
}

export default Home