import React from 'react'
import HighlightText from './HighlightText'
import {HomePageExplore} from '../../../data/homepage-explore'
import { useState } from 'react'
import { PiStudent } from "react-icons/pi";
import { FaRankingStar } from "react-icons/fa6";

const ExploreMore = () => {

    const tabNames = [
        'Free',
        'New to coding',
        'Most popular',
        'Skills paths',
        'Career paths'
        
    ]

    const [currentTabIndex, setCurrentTabIndex] = useState(0)
    const [currentCardIndex, setCurrentCardIndex] = useState(0)

    const setCurrent = (index) => {
        setCurrentTabIndex(index)
        setCurrentCardIndex(0)
    }



  return (
    <div className='w-11/12 mx-auto flex flex-col items-center gap-2 relative mb-[15%]'>
        
        <div className='text-4xl font-semibold flex gap-2 lg:flex-row flex-col items-center'>
            <p>Unlock the</p>
            <HighlightText text={'Power of Code'}></HighlightText>
        </div>

        <p className='text-richblack-100 mb-6'>Learn to build anything you can imagine</p>

        <div className='lg:flex bg-richblack-800 rounded-full px-2 lg:visible hidden'>
            {tabNames.map((element, index) => (
                <div key={index} className={`${currentTabIndex===index ? 'bg-richblack-900' : 'bg-richblack-800'} rounded-full m-2 py-2 px-4 text-richblack-100 hover:bg-richblack-900 hover:cursor-pointer transition-all duration-200`} onClick={() => setCurrent(index)}
                >
                    {element}
                </div>
            ))}
        </div>
        
        <div className='flex gap-6 lg:absolute lg:translate-y-[80%] lg:flex-row flex-col'>
                {HomePageExplore[currentTabIndex].courses.map((element, index)=>(
                    
                    //way to add shadow

                    
                  <div key={index} className={`flex flex-col  gap-16 p-8 justify-between ${currentCardIndex===index ? 'bg-white text-black shadow-[10px_10px_0px_0px_rgba(255,240,0)]': 
                  'bg-richblack-800'} relative`}
                  onClick={()=>setCurrentCardIndex(index)}>
                  <div className='flex flex-col gap-2'>
                    <h1 className='font-extrabold'>{element.heading}</h1>
                    <p className={`${currentCardIndex===index ? 'text-richblack-500': 
                  'text-richblack-100'}`}>{element.description}</p>
                  </div>
                    
                    <div className={`flex justify-between ${currentCardIndex===index ? 'text-blue-200': 
                  'text-richblack-100'}`}>
                        <div className='flex items-center gap-2'>
                            <PiStudent />
                            <p>{element.level}</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <FaRankingStar />
                            <p>{element.lessionNumber} Lessons</p>
                        </div>
                    </div>
                  </div>

                ))}
        </div>
        


    </div>
  )
}

export default ExploreMore