//hard coding one course card
//make it dynamic once payment integration is done
//tabs, 3 dots left
//progress bar left
//which image to add?

import React, { useEffect, useState } from 'react'
import ProgressBar from "@ramonak/react-progress-bar";
import image from '../../../../assets/Logo/Logo-Small-Light.png'
import { useSelector } from 'react-redux';
import { getEnrolledCourses } from '../../../../services/operations/profileAPI';

const EnrolledCourses = () => {

    const {token} = useSelector((state) => state.auth)
    const [enrolledCourses, setEnrolledCourses] = useState(null)
    

    useEffect(()=>{
        getEnrolledCourses(token, setEnrolledCourses)
    }, [])

    if(enrolledCourses){
        return (enrolledCourses.length !== 0 ? 
            <div className='text-richblack-5 w-[60%] mt-10 ml-10'>
                <h1 className='text-4xl'>Enrolled Courses</h1>
        
                {/* tabs */}
        
                <div className='flex flex-col mt-10'>
        
                    <div className='flex justify-between p-2 bg-richblack-700 rounded-t-lg text-richblack-25 text-sm'>
                        <h2 className='w-1/3 text-center'>Course Name</h2>
                        <h2 className='w-1/3 text-center'>Duration</h2>
                        <h2 className='w-1/3 text-center'>Progress</h2>
                    </div>
        
                    {enrolledCourses.map((element, index) => {
                        
                        let totalDuration = 0;
                        element.courseContent.forEach((innerElement)=>{
                            innerElement.subSection.forEach((insideInnerElement)=>{
                                totalDuration += insideInnerElement.timeDuration
                            })
                        })
                        
                        return (<div className='flex py-4 border border-richblack-600' key={index}>
                            <div className='flex gap-2 items-center w-1/3 justify-center'>
                                <img src={image} className='rounded-lg'/>
            
                                <div className='flex flex-col'>
                                    <h2>{element.courseDescription}</h2>
                                    <p className='text-richblack-200 text-sm'>{element.whatYouWillLearn}</p>
                                </div>
                            </div>
            
                            <p className='text-richblack-25 w-1/3 text-center'>{totalDuration}</p>
            
                            <div className='flex gap-2 w-1/3 justify-center'>
            
                                <div className='flex flex-col gap-2'>
                                    <p className='text-sm'>Progress: 65%</p>
                                    <ProgressBar completed="65" customLabel=' '></ProgressBar>
                                </div>
            
                                {/* 3 dots */}
                            </div>
                    </div>)
                    })}
                    
                </div>
            
            </div>

             : <p className='text-richblack-50 mt-10 ml-10'>You are not enrolled in any course.</p>)
        
    }
    
}

export default EnrolledCourses