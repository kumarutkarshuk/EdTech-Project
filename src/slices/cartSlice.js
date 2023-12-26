//some logic left

import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast"; //it shouldn't be here ig

const initialState = {

    totalItems: localStorage.getItem('totalItems') ? JSON.parse(localStorage.getItem('totalItems')) : 0
    // totalItems: 1

    
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers:{
        setTotalItems: (state, value) => {
            state.totalItems += value //I'm assuming value will come to be added directly
        },

        resetCart: (state) => {
            state.totalItems=0
        } 

    }
})

export const {setTotalItems, resetCart} = cartSlice.actions
export default cartSlice.reducer

