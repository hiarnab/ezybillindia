import React from "react"

const TestimonialCard = ({title, subtitle, content}) => {
  return (
    <div className='flex bg-[#FFFFFF] flex-col items-center justify-center gap-3 shadow-xl
    p-4  rounded-xl h-96 w-70'>
      <p className='text-[#000000] text-base font-medium font-poppins'>{title}</p>
      <p className='text-[#4F4F4F] text-[12px] font-raleway'>{subtitle}</p>
      <p className='text-[#676767] text-[14px] font-raleway'>{content}</p>
    </div>
  )
}

export default TestimonialCard