//strong password


import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useState } from 'react';
import { updatePassword } from '../services/operations/authAPI';

const UpdatePassword = () => {
    const params = useParams()
    const token = params.id
    // console.log(params.id)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({password:'', confirmPassword:'', token:token})
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        updatePassword(formData, navigate)
        // console.log(formData)
    }

    const showPasswordHandler = () => {
        setShowPassword(!showPassword)
    }
    const showConfirmPasswordHandler = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

  return (
    <div className='flex flex-col mx-auto mt-[7%] text-richblack-5 gap-4 w-[30%]'>
        <h1 className='text-4xl font-semibold'>
        Choose new password
        </h1>
        <p className='text-richblack-100'>
        Almost done. Enter your new password and you are all set.
        </p>

        <form onSubmit={handleSubmit}>

            <label className='flex flex-col gap-2 relative'>
                <p>New password<sup className='text-pink-300'>*</sup></p>
                <input type={showPassword ? 'text' : 'password'} required placeholder='Enter new password'  className='bg-richblack-800 p-4 rounded-md 
                border-b-[1px] border-[#FFFFFF2E] focus:outline-none w-full mb-2' onChange={(e)=>setFormData({...formData, password:e.target.value})}/>
                <div className='absolute left-[93%] top-[53%] scale-[1.25] hover:text-blue-100 transtion-all duration-200' 
                    onClick={showPasswordHandler}>
                        {
                            showPassword ?  <IoMdEyeOff /> : <IoEye />
                        }
                </div> 
            </label>

            <label className='flex flex-col gap-2 relative'>
                <p>Confirm New Password<sup className='text-pink-300'>*</sup></p>
                <input type={showConfirmPassword ? 'text' : 'password'} required placeholder='Enter confirm new password' 
                className='bg-richblack-800 p-4 rounded-md border-b-[1px] 
                border-[#FFFFFF2E] focus:outline-none w-full mb-2' onChange={(e)=>setFormData({...formData, confirmPassword:e.target.value})}/>
                <div className='absolute left-[93%] top-[53%] scale-[1.25] hover:text-blue-100 transtion-all duration-200' 
                    onClick={showConfirmPasswordHandler}>
                        {
                            showConfirmPassword ?  <IoMdEyeOff /> : <IoEye />
                        }
                </div> 
                </label>

                <button className='text-center text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black
                    border-[#FFFFFF2E] border-b-2 border-r-2 hover:scale-95 w-full mt-2' >
                    Reset Password
                </button>
        </form>

        <div className='flex justify-between'>
            <Link className='flex items-center gap-2' to='/login'>
                <FaArrowLeftLong />
                <p>Back to login</p>
            </Link>
      </div>
    </div>
  )
}

export default UpdatePassword