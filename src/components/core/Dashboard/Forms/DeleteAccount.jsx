import React from 'react'
import { FaTrashAlt } from "react-icons/fa";
import { deleteAccount } from '../../../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";

const DeleteAccount = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {token} = useSelector((state)=>state.auth)
  const handleSubmit = (e) => {
    e.preventDefault()
    deleteAccount(navigate, dispatch, token)
  }

  return (
    <form className='bg-pink-900 rounded-md p-6 flex border-pink-700 border-2 gap-4' onSubmit={handleSubmit}>
      <div className='rounded-full bg-pink-700 h-fit p-4 text-pink-200 text-xl'>
        <FaTrashAlt />
      </div>
      <div className='flex flex-col items-start'>
        <h2 className='text-xl font-semibold mb-2'>Delete Account</h2>
        <p className='text-pink-50'>Would you like to delete account?</p>
        <p className='text-pink-50 w-[80%]'>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
        <button className='italic mt-4 text-pink-200'>Click here to delete your account.</button>
      </div>
    </form>
  )
}

export default DeleteAccount