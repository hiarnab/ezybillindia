import React from "react"

const Cards = ({title, content, img}) => {
  return (
    <>
      <div className="flex gap-5 items-center justify-center px-8 md:px-28 py-4 md:py-0">
        <img src={img} alt="" />
        <div className="flex flex-col">
          <p className="text-[#7E007E] uppercase text-sm font-poppins font-medium">{title}</p>
          <p className="text-[#333333] text-xs font-raleway">{content}</p>
        </div>
      </div>
    </>
  )
}

export default Cards