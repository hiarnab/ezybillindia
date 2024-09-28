import React from "react"
import logo from "../assets/contact/logo.png"

const OuterNav = () => {
  return (
    <div className="mx-auto py-3 w-full px-2 sm:px-6 lg:px-8 shadow-lg flex flex-wrap justify-between">
      <div><img src={logo} alt="logo" width={150}/></div>
      <div className="xl:block hidden">
        <ul  className="flex justify-between flex-row">
          <li className="nav-item md:mx-20 mx-5 mt-1.5 font-semibold text-lg text-gray-500">
            <span className="ml-2">Home</span>          
          </li>
          <li className="nav-item md:mx-20 mx-5 mt-1.5 font-semibold text-lg text-gray-500">    
            <span className="ml-2">About us</span>    
          </li>
          <li className="nav-item md:mx-20 mx-5 mt-1.5 font-semibold text-lg text-gray-500">          
            <span className="ml-2">Products & Services</span>      
          </li>
          <li className="nav-item md:mx-20 mx-5 mt-1.5 font-semibold text-lg text-gray-500">
            <span className="ml-2">Contact us</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default OuterNav