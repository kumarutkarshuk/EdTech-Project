import React from 'react'
import CTAButton from '../../common/CTAButton'
import HighlightText from '../../common/HighlightText'
import image1 from '../../../assets/Images/Know_your_progress.svg'
import image2 from '../../../assets/Images/Compare_with_others.svg'
import image3 from '../../../assets/Images/Plan_your_lessons.svg'

const LearningALanguage = () => {
  return (
    <div className='w-11/12 mx-auto flex flex-col items-center pb-10'>

      <div className='lg:text-4xl text-3xl font-semibold'>
        <p>Your swiss knife for <HighlightText text={'learning any language'}/></p>
      </div>

      <div className='mt-4'>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
      </div>

      <div className='flex lg:flex-row flex-col -mt-12 -mb-20 lg:my-0'>
        <img src={image1} className='lg:translate-x-[30%] translate-y-[20%] lg:translate-y-0'/>
        <img src={image2} className='-z-0'/>
        <img src={image3} className='lg:-translate-x-[30%] -translate-y-[25%] lg:translate-y-0'/>
      </div>

      <CTAButton active={true} linkto='/signup'>Learn More</CTAButton>

    </div>
  )
}

export default LearningALanguage