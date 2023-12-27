//to path in link tag -> button 
//some more logic might be left
//compatibility of input field with chrome browser
//credits to freepik

import React from 'react'
import image from '../assets/Images/login.webp'
import { useState } from 'react'
import frame from '../assets/Images/frame.png'
import { Link, useNavigate } from 'react-router-dom'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useDispatch } from 'react-redux'
import { login } from '../services/operations/authAPI'

const Login = () => {

    const tabNames = [
        'Student',
        'Instructor'
    ]

    const [currentTab, setCurrentTab] = useState(tabNames[0])
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({email:"", password:"", accountType:"Student"})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const showPasswordHandler = () => {
        setShowPassword(!showPassword)
        
    }

    const formDataHandler = (e) => {
        setFormData({...formData, [e.target.id]:e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        formData.accountType=currentTab
        login(dispatch, navigate, formData)

        // console.log(formData)

    }

    

  return (
    <div className='w-11/12 mx-auto flex text-white justify-evenly mt-[5%] gap-14'>

        <div className='flex flex-col gap-4 w-[40%]'>
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

            <form className='flex flex-col gap-4' onSubmit={submitHandler}>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email">Email Address<sup className='text-pink-300'>*</sup></label>
                    <input type="email" placeholder='Enter email address' className='bg-richblack-800 p-4 rounded-md border-b-[1px] border-[#FFFFFF2E]
                    focus:outline-none' id='email' onChange={formDataHandler} required/>
                </div>
                
                <div className='flex flex-col gap-2 relative'>
                    <label htmlFor="password">Password<sup className='text-pink-300'>*</sup></label>
                    <input type={showPassword ? 'text' : 'password'} placeholder='Enter password' className='bg-richblack-800 p-4 rounded-md border-b-[1px] 
                    border-[#FFFFFF2E] focus:outline-none' id='password' onChange={formDataHandler} required/>
                    <Link className='text-blue-100 text-right text-sm' to='/forgot-password'>Forgot Password</Link>

                    

                    <div className='absolute left-[94%] top-[45%] scale-[1.25] hover:text-blue-100 transtion-all duration-200' 
                    onClick={showPasswordHandler}>
                        {
                            showPassword ?  <IoMdEyeOff /> : <IoEye />
                        }
                    </div> 

                </div>
                <button className='text-center text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black
                border-[#FFFFFF2E] border-b-2 border-r-2 hover:scale-95'>Sign In</button>
            </form>

             
            


        </div>

        <div className='relative z-0 w-[40%] h-[400px]'>
           <img src={image} className='z-10'/>
           <img src={frame} className='absolute -z-10 top-[3%] left-[3%]'/>
        </div>

        

    </div>
  )
}

export default Login