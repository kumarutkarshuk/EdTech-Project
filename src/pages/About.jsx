import React from 'react'
import Hero from '../components/core/AboutPage/Hero'
import Quote from '../components/core/AboutPage/Quote'
import Description from '../components/core/AboutPage/Description'
import Footer from '../components/common/Footer'
import Stats from '../components/core/AboutPage/Stats'
import Grid from '../components/core/AboutPage/Grid'
import ContactUsForm from '../components/common/ContactUsForm'

const About = () => {
  return (
    
    <div className='flex flex-col'>

        <Hero></Hero>

        <Quote></Quote> 

        <Description></Description>

        <Stats></Stats>

        <Grid></Grid>

        <h1 className='font-semibold text-4xl text-richblack-5 text-center'>Get in Touch</h1>
        <p className='text-richblack-200 mb-10 text-center'>We’d love to here for you, Please fill out this form.</p>

        <ContactUsForm></ContactUsForm>

        {/* slider */}

        <Footer></Footer>

    </div>
    
  )
}

export default About