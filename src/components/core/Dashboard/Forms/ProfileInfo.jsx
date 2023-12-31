//Not resetting form because response from the server can be "all fields are mandatory" and I don't want user to refill the form

import React from 'react'
import countryCodes from '../../../../data/countrycode.json'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
// import { useEffect } from 'react'
import { updateProfile } from '../../../../services/operations/authAPI'
import { useDispatch } from 'react-redux'

const ProfileInfo = () => {
  const {token} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        reset,
        formState: {isSubmitSuccessful},
    } = useForm();

    // useEffect( () => {
    //     if(isSubmitSuccessful) {
    //         reset({
    //             firstName:"",
    //             lastName:"",
    //             dateOfBirth:"",
    //             gender:"Male",
    //             contactNumber:"",
    //             about:"",
    //             countryCode:"India (+91)"
    //         })
    //     }
    // },[reset, isSubmitSuccessful] );

  return (
    <form className='bg-richblack-800 rounded-md p-6' onSubmit={handleSubmit((data)=>updateProfile(data, token, dispatch))}>

              <h2 className='text-xl font-semibold'>Profile Information</h2>

              <div className='grid grid-cols-2 grid-rows-3 mt-6 gap-4'>

                <label className='flex flex-col gap-2'>
                  <p>First Name</p>
                  <input type="text"
                  className='bg-richblack-700 p-4 rounded-md border-b-[1px] border-[#FFFFFF2E] focus:outline-none'
                  placeholder='Enter your first name'
                  {...register('firstName')}
                  />
                </label>

                <label className='flex flex-col gap-2'>
                  <p>Last Name</p>
                  <input type="text"
                  className='bg-richblack-700 p-4 rounded-md border-b-[1px] border-[#FFFFFF2E] focus:outline-none'
                  placeholder='Enter your last name'
                  {...register('lastName')}
                  />
                </label>

                <label className='flex flex-col gap-2'>
                  <p>Date of Birth</p>
                  <input type="date"
                  className='bg-richblack-700 p-4 rounded-md border-b-[1px] border-[#FFFFFF2E] focus:outline-none'
                  {...register('dateOfBirth')}

                  />
                </label>

                <label className='flex flex-col gap-2'>
                  <p>Gender</p>
                  <select className='bg-richblack-700 p-4 rounded-md border-b-[1px] border-[#FFFFFF2E] focus:outline-none h-full'
                    {...register('gender')}
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </label>

                <div className='flex flex-col gap-2'>
                            <label htmlFor="contactNumber code">Phone Number</label>
        
                            <div className='flex justify-between gap-2'>
                                <select className='bg-richblack-700 rounded-md border-b-[1px] border-[#FFFFFF2E] text-center
                                w-[50%] text-richblack-200 px-2' id='code' 
                                {...register('countryCode')}
                                >
                                    {
                                        //Conditional statement can be used inside parenthesis
        
                                        countryCodes.map((element, index)=>(
                                            
                                                element.country === 'India' ? <option key={index} selected='selected'>{`${element.country} (${element.code})`}
                                                </option> : 
                                                <option key={index}>{`${element.country} (${element.code})`}</option>
                                            
                                            
                                        ))
                                    }
                                </select>
        
                                <input type="text" placeholder='Enter phone number' className='bg-richblack-700 p-4 rounded-md border-b-[1px] 
                                border-[#FFFFFF2E]
                                focus:outline-none w-full' id='contactNumber'
                                {...register('contactNumber')}
                                />
                            </div>
                            
                </div>

                <label className='flex flex-col gap-2'>
                  <p>About</p>
                  <input type="text"
                  className='bg-richblack-700 p-4 rounded-md border-b-[1px] border-[#FFFFFF2E] focus:outline-none'
                  placeholder='Enter bio details'
                  {...register('about')}                  
                  />
                </label>

                
                
              </div>
              <div className='flex gap-2 items-center mt-8'>
                    <button className='flex items-center rounded-lg px-4 py-2 gap-[1px] bg-yellow-50 text-black hover:scale-95'>Update Info</button>
              </div>

            </form>
  )
}

export default ProfileInfo