import React, { useEffect, useRef } from "react"
import Navbar from "../components/homepage/Navbar.jsx"
import HeroSection from "../components/homepage/HeroSection.jsx"
import Features from "../components/homepage/Features.jsx"
import MainFeatures from "../components/homepage/MainFeatures.jsx"
import OfferSection from "../components/homepage/OfferSection.jsx"
import Testimonials from "../components/homepage/Testimonials.jsx"
import Contact from "../components/homepage/Contact.jsx"
import Footer from "../components/homepage/Footer.jsx"

const HomePage = ({setScrollProp}) => {
  const scrollRef = useRef()
  useEffect(()=>{
    scrollRef.current.scrollIntoView()
  },[])
  return (
    <>
      <div ref={scrollRef}>
        <Navbar setScrollProp={setScrollProp}/>
      </div>
    
      <HeroSection setScrollProp={setScrollProp}/> 
      <Features/>
      <MainFeatures/>
      <OfferSection setScrollProp={setScrollProp}/>
      <Testimonials/>
      <Contact />
      <Footer/>
    </> 
  )
}

export default HomePage