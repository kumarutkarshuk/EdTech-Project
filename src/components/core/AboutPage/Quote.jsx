import React from 'react'
import { FaQuoteLeft } from "react-icons/fa";
import HighlightText from '../../common/HighlightText';
import { FaQuoteRight } from "react-icons/fa";

const Quote = () => {
  return (
    <div className='border-b-2 border-richblack-800 text-richblack-100 flex justify-center mt-[16%]'>
        <div className='mb-20 text-3xl font-semibold w-11/12 mx-auto flex flex-col gap-2 text-center items-center'>
            <div className='flex justify-center'>
                <FaQuoteLeft className='text-lg text-richblack-500 mr-2'/>
                <p>We are passionate about revolutionizing the way we learn. Our </p>
            </div>
            <div className='flex'>
                <p className='mr-2'>innovative platform</p>
                <HighlightText text={'combines technology'}></HighlightText>
                <p className='mr-2'>,</p>
                <span className='text-[#FF8C00]'>expertise</span>
                <p>, and community to </p>
            </div>
            <div className='flex justify-center'>
                <p>create an <span className='text-yellow-200'>unparalleled educational experience.</span></p>
                <FaQuoteRight className='text-lg text-richblack-500 ml-2'/>
            </div>
            
        </div>
    </div>
  )
}

export default Quote