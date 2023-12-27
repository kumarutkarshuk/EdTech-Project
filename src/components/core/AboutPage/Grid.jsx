//className can't be added to custom components


import React from 'react'
import HighlightText from '../../common/HighlightText';
import CTAButton from '../../common/CTAButton'

const Grid = () => {

    const LearningGridArray = [
        {
          order: -1,
          heading: "World-Class Learning for",
          highlightText: "Anyone, Anywhere",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        },
        {
          order: 1,
          heading: "Curriculum Based on Industry Needs",
          description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
        },
        {
          order: 2,
          heading: "Our Learning Methods",
          description:
            "The learning process uses the namely online and offline.",
        },
        {
          order: 3,
          heading: "Certification",
          description:
            "You will get a certificate that can be used as a certification during job hunting.",
        },
        {
          order: 4,
          heading: `Rating "Auto-grading"`,
          description:
            "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
        },
        {
          order: 5,
          heading: "Ready to Work",
          description:
            "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
        },
      ];


  return (
    <div>
        <div className='w-11/12 mx-auto grid lg:grid-cols-4 grid-cols-1 my-20'>
            {
                LearningGridArray.map((element, index) => (

                    element.order===-1 ? 
                        <div key={index} className='col-span-2 flex flex-col gap-2'>

                            <h1 className='text-4xl font-semibold text-richblack-5'>World-Class Learning for</h1>
                            <div className='text-4xl mb-4'><HighlightText text={'Anyone, Anywhere'}></HighlightText></div>
                            <p className='text-richblack-100'>Studynotion partners with more than 275+ leading universities 
                            and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>
                            <div className='w-fit mt-10'>
                                <CTAButton active={true} linkto='/'>Learn More</CTAButton>
                            </div>
                            
                        </div>
                        
                        
                     : 
                        
                        <div className={`flex flex-col gap-6 pb-20 px-10 pt-10
                        ${element.order%2===0 ? 'bg-richblack-800' : 'bg-richblack-600'}
                        ${element.order===3 ? 'lg:col-start-2' : ''}`} key={index}>

                            <h2 className='text-richblack-5 font-bold'>{element.heading}</h2>
                            <p className='text-richblack-200'>{element.description}</p>

                        </div>
                    

                ))
            }
        </div>
    </div>
  )
}

export default Grid