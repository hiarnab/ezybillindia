import React, { useState } from "react";
import Modal from "../../components/modal/Modal.jsx";

import { PDFDownloadLink } from "@react-pdf/renderer";
import TransactionPdf from "../../components/TransactionPdf.jsx";


function formatDate(isoString) {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return (
    <>
      <div>{`${year}-${month}-${day}`}</div>
      <div>{`${hours}:${minutes}`}</div>
    </>
  );
}

function PaymentDataTable({ data }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <td className="whitespace-normal px-1 py-3 text-center text-gray-700">
        {data.CustomerName}
      </td>
      <td className="whitespace-normal px-1 py-3 text-center text-gray-700">
        {data.PropName}
      </td>
      <td className="whitespace-normal px-1 py-3 text-center text-gray-700">
        {data.RegMobile}
      </td>
      <td className="whitespace-normal px-1 py-3 text-center text-gray-700">
        {data.amount} INR
      </td>
      <td className="whitespace-normal px-1 py-3 text-center text-gray-700">
        {data.property_id}
      </td>
      <td className="whitespace-normal px-1 py-3 text-center text-gray-700">
        {data.payment_method}
      </td>
      <td className="whitespace-normal px-1 py-3 text-center text-gray-700">
        {data.gateway_txn}
      </td>
      <td className="whitespace-normal px-1 py-3 text-center text-gray-700">
        {data.rnn}
      </td>
      {/* <td>{JSON.parse(data.Json_response).status}</td> */}
      <td className="whitespace-normal px-1 py-3 text-center text-gray-700">
        {formatDate(data.created_at)}{" "}
      </td>
      <td>
        <button
          type="button"
          className="w-full p-2 bg-[#800080] text-white px-2 py-2 rounded "
          onClick={() => setModalIsOpen(!modalIsOpen)}
        >
          view
        </button>
        {modalIsOpen && (
          <Modal onClose={closeModal}>
            <div className="w-full">
              <h2 className="font-poppins text-center text-xs md:text-2xl font-bold text-[#7E007E] capitalize">payment details</h2>
              <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
                <p>Payment ID</p>
                <p> {data.id}</p>
              </div>
              <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
                <p>Customer Name</p>
                <p>{data.CustomerName}</p>
              </div>
              <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
                <p>Property Name</p>
                <p>{data.PropName}</p>
              </div>
              <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
                <p>Amount </p>
                <p>{data.amount} INR</p>
              </div>
              <div className="flex mt-2 justify-between font-[500] text-[#6f7178] "></div>
              <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
                <p>Transaction Number </p>
                <p>{data.transaction_no}</p>
              </div>
              <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
                <p>Payment Method</p>
                <p> {data.payment_method}</p>
              </div>
              <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
                <p>Gateway Transaction ID</p>
                <p>{data.gateway_txn}</p>
              </div>
              <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
                <p>RNN</p>
                <p> {data.rnn}</p>
              </div>
              <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
                <p>Created At</p>
                <p> {formatDate(data.created_at)} </p>
              </div>
              <div className="w-full flex justify-center">
                {/* <button className="font-[600] text-white bg-[#B90FB9] ease-in-out duration-300 px-6 border-[1px] border-[#B90FB9] hover:bg-[transparent] hover:text-[#B90FB9] text-medium  py-2 rounded-lg ml-4"> */}
                <PDFDownloadLink
                  document={<TransactionPdf data={data} />}
                  fileName="payment_receipt.pdf"
                  className="font-[600] text-white bg-[#B90FB9] ease-in-out duration-300 px-6 border-[1px] border-[#B90FB9] hover:bg-[transparent] hover:text-[#B90FB9] text-medium  py-2 rounded-lg ml-4"
                >
                  {({ loading }) => (loading ? "Generating PDF..." : "Print")}
                </PDFDownloadLink>
                {/* Print */}
                {/* </button> */}
              </div>
            </div>
          </Modal>
        )}
      </td>
    </>
  );
}

export default PaymentDataTable;
