import React from "react"
import { Link } from "react-router-dom"

const CmCards = ({title, subtitle, amount}) => {
  return (
    <>
      <div className="py-4 px-4 md:px-24">
        <div className="flex flex-col items-center border-2 rounded-md border-[#F6CFFC] py-8 px-6
         font-medium text-2xl font-poppins justify-center gap-2">
          <p className="text-[#530980]">{title}</p>
          <p>{subtitle}</p>
          <p><span className="text-[#1B152B] text-3xl">{amount}</span> <span className="text-[#7A7D9C] text-[18px]  
           font-normal font-poppins">per month</span></p>
          <p className="text-[#7A7D9C] text-[18px]  
           font-normal font-poppins">including GST</p>
          {/* <p  className="text-[#7A7D9C] text-[18px]  
           font-normal font-poppins">+ Cloud Menu absolutely free</p> */}
          <Link to='/signup'>
            <button className='text-[#7E007E] border-2 border-[#7E007E] bg-white rounded-full
    hover:bg-rgba font-medium text-[15px] hover:text-white self-center px-8 py-2 font-raleway'>
      Get Started</button></Link>
        </div>
      </div>
    </>
  ) 
}

export default CmCards