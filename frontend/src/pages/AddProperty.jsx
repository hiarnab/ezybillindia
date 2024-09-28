import React, { useEffect, useState } from "react";
import { stateList } from "../constants/stateList";
import { useDispatch, useSelector } from "react-redux";

import {
  addFetchedProperty,
  addMenuType,
  addPropertyCount,
} from "../propertySlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../api/axios";
import TelLenValidation from "../utils/TelLenValidation";
//import OTPVerificationModal from './OTPVerificationModal';

const AddProperty = () => {
  const [PropType, setPropType] = useState("");
  const [PropName, setPropName] = useState("");
  const [PropEmail, setPropEmail] = useState("");
  const [PropAddress, setPropAddress] = useState("");
  const [PropPhone, setPropPhone] = useState("");
  const [PropState, setPropState] = useState("");
  const [PropCountry, setPropCountry] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [limit, setLimit] = useState(false);
  const [length, setLength] = useState("");
  const accessToken = useSelector((store) => store?.login?.userData[0]);
  const dispatch = useDispatch();
  const fetchedProperties = useSelector(
    (store) => store.property?.fetchedProperties
  );
  const propertyCount = useSelector((store) => store?.property?.propertyCount);

  // const moveToThirdPropertyToggleHandler = () => {

  //   let propertyTwoDetails = {
  //         PropType, PropName, PropEmail, PropAddress, PropPhone, PropState, PropCountry
  //    }
  //    dispatch(addProperty({number : 1, value:propertyTwoDetails}))
  //   setActivateThirdProperty(true)
  //   setActivateThirdPropertyStepper(true)
  //   setActivateSecondProperty(false)
  //    }

  useEffect(() => {
    dispatch(addMenuType(""));
  }, []);
  useEffect(() => {
    let val = fetchedProperties[0]?.length;
    console.log(fetchedProperties, val);
    setLength(val);
  }, [fetchedProperties]);

  useEffect(() => {
    console.log(propertyCount, length);
  }, [propertyCount, length]);

  useEffect(() => {
    console.log(propertyCount);
    if (propertyCount === "") {
      const getProfileData = async () => {
        try {
          const options = {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          };
          const response = await axios.get("/api/user", options);
          console.log(response, response?.data);
          dispatch(addPropertyCount(response?.data.AllotedPropertyQuota));
        } catch (error) {
          console.log(error);
        }
      };
      getProfileData();
    }
  }, [propertyCount]);

  const propertyTwoSubmitHandler = async (e) => {
    e.preventDefault();
    let propertyDetail = {
      PropType,
      PropName,
      PropEmail,
      PropAddress,
      PropPhone,
      PropState,
      PropCountry,
    };
    //  let val = propertyDetails[0]?.length
    console.log(propertyCount, length);
    dispatch(addFetchedProperty({ propertyDetail, length }));
    if (length === propertyCount) {
      setLimit(true);
    } else {
      // const handleSubmit = async () => {
      try {
        const options = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axios.post(
          "/api/property",
          {
            PropType,
            PropName,
            PropEmail,
            PropAddress,
            PropPhone,
            PropState,
            PropCountry,
          },
          options
        );

        console.log(response);
        if (response?.status === 201) {
          toast.success("Property created successfully!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } catch (err) {
        console.log(err);
        toast.error("Property creation failed!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      // }
      // handleSubmit()
    }

    setPropType("");
    setPropName("");
    setPropEmail("");
    setPropAddress("");
    setPropPhone("");
    setPropState("");
    setPropCountry("");
  };

  useEffect(() => {
    if (
      PropType !== "" &&
      PropName !== "" &&
      PropEmail !== "" && 
      PropEmail.toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) &&
      PropAddress !== "" &&
      PropPhone !== "" &&
      PropPhone.length >= 10 &&
      PropState !== "" &&
      PropCountry !== ""
    ) {
      setDisabled(false);
      // setAddPropBtn(false)
    } else if (PropState === "choose a state") {
      setDisabled(true);
    } else {
      setDisabled(true);
      //  setAddPropBtn(true)
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
      <ToastContainer autoClose={2000} />

      {limit ? (
        <>
          <div
            className="flex flex-col px-0 md:px-6 md:mt-0 justify-center items-center h-screen 
          flex-wrap"
          >
            <div className="rounded-md px-2 md:px-6 py-6 shadow-xl flex flex-col">
              <p
                className="block tracking-wide text-[red]
 text-[20px] font-medium mb-2"
              >
                Property Limit reached!
              </p>
              <p
                className="block tracking-wide text-[#464646]
 text-[16px] font-normal mb-2"
              >
                {" "}
                Cant create more properties
              </p>
              <p
                className="block tracking-wide text-[#464646]
 text-[16px] font-normal mb-2"
              >
                To increase your limit, please contact system admin
              </p>
              <p
                className="block tracking-wide text-[#464646]
 text-[16px] font-normal mb-2"
              >
                Email - test@test.com
              </p>
              <p
                className="block tracking-wide text-[#464646]
 text-[16px] font-normal mb-2"
              >
                Ph number- 9278287878
              </p>
              <button
                type="button"
                onClick={() => setLimit(false)}
                className="font-normal  bg-green-400 text-[white] flex items-center 
              rounded-md py-2 my-6 text-[13px] px-3 cursor-pointer opacity-100 w-14"
              >
                Back
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col px-0 md:px-6 mt-3 md:mt-0 justify-center items-center">
          <form
            className="rounded-md px-2 md:px-6 py-6 shadow-xl"
            onSubmit={propertyTwoSubmitHandler}
          >
            <div className="px-6 text-center">
              <h1 className="text-[15px] font-normal text-[#464646] font-jost">
                Add
              </h1>
              <h1 className="text-[30px] font-semibold text-[#464646] font-jost">
                Property
              </h1>
            </div>
            <div className="flex flex-col mb-6 mt-3 md:mt-3">
              <div className="w-full mb-6 md:mb-0 px-2 md:mt-6">
                <label
                  className="block tracking-wide text-[#464646]
            text-[16px] font-normal mb-2 font-jost"
                  htmlFor="states"
                >
                  Property Type*
                </label>
                <select
                  id="states"
                  className="bg-gray-50  block 
            border-2 border-[#DDDDDD] rounded-md focus:outline-none 
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:border-2 focus:border-[#800080]
            w-full px-2.5 h-[42px]"
                  defaultValue={PropType}
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
            text-[16px] font-normal mb-2 font-jost"
                  htmlFor="grid-first-name"
                >
                  Property Name*
                </label>
                <input
                  className="appearance-none block w-full border-2 border-[#DDDDDD] required
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
            rounded-md h-[42px] px-4 mb-3 leading-tight "
                  required
                  id="grid-first-name"
                  type="text"
                  placeholder=""
                  value={PropName}
                  onChange={(e) => setPropName(e.target.value)}
                />
              </div>
              <div className="w-full mb-6 md:mb-0 px-2 md:mt-6">
                <label
                  className="block tracking-wide text-[#464646]
            text-[16px] font-normal mb-2 font-jost"
                  htmlFor="grid-first-name"
                >
                  Property Email*
                </label>
                <input
                  className="appearance-none block w-full border-2 border-[#DDDDDD] required
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
            rounded-md h-[42px] px-4 mb-3 leading-tight "
                  required
                  id="grid-first-name"
                  type="email"
                  placeholder=""
                  value={PropEmail}
                  onChange={(e) => setPropEmail(e.target.value)}
                />
              </div>
              <div className="w-full mb-6 md:mb-0 px-2 md:mt-6">
                <label
                  className="block tracking-wide text-[#464646]
            text-[16px] font-normal mb-2 font-jost"
                  htmlFor="grid-first-name"
                >
                  Property Address*
                </label>
                <input
                  className="appearance-none block w-full border-2 border-[#DDDDDD] required
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
            rounded-md h-[42px] px-4 mb-3 leading-tight "
                  required
                  id="grid-first-name"
                  type="text"
                  placeholder=""
                  value={PropAddress}
                  onChange={(e) => setPropAddress(e.target.value)}
                />
              </div>
              <div className="w-full mb-6 md:mb-0 px-2 md:mt-6">
                <label
                  className="block tracking-wide text-[#464646]
            text-[16px] font-normal mb-2 font-jost"
                  htmlFor="grid-first-name"
                >
                  Property Country*
                </label>
                {/* <input
                  className="appearance-none block w-full border-2 border-[#DDDDDD] required
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
            rounded-md h-[42px] px-4 mb-3 leading-tight "
                  required
                  id="grid-first-name"
                  type="text"
                  placeholder=""
                  value={PropCountry}
                  onChange={(e) => setPropCountry(e.target.value)}
                /> */}
                <select
                  id="country"
                  className="bg-gray-50  block 
            border-2 border-[#DDDDDD] rounded-md focus:outline-none 
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:border-2 focus:border-[#800080]
            w-full px-2.5 h-[42px]"
                  value={PropCountry}
                  onChange={(e) => setPropCountry(e.target.value)}
                >
                  <option selected>Choose a country</option>
                  <option value="Hotel">India</option>
                 
                </select>

              </div>

              <div className="grid grid-cols-4 md:mb-3 md:mt-3">
                <div className="col-span-4 md:col-span-2 mb-6 md:mb-0 px-2">
                  <label
                    className="block tracking-wide text-[#464646] 
            text-[16px] font-normal mb-2 font-jost"
                    htmlFor="grid-first-name"
                  >
                    Mobile Number*
                  </label>
                  <input
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block  border-2 border-[#DDDDDD]
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:border-2 focus:border-[#800080]
            w-full h-[42px]
            rounded-md  px-4 mb-3 leading-tight focus:outline-none"
                    id="grid-first-name"
                    type="number"
                    onKeyDown={(e) => TelLenValidation(e)}
                    placeholder=""
                    value={PropPhone}
                    onChange={(e) => setPropPhone(e.target.value)}
                  />
                </div>
                <div className="col-span-4 md:col-span-2 mb-6 md:mb-0 px-2">
                  <label
                    className="block tracking-wide text-[#464646]
            text-[16px] font-normal mb-2 font-jost"
                    htmlFor="states"
                  >
                    State*
                  </label>

                  <select
                    id="states"
                    className="bg-gray-50  block 
border-2 border-[#DDDDDD] rounded-md focus:outline-none 
focus:shadow-lg focus:shadow-[#800080]-500/50 focus:border-2 focus:border-[#800080]
w-full px-2.5 h-[42px]"
                    defaultValue={PropState}
                    onChange={(e) => setPropState(e.target.value)}
                  >
                    <option selected value="">
                      Choose a state
                    </option>
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
                className={`font-normal  bg-[#800080] text-[white] rounded-md py-3 w-[193px] my-6
        ${
        disabled
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer opacity-100"
        }`}
                disabled={disabled}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddProperty;
