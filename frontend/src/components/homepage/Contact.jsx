import React, { useEffect, useState } from "react"
import contact1 from "../../assets/homepage/contact1.svg" 
import contact2 from "../../assets/homepage/contact2.svg"
import Select from "react-select";
import {AiFillInfoCircle} from "react-icons/ai"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../api/axios";
import { Tooltip } from "react-tooltip";
const scheduleCallData = [
  "Efficiently manage hotel operations, reservations, guest check-in/out, and optimize revenue while delivering exceptional guest experiences.",
  "Streamline restaurant operations, manage orders, reservations, inventory, and billing for an enhanced dining experience.",
  "Transform traditional menus into digital, interactive menus accessible from smartphones, enabling convenient browsing, ordering, and real-time updates for customers."
]

const Contact = () => {
 
  // const hmsclickHandler = () => {
  //   setIsShownHms(prevState => !prevState)
  // }
  // const rmsclickHandler = () => {
  //   setIsShownRms(prevState => !prevState)
  // }
  // const cmclickHandler = () => {
  //   setIsShownCm(prevState => !prevState)
  // }
  const data = [
    {
      value: 1,
      text: "Hotel Management Software (HMS)",
      icon: <AiFillInfoCircle
      //  onClick={hmsclickHandler}
        data-tooltip-id="my-tooltip" data-tooltip-content={scheduleCallData[0]}
      />
    },
    {
      value: 2,
      text: "Restaurant Management Software (RMS)",
      icon: <AiFillInfoCircle
      //  onClick={rmsclickHandler}
        data-tooltip-id="my-tooltip" data-tooltip-content={scheduleCallData[1]} 
      />
    },
    {
      value: 3,
      text: "Cloud Menu(CM)",
      icon: <AiFillInfoCircle 
      // onClick={cmclickHandler}
        data-tooltip-id="my-tooltip" data-tooltip-content={scheduleCallData[2]} 
      />
    }
  ];
 
  const [selectedOption, setSelectedOption] = useState(null);
  // const [isShownhms, setIsShownHms] = useState(false);
  // const [isShownrms, setIsShownRms] = useState(false); 
  // const [isShowncm, setIsShownCm] = useState(false);

  const [disabled, setDisabled] = useState(true)
  // handle onChange event of the dropdown
  const handleChange = e => {
    setSelectedOption(e);
  }
  const [name, setName] = useState("")
  const [email, setEmail] = useState("") 
  const [phone, setPhone] = useState("") 

  const [date, setDate] = useState("") 
  const [time, setTime] = useState("") 

  useEffect(()=>{
    console.log(name, email, phone, date, time, selectedOption)
  })

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  useEffect(()=>{
    if(name !== "" && email !=="" && phone?.length === 10 && date !="" && time !=""){
      if (isValidEmail(email)) {
        setDisabled(false)
      }
      else
        setDisabled(true)
    }
    else{
      setDisabled(true)
    }
  },[name, email, phone, date, time])
  const submitHandler = async(e) =>{
    e.preventDefault() 
    let subject = selectedOption?.text
    console.log(name,
      email, 
      subject,
      phone,
      date,
      time)
    try{
      const response = await axios.post(`/api/home/form/${"call"}`,{
        name,
        email, 
        subject,
        phone,
        date,
        time
      })
      if(response?.status === 201){
        toast.success("Call scheduled successfully!", {
          position: toast.POSITION.TOP_CENTER
        });
      } 
    }
    catch{
      toast.error("Call couldn't be scheduled, please try again later!", {
        position: toast.POSITION.TOP_CENTER
      });
     
    }
    setName("")
    setEmail("")
    setPhone("")
    setDate("") 
    setTime("")
  }

  

  return ( 
    <>
      <ToastContainer autoClose={2000}/>
      <Tooltip id="my-tooltip" place="right"
        style={{backgroundColor: "#FFE1FF", 
          border:"#7E007E",
          zIndex:999999,
          // marginLeft:"2rem",
          borderColor:"#7E007E",
          borderWidth:"1px",
          color:"#7E007E",
          fontSize:"8px",
          width:"5rem"}}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-10 md:p-20" 
        style={{ backgroundImage: `url(${contact2})` }} >
        <div>
          <img src={contact1} alt="" className=""/>
        </div>
        <div 
        // className="md:col-span-2"
        >
          <form className="w-full max-w-lg bg-white relative rounded-xl p-5 font-raleway" 
            onSubmit={submitHandler} >
            <p className='text-[#7E007E] font-semibold text-center text-[23px] py-5'>Schedule a Call with Us</p>
            <div className="flex flex-wrap items-center justify-center -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3">
                <label className="flex items-center uppercase 
                 text-[#565656] text-xs font-bold mb-2" htmlFor="grid-first-name">
                 
                  <span>Name  </span>
                  <span className="text-red-600 font-medium text-[25px]">*</span>
                </label>
                <input className="appearance-none block w-full 
                bg-white-200 text-gray-700 border-2 border-[#A9A9A9] 
                rounded py-3 px-4 mb-3 leading-tight focus:outline-none 
                focus:border-2 focus:border-[#800080] focus:bg-white" value={name}
                id="grid-first-name" type="text" onChange={(e)=> setName(e.target.value)}
                />
    
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-[#565656] text-xs text-left font-bold mb-2" htmlFor="grid-first-name">
    Contact No
                </label>
                <input className="appearance-none block w-full 
                bg-white-200 text-gray-700 border-2 border-[#A9A9A9] 
                rounded py-3 px-4 mb-3 leading-tight focus:outline-none 
                focus:border-2 focus:border-[#800080] focus:bg-white" 
                maxLength="10" 
                minLength="10" value={phone}
                onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                id="grid-first-name" type="text" onChange={(e)=> setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6 items-center justify-center">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="flex items-center  uppercase tracking-wide text-[#565656] text-xs text-left font-bold mb-2" htmlFor="grid-first-name">
                  <span>Email</span> 
                  <span className="text-red-600 font-medium text-[25px]">*</span>
                </label>
                <input className="appearance-none block w-full 
                bg-white-200 text-gray-700 border-2 border-[#A9A9A9] 
                rounded py-3 px-4  leading-tight focus:outline-none 
                focus:border-2 focus:border-[#800080] focus:bg-white" 
                id="grid-first-name" type="email" value={email}
                onChange={(e)=> setEmail(e.target.value)} required
                /> 
    
              </div>
             
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-[#565656] text-xs text-left font-bold mb-2" htmlFor="grid-first-name">
    Subject
                </label>
                <Select
                  className="bg-gray-50  block border-2 border-[#A9A9A9] 
                 rounded-md focus:outline-none 
                focus:shadow-lg focus:shadow-[#800080]-500/50 
                focus:border-2 focus:border-[#800080] text-[#800080]
              
                  w-full" 
                  placeholder=""
                  theme={theme => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      neutral50: "#800080",  // Placeholder color
                    },
                  })}
                  value={selectedOption}
                  options={data}
                  onChange={handleChange}
                  getOptionLabel={e => (
                    <>
                      <div className="flex justify-between relative">
                      
                        <span >{e.text}</span>
                        <span  role="presentation" >{e.icon}</span>
                      </div>
                     
                    </>
                  )}
                />
              </div>
              {/* <label className="block uppercase tracking-wide text-[#565656] text-xs text-left font-bold mb-2" htmlFor="grid-first-name">
    Subject
                </label>
                <input className="appearance-none block w-full bg-white-200 text-gray-700 border-2 border-[#A9A9A9] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-2 focus:border-[#800080] focus:bg-white" id="grid-first-name" type="text" 
                /> */}
                
              {/* {isShownhms && (
                <div className="absolute right-0 md:-right-20  text-[8px] bg-[#FFE1FF] text-[#7E007E]  
                border-2 border-[#7E007E] p-1 rounded-md w-full md:w-20 top-[60%] md:top-[50%]">
          Efficiently manage hotel operations, reservations,
           guest check-in/out, and optimize revenue while 
           delivering exceptional guest experiences.
                </div> 
              )}
              {isShownrms && (
                <div className="absolute right-0 md:-right-20  text-[8px] bg-[#FFE1FF] text-[#7E007E]  
                border-2 border-[#7E007E] p-1 rounded-md w-full md:w-20 top-[60%] md:top-[50%]">
           Streamline restaurant operations, manage orders, reservations, inventory, and billing for an enhanced dining experience.
                </div>
              )}
              {isShowncm && (
                <div className="absolute right-0 md:-right-20  text-[8px] bg-[#FFE1FF] text-[#7E007E]  
                 border-2 border-[#7E007E] p-1 rounded-md w-full md:w-20 top-[60%] md:top-[50%]">
Transform traditional menus into digital, interactive menus accessible from smartphones, enabling convenient browsing, ordering, and real-time updates for customers.
                </div>
              )} */}
 
                

          
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-[#565656] text-xs text-left font-bold mb-2" htmlFor="grid-first-name">
        Choose Date
                </label>
                <input className="appearance-none block w-full 
                bg-white-200 text-gray-700 border-2 border-[#A9A9A9] 
                rounded py-3 px-4 mb-3 leading-tight focus:outline-none 
                focus:border-2 focus:border-[#800080] focus:bg-white" 
                value={date}
                id="grid-first-name" type="date" onChange={(e)=> setDate(e.target.value)}
                /> 
    
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-[#565656] text-xs text-left font-bold mb-2" htmlFor="grid-first-name">
    Choose Time
                </label>
                <input className="appearance-none block w-full
                bg-white-200 text-gray-700 border-2 border-[#A9A9A9] 
                rounded py-3 px-4 mb-3 leading-tight focus:outline-none 
                focus:border-2 focus:border-[#800080] focus:bg-white" 
                value={time}
                id="grid-first-name" type="time" onChange={(e)=> setTime(e.target.value)}
                /> 
              </div>
            </div>
            <div className="flex justify-center items-center">
              <button className={`bg-[#800080] font-poppins font-medium text-[15px]
             text-white rounded-md px-20 py-2 
             ${disabled ? "cursor:not-allowed opacity-50" : "cursor-pointer opacity-100"}`}
              disabled={disabled} type="submit">
              Submit
              </button>
            </div>
           
          </form>
        </div>
      </div>
    </>
  )
}

export default Contact