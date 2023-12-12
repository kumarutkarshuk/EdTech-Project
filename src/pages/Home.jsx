import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from '../components/core/HomePage/CTAButton'
//importing video to be used in src attribute
import banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import studyNotionLogo from '../assets/Logo/Logo-Full-Light.png'
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const Home = () => {
  return (
    
    <div>
        {/* section 1 */}
        <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent z-0'>
            {/* header is left */}

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

            
            <div className='shadow-blue-200 mx-3 my-12 w-[85%] relative'>
                <div className='z-10'><video src={banner} muted loop autoPlay></video></div>
                <div className='absolute bg-white w-full h-full translate-x-4 -translate-y-[97%] -z-10 '></div>
            </div>

            

            
            <div>
                <CodeBlocks position='lg:flex-row'
                heading={<div className='text-4xl font-semibold'>Unlock your <HighlightText text={'coding potential'}></HighlightText> with our online courses.
                </div>}
                subheading={'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'}
                ctabtn1={{btnText: 'Try it Yourself', linkto:'/signup', active:true}}
                ctabtn2={{btnText: 'Learn More', linkto:'/login', active:false}}
                codeblock={'<!DOCTYPE html>\n<html>\n<head><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n</nav>'}
                codeColor='text-yellow-25'
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
                codeblock={'<!DOCTYPE html>\n<html>\n<head><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n</nav>'}
                codeColor='text-yellow-25'
                >
                </CodeBlocks>
            </div>
            
            {/* one area left */}

        
        </div>
        {/* section 2 */}
        {/* section 3 */}





        {/* footer*/}
        <div className='bg-richblack-800 text-richblack-400'>
            <div className=' flex justify-evenly p-8'>

                <div className='flex flex-col gap-4'>
                    <img src={studyNotionLogo}/>
                    <h2 className='font-bold text-richblack-100'>Company</h2>
                    <ul className='flex flex-col gap-2'>
                        <li>About</li>
                        <li>Careers</li>
                        <li>Affiliates</li>
                    </ul>
                    <div className='flex gap-2'>
                        <FaFacebookF />
                        <FaGoogle />
                        <FaTwitter />
                        <FaYoutube />                    
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <h2 className='font-bold text-richblack-100'>Resources</h2>
                    <ul className='flex flex-col gap-2'>
                        <li>Articles</li>
                        <li>Blog</li>
                        <li>Chart Sheet</li>
                        <li>Code Challenges</li>
                        <li>Docs</li>
                        <li>Projects</li>
                        <li>Videos</li>
                        <li>Workspaces</li>
                    </ul>
                    <h2>Support</h2>
                    <p>Help Center</p>
                </div>

                <div className='flex flex-col gap-2'>
                    <h2 className='font-bold text-richblack-100'>Plans</h2>
                    <ul className='flex flex-col gap-2'>
                        <li>Paid Memberships</li>
                        <li>For Students</li>
                        <li>Business Solutions</li>
                    </ul>
                    <h2 className='font-bold mt-8 text-richblack-100'>Community</h2>
                    <ul className='flex flex-col gap-2'>
                        <li>Forums</li>
                        <li>Chapters</li>
                        <li>Events</li>
                    </ul>
                </div>

                <div className='bg-richblack-700 w-[1px]'></div>

                <div className='flex flex-col gap-2'>
                    <h2 className='font-bold text-richblack-100'>Subjects</h2>
                    <ul className='flex flex-col gap-2'>
                        <li>AI</li>
                        <li>Cloud Computing</li>
                        <li>Code Foundations</li>
                        <li>Computer Science</li>
                        <li>Cybersecurity</li>
                        <li>Data Analytics</li>
                        <li>Data Science</li>
                        <li>Data Visualization</li>
                        <li>Developer Tools</li>
                        <li>DevOps</li>
                        <li>Game Development</li>
                        <li>IT</li>
                        <li>Machine Learning</li>
                        <li>Math</li>
                        <li>Mobile Development</li>
                        <li>Web Design</li>
                        <li>Web Development</li>
                    </ul>
                </div>

                <div className='flex flex-col gap-2'>
                    <h2 className='font-bold text-richblack-100'>Languages</h2>
                    <ul className='flex flex-col gap-2'>
                        <li>Bash</li>
                        <li>C</li>
                        <li>C++</li>
                        <li>C#</li>
                        <li>Go</li>
                        <li>HTML & CSS</li>
                        <li>Java</li>
                        <li>JavaScript</li>
                        <li>Kotlin</li>
                        <li>PHP</li>
                        <li>Python</li>
                        <li>R</li>
                        <li>Ruby</li>
                        <li>SQL</li>
                        <li>Swift</li>
                    </ul>
                </div>

                <div className='flex flex-col gap-2'>
                    <h2 className='font-bold text-richblack-100'>Career Building</h2>
                    <ul className='flex flex-col gap-2'>
                        <li>Career Paths</li>
                        <li>Career Services</li>
                        <li>Interview Prep</li>
                        <li>Professional Certification</li>
                        <li>-</li>
                        <li>Full Catalog</li>
                        <li>Beta Content</li>
                        
                    </ul>
                </div>


            </div>
            <div className='bg-richblack-700 h-[1px] w-[98%] mx-auto'></div>
            <div className='flex justify-between p-8'>
                <ul className='flex gap-4'>
                    <li>Privacy Policy</li>
                    <li>Cookie Policy</li>
                    <li>Terms</li>
                </ul>

                <div className='flex gap-2 items-center'> Made with <FaHeart color='red'/> by Utkarsh Kumar</div>

            </div>
        </div>
        

    </div>
  )
}

export default Home