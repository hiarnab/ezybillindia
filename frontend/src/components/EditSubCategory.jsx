import React, { useState } from "react"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import {BsTelephoneForwardFill} from "react-icons/bs"
import { useSelector } from "react-redux";
import axios from "../api/axios";
import validateText from "../utils/TextValidations"



const EditSubCategory = (props) => {
  console.log(props)
  const [SubCategory, setSubCategoryName] = useState(props?.subcategory?.[0]?.ItemName)
  const accessToken = useSelector(store => store?.login?.userData[0])
  const  subcategoryDetails = useSelector(store => store?.property?.subcategoryDetails)

  // const [ItemNote, setItemNote] = useState("") 
  const [disableBtn, setDisableBtn] = useState(true)

  const saveEditHandler = async (e) => {
    e.preventDefault()
    let editDetails = {} 
    if(SubCategory !== subcategoryDetails?.ItemName){
      editDetails.ItemName = SubCategory
    }
       
    console.log(editDetails)
    console.log(props.fetchSubCategory)
    try { 
      const options = {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }}
      const response = await axios.put(`/api/property/${subcategoryDetails?.PropertyNo}/itemCtegory/${subcategoryDetails?.CategoryRN}/item/${subcategoryDetails?.ItemNameRN}`
        
        ,
        { ...editDetails }, options
      );
      console.log(response)
      if(response?.status == 200){
        toast.success("SubCategory edited successfully!", {
          position: toast.POSITION.TOP_CENTER 
        });
       
        //props.setfetchSubCategory(true)
      }
    } catch (err) {
      console.log(err) 
      toast.error("Update failed, please try later!", {
        position: toast.POSITION.TOP_CENTER
      });
    }
    
    //props.setfetchSubCategory(false)
  }

  const changeHandler = (value) => {
    setSubCategoryName(value)
    if(value === props?.subcategory?.[0]?.ItemName || value ==="")
      setDisableBtn(true)
    else 
    {
      validateText(value) ? setDisableBtn(false) : setDisableBtn(true)
    }
  }

  return (
    <>
      <ToastContainer autoClose={2000} />
      <form className="md:w-[30rem] mx-auto">
        <div className="rounded-[20px] p-5 border-solid border-2 border-gray-300 bg-white ">
          <div className="flex flex-col gap-3 ">
            <div className="text-[14px] font-normal justify-between flex-col md:flex-row">
              <p className="p-2 font-poppins text-[0.8rem] font-[550]">
                Sub Category Name
              </p>
              <input 
                type="text"
                value={SubCategory}
                onChange={(e) => changeHandler(e.target.value)}
                // onChange={(e) => setSubCategoryName(e.target.value)}
                className="appearance-none block w-full border-2 border-[#DDDDDD]
    focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
     rounded-md h-[42px] px-4 mb-3 leading-tight"
              //  onInput={(e) => validateText(e.target.value)}
              />
            </div>
            <div>
              <p className="p-2 font-poppins text-[0.8rem] font-[550]">Note</p>
              <textarea
                className="w-full h-48 shadow-md rounded-md appearance-none block  border-2 border-[#DDDDDD] required
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none 
            focus:border-2 focus:border-[#800080] p-2 text-sm resize-none overflow-auto"
                onInput={(e) => validateText(e.target.value)}
              ></textarea>
            </div>
            <div className="flex">
              <button
                className={`
    font-normal  bg-green-700 text-[white] flex items-center 
    rounded-md py-2 my-6 text-[14px] px-3 mx-auto
    cursor-pointer opacity-100 w-[30%] ${disableBtn  ? "cursor-not-allowed opacity-50"
      : "cursor-pointer opacity-100"}`}
                onClick={saveEditHandler}
              >
                <p className="w-full text-center">Save</p>
              </button>
              <button
                type="button"
                className="
    font-normal  bg-red-600 text-[white] flex items-center 
    rounded-md py-2 my-6 text-[14px] px-3 mx-auto
    cursor-pointer opacity-100  w-[30%]"
                onClick={props.setEdit}
              >
                <p className="w-full text-center">Back</p>
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default EditSubCategory 