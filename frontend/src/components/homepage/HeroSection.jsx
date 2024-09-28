import React from "react"
import background from "../../assets/homepage/test.svg"
import bgimg from "../../assets/homepage/bgimg.svg"
// import scanner from "../../assets/homepage/scanner1.svg"
import PngImag from "../../assets/homepage/ezyBill.png"
import Sticky from "react-sticky-el";
import { Link, useNavigate } from "react-router-dom";


const HeroSection = (props) => {
  const navigate = useNavigate()
  return (
    <>
      <div className="grid grid-rows-3 grid-flow-col"> 
        <div className="hidden md:flex md:row-span-3 "> 

          <div className='flex flex-col  items-start gap-1 px-20 justify-center'>
            <button className='
    bg-rgba font-normal text-[12px] text-white rounded-xl px-4 py-1 my-4 font-poppins'>Your bill is on us!!</button>
            <p className='text-[#333333] font-bold  text-[25px] font-raleway'>Hotel and Restaurant  </p>
            <p className='text-[#333333] font-bold  text-[25px] font-raleway'>Management Software</p> 
            <p className='text-[#920592] font-bold  text-[25px]'>EzyBill India</p> 
            <p className='text-[#333333] font-light text-[15px] mt-3 font-poppins'>Empowering Hospitality Excellence, Embrace the Finest</p>
            <p className='text-[#333333] font-light text-[15px] font-poppins'>Hotel Management Software & Restaurant POS in India.</p>
            <div className='flex gap-3 py-3 my-3' >
              <Link to="/about">
                <button className='
    bg-rgba font-normal text-[15px] text-white rounded-md px-8 py-2'>
                Learn More 
                </button>
              </Link>
              <button className='
    border-2 border-[#7E007E]  font-normal text-[15px] text-[#7E007E] rounded-md px-8 py-2' 
              onClick={() => {
                props?.setScrollProp(true)
                navigate("/contact-us") 
              }} 
              >
                Get a Free Demo</button> 
            </div>
          </div>


        </div>
        <div className=" row-span-3  col-span-2">
          <img src={background} className='object-cover h-full md:h-[70vh] w-screen' alt='bg-img'/>
 
          {/* <div className='flex  gap-2 flex-col '> */}
          {/* <Sticky className="z-[99] relative top-0"> */}
          {/* <Sticky> */}
          <Sticky className ="absolute left-[-8%] md:left-4 md:flex md:flex-col  md:right-0  z-[9999]
     md:items-end top-[15%] md:top-[25%]" id="stick">
            <Link to="/login">
              <button className='rotate-90 md:-rotate-90 absolute md:right-[-2.5rem] 
              font-raleway mt-[5rem] ml-[-.8rem] md:ml-0
    bg-rgba font-normal text-[15px] text-white rounded-t-2xl px-8 py-2 w-32'>
            Login 
              </button></Link> 
            <Link to="/signup"> <button className='rotate-90 md:-rotate-90 ml-[-0.6rem]
             md:ml-[0rem] absolute  md:right-[-2.3rem] font-raleway
    bg-white font-normal text-[15px] text-[#7E007E] rounded-t-2xl px-8 py-2 max-w-max 
    border-2 border-[#7E007E] mt-[12.8rem]'>
             Register
            </button>
            </Link> 
           
          </Sticky>
        
        </div>
 
      </div>
      <div className="row-span-3 md:hidden">

        <div className='flex flex-col items-center md:items-start gap-1 px-5 md:px-20 '>
          <button className='
    bg-rgba font-normal text-[12px] text-white rounded-xl px-4 py-1 my-4 font-poppins'>Your bill is on us!!</button>
          <p className='text-[#333333] font-semibold  text-[25px] font-raleway'>Hotel and Restaurant </p>
          <p className='text-[#333333] font-semibold  text-[25px] font-raleway'>Management Software</p> 
          <p className='text-[#920592] font-bold  text-[25px] font-poppins'>EzyBill India</p> 
          <p className='text-[#333333] font-extralight text-[15px] mt-3 font-poppins'>Empowering Hospitality Excellence, Embrace the Finest Hotel Management Software & Restaurant POS in India.</p>
          {/* <p className='text-[#333333] font-extralight text-[15px] font-poppins'>Hotel Management Software & Restaurant POS in India.</p> */}
          <div className='flex gap-3 py-3 my-3' >
            <button className='
    bg-rgba font-normal text-[15px] text-white rounded-md px-8 py-2 font-raleway'>
              <Link to="/about"> Learn More</Link></button>
            <button className='
    border-2 border-[#7E007E]  font-normal text-[15px] text-[#7E007E] rounded-md px-8 py-2 
    font-raleway'  onClick={() => {
              props.setScrollProp(true)
              navigate("/contact-us") 
            }}>
          Get a Free Demo</button>
          </div>
        </div>
 
      </div>
      <Sticky className="z-[99] relative top-0">
        <div className="grid grid-cols-1 md:grid-cols-3 z-[99] relative 
          py-6 md:py-3 font-raleway bg-no-repeat bg-cover " 
        style={{ backgroundImage: `url(${bgimg})`, backgroundRepeat:"no-repeat", backgroundSize:"cover" }}>
          <div className='col-span-1 md:col-span-2'>
            <div className='grid grid-cols-3 md:flex md:items-center md:justify-center md:col-span-2'>
              <img src={PngImag} alt="" className='w-28 h-24 
             md:w-24 md:h-24 mx-auto md:mx-5 md:py-4 my-auto
            back object-contain' /> 
              <div className="col-span-2 md:flex md:flex-col text-[#333333] pr-2 md:pr-0 md:px-0">
                {/* <p className='text-[14px] flex flex-wrap justify-start 
                 '>Scan this QR to view a sample & Upgrade your paper menu to 
                  <span className='text-[#7E007E] font-bold mx-2'> Cloud Menu </span>
                 & Upgrade your paper menu to <span className='text-[#7E007E] font-bold mx-2'>
                  Cloud Menu </span> for your Restaurant, Hotel or Café. </p> */}
                <p className='text-sm  md:text-[18px] flex flex-wrap justify-start  md:leading-10
                 '>Scan this QR to view a sample & Upgrade your paper menu to 
                  <span className='text-[#7E007E] font-bold mx-0 md:mx-2'> Cloud Menu </span>
                </p> 
                <p className='text-xs text-[#7E007E] flex flex-row md:flex-row 
                justify-start 
                  flex-wrap font-bold px-0'>
                  Launching Offer- FREE for 3 months then Only ₹ 69/-  per month !</p>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-center py-3 md:py-0'>
            <Link to="/signup">
              <button className='bg-rgba font-medium text-[15px] text-white rounded-lg px-8 py-2'>
             Try free Cloud Menu for 3 Months
              </button>
            </Link>
          </div>
        </div>
      </Sticky>
     

    </>
  )
}

export default HeroSection