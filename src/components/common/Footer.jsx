import React from 'react'
import studyNotionLogo from '../../assets/Logo/Logo-Full-Light.png'
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FooterLink2 } from '../../data/footer-links';

const Footer = () => {
  return (
    <div className='bg-richblack-800 text-richblack-400 border-t-2'>

            <div className=' flex justify-evenly p-8 lg:flex-row flex-col gap-4 lg:gap-0'>

                <div className='flex flex-col gap-4'>
                    <img src={studyNotionLogo} className='lg:w-fit w-[60%]'/>
                    <h2 className='font-bold text-richblack-100'>Company</h2>
                    <ul className='flex flex-col gap-2'>
                        <li>About</li>
                        <li>Careers</li>
                        <li>Affiliates</li>
                    </ul>
                    <div className='flex gap-2 lg:mb-0 mb-2'>
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
                    <h2 className='font-bold lg:mt-8 text-richblack-100'>Community</h2>
                    <ul className='flex flex-col gap-2'>
                        <li>Forums</li>
                        <li>Chapters</li>
                        <li>Events</li>
                    </ul>
                </div>

                <div className='bg-richblack-700 w-[1px] hidden lg:block'></div>

                    {FooterLink2.map((element, index) => {
                        return (
                            <div className='flex flex-col gap-2' key={index}>
                            <h2 className='font-bold text-richblack-100'>{element.title}</h2>
                            <div className='flex flex-col gap-2'>
                                {element.links.map((element2, index2)=>{
                                    return <Link to={element2.link} key={index} className='hover:text-richblack-50 transition-all duration-200'>{element2.title}</Link>
                                })}
                            </div>
                    </div>
                        )
                    })
                    
                    
                    }
            </div>

            <div className='bg-richblack-700 h-[1px] w-[98%] mx-auto hidden lg:block'></div>

            <div className='flex justify-between p-8 lg:flex-row flex-col gap-4 lg:gap-0'>

                <ul className='flex gap-4 justify-center'>
                    <li>Privacy Policy</li>
                    <div className='bg-richblack-700 w-[1px]'></div>
                    <li>Cookie Policy</li>
                    <div className='bg-richblack-700 w-[1px]'></div>
                    <li>Terms</li>
                </ul>

                <div className='flex gap-2 items-center justify-center '> Made with <FaHeart color='red'/> by Utkarsh Kumar</div>

            </div>

        </div>
  )
}

export default Footer