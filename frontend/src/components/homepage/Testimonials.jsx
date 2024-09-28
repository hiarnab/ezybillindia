import React from "react"
import bg from "../../assets/homepage/bg-testimonials.svg"
import TestimonialCard from "./TestimonialCard.jsx"
import { Carousel } from "react-responsive-carousel";
const Testimonials = () => {
  return (
    <>
      <div className="py-5 md:my-6" style={{ backgroundImage: `url(${bg})` }}   >
        <p className='text-[#FFFFFF] text-[25px] font-semibold text-center font-poppins'>Lets see what our customers say</p>
        <Carousel>
          <div className='hidden md:grid  md:grid-cols-3 gap-4'>
            <div className='p-8'>
              <TestimonialCard title="Mr Don Dey" subtitle="Café & Pub owner"   content="I highly recommend EzyBill India's restaurant management software with a customized cloud menu. It has significantly improved our productivity, allowing us to streamline operations and create unique menu items effortlessly. The efficient management tools have been a game-changer for our café. 
"/>
            </div>
            <div className='p-8'>
              <TestimonialCard title="Mr Kush Chaudhury" subtitle="Hotel Owner" content="As a hotel owner, I am thrilled with EzyBill India's hotel management software. The day-start-pause feature is excellent, allowing me to efficiently manage operations. It's a game-changer for our hotel at a very reasonable price! Highly recommended.
"/>
            </div>
            <div className='p-8'>
              <TestimonialCard title="Mr Biswajit Bhattacharje " subtitle="Hotel Owner" content="I highly recommend EzyBill India's hotel management software for its exceptional inventory management capabilities. It has helped streamline our operations, ensuring efficient management of our hotel's inventory. The software has been a great help for us, enhancing productivity and ensuring smooth day-to-day operations."/>
            </div>        
          </div>

          <div className='hidden md:grid  md:grid-cols-3 gap-4'>
         
            <div className='p-8'>
      
              <TestimonialCard title="Mr Roshan Thakur" subtitle="Café & Pub owner" content="Ezybill India's hotel management software is exceptional. The on-call instant support facility is highly commendable and ensures smooth operations. With its user-friendly interface and comprehensive features, it has significantly improved efficiency and customer satisfaction. A perfect choice for any hotel manager."/>
            </div>
            <div className='p-8'>
              <TestimonialCard title="Mr Debraj Pattnaik" subtitle="Hotel Owner" content=" The HMS offers clear reports, streamlines operations, and enhances customer satisfaction. With its excellent features like customised cloud menu and on-call instant support, it has significantly improved productivity in our hotel."/>
            </div>
            <div className='p-8'>
              <TestimonialCard title="Pritikana Raj" subtitle="Restaurant manager" content="I've been using EzyBill's restaurant management software with its cloud menu feature for a few months now, and I must say, it's been a game-changer for my restaurant in Kolkata. The software is not only cost-effective but also incredibly easy to use. It has simplified our daily operations and made menu updates a breeze. EzyBill has truly made managing our restaurant more efficient and enjoyable. Highly recommended!"/>
            </div>
          </div>
        </Carousel>
 

        <div className='grid grid-cols-1 md:hidden'>
          <Carousel>
           
            <div className='p-8'>
              <TestimonialCard title="Mr Don Dey" subtitle="Café & Pub owner"   content="I highly recommend EzyBill India's restaurant management software with a customized cloud menu. It has significantly improved our productivity, allowing us to streamline operations and create unique menu items effortlessly. The efficient management tools have been a game-changer for our café. 
"/>
            </div>
            <div className='p-8'>
              <TestimonialCard title="Mr Kush Chaudhury" subtitle="Hotel Owner" content="As a hotel owner, I am thrilled with EzyBill India's hotel management software. The day-start-pause feature is excellent, allowing me to efficiently manage operations. It's a game-changer for our hotel at a very reasonable price! Highly recommended.
"/>
            </div>
            <div className='p-8'>
              <TestimonialCard title="Mr Biswajit Bhattacharje " subtitle="Hotel Owner" content="I highly recommend EzyBill India's hotel management software for its exceptional inventory management capabilities. It has helped streamline our operations, ensuring efficient management of our hotel's inventory. The software has been a great help for us, enhancing productivity and ensuring smooth day-to-day operations."/>
            </div>        
      
            <div className='p-8'>
              <TestimonialCard title="Mr Roshan Thakur" subtitle="Café & Pub owner" content="Ezybill India's hotel management software is exceptional. The on-call instant support facility is highly commendable and ensures smooth operations. With its user-friendly interface and comprehensive features, it has significantly improved efficiency and customer satisfaction. A perfect choice for any hotel manager."/>
            </div>
            <div className='p-8'>
              <TestimonialCard title="Mr Debraj Pattnaik" subtitle="Hotel owner" content=" The HMS offers clear reports, streamlines operations, and enhances customer satisfaction. With its excellent features like customised cloud menu and on-call instant support, it has significantly improved productivity in our hotel."/>
            </div>
            <div className='p-8'>
              <TestimonialCard title="Pritikana Raj" subtitle="Restaurant manager" content="I've been using EzyBill's restaurant management software with its cloud menu feature for a few months now, and I must say, it's been a game-changer for my restaurant in Kolkata. The software is not only cost-effective but also incredibly easy to use. It has simplified our daily operations and made menu updates a breeze. EzyBill has truly made managing our restaurant more efficient and enjoyable. Highly recommended!"/>
            </div>
          </Carousel>
 
        </div>
      </div>
    </>
  )
}

export default Testimonials