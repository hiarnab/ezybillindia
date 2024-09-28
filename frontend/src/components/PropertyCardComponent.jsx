import React, { useEffect, useState } from "react"
import {TbBuildingEstate } from "react-icons/tb";
import {BsTelephoneForwardFill} from "react-icons/bs"
import {FiMapPin} from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux";
import axios from "../api/axios";
import { addPropertyDetails, addPropertyNumber } from "../propertySlice";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PropertyCardComponent = ({setSidebarTabs, property, deletePopup, setDeletePopup}) => {
  const {PropType,PropPhone,PropState,PropName} = property
  const accessToken = useSelector(store => store?.login?.userData[0])
  const [propertyDetails, setpropertyDetails] = useState(null)
  

  const dispatch = useDispatch()
  // useEffect(()=>{
  // if(property){
  //   setPropNo(property?.PropNo) 
  // }
  // },[]) 
   
  // useEffect(()=>{
  //   let PropertyNo = property?.PropertyNo
  //   dispatch(addPropertyNumber(PropertyNo))
  // },[property])
  useEffect(()=>{
    console.log(propertyDetails)  
 
    if(propertyDetails){
      dispatch(addPropertyDetails(propertyDetails)) 
    }
  },[propertyDetails])

  const viewSidebarToggler = async() => {
    let PropertyNo = property?.PropertyNo
    dispatch(addPropertyNumber(PropertyNo))
    try {
      const options = {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }}
      const response = await axios.get(`/api/property/${property.PropertyNo}`, options);
      console.log(response?.data);
      setpropertyDetails(response?.data)
    }
    catch (error) {
      console.log(error);
    }
     
    setSidebarTabs(true) 
     
  }

  const propertyDeleteHandler = () => {
    setDeletePopup(true)
  }
  const deleteHandler = () => {
    const deleteCategory = async () => {
      try {
        const options = {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }}
        const response = await axios.delete(`/api/property/${property?.PropertyNo}`, options);
        console.log(response);
        if(response?.status === 204){
          toast.success("Property deleted successfully!", {
            position: toast.POSITION.TOP_CENTER
          });
          setDeletePopup(false)
        }
      }
      catch (error) {
        toast.error("Property deletion failed!", { 
          position: toast.POSITION.TOP_CENTER
        });
        console.log(error);
      }
    }
    deleteCategory()
  }
  return (
    <>
      <ToastContainer autoClose={2000}/>
      <div className='rounded-md p-5 border-solid border-2 border-gray-300'>
        <p className='my-3 font-semibold text-lg'>{PropName}</p>
        <div className='flex flex-col gap-3'>
          <div className='flex text-[15px] flex-col md:flex-row font-normal md:justify-between md:items-center'>
            <h5 className='text-[#B3B3B3] flex flex-grow items-center gap-2'><TbBuildingEstate/>Property type</h5>
            <h5 className='text-[#464646] w-1/3 px-6 md:px-2 text-left '>{PropType}</h5>
          </div>
          <div className='flex text-[15px] flex-col md:flex-row font-normal md:justify-between md:items-center'>
            <h5 className='text-[#B3B3B3] flex flex-grow items-center gap-2'><BsTelephoneForwardFill/>Contact</h5>
            <h5 className='text-[#464646]  w-1/3 px-6 md:px-2 text-left'>{PropPhone}</h5>
          </div>
          <div className='flex text-[15px] flex-col md:flex-row font-normal md:justify-between md:items-center'>
            <h5 className='text-[#B3B3B3] flex flex-grow items-center gap-2'><FiMapPin/>State</h5>
            <h5 className='text-[#464646]  w-1/3 px-6 md:px-2 text-left'>{PropState}</h5>
          </div>
        </div>
        <div className="flex flex-row"> 
          <button className="font-normal  bg-[#800080] text-[white] flex items-center 
    rounded-md py-2  md:py-1 lg:py-2 my-2 md:my-6 text-[10px] md:text-[13px] px-3 mx-auto
      cursor-pointer opacity-100" onClick={viewSidebarToggler}>View More</button>
          <button className="font-normal  bg-red-600 text-[white] flex items-center 
    rounded-md py-2 md:py-1 lg:py-2 my-2 md:my-6 text-[10px] md:text-[13px] px-3 mx-auto
      cursor-pointer opacity-100" onClick={propertyDeleteHandler}>Delete</button>
        </div>
      </div>
      {
        deletePopup ? <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-center p-5 border-b border-solid text-sm 
                 border-slate-200 rounded-t">
                  <h3 className="text-[#3A3939]">
                  Are you sure you want to delete the property?
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black loat-right
                     text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setDeletePopup(false)}
                  >
                    <span className="bg-transparent text-black  
                    w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div> 
                {/*body*/}
                <div className="flex justify-center gap-5">
                  <button className="font-normal bg-red-400 text-[white] rounded-md py-2 my-6 
              text-[14px] px-3 cursor-pointer opacity-100" 
                  onClick={deleteHandler}>Yes</button>
                  <button className="font-normal bg-yellow-400 text-[white]  rounded-md py-2 my-6 
              text-[14px] px-3  cursor-pointer opacity-100"
                  onClick={() => setDeletePopup(false)}>No</button>
                </div>
              </div> 
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </> : null
      }

    </>
  )
}

export default PropertyCardComponent  