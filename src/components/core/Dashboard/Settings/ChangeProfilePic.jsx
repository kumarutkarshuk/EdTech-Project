import React from 'react'
import { useSelector } from 'react-redux'

const ChangeProfilePic = () => {
    const {user} = useSelector((state) => state.profile)
  return (
    <form className='bg-richblack-800 rounded-md p-6'>
      <div className='flex gap-4 items-center'>
        <img src={user?.image} className='aspect-square rounded-full w-[100px]'/>
        <div className='flex flex-col gap-2'>
          <h2 className='text-xl'>Change Profile Picture</h2>
          <div className='flex gap-2'>
            <input type="file" onChange={(e)=>{console.log(e.target.value)}}/>
            {/* <button className='flex items-center rounded-lg px-4 py-2 gap-[1px] bg-yellow-50 text-black hover:scale-95'>Change</button> */}
            {/* <button className='rounded-lg px-4 py-2 bg-richblack-200 text-black hover:scale-95'>Remove</button> */}
          </div>
        </div>
      </div>
    </form>
  )
}

export default ChangeProfilePic