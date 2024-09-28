import React, { useEffect,  useState, useMemo } from "react";
import axios from "../api/axios";
import {useSelector } from "react-redux";
// import Pagination from "../components/Table/Pagination"

import PaymentDataTable from "./admin/PaymentDataTable.jsx";
import Pagination from "../components/Table/Pagination.jsx";


let PageSize = 10;
export default function Payments() {
  const accessToken = useSelector((store) => store?.login?.userData[0]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // const [data, setData] = useState([]);
  
  // Fetch payment details
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const options = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          },
        };
        const response = await axios.get("/api/user/payment", options);
        const flattenedData = response.data.flat();
        console.log(flattenedData);
        setData(flattenedData);
        if (response.data) {
          setData(response.data); // Assuming response.data is the array of payments
        } else {
          setError("Failed to fetch payments.");
        }
      } catch (err) {
        setError("Error fetching payments");
        console.error(err);
      }
    };

    fetchPayments();
  }, []);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

  
  return (
    <div>
      
      {error && <p>{error}</p>}
      <h1 className="text-3xl  text-center mb-6 font-[700] text-[#1b1919]">My Payment Transactions</h1>
      <div className="items-center mx-auto">
        <div className="container m-auto">
          <div className=" mb-5 overflow-hidden rounded-2xl  ">
            <table className="min-w-full  shadow-2xl ">
              <thead className="bg-[#800080] text-[white]">
                <tr>
                  <th className="whitespace-normal px-1 py-3">Customer Name</th>
                  <th className="whitespace-normal px-1 py-3">Property Name</th>
                  <th className="whitespace-normal px-1 py-3">Phone number</th>
                  <th className="whitespace-normal px-1 py-3">Amount</th>
                  <th className="whitespace-normal px-1 py-3">
                    Transaction Number
                  </th>
                  <th className="whitespace-normal px-1 py-3">
                    Payment Method
                  </th>
                  <th className="whitespace-normal px-1 py-3">
                    Gateway Transaction ID
                  </th>
                  <th className="whitespace-normal px-1 py-3">RNN</th>
                  {/* <th>Status</th> */}
                  <th>Created At</th>
                  <th className="whitespace-normal px-1 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentTableData.map((data) => (
                  <tr key={data} className="hover:dark:hover:bg-gray-600">
                    <PaymentDataTable
                      currentTableData={currentTableData}
                      data={data}
                    />
                  </tr>
                ))}
                {/* {payments.map((payment) => (
                  <tr className="hover:dark:hover:bg-gray-600" key={payment.id}>
                    <td className="whitespace-normal px-1 py-3 text-center text-gray-700">{payment.id}</td>
                    <td className="whitespace-normal px-1 py-3 text-center text-gray-700">{payment.cus_id}</td>
                    <td className="whitespace-normal px-1 py-3 text-center text-gray-700">{payment.amount} INR</td>
                    <td className="whitespace-normal px-1 py-3 text-center text-gray-700">{payment.transaction_number}</td>
                    <td className="whitespace-normal px-1 py-3 text-center text-gray-700">{payment.payment_method}</td>
                    <td className="whitespace-normal px-1 py-3 text-center text-gray-700">{payment.gateway_txn_id}</td>
                    <td className="whitespace-normal px-1 py-3 text-center text-gray-700">{payment.Rnn}</td>
                    <td>{JSON.parse(payment.Json_response).status}</td>
                    <td>{new Date(payment.created_at).toLocaleString()}</td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        {data && (
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={data.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  );
}
