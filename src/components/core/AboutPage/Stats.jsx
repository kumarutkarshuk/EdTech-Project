import React from 'react'

const Stats = () => {

    const stats = [
        {title:'5K', text:'Active Students'},
        {title:'10+', text:'Mentors'},
        {title:'200+', text:'Courses'},
        {title:'50+', text:'Awards'}
    ]



  return (
    <div className='bg-richblack-800 py-20'>
        <div className='w-11/12 mx-auto flex justify-evenly'>
            {
                stats.map((element, index) => (
                    <div key={index} className='flex flex-col gap-2 items-center'>
                        <h1 className='text-richblack-5 text-3xl font-semibold'>{element.title}</h1>
                        <p className='text-richblack-500'>{element.text}</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Stats