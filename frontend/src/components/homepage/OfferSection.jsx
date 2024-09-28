import React from "react"
// import offer from "../../assets/homepage/offerImage.svg"
import offer from "../../assets/homepage/eazy.png"
import { Link } from "react-router-dom"
//import {  useNavigate } from "react-router-dom"

const OfferSection = () => {
  //const navigate = useNavigate()
  // const handler = () => {
  //   props.setScrollProp(true)
  //   navigate("/contact-us") 
  // }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div className='flex flex-col items-start justify-center ml-20  py-10 md:py-0'>
          <p className='text-[#333333] text-[20px] font-bold font-poppins'>Splash yourself</p>
          <p className='text-[#7E007E] font-bold text-[30px] font-poppins'>Bigger Offer</p>
          <p className='text-[#000000] font-semibold text-[20px] mt-5 font-raleway'>Up to 10 rooms only <span className='font-bold'>₹699/-</span> per <br/>
          </p>
          <p className='text-[#000000] font-semibold text-[20px] font-raleway'>month including gst.</p>
          <p className='text-lg text-[#860286] font-bold'>+</p>
          <p className='text-[#000000] font-semibold text-[20px] mb-5 font-raleway'>Cloud Menu absolutely <span className='text-[#860286] font-bold'>Free!!</span></p>
          <Link to='/pricing'>
            <button className='bg-rgba font-normal text-[15px] text-white rounded-sm px-8 py-2 
          font-raleway'
              //  onClick={() => {
              //   props.setScrollProp(true)
              //   navigate("/contact-us") 
              // }}
            >
           Explore Now 
            
            </button>
          </Link>
        </div>
        <div>
          <img src={offer} alt="" />
        </div>
      </div> 
    </>
  )
}

export default OfferSection