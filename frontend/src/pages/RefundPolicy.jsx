import React from "react";
import Footer from "../components/homepage/Footer.jsx";
import Navbar from "../components/homepage/Navbar.jsx";


const RefundPolicy = () => {
  return (
    <>
      <Navbar />
      <p className="text-[#B0138D] text-md md:text-[20px] font-semibold p-4">
          Refund Policy
      </p>
      <p className="text-[#1B152B] text-sm flex flex-col px-2 md:p-4 items-center justify-center">
          We understand that circumstances may
          arise where a refund is necessary. Our refund policy ensures that
          customers can request a refund within 7 days of their payment, subject to
          the following conditions: Refund Request: To initiate a refund, customers
          must contact our customer support team within the specified 3-day period.
      </p>
      <p className="text-[#B0138D] text-md md:text-[20px] font-semibold p-4">
          Reason Basis
      </p>
      <p className="text-[#1B152B] text-sm flex flex-col px-2 md:p-4 py-5  justify-center">
          Refunds will be processed based on the reasons provided by the customer. We appreciate your feedback and value your input in
          improving our services.</p>
      <p className="text-[#B0138D] text-md md:text-[20px] font-semibold p-4">
          Timely Processing
      </p>
      <p className="text-[#1B152B] text-sm flex mb-2 flex-col px-2 md:p-4 items-center justify-center">
          We strive to process refunds
          promptly once the request is received and approved. Please allow for
          processing time, and we appreciate your patience in this regard. For any
          refund-related inquiries or assistance, please reach out to our customer
          support team, who will be happy to guide you through the process.
          
      </p>
      <Footer />
    </>
  );
};

export default RefundPolicy;