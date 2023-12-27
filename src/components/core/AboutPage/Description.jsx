import React from 'react'
import image from '../../../assets/Images/FoundingStory.png'

const Description = () => {
  return (
    <div>
        
        <div className='w-11/12 mx-auto flex flex-col '>
            
            <div className='flex gap-2 justify-evenly my-20'>
                <div className='flex flex-col gap-4 w-[40%] text-richblack-300'>
                    <h1 className='text-pink-400 font-semibold text-3xl mb-4'>Our Founding Story </h1>
                    <p>
                    Our e-learning platform was born out of a shared vision and passion for transforming education. 
                    It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, 
                    flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                    </p>
                    <p>
                    As experienced educators ourselves, we witnessed firsthand the limitations and challenges of 
                    raditional education systems. We believed that education should not be confined to the walls of a 
                    classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps 
                    and empower individuals from all walks of life to unlock their full potential.
                    </p>

                </div>
                
                <img src={image} className='shadow-[0_20px_500px_rgba(8,_112,_184,_0.4)]'/>
            </div>

            <div className='flex justify-evenly text-richblack-300 my-[7%]'>
                <div className='flex flex-col gap-2 w-[40%]'>
                    <h1 className='text-[#FFA500] font-semibold text-3xl'>Our Vision</h1>
                    <p>
                    With this vision in mind, we set out on a journey to create an e-learning platform 
                    that would revolutionize the way people learn. Our team of dedicated experts worked 
                    tirelessly to develop a robust and intuitive platform that combines cutting-edge technology
                    with engaging content, fostering a dynamic and interactive learning experience.
                    </p>
                </div>
                <div className='flex flex-col gap-2 w-[40%]'>
                    <h1 className='text-[#12D8FA] font-semibold text-3xl'>Our Mission</h1>
                    <p>
                    our mission goes beyond just delivering courses online. We wanted to create a
                     vibrant community of learners, where individuals can connect, collaborate, and learn 
                     from one another. We believe that knowledge thrives in an environment of sharing and dialogue,
                      and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                    </p>
                </div>
            </div>
            

        </div>
        

    </div>
  )
}

export default Description