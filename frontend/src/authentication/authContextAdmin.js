import React, { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminProfile, logoutProfile } from "../adminLoginSlice";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const adminData = useSelector((state) => state.adminlogin.adminData[0]);
  const isAuthenticated = adminData !== undefined && adminData !== null;
  const dispatch = useDispatch();
    
  const login = (token) => {
    sessionStorage.setItem("adminToken", JSON.stringify(token));
    dispatch(adminProfile(token));
  };

  const logout = () => {
    sessionStorage.removeItem("adminToken");
    dispatch(logoutProfile());
  };

  return (
    <authContext.Provider value={{isAuthenticated, login, logout }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);