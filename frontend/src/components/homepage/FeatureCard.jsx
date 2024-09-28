import React from "react"

const FeatureCard = ({hoverText, title, img}) => {
  return (
    <div className="font-poppins my-6 md:my-0">
      <div className="relative max-w-xs overflow-hidden bg-cover ">
        <div className="rounded-md p-4 relative
         bg-no-repeat border-2 border-[#920592]">
          <img
            src={img}
            style={{ objectFit: "contain" }}
            className='h-96'
            // class="max-w-xs"
            alt="Louvre" />
          <div
            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full
             text-[#FFFFFF] text-[15px]
        overflow-hidden bg-[#C77DCE] bg-fixed opacity-0 
        transition duration-300 ease-in-out 
        hover:opacity-90 hover:cursor-pointer font-medium flex justify-center items-center px-10">
            {hoverText}
          </div>
        </div>
        <p className='text-[#7E007E] text-center font-bold text-[17px] py-2'>{title}</p>
      </div>
     
    </div>
  )
}

export default FeatureCard