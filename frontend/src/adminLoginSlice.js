import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name:"adminlogin",
  initialState:{
    adminData:
         [sessionStorage.getItem("adminToken") ? JSON.parse(sessionStorage.getItem("adminToken")) : null ]
  },
  reducers:{
    adminProfile:(state, action) => {
      state = state.adminData.splice(0,1,action.payload)
    },
    logoutProfile:(state) => {
      state.adminData = null;
    }
  } 

})
export const {loginSuccess, adminProfile, logoutProfile} = loginSlice.actions 
export default loginSlice.reducer

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   adminData: sessionStorage.getItem("adminToken")
//     ? JSON.parse(sessionStorage.getItem("adminToken"))
//     : null,
// };

// const adminloginSlice = createSlice({
//   name: "adminlogin",
//   initialState,
//   reducers: {
//     adminProfile: (state, action) => {
//       state.adminData = action.payload.token;
//       sessionStorage.setItem("adminToken",action.payload.token);
//     },
//     logoutProfile: (state) => {
//       state.adminData = null;
//       sessionStorage.removeItem("adminToken");
//     }
//   }
// });

// export const { adminProfile, logoutProfile } = adminloginSlice.actions;
// export default adminloginSlice.reducer;
