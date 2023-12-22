import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // user: {accountType: "Student"}

    user:null
}

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers:{
        setUser(state, value){
            state.user = value.payload
        }
    }
})

export const {setUser} = profileSlice.actions
export default profileSlice.reducer

