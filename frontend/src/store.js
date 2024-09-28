import {configureStore} from "@reduxjs/toolkit"
import registrationSlice from "./registrationSlice"
import loginSlice from "./loginSlice"
import propertySlice from "./propertySlice"
import adminLoginSlice from "./adminLoginSlice"
export const store = configureStore({
  reducer:{
    register:registrationSlice,
    login:loginSlice,
    property:propertySlice,
    adminlogin:adminLoginSlice
  }
}) 