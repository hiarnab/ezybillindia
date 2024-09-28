import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import TableComponent from "../../components/Table/TableComponent.jsx";
import Pagination from "../../components/Table/Pagination.jsx";
let PageSize = 10;

const menuPage = () => {
  const accessToken = useSelector((store) => store?.adminlogin?.adminData[0]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log(accessToken);
    if (!accessToken) {
      navigate("/admin/login");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const getPropertyData = async () => {
      try {
        const options = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axios.get("", options);
        console.log("API Response:", response.data);
        const flattenedData = response.data.flat();
        setData(flattenedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (accessToken) {
      getPropertyData();
    }
  }, [accessToken]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

  return (
    <>
      <div className="container m-auto">
        <div className=" mb-5 overflow-hidden rounded-2xl  ">
          <table className="min-w-full bg-white shadow-md ">
            <thead className="bg-[#800080] text-[white]">
              <tr>
                <th className="whitespace-normal px-4 py-3">Product Name</th>
                <th className="whitespace-normal px-4 py-3">Unit Price</th>
                <th className="whitespace-normal px-4 py-3">Unit</th>
                <th className="whitespace-normal px-4 py-3">SGSTPC</th>
                <th className="whitespace-normal px-4 py-3">CGSTPC</th>
                <th className="whitespace-normal px-4 py-3">ShName</th>
                <th className="whitespace-normal px-4 py-3">Action</th>
              </tr>
            </thead>
            {/* <tbody className="divide-y divide-gray-200">
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="whitespace-normal px-4 py-3 text-center text-gray-700">{item.PropName}</td>
                    <td className="whitespace-normal px-4 py-3 text-center text-gray-700">{item.PropType}</td>
                    <td className="whitespace-normal px-4 py-3 text-center text-gray-700">{item.CustomerName}</td>
                    <td className="whitespace-normal px-4 py-3 text-center text-gray-700">{item.PropPhone}</td>
                    <td className="whitespace-normal px-4 py-3 text-center text-gray-700">{item.PropEmail}</td>
                    <td className="whitespace-normal px-4 py-3 text-center text-gray-700">{item.PropState}</td>
                  </tr>
                ))}
              </tbody> */}
            <tbody className="divide-y divide-gray-200">
              {currentTableData?.map((data) => (
                <tr key={data} className="hover:dark:hover:bg-gray-600">
                  <TableComponent
                    currentTableData={currentTableData}
                    data={data}
                  />
                </tr>
              ))}
            </tbody>
          </table>
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
    </>
  );
};

export default menuPage;
