//some logic left

import { createSlice } from "@reduxjs/toolkit";
//toast shouldn't be here ig -> should be
import toast from "react-hot-toast";

const initialState = {

    totalItems: localStorage.getItem('totalItems') ? JSON.parse(localStorage.getItem('totalItems')) : 0,
    // totalItems: 1

    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],

    totalAmount: localStorage.getItem('totalAmount') ? JSON.parse(localStorage.getItem('totalAmount')) : 0

    
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers:{
        
        addToCart : (state, action) => {
            const course = action.payload
            const index = state.cart.findIndex((item) => item._id === course._id)

            if(index >=0){
                toast.error('Course already in cart')
                return
            }

            state.cart.push(course)
            state.totalItems++
            state.totalAmount += course.price

            localStorage.setItem('cart', JSON.stringify(state.cart))
            localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount))
            localStorage.setItem('totalItems', JSON.stringify(state.totalItems))

            toast.success('Item added to cart')
        },

        removeFromCart : (state, action) => {
            const courseId = action.payload
            const index = state.cart.findIndex((item) => item._id === courseId)

            if(index >= 0){
                state.totalItems--
                state.totalAmount -= state.cart[index].price
                //at index, remove one item
                state.cart.splice(index,1)

                localStorage.setItem('cart', JSON.stringify(state.cart))
                localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount))
                localStorage.setItem('totalItems', JSON.stringify(state.totalItems))

                toast.success('Course removed from cart')
            }
        },

        resetCart: (state, action) => {
            state.cart = []
            state.totalItems = 0
            state.totalAmount = 0

            localStorage.removeItem('cart')
            localStorage.removeItem('totalItems')
            localStorage.removeItem('totalAmount')

            toast.success('Cart reset done')
        }

    }
})

export const {addToCart, removeFromCart, resetCart} = cartSlice.actions
export default cartSlice.reducer

