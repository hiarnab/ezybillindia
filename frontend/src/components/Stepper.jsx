import React, { useEffect } from "react"
import { useSelector } from "react-redux"
const Stepper = ({activateFirstPropertyStepper,setActivateSecondPropertyStepper,
  setActivateFirstProperty, setActivateThirdProperty,  setActivateThirdPropertyStepper, setActivateSecondProperty, 
  activateFourthPropertyStepper,setActivateFourthPropertyStepper, setActivateFirstPropertyStepper,
  setActivateFourthProperty,
  activateSecondPropertyStepper,activateThirdPropertyStepper}) => {
  const moveToRegistrationToggleHandler = () => {
    setActivateFirstProperty(false)
    setActivateSecondProperty(false)
    setActivateThirdProperty(false)
    setActivateFourthProperty(false)
    setActivateSecondPropertyStepper(false) 
    setActivateThirdPropertyStepper(false)
    setActivateFourthPropertyStepper(false)
  } 
  const moveToPropertyOneToggleHandler = () => {
    setActivateFirstProperty(true) 
    setActivateFirstPropertyStepper(true)
    setActivateSecondProperty(false)
    setActivateSecondPropertyStepper(false)
    setActivateThirdPropertyStepper(false)
    setActivateFourthPropertyStepper(false)
  }
  const moveToPropertyTwoToggleHandler = () =>{
    setActivateFirstProperty(false) 
    setActivateSecondProperty(true)
    setActivateThirdProperty(false)
    setActivateSecondPropertyStepper(true)
    setActivateThirdPropertyStepper(false)
    setActivateFourthPropertyStepper(false)
  }
  const moveToPropertyThreeToggleHandler = () =>{
    setActivateFirstProperty(false) 
    setActivateSecondProperty(false)
    setActivateThirdProperty(true)
    setActivateFourthProperty(false)
    setActivateFirstPropertyStepper(true)
    setActivateSecondPropertyStepper(true)
    setActivateThirdPropertyStepper(false)
    setActivateFourthPropertyStepper(false)
  }
  const moveToPropertyFourToggleHandler = () =>{
    setActivateFirstProperty(false) 
    setActivateSecondProperty(false)
    setActivateThirdProperty(false)
    setActivateFourthProperty(true)
    setActivateFirstPropertyStepper(true)
    setActivateSecondPropertyStepper(true)
    setActivateThirdPropertyStepper(true)
    setActivateFourthPropertyStepper(true)
  }

  const property = useSelector(store => store?.register?.properties)

  useEffect(()=>{

    if(property.length === 4){
      setActivateFirstPropertyStepper(true)
      setActivateSecondPropertyStepper(true)
      setActivateThirdPropertyStepper(true)
      setActivateFourthPropertyStepper(true)
    }
  },[property, moveToRegistrationToggleHandler, moveToPropertyOneToggleHandler, moveToPropertyTwoToggleHandler, 
    moveToPropertyThreeToggleHandler, moveToPropertyFourToggleHandler])
  return (
    <>
      <div className="flex justify-center md:justify-normal gap-0 md:gap-6">
        <ol className="hidden md:flex md:flex-col md:justify-around ">
          <li className="  ">
            <div className="flex h-auto gap-6 ">
              <span
                className="text-[#464646] leading-[22px] font-semibold text-[13px] w-[218px] text-center
      h-fit py-3 px-10 rounded-lg border border-[#800080] font-jost"
              >
                Personal Details
              </span>
            </div>
          </li>
          <li className="  ">
            <div className="flex h-auto gap-6">
              <span
                className={`text-[#464646] leading-[22px] font-semibold text-[13px] w-[218px] text-center
      h-fit py-3 px-10 rounded-lg 
      border border-[#800080]
      font-jost
      ${activateFirstPropertyStepper ? "opacity-1" : "opacity-0"}
      `}
              >
                Property One
              </span>
            </div>
          </li>
          <li className="  ">
            <div className="flex h-auto gap-6">
              <span
                className={`text-[#464646] leading-[22px] font-semibold text-[13px] w-[218px] text-center
      h-fit py-3 px-10 rounded-lg border border-[#800080] 
      font-jost
      ${activateSecondPropertyStepper ? "opacity-1" : "opacity-0"}
      `}
              >
                Property Two
              </span>
            </div>
          </li>
          <li className="  ">
            <div className="flex h-auto gap-6">
              <span
                className={`text-[#464646] leading-[22px] font-semibold text-[13px] w-[218px] text-center
      h-fit py-3 px-10 rounded-lg border border-[#800080]  
      font-jost
      ${activateThirdPropertyStepper ? "opacity-1" : "opacity-0"}
      `}
              >
                Property Three
              </span>
            </div>
          </li>
          <li className="  ">
            <div className="flex h-auto gap-6">
              <span
                className={`text-[#464646] leading-[22px] font-semibold text-[13px] w-[218px] text-center
      h-fit py-3 px-10 rounded-lg border border-[#800080] 
      font-jost 
      ${activateFourthPropertyStepper ? "opacity-1" : "opacity-0"}
      `}
              >
                Property Four
              </span>
            </div>
          </li>
        </ol>

        <ol className=" text-gray-500">
          <li className="  ">
            <div className="flex h-auto gap-6">
              <div className=" flex flex-col items-center justify-center mt-12">
                <span
                  className="rounded-full bg-[#800080] py-[0.15rem] px-[0.30rem] text-white text-[11px] 
    "
                  role="presentation"
                  onClick={moveToRegistrationToggleHandler}
                >
                  01
                </span>
                <div
                  className={`h-[70px] w-1 bg-[#800080] 
        ${activateFirstPropertyStepper ? "opacity-1" : "opacity-0"}
        `}
                ></div>
              </div>
            </div>
          </li>

          <li className="  ">
            <div className="flex h-auto gap-6">
              <div className=" flex flex-col items-center justify-center">
                <span
                  className={`rounded-full py-[0.15rem] px-[0.30rem] text-white bg-[#800080] text-[11px]
         cursor-pointer
          ${activateFirstPropertyStepper ? "opacity-1" : "opacity-0"}
         `}
                  onClick={moveToPropertyOneToggleHandler}
                  role="presentation"
                >
                  02
                </span>
                <div
                  className={`h-[70px] w-1   bg-[#800080]
          ${activateSecondPropertyStepper ? "opacity-1" : "opacity-0"}
          `}
                ></div>
              </div>
            </div>
          </li>
          <li className="  ">
            <div className="flex h-auto gap-6">
              <div className=" flex flex-col items-center justify-center">
                <span
                  className={`rounded-full py-[0.15rem] px-[0.30rem] text-white text-[11px] bg-[#800080]
         cursor-pointer ${
    activateSecondPropertyStepper ? "opacity-1" : "opacity-0"
    }
          `}
                  onClick={moveToPropertyTwoToggleHandler}
                  role="presentation"
                >
                  03
                </span>
                <div
                  className={`h-[70px] w-1  bg-[#800080]
          ${activateThirdPropertyStepper ? "opacity-1" : "opacity-0"}
          `}
                ></div>
              </div>
            </div>
          </li>
          <li className="  ">
            <div className="flex h-auto gap-6">
              <div className=" flex flex-col items-center justify-center">
                <span
                  className={`rounded-full py-[0.15rem] px-[0.30rem] text-white text-[11px] bg-[#800080] cursor-pointer
          ${activateThirdPropertyStepper ? "opacity-1" : "opacity-0"}
          `}
                  onClick={moveToPropertyThreeToggleHandler}
                  role="presentation"
                >
                  04
                </span>
                <div
                  className={`h-[70px] w-1 bg-[#800080]
          ${activateFourthPropertyStepper ? "opacity-1" : "opacity-0"}
          `}
                ></div>
              </div>
            </div>
          </li>
          <li className="  ">
            <div className="flex h-auto gap-6">
              <div className=" flex flex-col items-center justify-center">
                <span
                  className={`rounded-full py-[0.15rem] px-[0.30rem] text-white text-[11px] bg-[#800080]  cursor-pointer
          ${activateFourthPropertyStepper ? "opacity-1" : "opacity-0"}
           `}
                  onClick={moveToPropertyFourToggleHandler}
                  role="presentation"
                >
                  05
                </span>
                <div
                  className={`h-[70px] w-1  bg-[#800080]
          ${activateFourthPropertyStepper ? "opacity-1" : "opacity-0"}
           `}
                ></div>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </>
  );
}

export default Stepper