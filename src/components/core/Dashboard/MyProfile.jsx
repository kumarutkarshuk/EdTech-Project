import React from 'react'
import { useSelector } from 'react-redux'
import EditButton from '../Dashboard/EditButton'

const MyProfile = () => {

  const {user} = useSelector((state) => state.profile)
  const data = [
    {title:"First Name", value:user.firstName},
    {title:"Last Name", value:user.lastName},
    {title:"Email", value:user.email},
    {title:"Phone Number", value:user.additionalDetails.contactNumber},
  ]
  return (
    <>
      {/* <p className='text-yellow-25 mt-4 h-fit'>My Profile</p> */}

      <div className='text-richblack-5 w-[60%] mt-10 ml-10'>
          <h1 className='text-4xl'>My Profile</h1>

          <div className='flex flex-col gap-4 mt-10 ml-10'>

            <div className='bg-richblack-800 rounded-md flex justify-between items-center p-6'>
              
              <div className='flex gap-4'>
                <img src={user?.image} className='aspect-square rounded-full w-[100px]'/>
                <div className='flex flex-col justify-center'>
                  <h2 className='text-2xl font-semibold'>{user?.firstName+" "+user?.lastName}</h2>
                  <p className='text-richblack-300'>{user?.email}</p>
                </div>
              </div>

              <EditButton></EditButton>
             
            </div>

            <div className='bg-richblack-800 rounded-md flex justify-between items-center p-6'>
              
              <div className='flex flex-col gap-2'>
                <h1 className='text-2xl'>Personal Details</h1>

                <div className='grid grid-cols-2 grid-rows-2 mt-6 gap-8'>
                  {
                    data.map((element, index) => (
                      <div className='flex flex-col'>
                        <p className='text-richblack-300'>{element.title}</p>
                        <p >{element.value}</p>
                      </div>
                    ))
                  }
                </div>

              </div>

              <EditButton></EditButton>
             
            </div>

          </div>
      </div>
    </>
  )
}

export default MyProfile