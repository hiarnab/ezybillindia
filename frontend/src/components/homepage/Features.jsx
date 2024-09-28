import React from "react"
import FeatureCard from "./FeatureCard.jsx"
import img1 from "../../assets/homepage/img1.svg"
// import img2 from "../../assets/homepage/img2.svg" 
//import img2 from "../../assets/homepage/scanner1.svg" 
import img2 from "../../assets/homepage/ezyBill.png"
import img3 from "../../assets/homepage/img3.png" 
import img4 from "../../assets/homepage/img4.svg" 
import img5 from "../../assets/homepage/img5.png"
import img6 from "../../assets/homepage/img6.png" 
//import img7 from "../../assets/homepage/img7.svg"
import bg from "../../assets/homepage/bg.svg"
const Features = () => {
  return (
    <>
      <div   style={{ backgroundImage: `url(${bg})`, backgroundRepeat:"no-repeat", backgroundSize:"cover" }}>
        <div className="grid grid-cols-1 font-poppins z-30 " >
          <p className='text-[#333333] font-medium text-[25px]  
     flex flex-wrap my-10 md:ml-10 px-10 md:px-0 font-poppins'>What makes us, <span className='text-[#7E007E] font-bold mx-1'>EzyBill India,</span> Stand Out?</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 z-10 relative px-10 ">
          <div className="overflow-y-scroll md:overflow-auto h-[33rem] md:h-full col-span-1 md:col-span-3 my-6 md:my-2">
            <div className="flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-3 z-10 relative md:px-10 md:my-12 ">
                <div >
                  <FeatureCard img={img1} hoverText="Keep an eye on your business activities on the go, anytime, anywhere!"
                    title="Remote Monitoring"     />
                </div>
                <div>
                  <FeatureCard img={img2} hoverText="Scan & Pay- Seamless payment by scanning QR codes on invoices"
                    title="Hassle-free QR Payment
     "     />
                </div>
                <div>
                  <FeatureCard img={img3} hoverText="Find GST and other comprehensive reports, all curated in one place for your needs"
                    title="Easy Access to Reports"     />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 md:px-10 md:my-12">
                <div>
                  <FeatureCard img={img5} hoverText="Enjoy a unique business day initiation-pause-conclusion feature on our software!"
                    title="Efficient Functionalities"     />
                </div>
                <div>
                  <FeatureCard img={img4} hoverText="Facilitate the ‘cash side’ of your business with our in-built Cash-box functionality"
                    title="Seamless Cash Handling"     />
                </div>
                <div>
                  <FeatureCard img={img6} hoverText="Save time on inventory control by automating the entire process with EzyBill India"
                    title="Automated Inventory Control"     />
                </div>
              </div>
             
            </div>
          </div>
          {/* <div className='hidden md:block'>
            <img
              src={img7}
              className='h-96' 
            
              alt="Louvre" />
          </div> */}
        </div>
      </div>
    

      




      
    </>
  )
}

export default Features