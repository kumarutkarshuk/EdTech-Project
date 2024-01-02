import React from 'react'
import { useSelector } from 'react-redux'
import BuyNow from './BuyNow'
import ItemList from './ItemList'

const Cart = () => {
    const {totalItems} = useSelector((state) => state.cart)
  return (
    <div className='text-richblack-5 w-[60%] mt-10 ml-10'>
        <h1 className='text-4xl'>Cart</h1>

        <div className='flex flex-col mt-10'>
            <div className='border-b border-richblack-700 p-2 text-richblack-200'>{totalItems} Courses in Cart</div>

            <div className='flex gap-4 mt-4'>
                
                <ItemList></ItemList>

                <BuyNow></BuyNow>

            </div>
        </div>
          
      </div>
  )
}

export default Cart