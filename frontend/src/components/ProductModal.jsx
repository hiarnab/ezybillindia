import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "../api/axios"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validateText, { isNumberKey, validateNumber } from "../utils/TextValidations";


const ProductModal= ({setShowModal,setfetchProduct}) => {

  const [category, setCategory] = useState(null)
  const [selectedCategory, setselectedCategory] = useState(null)
  const [selectedsubCategory, setselectedsubCategory] = useState(null)
  const [subcategory, setSubcategory] = useState(null)
  const [ProductName, setProductName] = useState("")
  const [NoteOnProduct, setNoteOnProduct] = useState("")
  const [Unitprice, setunitprice] = useState("")
  const [Unit, setunit] = useState("")
  const [SGSTPC,setSGSTPC] = useState("")
  const [CGSTPC,setCGSTPC] = useState("")
  const [DiscountAllowed,setDiscountAllowed] = useState("")
  const [ShName, setShName] = useState("")
  // const [RoomUnitPrice, setRoomUnitPrice] = useState("")
  const [HSNSAC, setHSNSAC] = useState("")

  const accessToken = useSelector(store => store?.login?.userData[0]) 
  const PropertyNo = useSelector(store => store?.property?.propertyNumber)
  
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
    console.log(selectedCategory, selectedsubCategory)
  },[selectedCategory, selectedsubCategory])
  useEffect(()=>{
    console.log(selectedCategory)
    const getSubCategoryData = async () => {
      try { 
        const options = {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }}
        const response = await axios.get(`/api/property/${PropertyNo}/itemCtegory/${selectedCategory}/item`, options);
        console.log(response?.data);
        setSubcategory(response?.data)
      }
      catch (error) {
        console.log(error);
      }
    } 
    getSubCategoryData()
  },[selectedCategory])

  const createProductHandler = async (e) => {
    e.preventDefault()

    if (!selectedCategory) {
      toast.error("Please select a category.", {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }

    if (!selectedsubCategory) {
      toast.error("Please select a sub-category.", {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    if (!ProductName) {
      toast.error("Product field is required.", {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    if (!NoteOnProduct) {
      toast.error("NoteOnProduct field is required.", {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    if (!Unitprice) {
      toast.error("Unitprice field is required.", {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    if (!Unit) {
      toast.error("Unit field is required.", {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    if (!DiscountAllowed) {
      toast.error("Discount field is required.", {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    // if (!RoomUnitPrice) {
    //   toast.error("Price field is required.", {
    //     position: toast.POSITION.TOP_CENTER
    //   });
    //   return;
    // }
    setShowModal(true)
    try {
      const options = {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }}
      const response = await axios.post(`/api/property/${PropertyNo}/itemCtegory/${selectedCategory}/item/${selectedsubCategory}/product`,
        {
          ProductName,
          NoteOnProduct,
          Unitprice,
          Unit,
          SGSTPC,
          CGSTPC,
          DiscountAllowed,
          ShName,
          // RoomUnitPrice,
          HSNSAC
        }, options
      );
      console.log(response)
         
      if(response?.status == "201"){
        toast.success("Product created successfully!", {
          position: toast.POSITION.TOP_CENTER
        });
        setfetchProduct(true)
        console.log(response.statusText)
      } 
    } catch (err) {
      console.log(err) 
      toast.error("Product creation failed!", {
        position: toast.POSITION.TOP_CENTER
      });
    }
    setTimeout(()=>{
      setShowModal(false)
      setfetchProduct(false)
    },1000)
  
  }



  return (
    <> 
      <ToastContainer autoClose={2000}/>
      <div id="large-modal" tabIndex="-1" 
      // className="fixed top-0 left-0 right-0 
      // w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 
      // h-[calc(100%-1rem)] max-h-full" 
      >
        <div className="relative w-full max-w-4xl max-h-full">
          <div
            className="justify-evenly items-center flex overflow-x-hidden 
       fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative my-6 mx-auto ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col  bg-white 
              outline-none focus:outline-none w-[80vw] md:w-[65vw] h-[40vh] md:h-[40vw] overflow-y-scroll">
                {/*header*/}
                <div className="flex items-start justify-evenly p-5 border-b border-solid text-xl
                 border-slate-200 rounded-t font-medium">
                  <h3 className="text-[#3A3939]">
                   Create Product 
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black loat-right
                     text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black  
                    h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div> 
                {/*body*/}
                <div className="p-6 flex flex-col gap-3 ">
                  <div className='flex justify-between items-center px-4'>
                    <label className="block tracking-wide text-[#464646]text-sm
            font-normal mb-2" htmlFor='states'>
            Category <span className="text-red-500">*</span>
                    </label>

                    <select id="states" className="bg-gray-50  block 
border-2 border-[#DDDDDD] rounded-md focus:outline-none 
focus:shadow-lg focus:shadow-[#800080]-500/50 focus:border-2 focus:border-[#800080]
  w-80 px-2.5 h-[42px]" defaultValue={selectedCategory} 
                    onChange={(e)=> setselectedCategory(e.target.value)} >
                      <option selected>Choose a category</option>
                      {
                        category?.map((selectedCategory) => {
                          return (
                            <option value={selectedCategory.CategoryRN} key={selectedCategory.CategoryRN} >
                              {selectedCategory.ItemCategory}
                            </option>
                          )
        
                        })
                      }
                    </select>
                  </div>
                  <div className='flex justify-between items-center px-4'>
                    <label className="block tracking-wide text-[#464646] text-sm
            font-normal mb-2" htmlFor='states'>
              Sub-Category <span className="text-red-500">*</span>
                    </label>

                    <select id="states" className="bg-gray-50  block 
border-2 border-[#DDDDDD] rounded-md focus:outline-none 
focus:shadow-lg focus:shadow-[#800080]-500/50 focus:border-2 focus:border-[#800080]
  w-80 px-2.5 h-[42px]" 
                    // defaultValue={selectedsubCategory}
                    value = {selectedsubCategory}
                    onChange={(e)=> setselectedsubCategory(e.target.value)} >
                      
                      <option selected>Choose a subcategory</option>
                      {
                        subcategory?.map((stateList) => {
                          return (<option value={stateList?.ItemNameRN} key={stateList?.ItemNameRN}>{stateList?.ItemName}</option>)
        
                        })
                      }
                    </select>
                  </div>
                  <div className='flex justify-between items-center px-4'>
                    <label className="block tracking-wide text-[#464646] text-sm
            font-normal mb-2" htmlFor='states'>
              Product <span className="text-red-500">*</span>
                    </label>
                    <input className="appearance-none block  border-2 border-[#DDDDDD] required w-80
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
            rounded-md h-[42px] px-4 mb-3 leading-tight " required
                    id="grid-first-name" type="text" placeholder="" 
                    value={ProductName} onChange={(e)=> setProductName(e.target.value)} onInput={(e)=>validateText(e.target.value)} />
                  </div>
                  <div className='flex justify-between items-center px-4'>
                    <label className="block tracking-wide text-[#464646] text-sm
            font-normal mb-2" htmlFor='states'>
              Note On Product <span className="text-red-500">*</span>
                    </label>
                    <input className="appearance-none block  border-2 border-[#DDDDDD] required w-80
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
            rounded-md h-[42px] px-4 mb-3 leading-tight " required
                    id="grid-first-name" type="text" placeholder="" 
                    value={NoteOnProduct} onChange={(e)=> setNoteOnProduct(e.target.value)} onInput={(e)=>validateText(e.target.value)} />
                  </div>
                  <div className='flex justify-between items-center px-4'>
                    <label className="block tracking-wide text-[#464646] text-sm
            font-normal mb-2" htmlFor='states'>
              Unit Price <span className="text-red-500">*</span>
                    </label>
                    <input className="appearance-none block  border-2 border-[#DDDDDD] required w-80
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
            rounded-md h-[42px] px-4 mb-3 leading-tight " required
                    id="grid-first-name" type="text" placeholder="" 
                    onInput={(e)=>validateNumber(e.target.value)}
                    value={Unitprice} onChange={(e)=> setunitprice(e.target.value)} />
                  </div>
                  <div className='flex justify-between items-center px-4'>
                    <label className="block tracking-wide text-[#464646] text-sm
            font-normal mb-2" htmlFor='states'>
             Unit <span className="text-red-500">*</span>
                    </label>
                    <input className="appearance-none block  border-2 border-[#DDDDDD] required w-80
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
            rounded-md h-[42px] px-4 mb-3 leading-tight " required
                    id="grid-first-name" type="text" placeholder="" 
                    onInput={(e)=>validateText(e.target.value)}
                    value={Unit} onChange={(e)=> setunit(e.target.value)} />
                  </div>
                  <div className='flex justify-between items-center px-4'>
                    <label className="block tracking-wide text-[#464646] text-sm
            font-normal mb-2" htmlFor='states'>
              SGSTPC
                    </label>
                    <input className="appearance-none block  border-2 border-[#DDDDDD] required w-80
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
            rounded-md h-[42px] px-4 mb-3 leading-tight " required
                    id="grid-first-name" type="text" placeholder="" 
                    // onInput={(e)=>validateNumber(e.target.value)}
                    onInput={(e)=> isNumberKey(e.target.value)} 
                    value={SGSTPC} onChange={(e)=> setSGSTPC(e.target.value)} />
                  </div>
                  <div className='flex justify-between items-center px-4'>
                    <label className="block tracking-wide text-[#464646] text-sm
            font-normal mb-2" htmlFor='states'>
            CGSTPC
                    </label>
                    <input className="appearance-none block  border-2 border-[#DDDDDD] required w-80
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
            rounded-md h-[42px] px-4 mb-3 leading-tight " required
                    id="grid-first-name" type="text" placeholder="" 
                    // onInput={(e)=>validateNumber(e.target.value)}
                    onInput={(e)=> isNumberKey(e.target.value)} 
                    value={CGSTPC} onChange={(e)=> setCGSTPC(e.target.value)} />
                  </div>
                  <div className='flex justify-between items-center px-4'>
                    <label className="block tracking-wide text-[#464646] text-sm
            font-normal mb-2" htmlFor='states'>
             Discount Allowed <span className="text-red-500">*</span>
                    </label> 

                    <select id="states" className="bg-gray-50  block 
border-2 border-[#DDDDDD] rounded-md focus:outline-none 
focus:shadow-lg focus:shadow-[#800080]-500/50 focus:border-2 focus:border-[#800080]
  w-80 px-2.5 h-[42px]" defaultValue={DiscountAllowed}
                    onChange={(e)=> setDiscountAllowed(e.target.value)}  >
                      <option selected>Choose an option</option>
                      <option value="1" >Yes</option>
                      <option value="0" >No</option>
                    </select>

                    {/* <input className="appearance-none block  border-2 border-[#DDDDDD] required w-80
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
            rounded-md h-[42px] px-4 mb-3 leading-tight " required
                    id="grid-first-name" type="text" placeholder="" 
                    onInput={(e)=>validateNumber(e.target.value)}
                    value={DiscountAllowed} onChange={(e)=> setDiscountAllowed(e.target.value)} /> */}
                  </div>
                  <div className='flex justify-between items-center px-4'>
                    <label className="block tracking-wide text-[#464646] text-sm
            font-normal mb-2" htmlFor='states'>
            Short Name
                    </label>
                    <input className="appearance-none block  border-2 border-[#DDDDDD] required w-80
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
            rounded-md h-[42px] px-4 mb-3 leading-tight " required
                    id="grid-first-name" type="text" placeholder="" 
                    onInput={(e)=>validateText(e.target.value)}
                    value={ShName} onChange={(e)=> setShName(e.target.value)} />
                  </div>
                  {/* <div className='flex justify-between items-center px-4'>
                    <label className="block tracking-wide text-[#464646] text-sm
            font-normal mb-2" htmlFor='states'>
              Room Unit Price <span className="text-red-500">*</span>
                    </label>
                    <input className="appearance-none block  border-2 border-[#DDDDDD] required w-80
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
            rounded-md h-[42px] px-4 mb-3 leading-tight " required
                    id="grid-first-name" type="text" placeholder="" 
                    onInput={(e)=>validateNumber(e.target.value)}
                    value={RoomUnitPrice} onChange={(e)=> setRoomUnitPrice(e.target.value === "" ? "0" : e.target.value)} />
                  </div> */}
                  <div className='flex justify-between items-center px-4'>
                    <label className="block tracking-wide text-[#464646] text-sm
            font-normal mb-2" htmlFor='states'>
             HSNSAC
                    </label>
                    <input className="appearance-none block  border-2 border-[#DDDDDD] required w-80
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
            rounded-md h-[42px] px-4 mb-3 leading-tight " required
                    id="grid-first-name" type="text" placeholder="" 
                    
                    value={HSNSAC} onChange={(e)=> setHSNSAC(e.target.value)} />
                  </div>
                  <div>
                    <button className="font-normal  bg-[#800080] text-[white] flex rounded-md py-2 my-6 
             text-[13px] px-3 mx-auto cursor-pointer opacity-100" onClick={createProductHandler}>Submit</button>
                  </div>
                </div>
              </div> 
            </div>
          </div>
        </div> 
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default ProductModal