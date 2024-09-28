import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { stateList } from "../constants/stateList";
import { useDispatch, useSelector } from "react-redux";
import axios from "../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addMenuType } from "../propertySlice";
import { FaDownload } from "react-icons/fa";


const PropertyDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  console.log(location.pathname);
  const propertyDetail = useSelector(
    (store) => store?.property?.propertyDetails[0]
  );
  const accessToken = useSelector((store) => store?.login?.userData[0]);

  const [PropType, setPropType] = useState("");
  const [PropName, setPropName] = useState("");
  const [PropEmail, setPropEmail] = useState("");
  const [PropAddress, setPropAddress] = useState("");
  const [PropPhone, setPropPhone] = useState("");
  const [PropState, setPropState] = useState("");
  const [PropCountry, setPropCountry] = useState("");
  const [image, setImage] = useState("");
  const [editDetails, seteditDetails] = useState(true);
  const [menu, setMenu] = useState("");
  const [fetchedMenu, setfetchedMenu] = useState("");
  const [disabledText, setDisabledText] = useState(false);
  const [disabledMenu, setDisabledMenu] = useState(false);
  
  //const [license, setLicense] = useState("")
  useEffect(() => {
    if (propertyDetail?.length > 0) {
      if (propertyDetail[0]?.hasActiveDesktopLicense === 1) {
        setDisabledText(true);
        if (propertyDetail[0]?.MenuType !== "image") {
          setDisabledMenu(true);
        } else {
          setDisabledMenu(false);
        }
      }
    }
  }, [disabledText, propertyDetail]);

  useEffect(() => {
    console.log(propertyDetail,"propertyDetail")
    if (propertyDetail?.length > 0) {
      setPropType(propertyDetail[0]?.PropType);
      setPropName(propertyDetail[0]?.PropName);
      setPropEmail(propertyDetail[0]?.PropEmail);
      setPropAddress(propertyDetail[0]?.PropAddress);
      setPropPhone(propertyDetail[0]?.PropPhone);
      setPropState(propertyDetail[0]?.PropState);
      setPropCountry(propertyDetail[0]?.PropCountry);
      setImage(propertyDetail[0]?.QRLocation);
      setfetchedMenu(propertyDetail[0]?.MenuType);
      setMenu(propertyDetail[0]?.MenuType);
      //setLicense(propertyDetail[0]?.hasActiveDesktopLicense)
    }
  }, [propertyDetail]);
  const propertyEditHandler = (e, id) => {
    if (id.includes("PropType")) {
      setPropType(e.target.value);
    } else if (id.includes("PropName")) {
      setPropName(e.target.value);
    }
    // else  if(id.includes("PropMenu")){
    //   setMenu(e.target.value)
    // }
    else if (id.includes("PropEmail")) {
      setPropEmail(e.target.value);
    } else if (id.includes("PropAddress")) {
      setPropAddress(e.target.value);
    } else if (id.includes("PropPhone")) {
      setPropPhone(e.target.value);
    } else if (id.includes("PropState")) {
      setPropState(e.target.value);
    } else if (id.includes("PropCountry")) {
      setPropCountry(e.target.value);
    } else if (id.includes("MenuType")) {
      setMenu(e.target.value);
      dispatch(addMenuType(e.target.value));
    } else {
      console.log("else conditn");
    }
    seteditDetails(false);
  };

  useEffect(() => {
    if (propertyDetail?.length > 0) {
      let menu = propertyDetail[0]?.MenuType;
      dispatch(addMenuType(menu));
    }
  }, [propertyDetail]);
  const cancelEditHandler = (e) => {
    e.preventDefault();
    console.log(menu, propertyDetail[0].MenuType);
    setPropType(propertyDetail[0].PropType);
    setPropName(propertyDetail[0].PropName);
    setPropEmail(propertyDetail[0].PropEmail);
    setPropAddress(propertyDetail[0].PropAddress);
    setPropPhone(propertyDetail[0].PropPhone);
    setPropState(propertyDetail[0].PropState);
    setPropCountry(propertyDetail[0].PropCountry);
    setMenu(propertyDetail[0].MenuType);
    seteditDetails(true)
  };
  const saveEditHandler = async (e) => {
    e.preventDefault();
    console.log("propertyDetail", propertyDetail);

    let editDetails = {};
    if (PropType !== propertyDetail[0]?.PropType) {
      editDetails.PropType = PropType;
    }
    if (PropName !== propertyDetail[0]?.PropName) {
      editDetails.PropName = PropName;
    }
    if (PropEmail !== propertyDetail[0]?.PropEmail) {
      editDetails.PropEmail = PropEmail;
    }
    if (PropAddress !== propertyDetail[0]?.PropAddress) {
      editDetails.PropAddress = PropAddress;
    }
    if (PropPhone !== propertyDetail[0]?.PropPhone) {
      editDetails.PropPhone = PropPhone;
    }
    if (PropState !== propertyDetail[0]?.PropState) {
      editDetails.PropState = PropState;
    }
    if (PropCountry !== propertyDetail[0]?.PropCountry) {
      editDetails.PropCountry = PropCountry;
    }
    editDetails.MenuType = menu;
  
    let no = propertyDetail[0]?.PropertyNo;
    console.log("editDetails", editDetails);
    if (
      editDetails?.PropAddress === "" ||
      editDetails?.PropCountry === "" ||
      editDetails?.PropName === "" ||
      editDetails?.PropEmail === "" ||
      editDetails?.PropState === ""
    ) {
      toast.error("Please fill mandetory fields", { position: "top-center" });
      return;
    }
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.put(
        `/api/property/${no}`,
        { ...editDetails },
        options
      );

      console.log(response, response?.status);
      if (response?.status === 200) {
        toast.success("Details edited successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Update failed, please try later!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
 
  
  return (
    <>
      <ToastContainer autoClose={2000} />
      <form
        className="rounded-md px-2 md:px-6 py-6 mt-3 md:mt-0"
        //onSubmit={propertyOneSubmitHandler}
      >
        <div className="px-6 text-center">
          <h1 className="text-[25px] md:text-[30px] font-semibold text-[#464646]">
            Property Details
          </h1>
        </div>
        <div className="">
          <div className="qr_code relative mx-auto w-20 h-20">
            <img
              src={image}
              alt="QR scanner"
              className="w-full object-cover h-full mx-auto my-2"
            />
         
            {/* <div className="qr_overlay ease-in-out duration-300 w-full h-full opacity-0 absolute top-0 left-0">
            <div className="relative cursor-pointer w-full h-full block top-0">
              <a href={image} download>
                <FaDownload
                  fill="#ffff"
                  size={20}
                  className="new bg-[#7e007e] w-[25px] h-[25px] rounded-full absolute cursor-pointer p-[3px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </a>
            </div>
          </div> */}
          </div>
          <a href={image} download className="text-nowrap border-2 border-[transparent] hover:text-[#7e007e] flex rounded hover:bg-transparent hover:border-[#7e007e]  bg-[#7e007e] mt-2 p-[5px] w-fit m-auto gap-2   items-center text-[#ffffff]  font-bold justify-center">Download QR <span><FaDownload  fill="#ffff"size={20} className="new bg-[#7e007e] w-[16px] h-[16px] rounded-full cursor-pointer "/></span></a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col mb-6">
            <div className="w-full mb-6 md:mb-0 px-2 md:mt-6">
              <label
                className="block tracking-wide text-[#464646]
                text-[16px] font-normal mb-2"
                htmlFor="grid-first-name"
              >
                Property Type
              </label>
              <input
                className="appearance-none block w-full border-2 border-[#DDDDDD] required
                focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
                rounded-md h-[42px] px-4 mb-3 leading-tight "
                required
                disabled={disabledText}
                id="grid-first-name"
                type="text"
                placeholder=""
                value={PropType}
                onChange={(e) => propertyEditHandler(e, "PropType")}
              />
            </div>
            <div className="w-full mb-6 md:mb-0 px-2 md:mt-6">
              <label
                className="block tracking-wide text-[#464646]
                text-[16px] font-normal mb-2"
                htmlFor="states"
              >
                Menu Type
              </label>
              <select
                id="menu"
                className="bg-gray-50  block 
                border-2 border-[#DDDDDD] rounded-md focus:outline-none 
                focus:shadow-lg focus:shadow-[#800080]-500/50 focus:border-2 focus:border-[#800080]
                w-full px-2.5 h-[42px]"
                value={menu}
                disabled={disabledMenu}
                onChange={(e) => propertyEditHandler(e, "MenuType")}
              >
                {fetchedMenu === "text" ? (
                  <>
                    <option value="text" selected>
                      Text menu
                    </option>
                    <option value="image">Image menu</option>
                  </>
                ) : (
                  <>
                    <option value="image" selected>
                      Image menu
                    </option>
                    <option value="text">Text menu</option>
                  </>
                )}
              </select>
            </div>
            <div className="w-full mb-6 md:mb-0 px-2 md:mt-6">
              <label
                className="block tracking-wide text-[#464646]
                text-[16px] font-normal mb-2"
                htmlFor="grid-first-name"
              >
                Property Address<span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block w-full border-2 border-[#DDDDDD] required
                focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
                rounded-md h-[42px] px-4 mb-3 leading-tight "
                required
                disabled={disabledText}
                id="grid-first-name"
                type="text"
                placeholder=""
                value={PropAddress}
                onChange={(e) => propertyEditHandler(e, "PropAddress")}
              />
            </div>

            <div className="w-full mb-6 md:mb-0 px-2 md:mt-6">
              <label
                className="block tracking-wide text-[#464646]
                text-[16px] font-normal mb-2"
                htmlFor="grid-first-name"
              >
                Property Email<span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block w-full border-2 border-[#DDDDDD] required
                focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
                rounded-md h-[42px] px-4 mb-3 leading-tight "
                required
                disabled={disabledText}
                id="grid-first-name"
                type="email"
                placeholder=""
                value={PropEmail}
                onChange={(e) => propertyEditHandler(e, "PropEmail")}
              />
            </div>
          </div>
          <div className="flex flex-col mb-6">
            <div className="w-full mb-6 md:mb-0 px-2 md:mt-6">
              <label
                className="block tracking-wide text-[#464646]
                text-[16px] font-normal mb-2"
                htmlFor="grid-first-name"
              >
                Property Name<span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block w-full border-2 border-[#DDDDDD] required
                focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
                rounded-md h-[42px] px-4 mb-3 leading-tight "
                required
                disabled={disabledText}
                id="grid-first-name"
                type="text"
                placeholder=""
                value={PropName}
                onChange={(e) => propertyEditHandler(e, "PropName")}
              />
            </div>

            <div className="w-full mb-6 md:mb-0 px-2 md:mt-6">
              <label
                className="block tracking-wide text-[#464646]
                text-[16px] font-normal mb-2"
                htmlFor="mobilenumber"
              >
                Mobile Number<span className="text-red-500">*</span>
              </label>
              <input
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block w-full border-2 border-[#DDDDDD] required
                focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
                rounded-md h-[42px] px-4 mb-3 leading-tight "
                id="mobilenumber"
                type="number"
                placeholder=""
                disabled={disabledText}
                value={PropPhone}
                onChange={(e) => propertyEditHandler(e, "PropPhone")}
              />
            </div>

            {/* <div className="grid grid-cols-4 md:mb-3 md:mt-3"> */}
            <div className="w-full mb-6 md:mb-0 px-2 md:mt-6">
              <label
                className="block tracking-wide text-[#464646]
                text-[16px] font-normal mb-2"
                htmlFor="grid-first-name"
              >
                Property Country<span className="text-red-500">*</span>
              </label>
              <input
                className="bg-gray-50  block 
                border-2 border-[#DDDDDD] rounded-md focus:outline-none 
                focus:shadow-lg focus:shadow-[#800080]-500/50 focus:border-2 focus:border-[#800080]
                w-full px-2.5 h-[42px]"
                required
                disabled={disabledText}
                id="grid-first-name"
                type="text"
                placeholder=""
                value={PropCountry}
                onChange={(e) => propertyEditHandler(e, "PropCountry")}
              />
            </div>

            <div className="w-full mb-6 md:mb-0 px-2 md:mt-6">
              <label
                className="block tracking-wide text-[#464646]
                text-[16px] font-normal mb-2"
                htmlFor="states"
              >
                State<span className="text-red-500">*</span>
              </label>
              <select
                id="states"
                className="bg-gray-50  block 
                border-2 border-[#DDDDDD] rounded-md focus:outline-none 
                focus:shadow-lg focus:shadow-[#800080]-500/50 focus:border-2 focus:border-[#800080]
                w-full px-2.5 h-[42px]"
                value={PropState}
                disabled={disabledText}
                onChange={(e) => propertyEditHandler(e, "PropState")}
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
            {/* </div> */}
          </div>
        </div>

        <div className="flex flex-col mb-6">
          <div className="flex  items-center gap-3 px-2">
            <button
              className={`font-normal   text-[white] flex items-center 
      rounded-md py-2 my-6 text-[13px] px-3  opacity-100 
      ${
    editDetails
      ? "cursor-not-allowed opacity-50 bg-red-500"
      : "cursor-pointer opacity-100 bg-red-600"
    }
      `}
              disabled={editDetails}
              onClick={(e) => cancelEditHandler(e)}
            >
              Cancel
            </button>
            <button
              className={`font-normal   text-[white] flex items-center 
              rounded-md py-2 my-6 text-[13px] px-3  opacity-100 
              ${
    editDetails
      ? "cursor-not-allowed opacity-50 bg-green-500"
      : "cursor-pointer opacity-100 bg-green-600"
    }
              `}
              disabled={editDetails}
              onClick={(e) => saveEditHandler(e)}
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PropertyDetails;
