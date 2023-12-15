import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import image from '../../../assets/Images/TimelineImage.png'

const TimelineSection = () => {

  const data = [
    {
      logo: Logo1,
      heading: "Leadership",
      content: 'Fully committed to the success company' 
    },
    {
      logo: Logo2,
      heading: "Responsibility",
      content: 'Students will always be our top priority' 
    },
    {
      logo: Logo3,
      heading: "Flexibility",
      content: 'The ability to switch is an important skills' 
    },
    {
      logo: Logo4,
      heading: "Solve the problem",
      content: 'Code your way to a solution' 
    }
  ]

  return (
    <div className='flex justify-evenly items-center lg:flex-row flex-col mt-6'>
      <div className='flex flex-col gap-14'>
        {
          data.map((element, index) => (
            <div className='flex gap-4'>
              <div className='rounded-full bg-white w-[50px] h-[50px] flex justify-center items-center'>
                <img src={element.logo}/>
              </div>
             
              <div className='flex flex-col'>
                <h1 className='font-bold'>{element.heading}</h1>
                <p>{element.content}</p>
              </div>
              <div>

              </div>
            </div>
          ))
        }
      </div>

      <div>
        <img src={image} className='relative lg:block hidden lg:shadow-[0px_50px_100px_0px_rgba(8,_112,_184,_0.7)]'/>
        <div className='lg:absolute bg-caribbeangreen-700 flex gap-2 lg:p-8 lg:translate-x-[10.5%] lg:-translate-y-[40%] mt-6 lg:mt-0 p-2'>
          <div className='flex gap-2 border-r border-caribbeangreen-300 lg:p-4 p-2 items-center'>
            <p className='text-white text-4xl font-bold'>10</p>
            <p className='uppercase text-caribbeangreen-300'>years experiences</p>
          </div>
          <div className='flex gap-2 lg:p-4 p-2 items-center'>
            <p className='text-white text-4xl font-bold'>250</p>
            <p className='uppercase text-caribbeangreen-300'>types of courses</p>
          </div>
        <div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineSection