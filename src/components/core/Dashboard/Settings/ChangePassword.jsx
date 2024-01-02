import React from 'react'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import {useForm} from 'react-hook-form'
import { useState } from 'react'
import { useEffect } from 'react';
import { changePassword } from '../../../../services/operations/settingsAPI';
import { useSelector } from 'react-redux';

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const {token} = useSelector((state)=>state.auth)
    const {
        register,
        handleSubmit,
        reset,
        formState: {isSubmitSuccessful},
    } = useForm();

    useEffect( () => {
        if(isSubmitSuccessful) {
            reset({
                oldPassword:"",
                newPassword:""
            })
        }
    },[reset, isSubmitSuccessful] );



    const submitHandler = (data) => {
        changePassword(data, token)
        // console.log(data)
    }

  return (
    <form className='bg-richblack-800 rounded-md p-6' onSubmit={handleSubmit(submitHandler)}>
              <h2 className='text-xl font-semibold'>Password</h2>
              <div className='flex justify-between gap-2 mt-6'>
                            <div className='flex flex-col gap-2 w-[50%] relative'>
                                <label htmlFor="password">Old Password</label>
                                <input type={showPassword ? 'text' : 'password'} placeholder='Enter old password' className='bg-richblack-700 p-4 rounded-md
                                 border-b-[1px]
                                border-[#FFFFFF2E] focus:outline-none' id='password'
                                {...register('oldPassword')} required

                                />
        
                                <div className='absolute left-[90%] top-[60%] scale-[1.25] hover:text-blue-100 transtion-all duration-200'
                                 onClick={()=>setShowPassword(!showPassword)}>
                                {
                                    showPassword ?  <IoMdEyeOff /> : <IoEye />
                                }
                                </div>
                            </div>
        
                            <div className='flex flex-col gap-2 w-[50%] relative'>
                                <label htmlFor="confirmPassword">New Password</label>
                                <input type={showConfirmPassword ? 'text' : 'password'} placeholder='Enter new password' 
                                className='bg-richblack-700 p-4 rounded-md border-b-[1px] 
                                border-[#FFFFFF2E] focus:outline-none' id='confirmPassword'
                                {...register('newPassword')} required

                                />
                                <div className='absolute left-[90%] top-[60%] scale-[1.25] hover:text-blue-100 transtion-all duration-200' 
                                onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>
                                {
                                    showPassword ?  <IoMdEyeOff /> : <IoEye />
                                }
                                </div>
                            </div>
              </div>
              <div className='flex gap-2 items-center mt-8'>
                    <button className='flex items-center rounded-lg px-4 py-2 gap-[1px] bg-yellow-50 text-black hover:scale-95'>Change Password</button>
              </div>                   
              
    </form>
  )
}

export default ChangePassword