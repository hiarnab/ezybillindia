import React, {  useState } from "react"
import logo1 from "../../assets/homepage/logo1.png"
//import logo2 from "../../assets/homepage/logo2.png"
import { Link } from "react-router-dom";
const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [dropdown, setdropdown] = useState(false)
  // const navigate = useNavigate()
  
  return (
    <>
      <nav className="w-full bg-white shadow-lg">
        <div className="px-4 mx-auto md:justify-around md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <Link to="/">
                <div className='flex items-center mr-0 md:mr-10'>
                  <img src={logo1} alt='logo' className='h-[40px]'/>
                  <span className='font-poppins text-2xl font-bold text-[#7E007E]'>EzyBill India</span>
                </div>
              </Link> 
              <div className="md:hidden"> 
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => {
                    setNavbar(!navbar)
                    setdropdown(false)
                  }}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-[#7E007E]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-[#7E007E]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="flex flex-col md:flex-row md:ml-10  items-center justify-center space-y-8 md:flex 
               md:space-x-6 md:space-y-0 md:gap-[3rem]">
                <li className="text-[#5E5E5E] font-raleway font-medium text-[16px]  hover:text-[#5E5E5E]">
                  <Link to='/'>Home</Link>
                </li>
                <li className="text-[#5E5E5E] font-raleway font-medium text-[16px]  hover:text-[#5E5E5E]">
                  <Link to='/about'>About us</Link> 
                </li>
                {/* <li 
                            className="text-[#5E5E5E] font-medium text-[16px]                               hover:text-[#5E5E5E]" id="dropdownDelayButton" data-dropdown-toggle="dropdownDelay">
                                <a href="javascript:void(0)">Pricing</a>
                            </li> */}
                <button id="dropdownDelayButton" data-dropdown-toggle="dropdownDelay" data-dropdown-delay="500" data-dropdown-trigger="hover" 
                  className="text-[#5E5E5E] flex items-center 
                            mx-auto md:mx-0 font-raleway
                            font-medium text-[16px]  hover:text-[#5E5E5E]" type="button" 
                  onClick={()=>setdropdown(!dropdown)}>
                                Products & Services <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                  </svg></button>

                           
                <li className="text-[#5E5E5E] font-raleway font-medium text-[16px]  hover:text-[#5E5E5E]">
                  <Link to='/pricing'>Pricing</Link> 
                </li>
                           
                {/* <li className="text-[#5E5E5E] font-raleway font-medium text-[16px] cursor-pointer
                 hover:text-[#5E5E5E]"  role="presentation" onClick={() => {
                  props.setScrollProp(true)
                  navigate("/contact-us") 
                }} >
                 Contact Us
                </li> */}
                <li className="text-[#5E5E5E] font-raleway font-medium text-[16px]  hover:text-[#5E5E5E]">
                  <Link to='/contact-us'>Contact Us</Link> 
                </li>
              </ul>
 
                      
            </div> 
          </div>
               
        </div>
          
      </nav>
      {
        dropdown &&  
                            <div id="dropdownDelay" className="z-10 absolute right-[15%] md:right-[300px] bg-white  
                             divide-y divide-gray-100  shadow  dark:bg-gray-700  
                             mt-[-7rem] md:mt-[0rem]
                             ">
                              <ul className="text-sm border-t-2 border-[#7E007E] text-[#7E007E] 
                              dark:text-gray-200" aria-labelledby="dropdownDelayButton">
                                <li>
                                  <Link className="block px-4 py-2 hover:bg-[#FFE1FF]" to='/cm'>Cloud Menu(CM)</Link>
                                  {/* <a href="#" className="block px-4 py-2 hover:bg-[#FFE1FF]">Cloud Menu(CM)</a> */}
                                </li>
                                <li>
                                  {/* <a href="#" className="block px-4 py-2 border-t-2 border-[#7E007E] hover:bg-[#FFE1FF]">Hotel Management Software (HMS)</a> */}
                                  <Link className="block px-4 py-2 hover:bg-[#FFE1FF]" to='/hms'>Hotel Management Software (HMS)</Link>
                                </li>
                                <li>
                                  {/* <a href="#" className="block px-4 py-2 border-t-2 border-b-2 border-[#7E007E] hover:bg-[#FFE1FF]">Restaurant Management Software (RMS)</a> */}
                                  <Link className="block px-4 py-2 hover:bg-[#FFE1FF]" to='/rms'>Restaurant Management Software (RMS)</Link>
                                </li>
                              </ul>
                            </div>
      }
    </>
  );
}

export default Navbar