import React from "react"

const CloudMenuCards = ({title, img, content}) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center  my-6 font-poppins">
        <h3 className="text-[#983398] text-2xl font-semibold">{title}</h3>
        <img src={img} alt="img" className="w-52 h-52" /> 
        <h5 className="text-[#983398] text-lg font-bold mb-5  
        flex flex-wrap items-center justify-center w-[25rem] md:w-full">{content}</h5>
      </div>
    </>
  )
}

export default CloudMenuCards