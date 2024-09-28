import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoAddCircleOutline } from "react-icons/io5";

import { stateList } from "../constants/stateList";
import { addProperty } from "../registrationSlice";
import OTPVerificationModal from "./OTPVerificationModal.jsx";

const PropertyOneForm = ({
  setActivateSecondProperty,
  setActivateFirstProperty,
  setActivateSecondPropertyStepper,
}) => {
  const [PropType, setPropType] = useState("");
  const [PropName, setPropName] = useState("");
  const [PropEmail, setPropEmail] = useState("");
  const [PropAddress, setPropAddress] = useState("");
  const [PropPhone, setPropPhone] = useState("");
  const [PropState, setPropState] = useState("");
  const [PropCountry, setPropCountry] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [addPropBtn, setAddPropBtn] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const propertyDetails = useSelector((store) => store.register?.properties);
  const dispatch = useDispatch();
  useEffect(() => {
    setActivateSecondProperty(false);
  }, []);

  useEffect(() => {
    console.log(propertyDetails);
  }, [propertyDetails]);
  useEffect(() => {
    if (propertyDetails.length > 0) {
      setPropType(propertyDetails[0].PropType);
      setPropName(propertyDetails[0].PropName);
      setPropEmail(propertyDetails[0].PropEmail);
      setPropAddress(propertyDetails[0].PropAddress);
      setPropPhone(propertyDetails[0].PropPhone);
      setPropState(propertyDetails[0].PropState);
      setPropCountry(propertyDetails[0].PropCountry);
    }
  }, []);

  const moveToSecondPropertyToggleHandler = () => {
    let propertyOneDetails = {
      PropType,
      PropName,
      PropEmail,
      PropAddress,
      PropPhone,
      PropState,
      PropCountry,
    };
    dispatch(addProperty({ number: 0, value: propertyOneDetails }));
    setActivateSecondProperty(true);
    setActivateFirstProperty(false);
    setActivateSecondPropertyStepper(true);
  };

  const propertyOneSubmitHandler = (e) => {
    e.preventDefault();
    setAddPropBtn(true);
    let propertyOneDetails = {
      PropType,
      PropName,
      PropEmail,
      PropAddress,
      PropPhone,
      PropState,
      PropCountry,
    };
    dispatch(addProperty({ number: 0, value: propertyOneDetails }));
    setShowModal(true);
  };

  useEffect(() => {
    if (
      PropType !== "" &&
      PropName !== "" &&
      PropEmail !== "" &&
      PropAddress !== "" &&
      PropPhone !== "" &&
      PropEmail.toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) &&
      PropPhone?.length >= 10 &&
      PropState !== "" &&
      PropCountry !== ""
    ) {
      console.log("propemail", PropEmail);
      setDisabled(false);
      setAddPropBtn(false);
    } else {
      setDisabled(true);
      setAddPropBtn(true);
    }
  }, [
    PropType,
    PropName,
    PropEmail,
    PropAddress,
    PropPhone,
    PropState,
    PropCountry,
  ]);

  return (
    <>
      {showModal ? (
        <OTPVerificationModal
          setShowModal={setShowModal}
          type="verify"
          //   userRegistrationData={userRegistrationData}
          //    setUserRegistrationData={setUserRegistrationData}
        />
      ) : null}
      <div className="flex flex-col px-6">
        <form
          className="rounded-md px-2 md:px-6 py-6 shadow-xl bg-white"
          onSubmit={propertyOneSubmitHandler}
        >
          <div className="px-6 text-center">
            <h1 className="text-[15px] font-normal text-[#464646]">Property</h1>
            <h1 className="text-[30px] font-semibold text-[#464646]">One</h1>
          </div>
          <div className="flex flex-col mb-6">
            <div className="w-full mb-6 md:mb-0 px-2 md:mt-6">
              <label
                className="block tracking-wide text-[#464646]
                text-[16px] font-normal mb-2"
                htmlFor="states"
              >
                Property Type<span className="text-red-400">*</span>
              </label>
              <select
                id="states"
                className="bg-gray-50  block 
                border-2 border-[#DDDDDD] rounded-md focus:outline-none 
                focus:shadow-lg focus:shadow-[#800080]-500/50 focus:border-2 focus:border-[#800080]
                w-full px-2.5 h-[42px]"
                value={PropType}
                onChange={(e) => setPropType(e.target.value)}
              >
                <option selected>Choose a type</option>
                <option value="Hotel">Hotel</option>
                <option value="Restaurant">Restaurant</option>
              </select>
            </div>
            <div className="w-full mb-6 md:mb-0 px-2 md:mt-6">
              <label
                className="block tracking-wide text-[#464646]
                text-[16px] font-normal mb-2"
                htmlFor="grid-first-name"
              >
                Property Name<span className="text-red-400">*</span>
              </label>
              <input
                className="appearance-none block w-full border-2 border-[#DDDDDD] required
                focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
                rounded-md h-[42px] px-4 mb-3 leading-tight "
                required
                id="grid-first-name"
                type="text"
                placeholder=""
                defaultValue={PropName !== (null || "") ? PropName : ""}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (!newValue) {
                    setPropName("");
                  } else {
                    setPropName(newValue);
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
                Property Email<span className="text-red-400">*</span>
              </label>
              <input
                className="appearance-none block w-full border-2 border-[#DDDDDD] required
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
            rounded-md h-[42px] px-4 mb-3 leading-tight "
                required
                id="grid-first-name"
                type="email"
                placeholder=""
                defaultValue={PropEmail !== (null || "") ? PropEmail : ""}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (!newValue) {
                    setPropEmail("");
                  } else {
                    setPropEmail(newValue);
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
                Property Address<span className="text-red-400">*</span>
              </label>
              <input
                className="appearance-none block w-full border-2 border-[#DDDDDD] required
                focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
                rounded-md h-[42px] px-4 mb-3 leading-tight "
                required
                id="grid-first-name"
                type="text"
                placeholder=""
                defaultValue={PropAddress !== (null || "") ? PropAddress : ""}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (!newValue) {
                    setPropAddress("");
                  } else {
                    setPropAddress(newValue);
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
                Property Country<span className="text-red-400">*</span>
              </label>

              <select
                id="country"
                className="bg-gray-50  block 
                border-2 border-[#DDDDDD] rounded-md focus:outline-none 
                focus:shadow-lg focus:shadow-[#800080]-500/50 focus:border-2 focus:border-[#800080]
                w-full px-2.5 h-[42px]"
                value={PropCountry !== (null || "") ? PropCountry : ""}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (!newValue) {
                    setPropCountry("");
                  } else {
                    setPropCountry(newValue);
                  }
                }}
              >
                <option selected>Choose a country</option>
                <option value="India">India</option>
              
              </select>

              {/* <input
                className="appearance-none block w-full border-2 border-[#DDDDDD] required
                focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2
                 focus:border-[#800080]
                rounded-md h-[42px] px-4 mb-3 leading-tight "
                required
                id="grid-first-name"
                type="text"
                placeholder=""
                defaultValue={PropCountry !== (null || "") ? PropCountry : ""}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (!newValue) {
                    setPropCountry("");
                  } else {
                    setPropCountry(newValue);
                  }
                }}
              /> */}
            </div>

            <div className="grid grid-cols-4 md:mb-3 md:mt-3">
              <div className="col-span-4 md:col-span-2 mb-6 md:mb-0 px-2">
                <label
                  className="block tracking-wide text-[#464646] 
                text-[16px] font-normal mb-2"
                  htmlFor="grid-first-name"
                >
                  Mobile Number<span className="text-red-400">*</span>
                </label>
                <input
                  className="appearance-none block  border-2 border-[#DDDDDD]
                focus:shadow-lg focus:shadow-[#800080]-500/50 focus:border-2 focus:border-[#800080]
                w-full h-[42px]
                rounded-md  px-4 mb-3 leading-tight focus:outline-none"
                  id="grid-first-name"
                  type="tel"
                  placeholder=""
                  defaultValue={PropPhone !== (null || "") ? PropPhone : ""}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (!newValue) {
                      setPropPhone("");
                    } else {
                      setPropPhone(newValue);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (
                      !(
                        (e.key >= "0" && e.key <= "9") ||
                        e.key === "Backspace" ||
                        e.key === "Delete" ||
                        (e.ctrlKey === true && (e.key === "v" || e.key === "V"))
                      ) ||
                      (e.target.value.length >= 10 &&
                        e.key !== "Backspace" &&
                        e.key !== "Delete")
                    ) {
                      e.preventDefault();
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
                  State<span className="text-red-400">*</span>
                </label>

                <select
                  id="states"
                  className="bg-gray-50  block 
    border-2 border-[#DDDDDD] rounded-md focus:outline-none 
    focus:shadow-lg focus:shadow-[#800080]-500/50 focus:border-2 focus:border-[#800080]
    w-full px-2.5 h-[42px]"
                  value={PropState}
                  onChange={(e) => setPropState(e.target.value)}
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
          <div className="flex gap-2 items-center justify-evenly">
            <button
              className={`font-normal flex gap-2 items-center bg-[#800080] text-[white] rounded-md py-3 px-8 my-6 
             ${
    addPropBtn
      ? "cursor-not-allowed opacity-50"
      : "cursor-pointer opacity-100"
    } `}
              onClick={moveToSecondPropertyToggleHandler}
            >
              Add Property
              <IoAddCircleOutline size="20px" />
            </button>
            <button
              className={`font-normal  bg-[#800080] text-[white] rounded-md py-3 w-[193px] my-6
            ${
    disabled
      ? "cursor-not-allowed opacity-50"
      : "cursor-pointer opacity-100"
    }`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PropertyOneForm;
