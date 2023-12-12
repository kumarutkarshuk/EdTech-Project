import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({children, active, linkto}) => {
    //active -> doubt
    //linkto for knowing where the button will take the user
  return (
    <Link to={linkto}>
        <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold ${active ? "bg-yellow-50 text-black" : "bg-richblack-800 border-[#FFFFFF2E] border-b-2 border-r-2"} 
        hover:scale-95`}>
        {/* border */}
            {children}
        </div>
    </Link>
  )
}

export default CTAButton