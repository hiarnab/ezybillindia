import React from "react"
import tick from "../../assets/pricing/tick.svg";

const PricingCard = ({content, span, rupee, amt, subcontent}) => {
  return (
    <>
      <div className="flex gap-2">
        <img src={tick} alt="" className="w-6 h-6" />
        <div className="flex text-sm text-[#1B152B] flex-col items-center justify-center">
          <p className="font-poppins"> {content}
            <span className="font-bold font-poppins px-1">{span}</span> 
            <span className="font-mono text-[15px]">{rupee}</span>
            <span className="font-poppins font-bold">{amt}</span>
            <span className="font-poppins">{subcontent}</span>
          </p>
        </div>
      </div>
    </>
  )
}

export default PricingCard