/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { stateList } from "../constants/stateList";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPhone, addUser } from "../registrationSlice";
import TelLenValidation from "../utils/TelLenValidation";

const PersonalDetailsForm = ({
  setActivateFirstProperty,
  setActivateFirstPropertyStepper,
}) => {
  const [CustomerName, setCustomerName] = useState("");
  const [RegMobile, setRegMobile] = useState("");
  const [RegEmail, setRegEmail] = useState("");
  const [State, setState] = useState("");
  const [Country, setCountry] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [captchaToken, setCaptchaToken] = useState(false);
  const captchaRef = useRef(null);
  const dispatch = useDispatch();
  const userDetails = useSelector((store) => store.register?.user);

  useEffect(() => {
    setActivateFirstProperty(false);
    setActivateFirstPropertyStepper(false);
  }, []);
  useEffect(() => {
    console.log(captchaRef);
  }, [captchaRef]);
  useEffect(() => {
    console.log(userDetails);
    setCustomerName(userDetails.CustomerName);
    setRegMobile(userDetails.RegMobile);
    setCountry(userDetails.Country);
    setState(userDetails.State);
  }, []);

  useEffect(() => {
    if (
      CustomerName !== "" &&
      RegMobile !== "" &&
      RegMobile?.length >= 10 &&
      RegEmail !== "" &&
      RegEmail.toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) &&
      State !== "" &&
      captchaToken
    ) {
      setDisabled(false);
    } else setDisabled(true);
  }, [CustomerName, RegMobile, State, captchaToken]);

  const userDetailSubmitHandler = (e) => {
    e.preventDefault();

    if (captchaToken) {
      setCustomerName(CustomerName);
      let user = { CustomerName, RegMobile, State, Country };
      dispatch(addUser(user));
      dispatch(addPhone(RegMobile));
      setActivateFirstProperty(true);
      setActivateFirstPropertyStepper(true);
      setCustomerName(user.CustomerName);
    }
  };

  return (
    <>
      <div
        className="flex flex-col px-6"
        style={{
          fontFamily: "'Jost', sans-serif",
        }}
      >
        <form
          className="rounded-md px-2 md:px-6 py-6 shadow-xl bg-white"
          onSubmit={userDetailSubmitHandler}
        >
          <div className="px-6 text-center">
            <h1 className="text-[15px] font-normal text-[#464646] font-jost">
              Personal
            </h1>
            <h1 className="text-[30px] font-semibold text-[#464646] font-jost">
              Details
            </h1>
          </div>
          <div className="flex flex-col mb-6">
            <div className="w-full mb-6 md:mb-0 px-2 md:mt-6">
              <label
                className="block tracking-wide text-[#464646]
            text-[16px] font-normal mb-2"
                htmlFor="grid-first-name"
              >
                Name <span className="text-red-400">*</span>
              </label>
              <input
                className="appearance-none block w-full border-2 border-[#DDDDDD]
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
             rounded-md h-[42px] px-4 mb-3 leading-tight "
                required
                id="grid-first-name"
                type="text"
                placeholder=""
                defaultValue={CustomerName !== (null || "") ? CustomerName : ""}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (!newValue) {
                    setCustomerName("");
                  } else {
                    setCustomerName(newValue);
                  }
                }}
              />
            </div>
            <div className="w-full mb-6 md:mb-0 px-2 md:mt-6">
              <label
                className="block tracking-wide text-[#464646] 
            text-[16px] font-normal mb-2"
                htmlFor="grid-first-name"
              >
                Mobile Number <span className="text-red-400">*</span>
              </label>
              <input
                className="appearance-none block border-2 border-[#DDDDDD] focus:shadow-lg focus:shadow-[#800080]-500/50 focus:border-2 focus:border-[#800080] w-full h-[42px] rounded-md px-4 mb-3 leading-tight focus:outline-none"
                required
                id="grid-first-name"
                type="tel"
                placeholder=""
                defaultValue={RegMobile !== (null || "") ? RegMobile : ""}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (!newValue) {
                    setRegMobile("");
                  } else {
                    setRegMobile(newValue);
                  }
                }}
                onKeyDown={(e) => TelLenValidation(e)}
              />
            </div>
            <div className="w-full mb-6 md:mb-0 px-2 md:mt-6">
              <label
                className="block tracking-wide text-[#464646] 
            text-[16px] font-normal mb-2"
                htmlFor="grid-first-name"
              >
                Email Id <span className="text-red-400">*</span>
              </label>
              <input
                className="appearance-none block border-2 border-[#DDDDDD] focus:shadow-lg focus:shadow-[#800080]-500/50 focus:border-2 focus:border-[#800080] w-full h-[42px] rounded-md px-4 mb-3 leading-tight focus:outline-none"
                required
                id="grid-first-name"
                type="email"
                value={RegEmail}
                onChange={(e) => setRegEmail(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 md:mb-3 md:mt-3">
              <div className="col-span-4 md:col-span-2 mb-6 md:mb-0 px-2">
                <label
                  className="block tracking-wide text-[#464646] 
            text-[16px] font-normal mb-2"
                  htmlFor="grid-first-name"
                >
                  Country <span className="text-red-400">*</span>
                </label>
                <input
                  className="appearance-none block  border-2 border-[#DDDDDD]
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:border-2 focus:border-[#800080]
             w-full h-[42px]
             rounded-md  px-4 mb-3 leading-tight focus:outline-none"
                  id="grid-first-name"
                  type="text"
                  placeholder=""
                  required
                  defaultValue={Country !== (null || "") ? Country : ""}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (!newValue) {
                      setCountry("");
                    } else {
                      setCountry(newValue);
                    }
                  }}
                />
              </div>
              <div className="col-span-4 md:col-span-2 mb-6 md:mb-0 px-2">
                <label
                  className="block tracking-wide text-[#464646]
            text-[16px] font-normal mb-2"
                  htmlFor="states"
                >
                  State <span className="text-red-400">*</span>
                </label>

                <select
                  id="states"
                  className="bg-gray-50  block 
border-2 border-[#DDDDDD] rounded-md focus:outline-none 
focus:shadow-lg focus:shadow-[#800080]-500/50 focus:border-2 focus:border-[#800080]
  w-full px-2.5 h-[42px]"
                  required
                  defaultValue={State}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option selected>Choose a state</option>
                  {stateList.map((stateList) => {
                    return (
                      <option value={stateList} key={stateList}>
                        {stateList}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <ReCAPTCHA
              sitekey={"6LdawpEnAAAAAD5WyqQoXne_hG5P0OVCHDe2h71Y"}
              ref={captchaRef}
              onChange={useCallback(() => setCaptchaToken(true))}
            />
            <button
              className={`font-normal bg-[#800080] text-[white] rounded-md w-full py-3 px-6 my-6 ${
                disabled || !captchaToken
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer opacity-100"
              }`}
              disabled={disabled || !captchaToken}
            >
              Save & Next Step
            </button>
            <span className="text-[#B3B3B3] text-[12px] font-normal text-center">
              Already have an account?
              <Link to="/login">
                <span className="text-[#5E5E5E]"> Sign in</span>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default PersonalDetailsForm;
