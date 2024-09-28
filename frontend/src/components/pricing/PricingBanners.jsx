import React from "react"

const PricingBanners = ({title}) => {
  return (
    <>
      <div className="bg-[#7E007E] text-center my-8">
        <p className="text-white font-poppins font-medium py-3 text-md md:text-4xl">{title}</p>
      </div>
    </>
  )
}

export default PricingBanners