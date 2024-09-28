
import React from "react"
import featurebg from "../../assets/homepage/featurebg.svg"
import user from "../../assets/homepage/icon-rect.svg"
import f1 from "../../assets/homepage/f1.svg"
import f2 from "../../assets/homepage/f11.svg"
import f3 from "../../assets/homepage/f3.svg"


 

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import CarouselCards from "./CarouselCards.jsx";

const MainFeatures = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-10 py-20"  
        style={{ backgroundImage: `url(${featurebg})` }}
      >
        <div className='col-span-1'>
          <img src={user} alt="" />
        </div>
 
        <div className='hidden md:block md:col-span-3'>
          <div className="grid grid-cols-3 gap-4">
            <div className='my-6'>
              <CarouselCards img={f1} title="Hotel Managament Software" 
                content="Hotel Management Software (HMS) is a comprehensive solution tailored for the hospitality industry, enabling efficient management of daily operations and exceptional guest experiences."/> 
            </div>
            <div className='my-6'>
              <CarouselCards img={f2} title="Restaurant Managament Software" 
                content="Restaurant Management Software (RMS) offers a range of features to
    streamline various aspects of 
    restaurant operations, including 
    order management, table reservations, menu customization, 
    staff scheduling, and billing. "/> 
            </div>
            <div className='my-6'>
              <CarouselCards img={f3} title="Cloud Menu" 
                content="Cloud Menu (CM) is digital menu 
    solution that leverages cloud-
    based technology to transform the 
    traditional paper menus into 
    interactive and dynamic digital 
    menus."/> 
            </div>
          </div>
        </div>
        <div className='col-span-1 md:hidden'>
          <Carousel  showArrows={true}>
            <div className="my-8">
              <CarouselCards img={f1} title="Hotel Managament Software" 
                content="Hotel Management Software (HMS) is a comprehensive solution tailored for the hospitality industry, enabling efficient management of daily operations and exceptional guest experiences."/> 
            </div>
            <div className="my-8">
              <CarouselCards img={f2} title="Restaurant Managament Software" 
                content="Restaurant Management Software (RMS) offers a range of features to
    streamline various aspects of 
    restaurant operations, including 
    order management, table reservations, menu customization, 
    staff scheduling, and billing. "/> 
            </div>
            <div className="my-8">
              <CarouselCards img={f3} title="Cloud Menu" 
                content="Cloud Menu (CM) is digital menu 
    solution that leverages cloud-
    based technology to transform the 
    traditional paper menus into 
    interactive and dynamic digital 
    menus."/> 
            </div>
          </Carousel>
        </div>
      </div>

      {/* <div>
    <Carousel>
                <div>
                    <img src={bg} />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src={user} />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src={bg} />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
    </div> */}
    </>
  )
}

export default MainFeatures