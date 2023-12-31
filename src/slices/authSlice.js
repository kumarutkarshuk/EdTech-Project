import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    //get token from local storage for authentication

    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,

    signupData: null,

    logoutClicked: false
    // token: 1
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers:{
        setToken: (state, value) => {
            state.token = value.payload
        },
        setSignupData: (state, value) => {
            state.signupData = value.payload
        },
        setLogoutClicked: (state, value) => {
            state.logoutClicked = value.payload
        }
        
    }
})

export const {setToken, setSignupData, setLogoutClicked} = authSlice.actions
export default authSlice.reducer

