import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import configData from "../config.json";
import FadeInOut from "./FadeInOut.jsx";
import { FaRedoAlt } from "react-icons/fa"
// import dayjs from "dayjs";
import _ from "lodash";


const PricingUi = () => {

  const accessToken = useSelector(store => store?.login?.userData[0])
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(false)
  const [showLifetimePlan, setShowLifetimePlan] = useState(true);
  const [showSection, setShowSection] = useState(false);
  const [packages, setPackage] = useState([])
  const PropertyNo = useSelector(store => store?.property?.propertyNumber)
  // const [plan, setPlan] = useState([])
  // const [remainingDays, setRemainingDays] = useState(0);
  // const [ setResponseId] = useState("");
  // const [ setResponseState] = useState([]);

  useEffect(() => {
    if (accessToken === "") {
      navigate("/login")
    }
  }, [accessToken, navigate])

  useEffect(() => {
    const getUserData = async () => {
      try {
        const options = {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        }
        const response = await axios.get("/api/user", options);
        setUser(response.data);
        var daySinceModalDisplayed = calculateDaysDifference(response?.data?.LastDateModalDisplayed)
        if ((response?.data.RegEmail == "" || response?.data.RegEmail == null) && daySinceModalDisplayed >= configData.MODAL_REPEAT_DAYS) {
          setOpen(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (!accessToken) {
      navigate("/login")
    } else {
      getUserData()
    }
  }, [accessToken, open])

  useEffect(() => {
    const getPackageData = async () => {
      try {
        const options = {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        }
        const response = await axios.get("/api/package/plan", options);
        // console.log(response.data);
        setPackage(response.data.result.plan.package)
        // setPlan(response.data.result.packages.plan)
      }
      catch (error) {
        console.log(error);
      }
    }
    getPackageData();
  }, [accessToken])

  const discountAmount = (amount, discount) => {
    if (amount && discount) {
      return amount - (amount * (discount / 100));
    }
    return amount;
  }

  // const calculateQuarterlyInvestment = () => {
  //   if (packages) {
  //     const packageData = packages;
  //     const baseCost = packageData.base_cost || 0;
  //     const quaterDisc = packageData.quater_disc || 0;
  //     const quarterlyInvestmentValue = baseCost * 4 * (1 - quaterDisc / 100);
  //     return quarterlyInvestmentValue.toFixed();
  //   }
  //   return "0.00"; 
  // };

  // const calculateAnnualInvestment = () => {
  //   if (packages) {
  //     const packageData = packages;
  //     const baseCost = packageData.base_cost || 0;
  //     const annualDisc = packageData.annual_disc || 0;
  //     const quarterlyInvestmentValue = baseCost * 12 * (1 - annualDisc / 100);
  //     return quarterlyInvestmentValue.toFixed();
  //   }
  //   return "0.00";
  // };
  // const calculatehalfInvestment = () => {
  //   if (packages) {
  //     const packageData = packages;
  //     const baseCost = packageData.base_cost || 0;
  //     const annualDisc = packageData.half_disc || 0;
  //     const quarterlyInvestmentValue = baseCost * 6 * (1 - annualDisc / 100);
  //     return quarterlyInvestmentValue.toFixed();
  //   }
  //   return "0.00";
  // };

  const calculateDaysDifference = (date) => {

    const givenDate = new Date(date);
    const currentDate = new Date();
    const timeDifferenceMs = currentDate - givenDate;
    const daysDifference = timeDifferenceMs / (1000 * 60 * 60 * 24);
    const roundedDaysDifference = Math.floor(daysDifference);

    return roundedDaysDifference;
  }

  // useEffect(() => {
  //   if (plan.expired_at) {
  //     const today = dayjs();
  //     const expiryDate = dayjs(plan.expired_at);
  //     const daysLeft = expiryDate.diff(today, "day");
  //     setRemainingDays(daysLeft);
  //   }
  // }, [plan]);

  const handleButtonClick = (amount, days, id, PropertyNo) => {
    createRazorpayOrder(amount, days, id, PropertyNo);
  };

  const handlePackageClick = (title) => {
    if (title === "life_time_free") {
      setShowLifetimePlan(false);
      setShowSection(true);
    }
  }

  const handleClose = () => {
    setShowSection(false);
    setShowLifetimePlan(true);
  };

  const loadscript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadscript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  const createRazorpayOrder = async (amount, days, id, PropertyNo) => {
    try {
      const data = JSON.stringify({
        amount: amount * 100, // Convert to paise
        currency: "INR",
        days: days,
        cus_id: user.CustomerNo,
        id: id,
        PropertyNo: PropertyNo,
        cusName: user.CustomerName
      });

      const options = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
      };

      const response = await axios.post("/api/razorpay/createOrder", data, options);
      if (response.data.success && response.data.orderData) {
        console.log(response.orderData);
        //setResponseId(response.data.orderData.id); // Adjust based on actual response structure
        openRazorpay(response.data.orderData);
      }
    } catch (error) {
      console.error("Error creating Razorpay order", error);
    }
  };

  const openRazorpay = (order) => {
    const options = {
      key: "rzp_test_6nXXEQu42MJz5M", // Replace with your Razorpay key ID
      amount: order.amount,
      currency: order.currency,
      name: "Your Company Name",
      description: "Test Transaction",
      order_id: order.id,
      handler: function (response) {
        // setResponseId(response.razorpay_payment_id);
        // setResponseState(response.data);
        //alert("Payment Successful");
        navigate("/dashboard/thank-you", { state: response })
      },
      prefill: {
        name: user.CustomerName,
        email: user.RegEmail || null,
        contact: user.RegMobile,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };




  return (
    <>
      {/* exciting price */}
      {/* <div className="container">
        <div className="flex gap-12 items-center justify-center ">
          <div className="rounded-lg  shadow-lg overflow-hidden">
            <div className="w-full text-3xl  text-center bg-[#EAF0FF] justify-center font-[600] text-[#1b1919] ease-in-out duration-300 px-20  py-2 ">
              Activated Plan
            </div>
            <div className="border-b-[1px] w-full p-4">
              <h2 className="text-2xl font-[400] mb-4 text-[#B90FB9]">
                {_.capitalize(plan.type)}
              </h2>
              <h3 className="text-[2.5rem] font-bold mb-4 leading-[24px]">
                ₹{plan.amount} <br />
                <sub className="text-[17px] font-light text-gray-600">
                  Remaining Days: {remainingDays}
                </sub>
              </h3>
            </div>
            <div className="py-6">
              <div className=" px-6 ">
                <ul className="space-y-2 mb-6 pricing_ul">
                  <li className="pb-5 flex relative gap-3 text-[15px] text-[#3F444B] font-[500]  items-center">
                    <span className="fill-[blue] pricing">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                      >
                        <g>
                          <path d="M16 8C16 8.68267 15.1613 9.24533 14.9933 9.87467C14.82 10.5253 15.2587 11.432 14.9293 12.0013C14.5947 12.58 13.588 12.6493 13.1187 13.1187C12.6493 13.588 12.58 14.5947 12.0013 14.9293C11.432 15.2587 10.5253 14.82 9.87467 14.9933C9.24533 15.1613 8.68267 16 8 16C7.31733 16 6.75467 15.1613 6.12533 14.9933C5.47467 14.82 4.568 15.2587 3.99867 14.9293C3.42 14.5947 3.35067 13.588 2.88133 13.1187C2.412 12.6493 1.40533 12.58 1.07067 12.0013C0.741333 11.432 1.18 10.5253 1.00667 9.87467C0.838667 9.24533 0 8.68267 0 8C0 7.31733 0.838667 6.75467 1.00667 6.12533C1.18 5.47467 0.741333 4.568 1.07067 3.99867C1.40533 3.42 2.412 3.35067 2.88133 2.88133C3.35067 2.412 3.42 1.40533 3.99867 1.07067C4.568 0.741333 5.47467 1.18 6.12533 1.00667C6.75467 0.838667 7.31733 0 8 0C8.68267 0 9.24533 0.838667 9.87467 1.00667C10.5253 1.18 11.432 0.741333 12.0013 1.07067C12.58 1.40533 12.6493 2.412 13.1187 2.88133C13.588 3.35067 14.5947 3.42 14.9293 3.99867C15.2587 4.568 14.82 5.47467 14.9933 6.12533C15.1613 6.75467 16 7.31733 16 8Z"></path>
                          <path d="M10.312 5.61587L7.26668 8.6612L5.68802 7.08387C5.52338 6.91932 5.30013 6.82688 5.06735 6.82688C4.83458 6.82688 4.61133 6.91932 4.44668 7.08387C4.28213 7.24851 4.1897 7.47176 4.1897 7.70454C4.1897 7.93731 4.28213 8.16056 4.44668 8.3252L6.66135 10.5399C6.8216 10.6999 7.03885 10.7899 7.26535 10.7899C7.49186 10.7899 7.7091 10.6999 7.86935 10.5399L11.552 6.8572C11.7166 6.69256 11.809 6.46931 11.809 6.23654C11.809 6.00376 11.7166 5.78051 11.552 5.61587C11.4706 5.5344 11.374 5.46977 11.2676 5.42568C11.1612 5.38158 11.0472 5.35889 10.932 5.35889C10.8169 5.35889 10.7028 5.38158 10.5964 5.42568C10.4901 5.46977 10.3934 5.5344 10.312 5.61587Z"></path>
                        </g>
                      </svg>
                    </span>
                    Website Audit Identif opportunities optimization.
                  </li>
                  <li className="pb-5 flex relative gap-3 text-[15px] text-[#3F444B] font-[500]  items-center">
                    <span className="fill-[blue] pricing">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                      >
                        <g>
                          <path d="M16 8C16 8.68267 15.1613 9.24533 14.9933 9.87467C14.82 10.5253 15.2587 11.432 14.9293 12.0013C14.5947 12.58 13.588 12.6493 13.1187 13.1187C12.6493 13.588 12.58 14.5947 12.0013 14.9293C11.432 15.2587 10.5253 14.82 9.87467 14.9933C9.24533 15.1613 8.68267 16 8 16C7.31733 16 6.75467 15.1613 6.12533 14.9933C5.47467 14.82 4.568 15.2587 3.99867 14.9293C3.42 14.5947 3.35067 13.588 2.88133 13.1187C2.412 12.6493 1.40533 12.58 1.07067 12.0013C0.741333 11.432 1.18 10.5253 1.00667 9.87467C0.838667 9.24533 0 8.68267 0 8C0 7.31733 0.838667 6.75467 1.00667 6.12533C1.18 5.47467 0.741333 4.568 1.07067 3.99867C1.40533 3.42 2.412 3.35067 2.88133 2.88133C3.35067 2.412 3.42 1.40533 3.99867 1.07067C4.568 0.741333 5.47467 1.18 6.12533 1.00667C6.75467 0.838667 7.31733 0 8 0C8.68267 0 9.24533 0.838667 9.87467 1.00667C10.5253 1.18 11.432 0.741333 12.0013 1.07067C12.58 1.40533 12.6493 2.412 13.1187 2.88133C13.588 3.35067 14.5947 3.42 14.9293 3.99867C15.2587 4.568 14.82 5.47467 14.9933 6.12533C15.1613 6.75467 16 7.31733 16 8Z"></path>
                          <path d="M10.312 5.61587L7.26668 8.6612L5.68802 7.08387C5.52338 6.91932 5.30013 6.82688 5.06735 6.82688C4.83458 6.82688 4.61133 6.91932 4.44668 7.08387C4.28213 7.24851 4.1897 7.47176 4.1897 7.70454C4.1897 7.93731 4.28213 8.16056 4.44668 8.3252L6.66135 10.5399C6.8216 10.6999 7.03885 10.7899 7.26535 10.7899C7.49186 10.7899 7.7091 10.6999 7.86935 10.5399L11.552 6.8572C11.7166 6.69256 11.809 6.46931 11.809 6.23654C11.809 6.00376 11.7166 5.78051 11.552 5.61587C11.4706 5.5344 11.374 5.46977 11.2676 5.42568C11.1612 5.38158 11.0472 5.35889 10.932 5.35889C10.8169 5.35889 10.7028 5.38158 10.5964 5.42568C10.4901 5.46977 10.3934 5.5344 10.312 5.61587Z"></path>
                        </g>
                      </svg>
                    </span>
                    Website Audit Identif opportunities optimization.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-lg  shadow-lg  py-8 px-12 h-fit">
            <div className="flex justify-between items-center gap-28 ">
              <div>
                <h2 className="text-2xl font-[600] mb-4 text-[#2e1f2e]">
                  Ready to take the next step?
                </h2>
                <p className="mb-6 text-[15px] text-[#3F444B] font-[500]">
                  Join us today and make a difference!
                </p>
              </div>
              <button className="font-[600] bg-[#B90FB9] text-white ease-in-out duration-300 px-20 border-[1px] border-[#B90FB9] hover:bg-slate-100 hover:text-[#B90FB9]  py-2 rounded-lg">
                Renew Your packege
              </button>
            </div>
          </div>
        </div>
      </div> */}

      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* main price */}
        <div className="grid place-content-center grid-cols-1 md:grid-cols-4 gap-8 p-4">
          {packages &&
            packages.map((pkg) => {
              // Calculate the discount percentage
              const discountedAmount = discountAmount(pkg.amount, pkg.discount);

              return (
                <React.Fragment key={pkg.id}>
                  {pkg.title === "life_time_free" && showLifetimePlan ? (
                    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                      <div className=" w-full">
                        <h2 className="text-3xl text-center font-[700] mb-4 text-[#B90FB9]  capitalize">
                          {/* {_.capitalize(pkg.title)} Plan */} free plan
                        </h2>
                        {/* <h3 className="text-[2.5rem] font-bold mb-4 leading-[24px]">
                        &#8377;{discountedAmount.toFixed(2)} <br />
                        <sub className="text-[17px] font-light text-gray-600">
                          /Month
                        </sub>
                      </h3> */}
                        {discountedAmount > 0 && (
                          <>
                            <p className="text-green-600 font-bold">
                              {pkg.discount}% OFF
                            </p>
                            <p className="text-gray-600 line-through">
                              &#8377;{pkg.amount}
                            </p>
                          </>
                        )}
                      </div>

                      <div className="py-6">
                        <div className="w-full flex justify-center">
                          <button
                            className="font-[600] text-[#B90FB9] ease-in-out duration-300 px-4 border-[1px] border-[#B90FB9] hover:bg-[#B90FB9] hover:text-white py-2 rounded-lg"
                            onClick={() => handlePackageClick(pkg.title)}
                          >
                            Pick This Package
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : pkg.title !== "life_time_free" ? (
                    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                      <div className="border-b-[1px] w-full">
                        <h2 className="text-2xl font-[400] mb-4 text-[#B90FB9] capitalize ">
                          {_.capitalize(pkg.title)} Plan
                        </h2>
                        <h3 className="text-[2.5rem] font-bold mb-4 leading-[24px]">
                          &#8377;{discountedAmount.toFixed(2)} <br />
                          <sub className="text-[17px] font-light text-gray-600">
                            /Month
                          </sub>
                        </h3>
                        {discountedAmount > 0 && (
                          <>
                            <p className="text-green-600 font-bold">
                              {pkg.discount}% OFF
                            </p>
                            <p className="text-gray-600 line-through">
                              &#8377;{pkg.amount}
                            </p>
                          </>
                        )}
                      </div>

                      <div className="py-6">
                        <div className="w-full flex justify-center">
                          <button
                            className="font-[600] text-[#B90FB9] ease-in-out duration-300 px-4 border-[1px] border-[#B90FB9] hover:bg-[#B90FB9] hover:text-white py-2 rounded-lg"
                            onClick={() =>
                              handleButtonClick(
                                discountedAmount.toFixed(2),
                                pkg.days,
                                pkg.id,
                                PropertyNo
                              )
                            }
                          >
                            Pick This Package
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </React.Fragment>
              );
            })}
        </div>
        {showSection && (
          <FadeInOut duration={1500}>
            <div className="mt-12 col-span rounded-lg shadow-lg py-8 px-12 border-[1px] border-[#2e1f2e1f] h-fit">
              <div className="flex justify-between align-items-center gap-28">
                <div className="flex">
                  <FaRedoAlt size={50} color="#9D3488" />
                  <h2 className="text-3xl font-[700] px-4 capitalize text-[#2e1f2e]">
                  For Our RMS/HMS Users, It&apos;s Absolutely Free.
                  </h2>
                  {/* <p className="mb-6 text-[15px] text-[#3F444B] font-[500]">
                  For Our RMS/HMS Users, It&apos;s Absolutely Free.
                  </p> */}
                </div>
                <button
                  className="font-[600] bg-[#B90FB9] text-white ease-in-out duration-300 px-4 border-2 border-[#B90FB9] hover:bg-slate-100 hover:text-[#B90FB9] py-2 rounded-lg"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </FadeInOut>
        )}
      </div>
    </>
  );
};

export default PricingUi
