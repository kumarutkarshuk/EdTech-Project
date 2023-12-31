import React from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import * as Icons from 'react-icons/vsc'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { VscGear } from "react-icons/vsc";
import { VscSignOut } from "react-icons/vsc";
import { matchPath } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLogoutClicked } from '../../../slices/authSlice'


const Sidebar = () => {
    const {user} = useSelector((state) => state.profile)
    const location = useLocation()
    const dispatch = useDispatch()
    
  return (
    <div className='w-[15%] flex flex-col text-richblack-200 bg-richblack-800 gap-4 border-r border-richblack-600 pt-8'>
        {
            sidebarLinks.map((element)=>{
                const Icon = Icons[element.icon]
                if(user?.accountType === element.type || element.type === undefined) return (
                    <Link key={element.id} className={`flex gap-2 items-center pl-6 py-[5px]
                    ${matchPath({path: element.path}, location.pathname) ? 'text-yellow-25 bg-yellow-800 border-l-[3px] border-yellow-25 transition-all duration-200' 
                    : ''}`}
                    to={element.path}>
                        <Icon></Icon>
                        {element.name}
                    </Link>
                )
            })
        }
        
        <div className='w-[90%] h-[1px] bg-richblack-500 mt-4 mx-auto'></div>

        <Link className={`flex gap-2 pl-6 items-center py-[5px]
        ${matchPath({path: location.pathname}, '/dashboard/settings') ? 'text-yellow-25 bg-yellow-800 border-l-[3px] border-yellow-25 transition-all duration-200' : ''}`}
        to='/dashboard/settings'> 
            <VscGear />
            Settings
        </Link>

        <button className='flex gap-2 items-center pl-6' onClick={()=>dispatch(setLogoutClicked(true))}> 
            <VscSignOut />
            Logout
        </button>
        
        
    </div>
  )
}

export default Sidebar