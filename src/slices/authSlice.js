import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    //get token from local storage for authentication

    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null
    // token: 1
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers:{
        setToken(state, value){
            state.token = value.payload
        }
    }
})

export const {setToken} = authSlice.actions
export default authSlice.reducer

