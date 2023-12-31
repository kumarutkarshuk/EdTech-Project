
import React from 'react'
import ChangeProfilePic from './Forms/ChangeProfilePic';
import ProfileInfo from './Forms/ProfileInfo';
import ChangePassword from './Forms/ChangePassword';
import DeleteAccount from './Forms/DeleteAccount';



const Settings = () => {
  
  
  return (
    <>
        {/* <p className='text-yellow-25 mt-4 h-fit'>Settings</p> */}

        <div className='text-richblack-5 w-[60%] my-10 ml-10'>
          <h1 className='text-4xl'>Settings</h1>

          <div className='flex flex-col gap-4 mt-10 ml-10'>

            <ChangeProfilePic></ChangeProfilePic>

            <ProfileInfo></ProfileInfo>
            
            <ChangePassword></ChangePassword>

            <DeleteAccount></DeleteAccount>

          </div>
             
        </div>

          
      
    </>
  )
}

export default Settings