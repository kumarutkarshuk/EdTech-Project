//check how component is rendered from object


import React from 'react'
import Footer from '../components/common/Footer'
import ContactUsForm from '../components/common/ContactUsForm'
import { CiChat1 } from "react-icons/ci";
import { CiGlobe } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";

const ContactUs = () => {

    const data = [
        {title: 'Chat on us', text:'Our friendly team is here to help.', lowerText: '@mail address', logo: CiChat1},
        {title: 'Visit us', text:'Come and say hello at our office HQ.', lowerText: 'Here is the location/ address', logo:CiGlobe},
        {title: 'Call us', text:'Mon - Fri From 8am to 5pm', lowerText: '+123 456 7890', logo:IoCallOutline}
    ]



  return (
    <div className='text-richblack-5'>
        
        <div className='flex gap-4 justify-evenly m-20 '>

            <div className='bg-richblack-800 rounded-md flex flex-col gap-6 p-8 h-fit'>
                {
                    data.map((element, index)=>(
                        <div key={index} className='flex gap-2'>
                            <div className='text-2xl'>{React.createElement(element.logo)}</div>
                            <div className='flex flex-col'>
                                <h2 className='font-bold'>{element.title}</h2>
                                <p className='text-richblack-100 mt-2'>{element.text}</p>
                                <p className='text-richblack-100'>{element.lowerText}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className='border rounded-md pt-8 px-8 border-richblack-600'>
                <h1 className='text-3xl font-semibold'>Got a Idea? We’ve got the skills. Let’s team up</h1>
                <p className='mb-8 text-richblack-100 mt-4'>Tell us more about yourself and what you’re got in mind.</p>
                <ContactUsForm></ContactUsForm>
            </div>

            

        </div>



        {/* slider */}


        <Footer></Footer>
    </div>
  )
}

export default ContactUs