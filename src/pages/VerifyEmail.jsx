//instance of data fetched by useSelector is read-only
//it won't get modified if data in slice is updated


import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaRepeat } from "react-icons/fa6";
import OtpInput from 'react-otp-input';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendOtp, signup } from '../services/operations/authAPI';
import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const VerifyEmail = () => {

    const navigate = useNavigate()
    const [otp, setOtp] = useState('');
    const formData = useSelector((state)=>state.auth.signupData)
    console.log(formData)
    // this is getting printed twice -> because of React.StrictMode

    const handleClick = () => {
        
        otp.length === 6 ? signup(navigate, {...formData, otp}) : toast.error('Please enter a valid OTP')
    }

    return (<div className='flex flex-col mx-auto mt-[10%] text-richblack-5 gap-4'>
    <h1 className='text-4xl font-semibold'>Verify Email</h1>
    <p className='text-richblack-100'>A verification code has been sent to you. Enter the code below</p>

    <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} className='w-[60px] border-0 bg-richblack-800 
        rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-none focus:outline-yellow-50'
        style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
        />}
        containerStyle={{
            justifyContent: "space-between",
            gap: "0 6px",
          }}
        
        
    />

    <button className='text-center text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black
            border-[#FFFFFF2E] border-b-2 border-r-2 hover:scale-95 w-full mt-2' onClick={handleClick}>Verify email</button>
    <div className='flex justify-between'>
        <Link className='flex items-center gap-2' to='/login'>
            <FaArrowLeftLong />
            <p>Back to login</p>
        </Link>

        <button className='flex items-center gap-2 text-blue-100' 
        onClick={()=>sendOtp(navigate, formData.email)}
        >
            <FaRepeat />
            <p>Regenerate OTP</p>
        </button>
    </div>
    </div>)
}

export default VerifyEmail