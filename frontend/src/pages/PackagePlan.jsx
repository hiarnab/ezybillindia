import React, { useEffect, useState } from "react";
import { FaRedoAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import dayjs from "dayjs";
import _ from "lodash";


export default function PackagePlan() {

  const accessToken = useSelector(store => store?.login?.userData[0]);
  const navigate = useNavigate();
  const [plan, setPlan] = useState([])
  const [remainingDays, setRemainingDays] = useState(0);
  const PropertyNo = useSelector(store => store?.property?.propertyNumber)




  useEffect(() => {
    if (accessToken === "") {
      navigate("/login")
    }
  }, [accessToken, navigate])

  useEffect(() => {
    const getPackageData = async () => {
      try {
        const options = {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        }
        const response = await axios.get(`/api/package/${PropertyNo}`, options);
        // console.log(response.data);
        //setPackage(response.data.result.packages.package[0])
        setPlan(response.data.result.packages.plan)
      }
      catch (error) {
        console.log(error);
      }
    }
    getPackageData();
  }, [accessToken])

  useEffect(() => {
    if (plan?.expired_at) {
      const today = dayjs();
      const expiryDate = dayjs(plan.expired_at);

      if (expiryDate.isAfter(today)) {
        const daysLeft = expiryDate.diff(today, "day");
        setRemainingDays(daysLeft);
      } else {
        setRemainingDays(0);
      }
    } else {
      setRemainingDays(0);
    }
  }, [plan]);

  const handleButtonClick = () => {
    navigate("/dashboard/package-renewal");
  };

  function formatDate(isoString) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <>
      <div className="container h-[100%] mt-14">
        <div className=" grid grid-cols  place-items-center gap-4">
          <div className=" w-[60%] col-span rounded-lg  shadow-lg overflow-hidden">
            <div className="w-full border-b-[1px] pb-4  text-3xl  text-center justify-center font-[700] text-[#1b1919] ease-in-out duration-300 px-20   ">
              Your Activated Plan
            </div>
            <div className="border-b-2 w-full px-6 pt-4 pb-6">
              {/* <h2 className="text-5xl font-[700] mb-1 text-[#B90FB9]">
                {_.capitalize(plan.type)} <span>Plan</span>
              </h2> */}
              {/* <h2 className="text-3xl font-[700] text-[#B90FB9] mb-1 ">Plan Type <span className="text-[#B90FB9]"> ( {plan?.expired_at && new Date(plan?.expired_at) < new Date() ? "Expired" : _.capitalize(plan.type)} ) </span></h2> */}
              {/* <h3 className="text-5xl font-bold mb-4 leading-[24px]">
                ₹{plan.amount}
              </h3> */}
              <p className=" mt-3 text-[17px] font-[700] text-[#7e007e] ">
                Remaining Days: {remainingDays}
              </p>
              <p className="mt-2 text-xl font-[600]  text-gray-600">
                Start Date: <span className="text-gray-600 text-lg">
                  {formatDate(plan.start_date)}
                </span>
              </p>
              <p className="mt-1 text-xl font-[600]  text-gray-600">
                End Date: <span className="text-gray-600 text-lg font-[600]">
                  {plan?.expired_at == null ? "Free" : formatDate(plan.expired_at)}
                </span>
              </p>
            </div>
            {/* <div className="py-6">
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
            </div> */}
          </div>
          <div className="mt-12 col-span rounded-lg border-[1px] border-[#2e1f2e1f]  shadow-lg  py-8 px-12 h-fit">
            <div className="flex justify-between items-center  ">
              <div>
                <FaRedoAlt size={50} color="#9D3488" />
                <h2 className="text-3xl font-[700] w-[90%] capitalize  mt-4 mb-2 text-[#2e1f2e]">
                Keep your property Cloud Menu running seamlessly
                </h2>
                <p className="mb-6 text-[15px] mt-4 text-[#3F444B] font-[500]">
                Renew your EzyBill Cloud Menu package and get exciting discounts now!
                </p>
              </div>
              <button
                className="font-[600] bg-[#B90FB9] whitespace-nowrap text-white text-[1rem] ease-in-out duration-300 px-4 border-2 border-[#B90FB9] hover:bg-slate-100 hover:text-[#B90FB9]  py-2 rounded-lg"
                onClick={handleButtonClick}
              >
                Renew Your Package
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
