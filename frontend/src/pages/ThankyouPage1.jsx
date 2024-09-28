import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import axios from "../api/axios";

export default function ThankyouPage() {

  const location = useLocation();
  const { state } = location;
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (state && state.razorpay_payment_id) {
      
      const fetchPaymentDetails = async () => {
        try {
          const response = await axios.get(`/paymentDetails/${state.razorpay_payment_id}`);
          setPaymentDetails(response.data);
        } catch (err) {
          setError("Error fetching payment details");
          console.error(err);
        }
      };

      fetchPaymentDetails();
    }
  }, [state]);

  if (error) return <div>{error}</div>;


  return (
    <>
      <h1>Thank You!</h1>
      <p>Your payment was successful.</p>
      {paymentDetails ? (
        <div>
          <h2>Payment Details:</h2>
          <p><strong>Payment ID:</strong> {paymentDetails.id}</p>
          <p><strong>Amount:</strong> {paymentDetails.amount/100} {paymentDetails.currency}</p>
          <p><strong>Status:</strong> {paymentDetails.status}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading payment details...</p>
      )}
    </>
  )
}
