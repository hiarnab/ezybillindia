import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import axios from "../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validateText from "../utils/TextValidations";
import ClickAwayListener from "react-click-away-listener";

const SubCategoryModal= ({setShowModal, setfetchSubCategory}) => {
  const [ItemName, setItemName] = useState(null)
  const [selectedCategory, setselectedCategory] = useState(null)
  const [category, setCategory] = useState(null) 
  const[rn, setRn] = useState("")
  const accessToken = useSelector(store => store?.login?.userData[0]) 
  const PropertyNo = useSelector(store => store?.property?.propertyNumber)
  const refCat = useRef()
  useEffect(()=>{
    console.log("useEffect")
    const getCategoryData = async () => {
      try {
        const options = {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }}
        const response = await axios.get(`/api/property/${PropertyNo}/itemCategory`, options);
        console.log(response?.data);
        setCategory(response?.data)
      }
      catch (error) {
        console.log(error);
      }
    }
    getCategoryData()
  },[])

  useEffect(()=>{
    console.log(refCat,selectedCategory)
  },[refCat,selectedCategory])
  const createSubCategoryHandler = (e) => {
    e.preventDefault()
    let v = e.target.getAttribute("data-test-id")
    setRn(v)
    console.log(rn);
    setShowModal(true)
    const handleSubmit = async () => {
      try {
        const options = {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }}
        const response = await axios.post(`/api/property/${PropertyNo}/itemCtegory/${selectedCategory}/item`,
      
          {
            ItemName
          }, options
        );
     
        console.log(response)
        if(response?.status == "201"){
          toast.success("SubCategory created successfully!", {
            position: toast.POSITION.TOP_CENTER
          });
          setfetchSubCategory(true)
        } 
      } catch (err) {
        console.log(err) 
        toast.error("SubCategory creation failed!", {
          position: toast.POSITION.TOP_CENTER
        });
      }
    }
    handleSubmit()
    setTimeout(()=>{
      setShowModal(false)
      setfetchSubCategory(false)
    },1500)
  }

  useEffect(()=>{
    console.log(selectedCategory)
  },[selectedCategory])

  return (
    <>
      <ToastContainer autoClose={2000} />

      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <ClickAwayListener onClickAway={() => setShowModal(false)}>
          <div className="relative my-6 mx-auto  w-[32rem] md:max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-[20px] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*body*/}
              <div className="relative p-6 flex flex-col gap-3">
                <div className="flex justify-center items-center gap-3">
                  <label
                    className="block tracking-wide text-[#464646] text-sm
            font-normal mb-2 w-2/5"
                    htmlFor="states"
                  >
                    Category
                  </label>

                  <select
                    id="states"
                    className="bg-gray-50  block 
        border-2 border-[#DDDDDD] rounded-md focus:outline-none 
        focus:shadow-lg focus:shadow-[#800080]-500/50 focus:border-2 focus:border-[#800080]
        w-full px-2.5 h-[42px]"
                    defaultValue={selectedCategory}
                    onChange={(e) => setselectedCategory(e.target.value)}
                  >
                    <option selected>Choose a category</option>
                    {category?.map((selectedCategory) => {
                      // setRn(selectedCategory?.CategoryRN)
                      return (
                        <option
                          value={selectedCategory.CategoryRN}
                          key={selectedCategory.CategoryRN}
                          data-test-id={`${selectedCategory.Cat}`}
                          ref={refCat}
                        >
                          {selectedCategory.ItemCategory}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex justify-center items-center gap-3 flex-auto">
                  <label
                    className="block tracking-wide text-[#464646] text-sm
            font-normal mb-2  w-2/5"
                    htmlFor="states"
                  >
                    Sub category
                  </label>
                  <input
                    className="appearance-none block  border-2 border-[#DDDDDD] required 
                  w-full
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
            rounded-md h-[42px] px-4 mb-3 leading-tight "
                    required
                    id="grid-first-name"
                    type="text"
                    placeholder=""
                    value={ItemName}
                    onChange={(e) => setItemName(e.target.value)}
                    onInput={(e) => validateText(e.target.value)}
                  />
                </div>
                <div>
                  <div>
                    <p className="p-2 font-poppins text-[0.8rem] font-[550]">
                      Note
                    </p>
                    <textarea
                      className="w-full h-48 shadow-md rounded-md appearance-none block  border-2 border-[#DDDDDD] required
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none 
            focus:border-2 focus:border-[#800080] p-2 text-sm resize-none overflow-auto"
                      onInput={(e) => validateText(e.target.value)}
                    ></textarea>
                  </div>

                  <button
                    className="font-normal float-right w-2/5  bg-[#800080] text-[white] flex rounded-md py-2 my-6 text-[13px] px-3 mx-auto
      cursor-pointer opacity-100"
                    onClick={createSubCategoryHandler}
                  >
                    <p className="w-full text-center">Submit</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ClickAwayListener>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default SubCategoryModal