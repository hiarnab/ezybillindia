import React from "react"
import {  useNavigate } from "react-router-dom"

const RmsCards = ({title, subtitle, amount,setScrollProp}) => {
  const navigate = useNavigate() 
  return (
    <>
      <div className=" py-4 px-4 md:px-24">
        <div className="flex flex-col items-center border-2 rounded-md border-[#F6CFFC] py-8 px-6
         font-medium text-md md:text-2xl font-poppins justify-center gap-2">
          <p>{title}</p>
          <p>{subtitle}</p>
          <p><span className="text-[#1B152B] text-md md:text-3xl">{amount}</span> <span className="text-[#7A7D9C] text-[18px]  
           font-normal font-poppins">per month</span></p>
          <p className="text-[#7A7D9C] text-[18px]  
           font-normal font-poppins">including GST</p>
          <p  className="text-[#7A7D9C] text-md md:text-[18px]  
           font-normal font-poppins">+ Cloud Menu absolutely free</p>
          <button className='text-[#7E007E] border-2 border-[#7E007E] bg-white rounded-full
    hover:bg-rgba font-medium text-[15px] hover:text-white self-center px-8 py-2 font-raleway' 
          onClick={() => {
            setScrollProp(true)
            navigate("/contact-us") 
          }}>
            Get Started
          </button>
        </div>
      </div>
    </>
  )
} 

export default RmsCards 