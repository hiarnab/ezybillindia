import React, { useEffect, useState } from "react";
import control from "../assets/dashboard/control.png";
import logo1 from "../assets/homepage/logo1.png";
import { FaHotel, FaCreditCard } from "react-icons/fa";
import { RiMenuSearchFill } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import { TbListDetails } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md"
import { IoListOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropertyDetails from "./PropertyDetails.jsx";
import AddProperty from "./AddProperty.jsx";
import AddCategory from "./AddCategory.jsx";
import AddSubCategory from "./AddSubCategory.jsx";
import AddProduct from "./AddProduct.jsx";
import { FaUser } from "react-icons/fa";
import Profile from "./Profile.jsx";
import MyProperties from "./MyProperties.jsx";
import { useSelector } from "react-redux";
import AddImage from "./AddImage.jsx";
import PricingUi from "./PricingUi.jsx";
import Payments from "./Payments.jsx";
import PackagePlan from "./PackagePlan.jsx";
import ThankyouPage from "./ThankyouPage.jsx";




const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const [sidebarTabs, setSidebarTabs] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuType = useSelector((store) => store?.property?.menuType);



  useEffect(() => {
    if (sidebarTabs) {
      navigate("/dashboard/propertydetails");
    } else {
      navigate("/dashboard/properties");
      setSidebarTabs(false);
    }
  }, [sidebarTabs]);

  // useEffect(()=>{
  //   console.log("loaded")
  //   if(location === "/dashboard/addproperty")
  //   {
  //     addMenuType("")
  //   }
  // },[])
  // useEffect(()=> {
  //  setSidebarTabs(false)
  //  console.log('sidebar tabs')
  // },[])

  // useEffect(()=>{
  //   if(!accessToken){
  //     navigate('/login')
  //   }

  // },[accessToken, navigate])

  // useEffect(()=>{
  //   if(accessToken){
  //     navigate('/dashboard/properties')
  //   }
  //   else navigate('/login')
  // },[accessToken, navigate])
  const logout = () => {
    sessionStorage.removeItem("userToken");
    window.location.href = "/"
  }
  return (
    <>

      <div className="flex ">
        <div
          className={`${open ? "w-62 md:w-72" : "w-20 "
          } bg-[#FFFFFF] min-h-screen p-5  pt-8 relative duration-300 shadow-2xl`}
        >
          <img
            src={control}
            alt="background img"
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
            role="presentation"
          />
          <div className="flex gap-x-2 items-center">
            {open ? (
              <>
                <img src={logo1} alt="logo" className="h-[40px]" />
                <p className="font-poppins text-xs md:text-2xl font-bold text-[#7E007E]">
                  EzyBill India
                </p>
              </>
            ) : (
              <img src={logo1} alt="logo" className="h-[40px]" />
            )}
            {/* <img
              src={logo} alt="logo"
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            /> */}
          </div>
          <ul className="pt-6">
            <Link to="/dashboard/profile">
              <li
                className="flex  rounded-md p-2 cursor-pointer hover:bg-light-white
               text-gray-300 text-sm items-center gap-x-4 
              mt-2 bg-light-white"
              >
                {/* <img src={profile} alt="profile" /> */}
                <FaUser size="16px" fill="gray" />
                <span
                  className={`${!open && "hidden"
                  } origin-left duration-200 text-[#3A3939] font-semibold`}
                >
                  My Profile
                </span>
              </li>
            </Link>
            <Link to="/dashboard/properties">
              <li
                className="flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300
                 text-sm items-center gap-x-4 
              mt-2 bg-light-white"
              >
                {/* <img src={profile} alt="profile" /> */}
                <FaHotel size="16px" fill="gray" />
                <span
                  className={`${!open && "hidden"
                  } origin-left duration-200 text-[#3A3939] font-semibold`}
                >
                  My Properties
                </span>
              </li>
            </Link>

            {sidebarTabs ? (
              <>
                <Link to="/dashboard/propertydetails">
                  <li
                    className="flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 
                    text-[14px] items-center gap-x-4 mt-2 bg-light-white ml-2"
                  >
                    {/* <img src={profile} alt="profile" /> */}
                    <TbListDetails size="19px" stroke="gray" />
                    <span
                      className={`${!open && "hidden"
                      } origin-left duration-200 text-[#3A3939] font-semibold`}
                    >
                      Property Details
                    </span>
                  </li>
                </Link>

                {menuType === "image" ? (
                  <Link to="/dashboard/image">
                    <li
                      className="flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300
                       text-[14px]  items-center gap-x-4 
              mt-2 bg-light-white ml-4"
                    >
                      {/* <img src={profile} alt="profile" /> */}
                      <RiMenuSearchFill size="20px" stroke="gray" fill="gray" />
                      <span
                        className={`${!open && "hidden"
                        } origin-left duration-200 text-[#3A3939] font-semibold`}
                      >
                        Image Menu
                      </span>
                    </li>
                  </Link>
                ) : menuType === "Text menu" || menuType === "text" ? (
                  <>
                    <Link to="/dashboard/category">
                      <li
                        className="flex ml-4 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-[14px]  items-center gap-x-4 
              mt-2 bg-light-white"
                      >
                        {/* <img src={profile} alt="profile" /> */}
                        <BiCategory size="20px" stroke="gray" fill="gray" />
                        <span
                          className={`${!open && "hidden"
                          } origin-left duration-200 text-[#3A3939] font-semibold`}
                        >
                          Category
                        </span>
                      </li>
                    </Link>
                    <Link to="/dashboard/subcategory">
                      <li
                        className="flex ml-4 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-[14px]  items-center gap-x-4 
              mt-2 bg-light-white"
                      >
                        {/* <img src={profile} alt="profile" /> */}
                        <MdOutlineCategory size="20px" stroke="gray" fill="gray" />
                        <span
                          className={`${!open && "hidden"
                          } origin-left duration-200 text-[#3A3939] font-semibold`}
                        >
                          Sub-category
                        </span>
                      </li>
                    </Link>
                    <Link to="/dashboard/product">
                      <li
                        className="flex ml-4 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-[14px]  items-center gap-x-4 
              mt-2 bg-light-white"
                      >
                        {/* <img src={profile} alt="profile" /> */}
                        <IoListOutline size="20px" stroke="gray" strokeWidth={30} />
                        <span
                          className={`${!open && "hidden"
                          } origin-left duration-200 text-[#3A3939] font-semibold`}
                        >
                          Product
                        </span>
                      </li>
                    </Link>
                  </>
                ) : null}
                <Link to="/dashboard/package-plan">
                  <li
                    className="flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 
                    text-[14px] items-center gap-x-4 mt-2 bg-light-white ml-2"
                  >
                    {/* <img src={profile} alt="profile" /> */}
                    <FaCreditCard size="16px" fill="gray" />
                    <span
                      className={`${!open && "hidden"
                      } origin-left duration-200 text-[#3A3939] font-semibold`}
                    >
                      My Package
                    </span>
                  </li>
                </Link>
                <Link to="/dashboard/payments">
                  <li
                    className="flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300
                 text-[14px] items-center gap-x-4 mt-2 bg-light-white ml-2"
                  >
                    {/* <img src={profile} alt="profile" /> */}
                    <FaCreditCard size="16px" fill="gray" />
                    <span
                      className={`${!open && "hidden"
                      } origin-left duration-200 text-[#3A3939] font-semibold`}
                    >
                      My Payments
                    </span>
                  </li>
                </Link>
              </>
            ) : (
              ""
            )}

            {/* <Link to="/admin/setting-page">
              <li
                className="flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300
                 text-sm items-center gap-x-4 
              mt-2 bg-light-white"
              >
              
                <FaCreditCard  size="16px" fill="gray" />
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-200 text-[#3A3939] font-semibold`}
                >
                  Setting
                </span>
              </li>
            </Link> */}

          </ul>
          <div className={"absolute bottom-0"}>
            <button
              className="font-normal rounded  bg-[#dc2626] text-[white] flex items-center py-2 my-6 text-[16px] w-full px-10 cursor-pointer opacity-100 font-jost"
              onClick={logout}>
              Logout <span className="ml-2 rotate-180"><MdLogout fill="#ffff" size={20} /></span>
            </button>
          </div>
        </div>

        <div className="items-center mx-auto p-7 w-screen">
          {location.pathname
            ?.toString()
            .split("/")
            .map((text) => {
              return text === "propertydetails" ? (
                <PropertyDetails />
              ) : text === "addproperty" ? (
                <AddProperty />
              ) : text === "category" ? (
                <AddCategory />
              ) : text === "subcategory" ? (
                <AddSubCategory />
              ) : text === "product" ? (
                <AddProduct />
              ) : text === "profile" ? (
                <Profile />
              ) : text === "package-plan" ? (
                <PackagePlan />
              ) : text === "package-renewal" ? (
                <PricingUi />
              ) : text === "thank-you" ? (
                <ThankyouPage />
              ) : text === "payments" ? (
                <Payments />
              ) : text === "properties" ? (
                <MyProperties setSidebarTabs={setSidebarTabs} />
              ) : text === "image" ? (
                <AddImage />
              ) : (
                ""
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
