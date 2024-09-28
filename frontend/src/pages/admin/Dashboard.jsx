import React, { useState, useEffect } from "react";
import logo1 from "../../assets/homepage/logo1.png";
import control from "../../assets/dashboard/control.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaUser,FaAlignLeft } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaTools } from "react-icons/fa";
import { IoMdOptions } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import {
  FaHotel,
  FaCreditCard,
  FaBox,
  FaChevronDown,
  FaChevronUp,
  FaUser
} from "react-icons/fa";
// import { LuBackpack } from "react-icons/lu";
import PropertyPage from "./PropertyPage.jsx";
import DashboardM from "./DashboardM.jsx";
import SettingPage from "./SettingPage.jsx";
import Profile from "./Profile.jsx";
import Menu from "./Menu.jsx";
import Payment from "./Payment.jsx";
import { useSelector, useDispatch } from "react-redux";
import { logoutProfile } from "../../adminLoginSlice.js";
import ToolsPage from "./ToolsPage.jsx";
const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tool, setTool] = useState(false);
  const [open, setOpen] = useState(true);
  // const [ismenu, setIsMenu] = useState(false);

  const location = useLocation();
  const accessToken = useSelector((store) => store?.adminlogin?.adminData[0]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(accessToken);
    if (!accessToken) {
      navigate("/admin/login");
    }
  }, [accessToken, navigate]);

  const logout = () => {
    sessionStorage.removeItem("adminToken");
    dispatch(logoutProfile());
    window.location.href = "/";
  };

  return (
    <>
      <div className="flex">
        <div
          className={`${
            open ? "w-62 md:w-72" : "w-20 "
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

            <Link to="/admin/dashboard/dashboardm">
              <li
                className="flex  rounded-md p-2 cursor-pointer hover:bg-light-white
               text-gray-300 text-sm items-center gap-x-4 
              mt-2 bg-light-white"
              >
                {/* <img src={profile} alt="profile" /> */}
                <MdDashboard size="16px" fill="gray" />
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-200 text-[#3A3939]  font-semibold`}
                >
                  Dashboard
                </span>
              </li>
            </Link>

            <Link to="/admin/dashboard/profile">
              <li
                className="flex  rounded-md p-2 cursor-pointer hover:bg-light-white
               text-gray-300 text-sm items-center gap-x-4 
              mt-2 bg-light-white"
              >
                {/* <img src={profile} alt="profile" /> */}
                <FaUser size="16px" fill="gray" />
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-200 text-[#3A3939]  font-semibold`}
                >
                  My Profile
                </span>
              </li>
            </Link>

            <Link to="/admin/dashboard/property">
              <li
                className="flex  rounded-md p-2 cursor-pointer hover:bg-light-white
               text-gray-300 text-sm items-center gap-x-4 
              mt-2 bg-light-white"
              >
                {/* <img src={profile} alt="profile" /> */}
                <FaHotel size="16px" fill="gray" />
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-200 text-[#3A3939]  font-semibold`}
                >
                  Properties
                </span>
              </li>
            </Link>

            {/* <Link>
              <div>
                <li className="flex w-full mt-2">
                  <button
                    onClick={() => setIsMenu(!ismenu)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setIsMenu(!ismenu);
                      }
                    }}
                    className="flex w-full  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4"
                  >
                    <FaHotel size="16px" fill="gray" />
                    <span
                      className={`${
                        !open ? "hidden" : "flex"
                      } origin-left flex gap-5 items-end duration-200 w-full text-[#3A3939] font-semibold`}
                    >
                      Property
                      {!ismenu ? <FaChevronDown /> : <FaChevronUp />}
                    </span>
                  </button>
                </li>
                {ismenu && (
                  <>
                    <div className={`${!open && "hidden"} pl-4 mt-2 `}>
                      <Link to="/admin/dashboard/property">
                        <div className="flex w-full mt-1 items-center gap-x-4  ">
                          <FaBox size="15px" fill="gray" />
                          <span className="cursor-pointer hover:bg-light-white text-[#3A3939] font-semibold text-sm  gap-x-4 bg-light-white">
                            {" "}
                            Property
                          </span>
                        </div>
                      </Link>
                    </div>

                    <div className={`${!open && "hidden"} pl-4 mt-2 `}>
                      <Link to="/admin/dashboard/menu">
                        <div className="flex w-full mt-4 items-center gap-x-4  ">
                        
                          <FaAlignLeft size="16px" fill="gray" />
                          <span className="cursor-pointer hover:bg-light-white text-[#3A3939] font-semibold text-sm  gap-x-4 bg-light-white">
                            {" "}
                            Menu
                          </span>
                        </div>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </Link> */}

            <Link to="/admin/dashboard/payment">
              <li
                className="flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300
                 text-sm items-center gap-x-4 
              mt-2 bg-light-white"
              >
                <FaCreditCard size="16px" fill="gray" />
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-200 text-[#3A3939] font-semibold`}
                >
                  Payments
                </span>
              </li>
            </Link>

            <Link>
              <div>
                <li className="flex w-full mt-2">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setIsOpen(!isOpen);
                      }
                    }}
                    className="flex w-full  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4"
                  >
                    {/* <FaCreditCard size="16px" fill="gray" /> */}
                    <IoSettingsSharp size="16px" fill="gray"  />
                    
                    <span
                      className={`${
                        !open ? "hidden" : "flex"
                      } origin-left flex gap-5 items-end duration-200 w-full text-[#3A3939] font-semibold`}
                    >
                      Setting
                      {!isOpen ? <FaChevronDown /> : <FaChevronUp />}
                    </span>
                  </button>
                </li>
                {isOpen && (
                  <div className={`${!open && "hidden"} pl-4 mt-2 `}>
                    <Link to="/admin/dashboard/setting">
                      <div className="flex w-full mt-1 items-center gap-x-4  ">
                        <FaBox size="15px" fill="gray" />
                        <span className="cursor-pointer hover:bg-light-white text-[#3A3939] font-semibold text-sm  gap-x-4 bg-light-white">
                          {" "}
                          Package Plan
                        </span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </Link>

            <Link>
              <div>
                <li className="flex w-full mt-2">
                  <button
                    onClick={() => setTool(!tool)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setTool(!tool);
                      }
                    }}
                    className="flex w-full  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4"
                  >
                    {/* <FaCreditCard size="16px" fill="gray" /> */}
                    <FaTools size="16px" fill="gray"  />
                    
                    <span
                      className={`${
                        !open ? "hidden" : "flex"
                      } origin-left flex gap-5 items-end duration-200 w-full text-[#3A3939] font-semibold`}
                    >
                      Tools
                      {!tool ? <FaChevronDown /> : <FaChevronUp />}
                    </span>
                  </button>
                </li>
                {tool && (
                  <div className={`${!open && "hidden"} pl-4 mt-2 `}>
                    <Link to="/admin/dashboard/tools">
                      <div className="flex w-full mt-1 items-center gap-x-4 ">
                        <IoMdOptions size="15px" fill="gray" />
                        <span className="cursor-pointer hover:bg-light-white text-[#3A3939] font-semibold text-sm  gap-x-4 bg-light-white">
                          {" "}
                          Intregate RMS Menu
                        </span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </Link>

          </ul>
          <div className={"absolute bottom-0"}>
            <button
              className="font-normal rounded bg-[#dc2626] text-[white] flex items-center py-2 my-6 text-[16px] w-full px-10 cursor-pointer opacity-100 font-jost"
              onClick={logout}
            >
              Logout <span className="ml-2 rotate-180"><MdLogout fill="#ffff" size={20} /></span>
            </button>
          </div>
        </div>

        <div className="items-center mx-auto p-7 w-screen">
          {location.pathname
            ?.toString()
            .split("/admin/")
            .map((text) => {
              return text === "dashboard/property" ? (
                <PropertyPage />
              ) : text === "dashboard/setting" ? (
                
                <SettingPage />
              ) : text === "dashboard/menu" ? (
                <Menu />
              ) : text === "dashboard/payment" ? (
                <Payment />
              ) : text === "dashboard/dashboardm" ? (
                <DashboardM />
              ) : text === "dashboard/profile" ? (
                <Profile />
              ) : text === "dashboard/tools" ? (
                <ToolsPage />
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
