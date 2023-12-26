import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { resetPasswordToken } from '../services/operations/authAPI';


const ForgotPassword = () => {

  const [email, setEmail] = useState('')
  const [otpSent, setOtpSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    resetPasswordToken(email, setOtpSent)
  }


  return (
    <div className='flex flex-col mx-auto mt-[10%] text-richblack-5 gap-4 w-[30%]'>
      <h1 className='text-4xl font-semibold'>
      {otpSent ? 'Check email' : 'Reset your password'}
      </h1>
      <p className='text-richblack-100'>
      {otpSent ? `We have sent the reset email to ${email}` : 'Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery'}
      </p>

      <form onSubmit={handleSubmit}>
        <label className={otpSent ? 'hidden' : 'flex flex-col gap-2'}>
          <p>Email Address<sup className='text-pink-300'>*</sup></p>
          <input type="email" required placeholder='Enter email address' className='bg-richblack-800 p-4 rounded-md border-b-[1px] border-[#FFFFFF2E]
                    focus:outline-none w-full mb-2' onChange={(e)=>setEmail(e.target.value)}/>
        </label>
        <button className='text-center text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black
              border-[#FFFFFF2E] border-b-2 border-r-2 hover:scale-95 w-full mt-2' >
              {otpSent ? 'Resend email' : 'Reset Password'}
              </button>
      </form>

      <div className='flex justify-between'>
          <Link className='flex items-center gap-2' to='/login'>
              <FaArrowLeftLong />
              <p>Back to login</p>
          </Link>
      </div>
    </div>)
}

export default ForgotPassword