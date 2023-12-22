//Imp: Check out how ternary operator can be used with parenthesis

//required attribute is working that good but fine
//onChange -> hence had to set a default value of country code
//some more logic might be left including validation of data type of phone
//to path in link tag -> button

import React from 'react'
import image from '../assets/Images/signup.webp'
import { useState } from 'react'
import frame from '../assets/Images/frame.png'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import countryCodes from '../data/countrycode.json'
import toast from 'react-hot-toast'

const Signup = () => {

    const tabNames = [
        'Student',
        'Instructor'
    ]

    const [currentTab, setCurrentTab] = useState(tabNames[0])
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState(
        {
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            phone:"",
            code:"India",
            confirmPassword:"",
            accountType:"Student"

        }
        
        )

    const showPasswordHandler = () => {
        setShowPassword(!showPassword)
        
    }
    const showConfirmPasswordHandler = () => {
        setShowConfirmPassword(!showConfirmPassword)
        
    }

    const formDataHandler = (e) => {
        setFormData({...formData, [e.target.id]:e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        formData.accountType=currentTab
        //this is not working
        // if(typeof formData.phone !== 'number'){
        //     toast.error('Please enter a valid phone number')
        // }

        if(formData.password !== formData.confirmPassword){
            toast.error('Passwords do not match')
        } 
        // console.log(formData)
    }



  return (
    <div className='w-11/12 mx-auto flex text-white justify-evenly mt-[5%] gap-14'>

        <div className='flex flex-col gap-4 w-[40%]'>
            <h1 className='text-3xl font-semibold'>Join the millions learning to code with StudyNotion for free</h1>
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

            <form className='flex flex-col gap-4' onSubmit={submitHandler}>
                
                <div className='flex justify-between gap-2'>
                    <div className='flex flex-col gap-2 w-[50%]'>
                        <label htmlFor="firstName">First Name<sup className='text-pink-300'>*</sup></label>
                        <input type="text" placeholder='Enter first name' className='bg-richblack-800 p-4 rounded-md border-b-[1px] border-[#FFFFFF2E]
                        focus:outline-none' id='firstName' onChange={formDataHandler} required/>
                    </div>

                    <div className='flex flex-col gap-2 w-[50%]'>
                        <label htmlFor="lastName">Last Name<sup className='text-pink-300'>*</sup></label>
                        <input type="text" placeholder='Enter last name' className='bg-richblack-800 p-4 rounded-md border-b-[1px] border-[#FFFFFF2E]
                        focus:outline-none' id='lastName' onChange={formDataHandler} required/>
                    </div>
                </div>
                    
                    
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email">Email Address<sup className='text-pink-300'>*</sup></label>
                    <input type="email" placeholder='Enter email address' className='bg-richblack-800 p-4 rounded-md border-b-[1px] border-[#FFFFFF2E]
                    focus:outline-none' id='email' onChange={formDataHandler} required/>
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor="phone code">Phone Number<sup className='text-pink-300'>*</sup></label>

                    <div className='flex justify-between gap-2'>
                        <select className='bg-richblack-800 rounded-md border-b-[1px] border-[#FFFFFF2E] text-center
                        w-fit text-richblack-200 px-2' id='code' onChange={formDataHandler}>
                            {
                                //Conditional statement can be used with parenthesis
                                countryCodes.map((element, index)=>(
                                    
                                        element.country === 'India' ? <option key={index} selected='selected'>{element.country}</option> : 
                                        <option key={index}>{element.country}</option>
                                    
                                    
                                ))
                            }
                        </select>

                        <input type="text" placeholder='Enter phone number' className='bg-richblack-800 p-4 rounded-md border-b-[1px] border-[#FFFFFF2E]
                        focus:outline-none w-full' id='phone' onChange={formDataHandler} required/>
                    </div>
                    
                </div>
                
                <div className='flex justify-between gap-2'>
                    <div className='flex flex-col gap-2 w-[50%]'>
                        <label htmlFor="password">Password<sup className='text-pink-300'>*</sup></label>
                        <input type={showPassword ? 'text' : 'password'} placeholder='Enter password' className='bg-richblack-800 p-4 rounded-md border-b-[1px]
                        border-[#FFFFFF2E] focus:outline-none' id='password' onChange={formDataHandler} required/>

                        <div className='absolute translate-x-[245px] translate-y-[53px] scale-[1.25] hover:text-blue-100 transtion-all duration-200' onClick={showPasswordHandler}>
                        {
                            showPassword ?  <IoMdEyeOff /> : <IoEye />
                        }
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 w-[50%]'>
                        <label htmlFor="confirmPassword">Confirm Password<sup className='text-pink-300'>*</sup></label>
                        <input type={showConfirmPassword ? 'text' : 'password'} placeholder='Enter confirm password' 
                        className='bg-richblack-800 p-4 rounded-md border-b-[1px] 
                        border-[#FFFFFF2E] focus:outline-none' id='confirmPassword' onChange={formDataHandler} required/>
                        <div className='absolute translate-x-[245px] translate-y-[53px] scale-[1.25] hover:text-blue-100 transtion-all duration-200' onClick={showConfirmPasswordHandler}>
                        {
                            showPassword ?  <IoMdEyeOff /> : <IoEye />
                        }
                        </div>
                    </div>
                </div>
                

                <button className='text-center text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black
                border-[#FFFFFF2E] border-b-2 border-r-2 hover:scale-95 mb-10 mt-2'>Create Account</button>
            </form>

             
            


        </div>

        <div>
           <img src={image} className='relative z-10'/>
           <img src={frame} className='absolute -z-0 -translate-y-[96%] translate-x-6'/>
        </div>

        

    </div>
  )
}

export default Signup