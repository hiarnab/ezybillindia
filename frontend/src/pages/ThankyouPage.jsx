import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "../api/axios";
import checkImage from "../assets/ThankYou/check .png";
import faildImage from "../assets/ThankYou/cancel.png";
import PandingImage from "../assets/ThankYou/expired.png";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PaymentPdf from "../components/PaymentPdf.jsx";

export default function ThankyouPage() {
  const location = useLocation();
  const { state } = location;
  const [paymentDetails, setPaymentDetails] = useState({ status: null });
  const [error, setError] = useState(null);

  const responseData = state || {};

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (responseData.razorpay_payment_id) {
        try {
          const response = await axios.get(
            `/api/razorpay/paymentDetails/${responseData.razorpay_payment_id}`
          );
          if (response.data.success) {
            // const failddata = response.data.data;
            // failddata.status = "pending";
            setPaymentDetails(response.data.data);
          } else {
            setError("Failed to fetch payment details.");
          }
        } catch (err) {
          setError("Error fetching payment details");
          console.error(err);
        }
      }
    };

    fetchPaymentDetails();
  }, [responseData.razorpay_payment_id]);

  const currentDateTimeFormatted1 = new Date().toLocaleString();

  const currentDateTimeFormatted = (() => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return (
      <>
        <div>{`${day}-${month}-${year}`}</div>
      </>
    );
  })();

  return (

    <div className="container h-[100%] mt-14">
      <div className=" grid grid-cols  place-items-center gap-4">
        <div className="w-[60%] rounded-lg p-10   shadow-lg">
          <div className="w-full">
            {paymentDetails.status === "captured" && (
              <div className="flex justify-center flex-col items-center">
                <img className=" w-[50px] h-[50px]" src={checkImage} alt="" />
                <h1 className="text-center text-[#7e007e] text-3xl mb-6 mt-2 font-[700]">
                  Thank You!
                </h1>
              </div>
            )}
            {paymentDetails.status === "failed" && (
              <div className="flex justify-center flex-col items-center">
                <img className=" w-[50px] h-[50px]" src={faildImage} alt="" />
                <h1 className="text-center text-[#ff3434] text-3xl mb-6 mt-2 font-[700]">
                  Failed !
                </h1>
              </div>
            )}
            {paymentDetails.status === "pending" && (
              <div className="flex justify-center flex-col items-center">
                <img className=" w-[50px] h-[50px]" src={PandingImage} alt="" />
                <h1 className="text-center text-[#7e007e] text-3xl mb-6 mt-2 font-[700]">
                  Your transition is pending
                </h1>
              </div>
            )}
          </div>

          {paymentDetails ? (
            <div className="w-full">
              {/* <h2 className="font-[500] text-[#6f7178]">Payment Details:</h2> */}
              <div className="flex mt-6 justify-between font-[500] text-[#6f7178] ">
                <p>Payment ID:</p>
                <p>{responseData.razorpay_payment_id}</p>
              </div>
              <div className="flex mt-6 justify-between font-[500] text-[#6f7178] ">
                <p>Order ID:</p>
                <p> {responseData.razorpay_order_id}</p>
              </div>
              <div className="flex mt-6 justify-between font-[500] text-[#6f7178] ">
                <p>Date:</p>
                <p> {currentDateTimeFormatted}</p>
              </div>
              <div className="flex mt-6 justify-between font-[500] text-[#6f7178] ">
                <p>Signature:</p>
                <p className="w-[25%] text-nowrap overflow-hidden whitespace-nowrap text-ellipsis">
                  {responseData.razorpay_signature}
                </p>
              </div>
              {/* <div className="flex mt-6 justify-between font-[500] text-[#6f7178] ">
                <p>Payment ID:</p>
                <p>{paymentDetails.id}</p>
              </div> */}
              <div className=" flex mt-6 justify-between font-[700] text-[#212122] ">
                <p>Amount:</p>
                <p>
                  {paymentDetails.amount / 100} {paymentDetails.currency}
                </p>
              </div>
              <div className="flex mt-6 justify-between font-[500] text-[#6f7178] ">
                <p>Status:</p>
                <p>
                  {paymentDetails.status === "captured" && <span>done</span>}
                  {paymentDetails.status === "failed" && <span>failed</span>}
                  {paymentDetails.status === "pending" && <span>panding..</span>}
                  {paymentDetails.status === "null" && (
                    <span>loading.....</span>
                  )}
                </p>
              </div>
              <p className="text-center text-2xl mt-12 font-[700]">
                {paymentDetails.status === "captured" && (
                  <span>Your Payment Was Successful.</span>
                )}
                {paymentDetails.status === "failed" && (
                  <span className="text-[#ff3434]">
                    Your Payment is failed.
                  </span>
                )}
                {paymentDetails.status === "pending" && (
                  <span>Your Payment is panding.</span>
                )}
                {paymentDetails.status === "null" && <span>loading.....</span>}
              </p>
              <div className="w-ful flex justify-center mt-8">
                <Link to="/dashboard/package-plan">
                  <button className="font-[600] text-[#B90FB9] ease-in-out duration-300 px-6 border-[1px] border-[#B90FB9] hover:bg-[#B90FB9] hover:text-white text-medium   py-2 rounded-lg">
                    Back To My Package
                  </button>
                </Link>

                <PDFDownloadLink
                  document={
                    <PaymentPdf
                      paymentDetails={paymentDetails}
                      responseData={responseData}
                      currentDateTimeFormatted1={currentDateTimeFormatted1}
                    />
                  }
                  fileName="payment_receipt.pdf"
                  className="font-[600] text-white bg-[#B90FB9] ease-in-out duration-300 px-6 border-[1px] border-[#B90FB9] hover:bg-[transparent] hover:text-[#B90FB9] text-medium  py-2 rounded-lg ml-4"
                >
                  {({ loading }) =>
                    loading ? "Generating PDF..." : "Print"
                  }
                </PDFDownloadLink>
              </div>

              {/* Add more details as needed */}
            </div>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <p>Loading payment details...</p>
          )}
        </div>
      </div>
    </div>
  );
}
