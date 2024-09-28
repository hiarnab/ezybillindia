import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToolsPage() {
  const accessToken = useSelector((store) => store?.adminlogin?.adminData[0]);
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [propertyData, setPropertyData] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [rmsCustId, setrmsCustId] = useState(false);
  const [rmsPropId, setrmsPropId] = useState(false);
  // const [showInputFields, setShowInputFields] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      navigate("/admin/login");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const getCustomerData = async () => {
      try {
        const options = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axios.get("/api/tools/customer", options);
        setCustomerData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getCustomerData();
  }, [accessToken]);

  useEffect(() => {
    const getPropertyData = async () => {
      if (!selectedCustomer) return;

      try {
        const options = {
          params: { selectedCustomer },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axios.get("/api/tools/property", options);
        setPropertyData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };
    getPropertyData();
  }, [selectedCustomer, accessToken]);

  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
    setSelectedProperty("");
    // setShowInputFields(false);
    setrmsCustId(false);
    setrmsPropId(false);
  };

  const handlePropertyChange = (event) => {
    const selectedProp = event.target.value;
    setSelectedProperty(event.target.value);
    // console.log(selectedProp);
    // setShowInputFields(false);
    const property = propertyData.find(
      (prop) => prop.PropertyNo.toString() === selectedProp
    );
    console.log(property);
    if (property) {
      setrmsCustId(property.rms_cust_id || "");
      setrmsPropId(property.rms_prop_id || "");
    }
  };

  // const handleButtonClick = () => {
  //   setShowInputFields(true);
  // };

  const handelchangermspropid = (e) => {
    const value = e.target.value;
    const numericValue = Number(value);

    if (value === "") {
      setrmsPropId(value);
      // setrmsCustId(value);
    } else if (numericValue > 0 && !isNaN(numericValue)) {
      setrmsPropId(value);
      // setrmsCustId(value);
    } else if (numericValue === 0) {
      alert("Zero is not allowed.");
      e.target.value = "";
    } else {
      alert("Please enter a valid number.");
    }
  };

  const handelchangermscustid = (e) => {
    const value = e.target.value;
    const numericValue = Number(value);

    if (value === "") {
      // setrmsPropId(value);
      setrmsCustId(value);
    } else if (numericValue > 0 && !isNaN(numericValue)) {
      // setrmsPropId(value);
      setrmsCustId(value);
    } else if (numericValue === 0) {
      alert("Zero is not allowed.");
      e.target.value = "";
    } else {
      alert("Please enter a valid number.");
    }
  };

  const updatealert = (event) => {
    event.preventDefault();
    if (!rmsCustId || !rmsPropId) {
      alert("Please fill in both fields.");
      return;
    }
    const message = "Are you sure you want to update";
    const confirm = window.confirm(message);
    if (confirm) {
      handleUpdateClick(event);
    }
    // setShowInputFields(false);
  };

  const handleUpdateClick = async () => {
    try {
      if ((rmsCustId && !rmsPropId) || (!rmsCustId && rmsPropId)) {
        console.error("Both fields must have a value or both must be empty.");
        return;
      }

      const payload = {
        rmsCustId,
        rmsPropId,
        propertyNo: selectedProperty,
      };

      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.post(
        "/api/tools/update/property",
        payload,
        options
      );
      console.log(response.data);

      if (response.status === 200) {
        toast.success("All data updated successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error("Failed to update some packages", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="w-full">
        <h1 className="text-center mt-4  text-4xl font-bold text-[#7E007F]">
          Welcome to Tool Setting
        </h1>
        <div className="mt-6 text-center">
          <label
            htmlFor="customer-select"
            className="text-lg font-semibold text-[#3A3939]  "
          >
            Select a Customer:
          </label>

          <select
            id="customer-select"
            value={selectedCustomer}
            onChange={handleCustomerChange}
            className="ml-2 p-2 border rounded focus:outline-[#7E007F] focus:outline-2"
          >
            <option value="">-- Select a Customer --</option>
            {customerData.map((customer) => (
              <option key={customer.CustomerNo} value={customer.CustomerNo}>
                {customer.CustomerName}
              </option>
            ))}
          </select>
        </div>

        {selectedCustomer && (
          <div className="mt-6 text-center">
            <label
              htmlFor="property-select"
              className="text-lg font-semibold text-[#3A3939]  "
            >
              Select a Property:
            </label>
            <select
              id="property-select"
              value={selectedProperty}
              onChange={handlePropertyChange}
              className="ml-2 p-2 border rounded focus:outline-[#7E007F] focus:outline-2 arrow-[red] focus:arrow-[#007E00]"
            >
              <option value="">-- Select a Property --</option>
              {propertyData.map((property) => (
                <option key={property.PropertyNo} value={property.PropertyNo}>
                  {property.PropName}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* {selectedProperty && (
          <div className="mt-6 text-center">
            <button
              onClick={handleButtonClick}
              className="p-2 px-6 bg-[#7E007F] text- text-white rounded"
            >
              Ok
            </button>
          </div>
        )} */}

        {selectedProperty && (
          <div className="mt-6 text-center">
            <input
              type="number"
              placeholder="EZB Customer ID"
              value={rmsCustId}
              // onChange={(e) => setrmsCustId(e.target.value)}
              onChange={handelchangermscustid}
              className="p-2 border rounded mb-4 focus:outline-[#7E007F] focus:outline-2"
            />
            <br />
            <input
              type="number"
              placeholder=" EZB Property ID"
              value={rmsPropId}
              onChange={handelchangermspropid}
              // onChange={(e) => setrmsPropId(e.target.value)}
              className="p-2 border rounded focus:outline-[#7E007F] focus:outline-2"
            />
            <br />
            <button
              onClick={updatealert}
              className="mt-4 p-2 px-6 bg-[#7E007F] text- text-white rounded"
            >
              Update
            </button>
          </div>
        )}
      </div>
    </>
  );
}
