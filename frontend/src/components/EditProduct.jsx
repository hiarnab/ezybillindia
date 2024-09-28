import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {BsTelephoneForwardFill} from "react-icons/bs"
import axios from "../api/axios";
import validateText, { validateNumber } from "../utils/TextValidations";

const EditProduct = (props) => {

  const accessToken = useSelector(store => store?.login?.userData[0])
  const productDetails = useSelector(store => store?.property?.productDetails)

  const [ProductName, setProductName] = useState("")
  const [NoteOnProduct, setNoteOnProduct] = useState("")
  const [UnitPrice, setunitprice] = useState("")
  const [Unit, setunit] = useState("")
  const [SGSTPC,setSGSTPC] = useState("")
  const [CGSTPC,setCGSTPC] = useState("")
  const [DiscountAllowed,setDiscountAllowed] = useState("")
  const [ShName, setShName] = useState("")
  const [RoomUnitPrice, setRoomUnitPrice] = useState("")
  const [HSNSAC, setHSNSAC] = useState("")
  const [disableBtn, setDisableBtn] = useState(true)

  useEffect(()=>{
    console.log(productDetails)
    if(productDetails){
      setProductName(productDetails?.ProductName)
      setNoteOnProduct(productDetails?.NoteOnProduct)
      setunitprice(productDetails?.UnitPrice)
      setunit(productDetails?.Unit)
      setSGSTPC(productDetails?.SGSTPC)
      setCGSTPC(productDetails?.CGSTPC)
      setDiscountAllowed(productDetails?.DiscountAllowed)
      setShName(productDetails?.ShName)
      setRoomUnitPrice(productDetails?.RoomUnitPrice)
      setHSNSAC(productDetails?.HSNSAC)
    }
  },[productDetails])

  useEffect(()=>{
    console.log("inside use effect",

      ProductName !== productDetails?.ProductName,
      NoteOnProduct !== productDetails?.NoteOnProduct ,
      UnitPrice !== productDetails?.UnitPrice ,
      Unit !== productDetails?.Unit ,
      SGSTPC !== productDetails?.SGSTPC ,
      CGSTPC !== productDetails?.CGSTPC ,
      DiscountAllowed !== productDetails?.DiscountAllowed ,
      ShName !== productDetails?.ShName ,
      RoomUnitPrice !== productDetails?.RoomUnitPrice ,
      HSNSAC !== productDetails?.HSNSAC

    )


    if(ProductName !== productDetails?.ProductName || NoteOnProduct !== productDetails?.NoteOnProduct || 
      Number(UnitPrice) !== Number(productDetails?.UnitPrice) || Number(Unit) !== Number(productDetails?.Unit) || Number(SGSTPC) !== Number(productDetails?.SGSTPC) || 
      Number(CGSTPC) !== Number(productDetails?.CGSTPC) || Number(DiscountAllowed) !== Number(productDetails?.DiscountAllowed) || 
      ShName !== productDetails?.ShName || Number(RoomUnitPrice) !== Number(productDetails?.RoomUnitPrice) || HSNSAC !== productDetails?.HSNSAC
    )
      setDisableBtn(false)
    else setDisableBtn(true)
  },[ProductName, NoteOnProduct, UnitPrice, Unit, SGSTPC, CGSTPC, DiscountAllowed, ShName,
    RoomUnitPrice, HSNSAC])

  const saveEditHandler = async (e) => {
    e.preventDefault()
    let editDetails = {} 
    if(ProductName !== productDetails?.ProductName){
      editDetails.ProductName = ProductName
    }  
    if(NoteOnProduct !== productDetails?.NoteOnProduct){
      editDetails.NoteOnProduct = NoteOnProduct
    }   
    if(UnitPrice !== productDetails?.UnitPrice){
      editDetails.UnitPrice = UnitPrice
    }  
    if(Unit !== productDetails?.Unit){
      editDetails.Unit = Unit
    } 
    if(SGSTPC !== productDetails?.SGSTPC){
      editDetails.SGSTPC = SGSTPC
    } 
    if(CGSTPC !== productDetails?.CGSTPC){
      editDetails.CGSTPC = CGSTPC
    } 
    if(DiscountAllowed !== productDetails?.DiscountAllowed){
      editDetails.DiscountAllowed = DiscountAllowed
    } 
    if(ShName !== productDetails?.ShName){
      editDetails.ShName = ShName
    } 
    if(RoomUnitPrice !== productDetails?.RoomUnitPrice){
      editDetails.RoomUnitPrice = RoomUnitPrice
    } 
    if(HSNSAC !== productDetails?.HSNSAC){
      editDetails.HSNSAC = HSNSAC
    } 
    console.log(editDetails)
    try {
      const options = {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }}
      const response = await axios.put(`/api/property/${productDetails?.PropertyNo}/itemCtegory/${productDetails?.CategoryRN}/item/${productDetails?.ItemNameRN}/product/${productDetails?.ProductNameRN}`
        
        ,
        { ...editDetails }, options
      );
      console.log(response)
      if(response?.status == "200"){
        toast.success("Product edited successfully!", {
          position: toast.POSITION.TOP_CENTER 
        });
        props.setfetchProduct(true)
      }
    } catch (err) {
      console.log(err) 
      toast.error("Update failed, please try later!", {
        position: toast.POSITION.TOP_CENTER
      });
    }
    props.setfetchProduct(false) 
  }

  return (
    <>
      <ToastContainer autoClose={2000}/>
      <form className="md:w-[40rem] mx-auto">    
        <div className='rounded-md p-5 border-solid border-2 border-gray-300'>
          <div className='flex flex-col gap-3'>
            <div className='flex text-[14px] font-normal justify-between  flex-col md:flex-row'>
              <h5 className='text-[#B3B3B3] flex items-center gap-2 w-60'><BsTelephoneForwardFill/>Product Name</h5>
              <input type='text' value={ProductName} onChange={(e) => setProductName(e.target.value)}
                onInput={(e)=>validateText(e.target.value)}
                className='appearance-none block w-full border-2 border-[#DDDDDD]
    focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
     rounded-md h-[42px] px-4 mb-3 leading-tight'
              />
            </div>
            <div className='flex text-[14px] font-normal justify-between'>
              <h5 className='text-[#B3B3B3] flex items-center gap-2 w-60'><BsTelephoneForwardFill/>Note On Product</h5>
              <input type='text' value={NoteOnProduct} onChange={(e) => setNoteOnProduct(e.target.value)}       
                className='appearance-none block w-full border-2 border-[#DDDDDD]
    focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
     rounded-md h-[42px] px-4 mb-3 leading-tight'
                onInput={(e)=>validateText(e.target.value)}
              />
            </div>
            <div className='flex text-[14px] font-normal justify-between'>
              <h5 className='text-[#B3B3B3] flex items-center gap-2 w-60'><BsTelephoneForwardFill/>Unit Price</h5>
              <input type='text' value={UnitPrice} onChange={(e) => setunitprice(e.target.value)}       
                onInput={(e)=>validateNumber(e.target.value)}
                className='appearance-none block w-full border-2 border-[#DDDDDD]
    focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
     rounded-md h-[42px] px-4 mb-3 leading-tight'
              />
            </div>
            <div className='flex text-[14px] font-normal justify-between'>
              <h5 className='text-[#B3B3B3] flex items-center gap-2 w-60'><BsTelephoneForwardFill/>Unit</h5>
              <input type='text' value={Unit} onChange={(e) => setunit(e.target.value)}       
                onInput={(e)=>validateNumber(e.target.value)}
                className='appearance-none block w-full border-2 border-[#DDDDDD]
    focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
     rounded-md h-[42px] px-4 mb-3 leading-tight'
              />
            </div>
            <div className='flex text-[14px] font-normal justify-between'>
              <h5 className='text-[#B3B3B3] flex items-center gap-2 w-60'><BsTelephoneForwardFill/>SGSTPC</h5>
              <input type='text' value={SGSTPC} onChange={(e) => setSGSTPC(e.target.value)}       
                onInput={(e)=>validateNumber(e.target.value)}
                className='appearance-none block w-full border-2 border-[#DDDDDD]
    focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
     rounded-md h-[42px] px-4 mb-3 leading-tight'
              />
            </div>
            <div className='flex text-[14px] font-normal justify-between'>
              <h5 className='text-[#B3B3B3] flex items-center gap-2 w-60'><BsTelephoneForwardFill/>CGSTPC</h5>
              <input type='text' value={CGSTPC} onChange={(e) => setCGSTPC(e.target.value)}       
                onInput={(e)=>validateNumber(e.target.value)}
                className='appearance-none block w-full border-2 border-[#DDDDDD]
    focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
     rounded-md h-[42px] px-4 mb-3 leading-tight'
              />
            </div>
            <div className='flex text-[14px] font-normal justify-between'>
              <h5 className='text-[#B3B3B3] flex items-center gap-2 w-60'><BsTelephoneForwardFill/>DiscountAllowed</h5>
              <input type='text' value={DiscountAllowed} onChange={(e) => setDiscountAllowed(e.target.value)}       
                onInput={(e)=>validateNumber(e.target.value)}
                className='appearance-none block w-full border-2 border-[#DDDDDD]
    focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
     rounded-md h-[42px] px-4 mb-3 leading-tight'
              />
            </div>
            <div className='flex text-[14px] font-normal justify-between'>
              <h5 className='text-[#B3B3B3] flex items-center gap-2 w-60'><BsTelephoneForwardFill/>ShName</h5>
              <input type='text' value={ShName} onChange={(e) => setShName(e.target.value)}       
                onInput={(e)=>validateText(e.target.value)}
                className='appearance-none block w-full border-2 border-[#DDDDDD]
    focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
     rounded-md h-[42px] px-4 mb-3 leading-tight'
              />
            </div>
            <div className='flex text-[14px] font-normal justify-between'>
              <h5 className='text-[#B3B3B3] flex items-center gap-2 w-60'><BsTelephoneForwardFill/>RoomUnitPrice</h5>
              <input type='text' value={RoomUnitPrice} onChange={(e) => setRoomUnitPrice(e.target.value)}       
                onInput={(e)=>validateNumber(e.target.value)}
                className='appearance-none block w-full border-2 border-[#DDDDDD]
    focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
     rounded-md h-[42px] px-4 mb-3 leading-tight'
              />
            </div>
            <div className='flex text-[14px] font-normal justify-between'>
              <h5 className='text-[#B3B3B3] flex items-center gap-2 w-60'><BsTelephoneForwardFill/>HSNSAC</h5>
              <input type='text' value={HSNSAC} onChange={(e) => setHSNSAC(e.target.value)}       
                // onInput={(e)=>validateText(e.target.value)}
                className='appearance-none block w-full border-2 border-[#DDDDDD]
    focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
     rounded-md h-[42px] px-4 mb-3 leading-tight'
              />
            </div>
            <div className='flex'>
              <button className={`
    font-normal  bg-green-700 text-[white] flex items-center 
    rounded-md py-2 my-6 text-[14px] px-3 mx-auto
    cursor-pointer opacity-100  ${disableBtn  ? "cursor-not-allowed opacity-50"
      : "cursor-pointer opacity-100"}  `}
              onClick={saveEditHandler}>Save</button>
              <button type='button' className="
    font-normal  bg-red-600 text-[white] flex items-center 
    rounded-md py-2 my-6 text-[14px] px-3 mx-auto
    cursor-pointer opacity-100" 
              onClick={props.setEdit}>Back</button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
 
export default EditProduct