import { createSlice } from "@reduxjs/toolkit";

const registrationSlice = createSlice({
  name:"register",
  initialState:{
    user:{},
    properties:[],
    otp:"",
    phone:""
  },
     
  reducers:{  
    addUser:(state, action) => {
      state.user = action.payload
    },
    addProperty:(state, action) => {
      // state = state.property.splice(0,1,action.payload)
      //state = state.property.push(action.payload)
      state.properties[(action.payload.number)] = action.payload.value
      console.log(action.payload)
    }, 
    addMoreProperty:() => {
      // state.properties[(action.payload.len)] = action.payload.propertyDetails
    }, 
    addOtp:(state, action) => {
      state.otp = action.payload
    },
    addPhone:(state,action) => {
      state.phone = action.payload
    },
    // updateProperty:(state, action) => {
    //    if(state.property[action.payload.number] !== null){
    //       state.property[action.payload.number] = action.payload.value
    //    }
    // }
  } 
})

export const {addUser, addProperty, addOtp, addPhone, updateProperty,addMoreProperty} = registrationSlice.actions 
export default registrationSlice.reducer