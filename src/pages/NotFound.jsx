import React from 'react'
import { TbError404 } from "react-icons/tb";

const NotFound = () => {
  return (
    <div className='text-richblack-5 flex justify-center items-center gap-4 mt-[10%]'>
    <TbError404 className='scale-[2]'/>
    <p>Page Not Found</p>
    </div>
  )
}

export default NotFound