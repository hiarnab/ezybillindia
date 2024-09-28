import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import TableComponent from "../../components/Table/TableComponent.jsx";
import Pagination from "../../components/Table/Pagination.jsx";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
let PageSize = 10;
const PropertyPage = () => {
  const accessToken = useSelector((store) => store?.adminlogin?.adminData[0]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);



  useEffect(() => {
    // console.log(accessToken);
    if (!accessToken) {
      navigate("/admin/login");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const getPropertyData = async () => {
      try {
        const options = {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        };
        const response = await axios.get("/api/admin/property", options);
        // console.log("API Response:", response.data);
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

  const confirmDisableProperty = (propertyNo) => {
    const isActive = data?.propertyIsActive === 1;
    const message = `Are you sure you want to ${isActive ? "disable" : "enable"} this property?`;
  
    // Use native confirm dialog
    const confirmed = window.confirm(message);
  
    if (confirmed) {
      handleDisableAccount(propertyNo);
    }
  };


  const handleDisableAccount = async (PropertyNo) => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const disableAcc = await axios.get(`api/disableacc/${PropertyNo}`, options);
      console.log(disableAcc);
      if (disableAcc.data.success) {
        await fetchUpdatedProperties();
      }
    } catch (error) {
      console.error("Error updating package status:", error);
    }
  };

  const lifeTimeFree = (propertyNo) => {
    const isActive = data?.propertyIsActive === null;
    const message = `Are you sure you want to ${isActive ? "disable" : "enable"} life time free?`;
  
    // Use native confirm dialog
    const confirmed = window.confirm(message);
  
    if (confirmed) {
      handleLifetimeFree(propertyNo);
    }
  };

  const handleLifetimeFree = async (PropertyNo) => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const disableAcc = await axios.get(`api/lifetimefree/${PropertyNo}`, options);
      console.log(disableAcc);
      if (disableAcc.data.success) {
        await fetchUpdatedProperties();
      }
    } catch (error) {
      console.error("Error updating package status:", error);
    }
  };

  const fetchUpdatedProperties = async () => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const updatedProperties = await axios.get("/api/admin/property", options);
      const flattenedData = updatedProperties.data.flat();
      setData(flattenedData);
    } catch (error) {
      console.error("Error fetching updated properties:", error);
    }
  };



  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);




  return (
    <>
      <div className="container m-auto">
        <div className=" mb-[80px]">
          <table className="min-w-full bg-white shadow-md rounded-2xl">
            <thead className="bg-[#800080] text-[white]">
              <tr>
                <th className="whitespace-normal px-4 py-3">Property Name</th>
                <th className="whitespace-normal px-4 py-3">Type</th>
                <th className="whitespace-normal px-4 py-3">Customer Name</th>
                <th className="whitespace-normal px-4 py-3">Phone</th>
                <th className="whitespace-normal px-4 py-3">Email</th>
                <th className="whitespace-normal px-4 py-3">State</th>
                <th className="whitespace-normal px-4 py-3">Status</th>
                <th className="whitespace-normal px-4 py-3">Plan</th>
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
                    lifeTimeFree={lifeTimeFree}
                    confirmDisableProperty={confirmDisableProperty}
                    handleLifetimeFree={handleLifetimeFree}
                    fetchUpdatedProperties={fetchUpdatedProperties}

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

export default PropertyPage;
