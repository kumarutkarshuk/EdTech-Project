import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import { matchPath, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCartShopping } from "react-icons/fa6";
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
    const location = useLocation()

    const {token} = useSelector((state)=>state.auth)
    const {user} = useSelector((state)=>state.profile)
    const {totalItems} = useSelector((state)=>state.cart)

    const [subLinks, setSubLinks] = useState([]);
    const fetchSubLinks = async () => {
        try{
            const result = await apiConnector('GET', categories.CATEGORIES_API)
            setSubLinks(result.data.allCategories)
            // console.log('Sublinks:', result.data.allCategories)
        }catch(e){
            console.log('Could not fetch catalog sub links due to:', e.message)
        }
    }
    //to make it work, I've removed authN and authZ

    useEffect(() => {fetchSubLinks()}, [])

  return (
    <div className={`w-full border-b border-richblack-600 ${location.pathname.includes('/dashboard') && 'bg-richblack-800'}`}>
        <div className='w-11/12 mx-auto flex items-center h-14 justify-between'>

            <Link to='/'>
                <img src={logo} width='160' height='32'/>
            </Link>

            <div className='hidden lg:block'>
                <ul className='flex gap-4'>
                    {
                        NavbarLinks.map((element, index) => (
                            <li key={index}>
                                {
                                    element.title === 'Catalog' ? (
                                        
                                        <div className='flex items-center text-richblack-5 group hover:cursor-pointer'>

                                            <p>{element.title}</p>

                                            <IoIosArrowDown />

                                            {/* can't use flex and hidden together*/}
                                            <div className=' bg-richblack-25 text-black absolute top-[40px]
                                            p-2 rounded-md -z-10 group-hover:opacity-100 opacity-0 group-hover:z-10 transition-all duration-200
                                            '>  
                                                <div className='bg-richblack-25 rotate-45 w-5 h-5 absolute top-[-3px] left-[57px] -z-10'></div>
                                                <ul className='flex flex-col'>
                                                    {
                                                        subLinks.length!==0 ? subLinks.map((element, index) => (
                                                            
                                                            <li key={index} className='hover:bg-richblack-100 p-2 
                                                            rounded-md w-full flex justify-center'><Link to={'/'+ element.name.toLowerCase()}>{element.name}
                                                            </Link></li>

                                                        )
 
                                                        ) : <li>No Data Found</li>
                                                    }
                                                </ul>
                                                
                                            </div>

                                        </div>
                                        
                                        ) : <Link to={element.path} 
                                    className={`${matchPath({path: element.path}, location.pathname) ? 'text-yellow-25' : 'text-richblack-5'}`}>
                                    {element.title}</Link>
                                }
                            </li>
                        ))
                    }
                </ul>
            </div>

            {/* login/signup/dashboard */}
            <div className='flex gap-4'>
                {
                    user && user?.accountType !== "Instructor" && (
                        <Link to='/dashboard/cart' className='relative text-white flex items-center'>
                            <FaCartShopping className='scale-[1.5]'/>
                            {
                                totalItems>0 && (
                                   <span className='text-white translate-y-[-12px] translate-x-[5px]'>{totalItems}</span>
                                )
                            }
                        </Link>
                    )
                }
                {
                    token===null && (
                        <Link to='/login'>
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md
                            hover:bg-richblack-900 transition-all duration-200'>
                                Login
                            </button>
                        </Link>
                    )
                }
                {
                    token===null && (
                        <Link to='/signup'>
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md 
                            hover:bg-richblack-900 transition-all duration-200'>
                                Sign Up
                            </button>
                        </Link>
                    )
                }
                {
                    token!==null && <ProfileDropDown></ProfileDropDown>
                }
            </div>

        </div>
    </div>
  )
}

export default Navbar