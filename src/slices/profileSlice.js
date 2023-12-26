//localStorage -> for saving data in the case of a reload
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // user: {accountType: "Student"}

    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers:{
        setUser: (state, value) => {
            state.user = value.payload
        }
    }
})

export const {setUser} = profileSlice.actions
export default profileSlice.reducer

