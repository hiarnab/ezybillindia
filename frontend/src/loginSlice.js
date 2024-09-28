import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name:"login",
  initialState:{
    userData:
         [sessionStorage.getItem("userToken") ? JSON.parse(sessionStorage.getItem("userToken")) : null ]
  },
  reducers:{
    userProfile:(state, action) => {
      state = state.userData.splice(0,1,action.payload)
    },
    logoutProfile:(state) => {
      state.userData = []
    }
  } 

})
export const {loginSuccess, userProfile, logoutProfile} = loginSlice.actions 
export default loginSlice.reducer  