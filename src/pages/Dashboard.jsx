
import React from 'react'
import { Outlet} from 'react-router-dom'
import Sidebar from '../components/core/Dashboard/Sidebar'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  
  return (
    <div className='flex gap-2 min-h-screen'>

        {/* sidebar */}
        <Sidebar></Sidebar>

        {/* <div className='ml-4 mt-4 h-fit'>
          <div className='text-richblack-200 flex gap-2'>
            <Link to='/'>Home</Link>
            <p className='text-richblack-600'>/</p>
            <Link to='/dashboard'>Dashboard</Link>
            <span className='text-richblack-600'>/</span> 
          </div>
        </div> */}

        <Outlet></Outlet>
    </div>

  )
}

export default Dashboard