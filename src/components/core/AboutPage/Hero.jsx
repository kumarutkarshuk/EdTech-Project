import React from 'react'
import HighlightText from '../../common/HighlightText'
import image1 from '../../../assets/Images/aboutus1.webp'
import image2 from '../../../assets/Images/aboutus2.webp'
import image3 from '../../../assets/Images/aboutus3.webp'

const Hero = () => {
  return (
    <div className='bg-richblack-800 text-richblack-5 relative pb-28'>
        
        <div className='flex flex-col items-center p-20 gap-4'>
            <p className='text-richblack-100 mb-4'>About us</p>
            
            <div className='flex flex-col items-center text-4xl font-semibold'>
                <h1>Driving Innovation in Online Education for a</h1>
                <HighlightText text={'Brighter Future'}></HighlightText>
            </div>
            
            <p className='text-center text-richblack-100'>Studynotion is at the forefront of driving innovation in online education. 
            We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a 
            vibrant learning community.</p>
        </div>

        <div className='flex gap-4 w-full justify-center absolute top-[310px]'>
            <img src={image1} />
            <img src={image2} />
            <img src={image3} />
        </div>

    </div>
  )
}

export default Hero