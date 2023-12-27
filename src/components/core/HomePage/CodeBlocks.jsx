import React from 'react'
import CTAButton from '../../common/CTAButton'
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({position, heading, subheading, ctabtn1, ctabtn2, backgroundGradient, codeColor}) => {
    const text = `<!DOCTYPE html>\n<html>\n<head><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">
    \n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n</nav>`
  return (
    <div className={`flex ${position} lg:my-20 justify-between lg:gap-10 lg:flex-row flex-col`}>

        <div className='flex flex-col lg:w-[50%] gap-8 m-2 p-2'>
            {heading}
            <div className='text-richblack-300 font-bold'>{subheading}</div>
            <div className='flex gap-7 w-full'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.btnText}
                        <FaArrowRight></FaArrowRight>
                    </div>
                </CTAButton>

                
                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                    {ctabtn2.btnText}
                </CTAButton>

            </div>
        </div>

        <div className='h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]'>
            <div className={`${backgroundGradient} absolute`}></div>
            <div className='text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>              
            </div>

            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}>
                    <TypeAnimation 
                    sequence={[text, 2000, ""]}
                    repeat={Infinity}
                    cursor={true}
                    omitDeletionAnimation={true}
                    style={{whiteSpace: 'pre-line'}}/>
            </div>
            
        </div>
        {/* pending */}
                
        
    </div>
  )
}

export default CodeBlocks