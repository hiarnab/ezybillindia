import React, { useEffect, useRef, useState } from "react";
import { MdOutlineMobileFriendly } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addOtp } from "../registrationSlice";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { userProfile } from "../loginSlice";

const OTP_VERIFICATION = "/api/user/otp";
const USER_REGISTRATION = "/api/user";
const USER_LOGIN = "/api/user/login";

const OTPVerificationModal = ({
  setShowModal,
  type,
  usermobilenumber,
  seteditDetails,
  path,
  user,
}) => {
  const [timer, setTimer] = useState(10);
  // const [loader, setLoader] = useState(false);
  const [firstNum, setfirstNum] = useState("");
  const [secondNum, setsecondNum] = useState("");
  const [thirdNum, setthirdNum] = useState("");
  const [fourthNum, setfourthNum] = useState("");
  const [fifthNum, setfifthum] = useState("");
  const [sixthNum, setSixthNum] = useState("");
  const [submit, setsubmit] = useState(false);
  const [border, setborder] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const otp = useSelector((store) => store.register?.otp);
  const registrationDetails = useSelector((store) => store.register);
  const phoneNumber = useSelector((store) => store.register?.phone);
  const result = false;
  const firstNumRef = useRef();
  const secondNumRef = useRef();
  const thirdNumRef = useRef();
  const fourthNumRef = useRef();
  const fifthNumRef = useRef();
  const sixthNumRef = useRef();
  // const accesstoken = useSelector(store => store?.login?.userData[0]?.accessToken)
  const accessToken = useSelector((store) => store?.login?.userData[0]);
  // dataresult && console.log(dataresult)
  useEffect(() => {
    if (
      firstNum !== "" &&
      secondNum !== "" &&
      thirdNum !== "" &&
      fourthNum !== "" &&
      fifthNum !== "" &&
      sixthNum !== ""
    ) {
      setsubmit(true);
    }
  }, [
    firstNum,
    secondNum,
    thirdNum,
    fourthNum,
    timer,
    border,
    fifthNum,
    sixthNum,
  ]);

  // useEffect(()=>{
  //   console.log("fifthNum, sixthNum", fifthNum, sixthNum)
  //   if(sixthNum === ""){
  //     fifthNumRef.current.focus()
  //   }
  // },[sixthNum, fifthNum])
  useEffect(() => {
    let number = [firstNum, secondNum, thirdNum, fourthNum, fifthNum, sixthNum];
    let otpval = [...number];
    submit && dispatch(addOtp(Number(otpval.join(""))));
    // submit  && console.log('OTP', otp)
  }, [submit, timer]);

  useEffect(() => {
    const { user, otp, phone, properties } = registrationDetails;
    console.log(user, otp, phone, properties);
  }, [registrationDetails]);

  useEffect(()=>{
    firstNumRef.current.focus()
  },[])
  useEffect(() => {
    if (otp.toString().length === 6) {
      if (type === "verify") {
        if (path == "/dashboard/profile") {
          console.log(path);
          const handleSubmit = async () => {
            //update profile
            const { otp, phone } = registrationDetails;
            const editDetails = { otp, phone, user };
            try {
              const options = {
                headers: {
                  Authorization: `Bearer ${accessToken}`, 
                },
              };
              const response = await axios.put(
                "/api/user",
                { ...editDetails },
                options
              );
              console.log(response);
              if (response?.status == "200") {
                toast.success("Profile edited successfully!", {
                  position: toast.POSITION.TOP_CENTER,
                });
                setShowModal(false)
                seteditDetails(true)
              }
            } catch (err) {
              console.log(err);
              toast.error("Update failed, please try later!", {
                position: toast.POSITION.TOP_CENTER,
              });
            }
          };
          handleSubmit();
        } else {
          //user registration
          const { user, otp, phone, properties } = registrationDetails;
          const handleSubmit = async () => {
            try {
              const response = await axios.post(USER_REGISTRATION, {
                otp,
                phone,
                user,
                properties,
              });
              console.log(response);
              if (response?.status == "200") {
                toast.success("Registration successful!", {
                  position: toast.POSITION.TOP_CENTER,
                });
                setTimeout(() => {
                  navigate("/login");
                }, 1500);
              }
            } catch (err) {
              console.log(err?.response?.data?.message);
              toast.error(err?.response?.data?.message, {
                position: toast.POSITION.TOP_CENTER,
              });
            }
          };
          handleSubmit();
        }
      } else {
        //login
        console.log("entered otp", registrationDetails);
        const handleSubmit = async () => {
          try {
            const response = await axios.post(USER_LOGIN, {
              otp: otp,
              phone: usermobilenumber,
            });
            console.log(response);

            if (response?.status == "200") {
              toast.success("Login successful!", {
                position: toast.POSITION.TOP_CENTER,
              });

              let accessToken = response?.data?.accessToken;
              sessionStorage.setItem("userToken", JSON.stringify(accessToken));
              dispatch(userProfile(accessToken));
              setTimeout(() => {
                navigate("/dashboard");
              }, 1000);
            }
          } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message, {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        };
        handleSubmit();
      }
    }
  }, [otp]);

  useEffect(() => {
    //for otp verification if type = verify
    dispatch(addOtp(""));
    if (type === "verify") {
      const handleSubmit = async () => {
        try {
          const response = await axios.post(OTP_VERIFICATION, {
            type: type,
            phone: phoneNumber,
          });

          console.log(response);
        } catch (err) {
          console.log(err);
          toast.error("Mobile number verification failed!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      };
      handleSubmit();
    } else {
      //for otp verification if type = login
      if (type === "login") {
        dispatch(addOtp(""));
        console.log("login no verification");
        const handleSubmit = async () => {
          try {
            const response = await axios.post(OTP_VERIFICATION, {
              type: type,
              phone: usermobilenumber,
            });

            console.log(response);
          } catch (err) {
            console.log(err);
          }
        };
        handleSubmit();
      }
    }
  }, []);

  //UNCOMMENT IF OTP MATCHES

  // useEffect(()=>{

  //  if(result){
  //     navigate('/success')
  //     setborder(false)
  //  }
  //    else{
  //     setsubmit(false)
  //     setborder(true)
  //      setfirstNum('')
  //      setsecondNum('')
  //      setthirdNum('')
  //      setfourthNum('')
  //    }
  // },[result, submit, navigate])

  useEffect(() => {
    setborder(false);
    const interval = setInterval(() => {
      timer > 0 && setTimer((prevState) => prevState - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // useEffect(()=>{
  //   if(sixthNum === ""){
  //     fifthNumRef.current.focus();
  //   }
  // },[sixthNum])
  //  useEffect(()=>{
  //   if(submit)
  //   {
  //     if (!result){
  //       toast.error("Verification failed, incorrect OTP!", {
  //         position: toast.POSITION.TOP_CENTER
  //       });
  //     }}
  //  },[result, submit])

  const resendHandler = () => {
    setfirstNum("");
    setsecondNum("");
    setthirdNum("");
    setfourthNum("");
    setfifthum("");
    setSixthNum("");
    if (type === "verify") {
      const handleSubmit = async () => {
        try {
          const response = await axios.post(OTP_VERIFICATION, {
            type: type,
            phone: phoneNumber,
          });
          console.log(response);
          if (response?.status == "200") {
            toast.success("OTP resent successfully!", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        } catch (err) {
          console.log(err);
          toast.error("Mobile number verification failed!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      };
      handleSubmit();
    } else {
      if (type === "login") {
        const handleSubmit = async () => {
          try {
            const response = await axios.post(OTP_VERIFICATION, {
              type: type,
              phone: usermobilenumber,
            });

            console.log(response);
          } catch (err) {
            console.log(err);
          }
        };
        handleSubmit();
      }
    }
    // setLoader(true)
    // setTimeout(()=>{
    //   setLoader(false)
    //   setfirstNum('')
    //   setsecondNum('')
    //   setthirdNum('')
    //   setfourthNum('')
    //   setfifthum('')
    //   setSixthNum('')
    //  setTimer(10)
    //  setborder(false)
    // },1000)
  };
  const otpSubmitHandler = (e) => {
    e.preventDefault();
    console.log("hi");
  };
  // const BACKEND_API = import.meta.env.BACKEND_API
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto">
          <div className="flex justify-center bg-pink-50 items-center">
            <div className="w-full">
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl 
 leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span
                  className="bg-transparent 
                  text-blue-900  h-6 w-6 text-2xl block outline-none 
  focus:outline-none"
                >
                  ×
                </span>
              </button>
              <form
                className="b rounded px-8 py-8 mb-4 flex flex-col items-center w-full"
                onSubmit={otpSubmitHandler}
              >
                <MdOutlineMobileFriendly size={40} className="text-blue-900" />
                <div className="">
                  <label
                    className="block text-blue-900 text-md font-semibold my-4"
                    htmlFor="username"
                  >
                    Verify with OTP
                  </label>
                </div>
                <div className="mb-3"> 
                  <input
                    type="text"
                    className={`text-center focus:shadow-outline rounded-sm border-2 
      text-gray-500 leading-tight focus:outline-none focus:shadow-outline w-10 h-10 p-1 mr-2       
      ${
    result
      ? "border-slate-500" 
      : border
        ? "border-red-500"
        : "border-slate-500"
    }`}
                    value={firstNum}
                    maxLength="1"
                    ref={firstNumRef}
                    onChange={(e) => {
                      setfirstNum(e.target.value);
                      if (e.target.value !== "") secondNumRef.current.focus();
                      if (e.target.value === "") sixthNumRef.current.focus();
                    }}
                    onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace") {
                        firstNumRef.current.focus();
                      
                      }
                    }}
                  />
                  <input
                    type="text"
                    className={`text-center  focus:shadow-outline rounded-sm border-2 
      text-gray-500 leading-tight focus:outline-none focus:shadow-outline w-10 h-10  p-1 mr-2       
      ${
    result
      ? "border-slate-500"
      : border
        ? "border-red-500"
        : "border-slate-500"
    }`}
                    value={secondNum}
                    maxLength="1"
                    ref={secondNumRef}
                    onChange={(e) => {
                      setsecondNum(e.target.value);
                      if (e.target.value !== "") thirdNumRef.current.focus();
                      if (e.target.value === "") firstNumRef.current.focus();
                    }}
                    onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace") {
                        secondNumRef.current.focus();
                       
                      }
                    }}
                  />
                  <input
                    type="text"
                    className={`text-center focus:shadow-outline rounded-sm border-2 
      text-gray-500 leading-tight focus:outline-none focus:shadow-outline w-10 h-10 p-1 mr-2       
      ${
    result
      ? "border-slate-500"
      : border
        ? "border-red-500"
        : "border-slate-500"
    }`}
                    value={thirdNum}
                    maxLength="1"
                    ref={thirdNumRef}
                    onChange={(e) => {
                      setthirdNum(e.target.value);
                      if (e.target.value !== "") fourthNumRef.current.focus();
                      if (e.target.value === "") secondNumRef.current.focus();
                    }}
                    onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace") {
                        thirdNumRef.current.focus();
                       
                      }
                    }}
                    // onKeyPress={ket}
                  />
                  <input
                    type="text"
                    className={`text-center focus:shadow-outline rounded-sm border-2 
      text-gray-500 leading-tight focus:outline-none focus:shadow-outline w-10 h-10 p-1 mr-2       
      ${
    result
      ? "border-slate-500"
      : border
        ? "border-red-500"
        : "border-slate-500"
    }`}
                    value={fourthNum}
                    maxLength="1"
                    ref={fourthNumRef}
                    onChange={(e) => {
                      setfourthNum(e.target.value);
                      if (e.target.value !== "") fifthNumRef.current.focus();
                      if (e.target.value === "") thirdNumRef.current.focus();
                    }}
                    onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace") {
                        fourthNumRef.current.focus();
                      }
                    }}
                  />
                  <input
                    type="text"
                    className={`text-center focus:shadow-outline rounded-sm border-2 
       text-gray-500 leading-tight focus:outline-none focus:shadow-outline w-10 h-10 p-1 mr-2       
       ${
    result
      ? "border-slate-500"
      : border
        ? "border-red-500"
        : "border-slate-500"
    }`}
                    value={fifthNum}
                    maxLength="1"
                    ref={fifthNumRef}
                    onChange={(e) => {
                      setfifthum(e.target.value);
                      if (e.target.value !== "") sixthNumRef.current.focus();
                      if (e.target.value === "") fourthNumRef.current.focus();
                    }}
                    onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace") {
                        fifthNumRef.current.focus();
                        
                      }
                    }}
                  />
                  <input
                    type="text"
                    className={`text-center focus:shadow-outline rounded-sm border-2 
        text-gray-500 leading-tight focus:outline-none focus:shadow-outline w-10 h-10 p-1 mr-2       
        ${
    result
      ? "border-slate-500"
      : border
        ? "border-red-500"
        : "border-slate-500"
    }`}
                    value={sixthNum}
                    maxLength="1"
                    ref={sixthNumRef}
                    onChange={(e) => {
                      console.log("max",e.target.maxLength, e.target.length, e.target.value)
                      setSixthNum(e.target.value);
                      if (e.target.value !== "") firstNumRef.current.focus();
                      if (e.target.value === "") fifthNumRef.current.focus();
                    }}
                    onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace") {
                        sixthNumRef.current.focus();
                        //setSixthNum("")
                        //if (e.target.maxLength <= 1) fifthNumRef.current.focus();
                        
                      }
                    }}
                  />
                </div>
                <div className="flex flex-col items-center gap-6">
                  <p className="font-semibold text-sm text-slate-400">
                    {timer > 0 ? (
                      <span className="text-pink-400 pointer-events-none">
                        Resend OTP in {timer} secs
                      </span>
                    ) : (
                      // eslint-disable-next-line
                      <span
                        className="text-pink-600 font-bold cursor-pointer"
                        onClick={resendHandler}
                      >
                        Resend OTP
                      </span>
                    )}
                  </p>
                  <p className="text-[0.7rem] font-[550] font-poppins">For customers outside India, please check your email for OTP</p>
                  <ToastContainer autoClose={2000} />
                  {/* {loader && (
                    <svg
                      aria-hidden="true"
                      className="items-center inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-pink-400"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  )} */}
                
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default OTPVerificationModal;
