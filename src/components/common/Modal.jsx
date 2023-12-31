//conditional rendering is possible inside return only

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../services/operations/authAPI'
import { setLogoutClicked } from '../../slices/authSlice'

const LogoutModal = ({title, text, buttonText}) => {
  
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {logoutClicked} = useSelector((state)=>state.auth)

    if(logoutClicked) return (

    <div className='flex flex-col gap-4 bg-richblack-900 p-4 rounded-md border-richblack-500 border w-fit'>

        <h2 className='text-2xl text-richblack-5'>
            {title}
        </h2>
        <p className='text-richblack-200'>{text}</p>
        <div className='flex gap-2'>

            <button
            onClick={() => {
                dispatch(setLogoutClicked(false))
                logout(dispatch, navigate)
                }}
            className='rounded-lg px-4 py-2 bg-yellow-50 text-black hover:scale-95'
            >
                {buttonText}
            </button>

            <button
            onClick={() => dispatch(setLogoutClicked(false))}
            className='rounded-lg px-4 py-2 bg-richblack-200 text-black hover:scale-95'
            >
                Cancel
            </button>
            
        </div>
    </div>

  )
}

export default LogoutModal