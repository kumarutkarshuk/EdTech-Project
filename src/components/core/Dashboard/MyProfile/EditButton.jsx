import React from 'react'
import { MdEditNote } from "react-icons/md";
import { Link } from 'react-router-dom';

const EditButton = () => {
  return (
    <Link className='flex items-center rounded-lg px-4 py-2 gap-[1px] bg-yellow-50 text-black hover:scale-95' to='/dashboard/settings'>
        <MdEditNote />
        Edit
    </Link>
  )
}

export default EditButton