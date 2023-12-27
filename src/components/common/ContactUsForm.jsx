import React from 'react'
import countryCodes from '../../data/countrycode.json'
import {useForm} from 'react-hook-form'
import { useEffect } from 'react'

const ContactUsForm = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful},
      } = useForm();

    useEffect( () => {
        if(isSubmitSuccessful) {
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNumber:"",
            })
        }
    },[reset, isSubmitSuccessful] );

    
  return (
    <div className='text-richblack-5 flex flex-col items-center mb-20 gap-2'>
        

        <form className='flex flex-col gap-6' onSubmit={handleSubmit((data)=>{console.log(data)})}>

            <div className='flex gap-2 '>

                <label className='flex flex-col gap-2 w-[50%]'>
                    <p>First Name</p>
                    <input 
                    type="text"
                    className='bg-richblack-800 p-4 rounded-md border-b-[1px] border-[#FFFFFF2E] focus:outline-none'
                    placeholder='Enter first name'
                    {...register('firstName', {required:true})}
                    />
                    <span className='text-pink-300'>{errors.firstName && 'Please fill in your first name'}</span>
                </label>
                <label className='flex flex-col gap-2 w-[50%]'>
                    <p>Last Name</p>
                    <input 
                    type="email"
                    className='bg-richblack-800 p-4 rounded-md border-b-[1px] border-[#FFFFFF2E] focus:outline-none'
                    placeholder='Enter email address'
                    {...register('lastName')}
                    />
                </label>

            </div>

            <label className='flex flex-col gap-2'>
                    <p>Email Address</p>
                    <input 
                    type="text"
                    className='bg-richblack-800 p-4 rounded-md border-b-[1px] border-[#FFFFFF2E] focus:outline-none'
                    placeholder='Enter email address'
                    {...register('email', {required:true})}
                    />
                    <span className='text-pink-300'>{errors.email && 'Please fill in your email address'}</span>
            </label>

            
            <label className='flex flex-col gap-2'>
            <p>Phone Number</p>
            <div className='flex justify-between gap-2'>
                    <select 
                    className='bg-richblack-800 rounded-md border-b-[1px] border-[#FFFFFF2E] text-center
                    w-[50%] text-richblack-200 px-2' {...register('countryCode')}>
                        {
                            //Conditional statement can be used inside parenthesis
        
                            countryCodes.map((element, index)=>(
                                            
                            element.country === 'India' ? <option key={index} selected='selected'>{`${element.country} (${element.code})`}
                            </option> : 
                            <option key={index}>{`${element.country} (${element.code})`}</option>
                                            
                            ))
                        }
                    </select>
        
                    <input 
                    type="text"
                    placeholder='Enter phone number'
                    className='bg-richblack-800 p-4 w-full rounded-md border-b-[1px] border-[#FFFFFF2E] focus:outline-none '
                    {...register('phoneNumber', {required:true})}
                    />
                    
                </div>
                <span className='text-pink-300'>{errors.phoneNumber && 'Please fill in your phone number'}</span>
            </label>

            <label className='flex flex-col gap-2'>
                <p>Message</p>
                <textarea 
                rows='5'
                className='bg-richblack-800 p-4 w-full rounded-md border-b-[1px] border-[#FFFFFF2E] focus:outline-none '
                placeholder='Enter message here'
                {...register('message', {required:true})}
                >
                </textarea>
                <span className='text-pink-300'>{errors.message && 'Please fill in the message'}</span>
            </label>
        
            <button className='bg-yellow-50 text-black text-center text-[13px] px-6 py-3 rounded-md font-bold hover:scale-95'>Send Message</button>

        </form>


    </div>
  )
}

export default ContactUsForm