import React, { useEffect, useRef, useState } from "react"
import Navbar from "../components/homepage/Navbar.jsx"
import pricingbg from "../assets/pricing/pricingbg.svg"


import PricingBanners from "../components/pricing/PricingBanners.jsx"
import Footer from "../components/homepage/Footer.jsx"
import PricingCards from "../components/pricing/PricingCards.jsx"
import RmsCards from "../components/pricing/RmsCards.jsx"
import Sticky from "react-sticky-el";
import { Link } from "react-router-dom" 
import CmCards from "../components/pricing/CmCards.jsx"

const Pricing = ({setScrollProp}) => {
  const [selectedValue,setSelectedValue] = useState("HMS"); 
  
  function handleSelectChange(event) {
    setSelectedValue(event.target.value);
  }

  const scrollRef = useRef()
  useEffect(()=>{
    scrollRef.current.scrollIntoView()
  },[]) 

  useEffect(()=>{
    console.log("selectedValue",selectedValue)
  },[selectedValue])
  return ( 
    <>
      <div ref={scrollRef}>
        <Navbar/>
      </div>
  
      <Sticky>
        <div className="flex justify-center items-center flex-col gap-2 py-2 px-1" 
          style={{ backgroundImage: `url(${pricingbg})` }}>
          <p className="text-[#B0138D] text-md md:text-[20px] font-semibold">Bigger Offer </p>
          <p className="text-[#6C3C67] text-xs md:text-[16px] font-medium">Up to 10 rooms(Stand-Alone Version) – ₹699 including GST + Cloud Menu Absolutely Free</p>
          <p className="text-[#FF7474] text-md md:text-[15px] font-medium">10% OFF On Annual Billing </p>
        </div>
      </Sticky>
     
      <div className="flex flex-col justify-center items-center py-4">
        <p className="text-[#7E007E] flex flex-col justify-center items-center gap-4
          text-xl md:text-[33px] font-semibold px-6 font-raleway">
          <span className="pt-4">Reasonable Pricing Plan For Cost</span>  
          <span> Effective Business</span>
        </p>
        <p className="text-[#1B152B] text-sm flex flex-col px-2 md:px-0 py-5 items-center justify-center">
          <span>Find the perfect plan for your needs with our straightforward pricing options. Discover competitive rates and unlock the</span>
          <span>exceptional value we offer for our top-notch services.</span>
        </p>
        <div className="flex justify-center items-center px-2 md:px-0">
          <label htmlFor="countries" className="block mb-2 text-sm font-medium w-[250px] mr-5
            text-#170F49 ">Choose the application</label>
          <select id="countries" className="bg-gray-50 border 
           border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
             dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
          value={selectedValue} onChange={handleSelectChange}
          >
            <option  selected>Choose an option</option>
            <option value="HMS">Hotel Management Software (HMS)</option>
            <option value="RMS">Resturant Management Software (RMS)</option>
            <option value="CMS">Cloud Menu (CMS)</option>
          
          </select>

        </div>

        <Sticky className ="absolute right-20 md:left-4 md:flex md:flex-col  md:right-0  
     md:items-end top-[15%] md:top-[25%]">
          <Link to="/login"> <button className='-rotate-90 md:-rotate-90 
          right-[-7.7rem] ml-[-.4rem] md:ml-0
          absolute mt-[5rem] 
           md:right-[-2.5rem] font-raleway 
    bg-rgba font-normal text-[15px] text-white rounded-t-2xl px-8 py-2 w-32'>
           Login 
          </button></Link> 
          <Link to="/signup">  <button className='-rotate-90 md:-rotate-90 ml-[-0.2rem]
             md:ml-[0rem] absolute  md:right-[-2.3rem] font-raleway
    bg-white font-normal text-[15px] text-[#7E007E] rounded-t-2xl px-8 py-2 max-w-max 
    border-2 border-[#7E007E] mt-[12.8rem]'>
           Register
          </button>
          </Link> 
        </Sticky> 
 
      </div>
      {
        selectedValue === "HMS" ? 
          <>
            <PricingBanners title="Hotel Management Software"/>
            <PricingCards setScrollProp={setScrollProp}/>
          </> : 
          selectedValue === "RMS" ? 
            <>
              <PricingBanners title="Resturant Management Software"/>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4  px-4 md:px-20 my-8 mx-6">
                <RmsCards title="Standard" subtitle="(Stand-Alone Version)" amount="₹599" 
                  setScrollProp={setScrollProp}/>
                <RmsCards title="Premium" subtitle="(Online Version)" amount="₹899" 
                  setScrollProp={setScrollProp}/>
              </div>
            </> :
            selectedValue === "CMS" ? 
              <>
                <PricingBanners title="Cloud Menu"/>
                <div className="grid grid-cols-1  gap-4  md:px-80 my-8 mx-6">
                  <CmCards title="Free" subtitle="for 3 months, and then" amount="₹69"/>
                </div>
              </>
              : null
      }
     


    
     
     
      <Footer/>
    </>
  )
}

export default Pricing