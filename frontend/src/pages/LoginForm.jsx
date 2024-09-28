/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useEffect, useState } from "react";
//import Navbar from "../components/Navbar.jsx"
import Navbar from "../components/homepage/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import OTPVerificationModal from "../components/OTPVerificationModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addOtp } from "../registrationSlice";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TelLenValidation from "../utils/TelLenValidation.js";

const LoginForm = () => {
  const [disabled, setDisabled] = useState(true);
  const [usermobilenumber, setUserMobileNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [focused, setFocused] = useState(false);
  const accessToken = useSelector((store) => store?.login?.userData[0]);
  const navigate = useNavigate();

  const userDetailSubmitHandler = (e) => {
    e.preventDefault();
    setShowModal(true);
    dispatch(addOtp(""));
  };

  useEffect(() => {
    console.log("Accesstoken", accessToken);
  }, [accessToken]);
  useEffect(() => {
    if (accessToken !== null) {
      navigate("/dashboard");
    }
  }, []);

  // useEffect(()=>{
  //   console.log(accessToken)
  // },[accessToken])

  useEffect(() => {
    if (
      (userEmail !== "" &&
        userEmail
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )) ||
      (usermobilenumber !== "" && usermobilenumber.length >= 10)
    ) {
      setDisabled(false);
    } else setDisabled(true);
  }, [usermobilenumber, userEmail]);

  // useEffect(()=>{
  //   if(accessToken){
  //     navigate('/dashboard')
  //   }
  //   else navigate('/login')
  // },[accessToken, navigate])

  function navigateToSignUp() {
    navigate("/signup");
  }

  return (
    <>
      {showModal ? (
        <OTPVerificationModal
          setShowModal={setShowModal}
          usermobilenumber={usermobilenumber}
          type="login"
          //   userRegistrationData={userRegistrationData}
          //    setUserRegistrationData={setUserRegistrationData}
        />
      ) : null}
      <Navbar />
      <div className="grid grid-cols-8">
        <div className="col-span-1 md:col-span-3"></div>
        <div className="col-span-6 md:col-span-2">
          <form
            className="rounded-md px-2 md:px-6 py-6 md:py-12 shadow-xl bg-white"
            onSubmit={userDetailSubmitHandler}
          >
            `{" "}
            <div className="px-6 text-center">
              <h1 className="text-[30px] font-semibold text-[#464646] font-jost">
                Login
              </h1>
            </div>
            <div className="flex flex-col mb-6">
              <div className="w-full mb-6 md:mb-0 px-2 md:mt-6">
                <label
                  className="block tracking-wide text-[#464646]
            text-[14px] font-[550] font-jost mb-2"
                  htmlFor="grid-first-name"
                >
                  Mobile number*
                </label>
                <div
                  className={`flex items-center gap-2 bg-white border-2 border-[#DDDDDD]  ${
                    focused &&
                    "shadow-lg shadow-[#800080]-500/50 border-[#800080]"
                  }
              p-2 rounded-md leading-tight`}
                >
                  <div className="flex gap-0 items-center">
                    <p className="margin-0 text-black text-[0.7rem] font-[550] font-poppins">
                      +91
                    </p>
                    <KeyboardArrowDownIcon
                      className="text-[#464646] font-[550] text-xs"
                      style={{ fontSize: "0.8rem" }}
                    />
                  </div>
                  <input
                    onBlur={() => setFocused(false)}
                    onKeyDown={(e) => TelLenValidation(e)}
                    onFocus={() => setFocused(true)}
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none appearance-none block w-full border-0 outline-none 
             "
                    required
                    id="grid-first-name"
                    type="number"
                    placeholder=""
                    value={usermobilenumber}
                    onChange={(e) => setUserMobileNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full mb-6 md:mb-0 px-2 md:mt-6">
                <label
                  className="block tracking-wide text-[#464646]
            text-[14px] font-[550] font-jost mb-2"
                  htmlFor="grid-first-name"
                >
                  Email Id
                </label>

                <input
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block w-full border-2 border-[#DDDDDD]
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2
             focus:border-[#800080] rounded-md h-[42px] px-4 mb-3 leading-tight"
                  type="email"
                  placeholder=""
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[#B3B3B3] text-[0.6rem] font-normal text-center font-jost">
                By continuing, I agree to the{" "}
                <span className="font-[600] text-black">Terms of Use</span> &{" "}
                <span className="font-[600] text-black">Privacy Policy</span>
              </span>

              <button
                className={`font-normal  bg-[#800080] font-jost text-[white] rounded-md w-full py-3 px-6 my-6
${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer opacity-100"} `}
                disabled={disabled}
              >
                Login
              </button>

              <span
                className="text-[#B3B3B3] text-[12px] font-normal text-center cursor-pointer font-jost"
                onClick={() => navigateToSignUp()}
              >
                Don’t you have an account?
                <span className="font-bold text-black ml-1">Sign Up</span>
                {/* <Link to='/'><span className='text-[#5E5E5E]'> Sign up</span></Link> */}
              </span>
            </div>
          </form>
        </div>
        <div className="col-span-1 md:col-span-3"></div>
      </div>
    </>
  );
};

export default LoginForm;
