import React, { useState } from "react"
import Stepper from "../components/Stepper.jsx";
//import Navbar from "../components/Navbar.jsx";
import Navbar from "../components/homepage/Navbar.jsx";
import PersonalDetailsForm from "../components/PersonalDetailsForm.jsx";
import PropertyOneForm from "../components/PropertyOneForm.jsx";
import PropertyTwoForm from "../components/PropertyTwoForm.jsx";
import PropertyThreeForm from "../components/PropertyThreeForm.jsx";
import PropertyFourForm from "../components/PropertyFourForm.jsx";


const RegistrationForm = () => {
  // const steps = ['Customer Registration', 'Property Registration'];
  // const [actFirstProp, setActFirstProp] = useState(false)
  const [activateFirstProperty, setActivateFirstProperty] = useState(false)
  const [activateFirstPropertyStepper, setActivateFirstPropertyStepper] = useState(false)
  const [activateSecondProperty, setActivateSecondProperty] = useState(false)
  const [activateSecondPropertyStepper, setActivateSecondPropertyStepper] = useState(false)
   
  const [activateThirdProperty, setActivateThirdProperty] = useState(false)
  const [activateThirdPropertyStepper, setActivateThirdPropertyStepper] = useState(false)

  const [activateFourthProperty, setActivateFourthProperty] = useState(false)
  const [activateFourthPropertyStepper, setActivateFourthPropertyStepper] = useState(false)

  const [userRegistrationData, setUserRegistrationData] = useState({}) 
  
  //  const toggleStepper = () => {
  //     setActivateFirstProperty(prevState =>)
  //  }
  // useEffect(()=>{
  // console.log(userRegistrationData)
  // dispatch(addUser(userRegistrationData))
  
  // },[userRegistrationData])
  // useEffect(()=>{
  //   console.log("setActivateFourthPropertyStepper", activateFourthPropertyStepper)
  // }, activateFourthPropertyStepper)
  return (
    <>
      <Navbar/>

      <div className="grid grid-cols-4 md:grid-cols-12 p-4 md:p-12">
        <div className="md:col-span-1"></div>
        <div className="col-span-6 md:col-span-10">
          <div className="grid grid-cols-6">
            <div className="col-span-1 md:col-span-2">
              <Stepper 
              // actFirstProp={actFirstProp} 

                activateFirstProperty={activateFirstProperty} 
                activateFirstPropertyStepper={activateFirstPropertyStepper}
                setActivateFirstProperty={setActivateFirstProperty} 
                setActivateFirstPropertyStepper={setActivateFirstPropertyStepper}

                activateSecondProperty={activateSecondProperty}
                setActivateSecondProperty={setActivateSecondProperty}
                activateSecondPropertyStepper={activateSecondPropertyStepper}
                setActivateSecondPropertyStepper={setActivateSecondPropertyStepper}

                setActivateThirdProperty={setActivateThirdProperty}
                activateThirdPropertyStepper={activateThirdPropertyStepper}
                setActivateThirdPropertyStepper={setActivateThirdPropertyStepper}
                setActivateFourthProperty={setActivateFourthProperty}
                activateFourthPropertyStepper={activateFourthPropertyStepper}
                setActivateFourthPropertyStepper={setActivateFourthPropertyStepper}
              />
            </div>
            <div className="col-span-5 md:col-span-4 ">
              <div className="col-span-3 md:grid md:grid-cols-8">
                <div className="md:col-span-1"></div>
                <div className="col-span-3 md:col-span-6">
                  {activateFirstProperty ?  <PropertyOneForm  
                    setUserRegistrationData={setUserRegistrationData} 
                    setActivateSecondProperty={setActivateSecondProperty}
                    setActivateSecondPropertyStepper={setActivateSecondPropertyStepper}
                    setActivateFirstProperty={setActivateFirstProperty}
                    setActivateFirstPropertyStepper={setActivateFirstPropertyStepper}
                  />:
           
                    activateSecondProperty ? <PropertyTwoForm  
                      setUserRegistrationData={setUserRegistrationData} 
                      setActivateThirdProperty={setActivateThirdProperty}
                      setActivateSecondProperty={setActivateSecondProperty}
                      setActivateSecondPropertyStepper={setActivateSecondPropertyStepper}
                      setActivateThirdPropertyStepper={setActivateThirdPropertyStepper}
                    /> : 
                      activateThirdProperty ? <PropertyThreeForm 
                        setUserRegistrationData={setUserRegistrationData}  
                        setActivateThirdPropertyStepper={setActivateThirdPropertyStepper}
                        activateFourthPropertyStepper={activateFourthPropertyStepper}
                        setActivateFourthProperty={setActivateFourthProperty}
                        setActivateFourthPropertyStepper={setActivateFourthPropertyStepper}
                        setActivateThirdProperty={setActivateThirdProperty}
          
                      /> :  
                        activateFourthProperty ? <PropertyFourForm  
                          userRegistrationData={userRegistrationData} 
                          setUserRegistrationData={setUserRegistrationData}  
                          setActivateFourthPropertyStepper={setActivateFourthPropertyStepper}
                        /> :
                          <PersonalDetailsForm 
                            setActivateFirstProperty={setActivateFirstProperty} 
                            // setUserRegistrationData={setUserRegistrationData} 
                            setActivateFirstPropertyStepper={setActivateFirstPropertyStepper} />
                  }
          
                </div>
                <div className="md:col-span-1"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-1"></div>
      </div> 
    </>
  )
}

export default RegistrationForm