//check if stop propagation is required
//unable to close on clicking again on image
//!user line of code
//not using dispatch here as done in class code

import React, { useRef, useState } from 'react'
import { MdDashboard } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { logout } from '../../../services/operations/authAPI';

const ProfileDropDown = () => {
  const {user} = useSelector((state)=>state.profile)
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useOnClickOutside(ref, () => setOpen(false))

  // if (!user) return null
  //not needed ig

  return (
    <div className='text-richblack-5' >

      <button onClick={()=>setOpen(!open)} className='flex items-center'>
        <img src={user?.image} className='rounded-full w-[30px]'/>
        <IoIosArrowDown />
      </button>

      {
        open && (
          <div className='absolute bg-richblack-800 translate-x-[-65px] translate-y-[5px] p-2 rounded-md z-10' ref={ref}>
          {/* React will put a reference to the DOM element into ref.current, which we can access through an event handler. */}
            <div className='flex flex-col gap-2'>
              <Link className='flex gap-[1px] items-center' to='/dashboard/my-profile' onClick={()=>setOpen(false)}>
                <MdDashboard />
                Dashboard
              </Link>
              <button className='flex gap-[1px] items-center' onClick={()=>{
                //left code -> why ->
                logout(dispatch, navigate)
                setOpen(false)
                }}>
                <MdLogout />
                Logout
              </button>
            </div>

          </div>
        )
      }

    </div>
  )
}

export default ProfileDropDown

