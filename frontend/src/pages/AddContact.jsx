import React, { useEffect, useRef, useState } from "react"
import HeroImage from "../assets/contact/hero.png"
import emailimg from "../assets/contact/email.svg"
import phoneimg from "../assets/contact/phone.svg"
import location from "../assets/contact/location.svg"
import Navbar from "../components/homepage/Navbar.jsx"
import Cards from "../components/contactpage/Cards.jsx"
import contactbg from "../assets/contact/contactbg.svg"
import { Tooltip } from "react-tooltip";
import Footer from "../components/homepage/Footer.jsx"
import {AiFillInfoCircle} from "react-icons/ai" 
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../api/axios"
import { Link } from "react-router-dom"
import Sticky from "react-sticky-el/lib/basic-version"

const demoContent = [
  "A demonstration tailored to highlight the capabilities and features of our hotel management software, with or without the service terminal option",
  "A demonstration specifically focused on showcasing the features and functionality of our restaurant management software.",
  "A demonstration specifically focused on showcasing the features and functionality of our restaurant management software.",
  "A comprehensive demonstration that covers both the Restaurant Software (RMS) and Hotel Software (HMS), including the option to include or exclude the service terminal functionality."
]
 
const consultationContent = [
  "If you have any questions or queries regarding our pricing structure, packages, or payment options.",
  "For inquiries related to the system requirements and infrastructure needed to run our software effectively.",
  "If you require customized tools or specific reporting features tailored to your business needs.",
  "For any other inquiries or topics not covered in the above categories."
]

const AddContact = ({scrollProp}) => {
  console.log(scrollProp,"scrollProp")
  // const clickHandler = (val) => {
  //   if(val === "hmsdemo"){
  //     setValue("hmsDemo")
  //   }
  //   else if(val === "rmsdemo"){
  //     setValue("rmsdemo")
  //   }
  //   else if(val === "cmdemo"){
  //     setValue("cmdemo")
  //   }
  //   else if(val === "comdemo"){
  //     setValue("comdemo")
  //   }
  //   else if(val === "conprice"){
  //     setValue("conprice")
  //   }
  //   else if(val === "consys"){
  //     setValue("consys")
  //   }
  //   else if(val === "conreport"){
  //     setValue("conreport")
  //   }
  //   else if(val === "coninquiry"){
  //     setValue("coninquiry")
  //   }
   
  //   else {
  //     setValue("")
  //   }
  // }

  const scrollHeader = useRef()
  useEffect(()=>{
    if(!scrollProp)
      scrollHeader.current.scrollIntoView()
  },[])

  const data = [
    {
      value: 1,
      text: "Hotel Management Software (HMS) Demo",
      icon: <AiFillInfoCircle 
      // onMouseEnter={()=>clickHandler("hmsdemo")} 
      //   onMouseLeave={()=>clickHandler("")} 
        data-tooltip-id="my-tooltip" data-tooltip-content={demoContent[0]} 
      />
    },
    {
      value: 2,
      text: "Restaurant Management Software (RMS) Demo",
      icon: <AiFillInfoCircle 
        // onMouseEnter={()=>clickHandler("rmsdemo")} 
        // onMouseLeave={()=>clickHandler("")}
        data-tooltip-id="my-tooltip" data-tooltip-content={demoContent[1]} 
      />
    },
    {
      value: 3, 
      text: "Cloud Menu (CM)",
      icon: <AiFillInfoCircle 
      // onMouseEnter={()=>clickHandler("cmdemo")}  
      //   onMouseLeave={()=>clickHandler("")}
        data-tooltip-id="my-tooltip" data-tooltip-content={demoContent[2]} 
      />
    },
    {
      value: 4,
      text: "Combined Demo",
      icon: <AiFillInfoCircle 
      // onMouseEnter={()=>clickHandler("comdemo")}  
      //   onMouseLeave={()=>clickHandler("")}
        data-tooltip-id="my-tooltip" data-tooltip-content={demoContent[3]} 
      />
    }
  ];


  const consultationData = [
    {
      value: 1,
      text: "Pricing Inquiry",
      icon: <AiFillInfoCircle 
      // onMouseEnter={()=>clickHandler("conprice")} 
      //   onMouseLeave={()=>clickHandler("")} 
        data-tooltip-id="my-tooltip" data-tooltip-content={consultationContent[0]} 
      />
    },
    {
      value: 2,
      text: "System Requirements & Infrastructure",
      icon: <AiFillInfoCircle
      // onMouseEnter={()=>clickHandler("conprice")} 
      //   onMouseLeave={()=>clickHandler("")} 
        data-tooltip-id="my-tooltip" data-tooltip-content={consultationContent[1]} 
      />
    },
    {
      value: 3,
      text: "Customized Tools & Reporting",
      icon: <AiFillInfoCircle
        // onMouseEnter={()=>clickHandler("conprice")} 
      //   onMouseLeave={()=>clickHandler("")} 
        data-tooltip-id="my-tooltip" data-tooltip-content={consultationContent[2]} 
      />
    },
    {
      value: 4,
      text: "Other Inquiries",
      icon: <AiFillInfoCircle 
        // onMouseEnter={()=>clickHandler("conprice")} 
      //   onMouseLeave={()=>clickHandler("")} 
        data-tooltip-id="my-tooltip" data-tooltip-content={consultationContent[3]} 
      />
    }
  ];

  
  const [contactRadio, setcontactRadio] = useState("Demo Purpose")
  const [selectedOption, setSelectedOption] = useState(null);
  const [conSelectedOption, setconSelectedOption] = useState(null);

  const [name, setName] = useState("")
  const [email, setEmail] = useState("") 
  const [phone, setPhone] = useState("") 
  const [state, setState] = useState("")
  const [pincode, setPincode] = useState("")
  
  const [disabled, setDisabled] = useState(true)
  const scollToRef = useRef();
  
  useEffect(()=>{
    if(scrollProp){
      scollToRef.current.scrollIntoView()
    }
    else scrollHeader.current.scrollIntoView()
  },[scrollProp])
  function isValidEmail(email) { 
    return /\S+@\S+\.\S+/.test(email);
  }

  useEffect(()=>{
    if(name !== "" 
    && email !=="" 
    && phone?.length === 10 
    && state !="" 
    && pincode !="" 
    && (selectedOption !=="" || conSelectedOption !==""))
    {
      if (isValidEmail(email)) {
        setDisabled(false)
      }
      else{
        setDisabled(true)
      }
    }
    else{
      setDisabled(true)
    }
  }, [name,email, phone, pincode, state, selectedOption, conSelectedOption])
  // const [isShownhms, setIsShownHms] = useState(false);
  // const [isShownrms, setIsShownRms] = useState(false); 
  // const [isShowncm, setIsShownCm] = useState(false);
  // handle onChange event of the dropdown
  const selectChange = e => {
    setSelectedOption(e);
  }
  const submitHandler = async(e) => {
    e.preventDefault() 
    let subject ;
    let  response;
    
    try{
      if(contactRadio === "Demo Purpose")
      {
        subject = selectedOption?.text
        response = await axios.post(`/api/home/form/${"demo"}`,{
          name,email, phone, state, subject, pincode
        })
        
      }
      if(contactRadio === "Consultation")
      {
        subject = conSelectedOption?.text
        response = await axios.post(`/api/home/form/${"consultation"}`,{
          name,email, phone, state, subject, pincode
        })
        
      }

      if(response?.status === 201 && contactRadio === "Demo Purpose"){
        toast.success("Demo call scheduled successfully!", {
          position: toast.POSITION.TOP_CENTER
        });
      } 
      else  if(response?.status === 201 && contactRadio === "Consultation"){
        toast.success("Consultation scheduled successfully!", {
          position: toast.POSITION.TOP_CENTER
        });
      } 
      else{
        console.log(name,email, phone, state, subject)
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
    setState("")
    setPincode("")
    setSelectedOption("")
    setconSelectedOption("")
  }
  const consultationSelectedOption = e => {
    setconSelectedOption(e)
  }
  const handleChange = e => {
    
    setcontactRadio(e.target.value);
    
  }; 
  useEffect(()=>{ 
    console.log(phone?.length,typeof phone?.length, "phone")
  },[phone])  

  
  return (
    <> 
      <ToastContainer autoClose={2000}/>
      <Tooltip id="my-tooltip" place="right"
        style={{backgroundColor: "#FFE1FF", 
          border:"#7E007E",
          borderColor:"#7E007E",
          borderWidth:"1px",
          color:"#7E007E",
          fontSize:"8px",
          width:"10rem"}}
      />
      <div ref={scrollHeader}>
        <Navbar/>
      </div>
     
      <div className="grid grid-cols-1  md:grid-cols-2">
        <div><img src={HeroImage} alt="hero" width={500} className="md:ml-12" /></div>
       
        <div className="flex flex-col items-start justify-center gap-4 md:gap-12">
          <Cards img={location} title="LOCATE US" content="Eastland Microsystems, Malancha Road, P.O. Noapara , Barasat , Kolkata 700125, 
            West Bengal, India" />
          <Cards img={emailimg} title="EMAIL US" content="support@ezybillindia.com" />
          <Cards img={phoneimg} title="PHONE NUMBER" content="+91 9836041044" />

          <Sticky className ="absolute left-[-8%] md:left-4 md:flex md:flex-col  md:right-0  
     md:items-end top-[15%] md:top-[25%]">
            <Link to="/login">
              <button className='rotate-90 md:-rotate-90 absolute md:right-[-2.5rem] 
              font-raleway mt-[5rem] ml-[-.8rem] md:ml-0
    bg-rgba font-normal text-[15px] text-white rounded-t-2xl px-8 py-2 w-32'>
            Login 
              </button></Link> 
            <Link to="/signup"> <button className='rotate-90 md:-rotate-90 ml-[-0.6rem]
             md:ml-[0rem] absolute  md:right-[-2.3rem] font-raleway 
    bg-white font-normal text-[15px] text-[#7E007E] rounded-t-2xl px-8 py-2 max-w-max 
    border-2 border-[#7E007E] mt-[12.8rem]'>
             Register
            </button>
            </Link> 
          </Sticky>
        </div>
      </div>
      <div className="flex flex-col gap-5 items-center justify-center p-10 md:p-5"  ref={scollToRef}
        style={{ backgroundImage: `url(${contactbg})`,backgroundRepeat : "no-repeat", backgroundSize :"cover" }}>
        <p className="text-[#800080] font-poppins text-2xl text-center font-bold">Feel free to Register a demonstration or consultation</p>
        <p className="text-[#333333] font-raleway font-medium md:px-6">Get in touch and let us know how we can help. Fill out the form and we{"'"}ll be in touch as soon as possible.</p>
        <div className="flex gap-4"  onChange={handleChange} >
          <div className="mb-[0.125rem] flex items-center justify-center gap-4 min-h-[1.5rem] pl-[1.5rem]">
            <input
              className="
              "
              type="radio"
              value="Demo Purpose"
              checked={contactRadio === "Demo Purpose"}
              name="demo"
              id="demopurpose" />
            <label
              className="mt-px inline-block pl-[0.15rem] text-[#7E007E] 
              text-sm font-poppins font-normal px-6  hover:cursor-pointer"
              htmlFor="demopurpose">
    Demo Purpose
            </label>
          </div>
          <div className="mb-[0.125rem] flex items-center justify-center gap-4 min-h-[1.5rem] pl-[1.5rem]">
            <input
              className="
              "
              type="radio"
              name="demo"
              value="Consultation"
              
              //checked={contactRadio === "Consultation"}
             
              id="consultation" />
            <label
              className="mt-px inline-block pl-[0.15rem] text-[#7E007E]  
              text-sm font-poppins font-normal px-6  hover:cursor-pointer"
              htmlFor="consultation">
    Consultation
            </label>
          </div>
        </div>
        <form className="w-full bg-transparent 
        rounded-xl py-5 px-4 md:px-[10rem] font-raleway flex flex-col" 
        onSubmit={submitHandler} >
    
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
             
              <input placeholder="Name *" 
                value={name}
                className="appearance-none block placeholder-[#7E007E] w-full bg-white-200 
               text-[#7E007E] border-2 border-[#A9A9A9] rounded-md py-3 px-4 mb-3 font-poppins
               leading-tight focus:outline-none focus:border-2 focus:border-[#800080]
                focus:bg-white" id="grid-first-name" type="text" 
                onChange={(e)=> setName(e.target.value)}
              />
    
            </div>
            <div className="w-full md:w-1/2 px-3">
             
              <input placeholder="Email *" value={email} className="appearance-none block w-full 
              font-poppins placeholder-[#7E007E]
               bg-white-200 text-[#7E007E] border-2 
               border-[#A9A9A9] rounded-md py-3 px-4 mb-3 
               leading-tight focus:outline-none focus:border-2 
               focus:border-[#800080] focus:bg-white" id="grid-first-name" type="email" 
              onChange={(e)=> setEmail(e.target.value)} required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
             
              <input placeholder="Phone" value={phone} className="appearance-none 
              block w-full
              placeholder-[#7E007E]
               bg-[#F7F0F7] text-[#7E007E] border-2 border-[#A9A9A9] rounded-md py-3 
               px-4 mb-3 leading-tight focus:outline-none font-poppins
               focus:border-2 focus:border-[#800080] focus:bg-white" 
              maxLength="10" 
              minLength="10"
              required
              onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
              id="grid-first-name" type="text" onChange={(e)=> setPhone(e.target.value)}
              />
    
            </div>
            <div className="w-full md:w-1/2 px-3 ">
              {
                contactRadio === "Consultation" ? 
                  <>
                   
                   
                    <Select
                      className="bg-gray-50  block  border-2 border-[#A9A9A9] 
                 rounded-md focus:outline-none font-poppins
                focus:shadow-lg focus:shadow-[#800080]-500/50 
                focus:border-2 focus:border-[#800080] text-[#800080]
                  w-full" 
                      placeholder="Subject"
                      theme={theme => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          neutral50: "#800080",  // Placeholder color
                        },
                      })}
                      value={conSelectedOption}
                      options={consultationData}
                      onChange={consultationSelectedOption}
                      getOptionLabel={e => (
                        <>
                          <div className="flex justify-between relative">
                      
                            <span >{e.text}</span>
                            <span  role="presentation" >{e.icon}</span>
                          </div>
                     
                        </>
                      )}
                    /> 

                  </> : contactRadio === "Demo Purpose" ? 
                    <>
                      <Select
                        className="bg-gray-50  block  border-2 border-[#A9A9A9] 
                 rounded-md focus:outline-none  font-poppins leading-tight
                focus:shadow-lg focus:shadow-[#800080]-500/50 
                focus:border-2 focus:border-[#800080] text-[#800080]
                  w-full" 
                        placeholder="Subject"
                        theme={theme => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            neutral50: "#800080",  // Placeholder color
                          },
                        })}
                        value={selectedOption}
                        options={data}
                        onChange={selectChange}
                        getOptionLabel={e => (
                          <>
                            <div className="flex justify-between ">
                      
                              <span >{e.text}</span>
                              <span  role="presentation" >{e.icon}</span>
                            </div>
                     
                          </>
                        )}
                      />
                    </> : null
              }
             
            </div>
          
            
           

 
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
             
              <input placeholder="State" className="appearance-none block w-full 
              bg-white-200 text-[#7E007E] border-2 border-[#A9A9A9] placeholder-[#7E007E]
               rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none font-poppins
               focus:border-2 focus:border-[#800080] focus:bg-white" value={state}
              id="grid-first-name" type="text" onChange={(e)=> setState(e.target.value)}
              />
    
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
             
              <input placeholder="Pincode" className="appearance-none block w-full 
             bg-white-200 text-[#7E007E] border-2 border-[#A9A9A9] placeholder-[#7E007E]
              rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none font-poppins
              focus:border-2 focus:border-[#800080] focus:bg-white" value={pincode}
              onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
              id="grid-first-name" type="text" onChange={(e)=> setPincode(e.target.value)}
              />
   
            </div>
          </div>
          <button className={`bg-[#800080] font-poppins self-center
           font-medium text-[15px] text-white rounded-md px-20 py-2 
           ${disabled ? "cursor:not-allowed opacity-50" : "cursor-pointer opacity-100"}
           `}  disabled={disabled} type="submit" > Submit</button>
        </form>
      </div>
      <Footer/>
    </>
  )
}

export default AddContact