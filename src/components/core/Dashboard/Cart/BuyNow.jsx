//action on clicking buy now pending
//old price

import React from 'react'
import { useSelector } from 'react-redux'
import CTAButton from '../../../common/CTAButton'

const BuyNow = () => {
    const {totalAmount} = useSelector((state) => state.cart)
  return (
    <div className='p-4 bg-richblack-800 flex flex-col gap-2 rounded-lg w-[25%]'>
        <p className='text-richblack-100'>Total:</p>
        <h1 className='text-yellow-50 text-3xl'>Rs. {totalAmount}</h1>
        {/* old price */}
        <CTAButton active={true}>Buy Now</CTAButton>
    </div>
  )
}

export default BuyNow