import React, { useEffect, useState } from "react"
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";
import { isNumberKey, validateNumber } from "../../utils/TextValidations";


export default function SettingPage() {
  const accessToken = useSelector((store) => store?.adminlogin?.adminData[0]);
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/admin/login");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const options = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axios.get("/api/admin/setting", options);
        console.log("API Response:", response.data);
        setPackages(response.data); // Set the packages state with the API response
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (accessToken) {
      getProfileData();
    }
  }, [accessToken]);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const updatedPackages = [...packages];
    updatedPackages[index] = { ...updatedPackages[index], [name]: value };
    setPackages(updatedPackages);
  };

  const confirmDisableProperty = (event) => {
    event.preventDefault();
    const message = "Are you sure you want to Update?";
  
    // Use native confirm dialog
    const confirmed = window.confirm(message);
  
    if (confirmed) {
      handleSubmit(event);
    }
  };

  const handleSubmit = async () => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Content-Type": "application/json",
        },
      };
  
      const response = await axios.put("/api/update/batch", { packages }, options);
  
      if (response.status === 200) {
        toast.success("All packages updated successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error("Failed to update some packages", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Failed to update data");
    }
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="flex flex-col px-0 md:px-6 mt-3 md:mt-0 justify-center items-center">
        <form
          onSubmit={confirmDisableProperty}
          className="rounded-md px-2 md:px-6 py-6 shadow-xl mt-12 w-4/5"
        >
          <div className="px-6 text-center">
            <h1 className="text-[35px] font-semibold text-[#464646] font-jost">
              Update Package Details
            </h1>
          </div>
          {packages.map((pkg, index) => (
            <div key={pkg.id} className="flex flex-col mb-6 mt-3 md:mt-3">
              <div className="w-full mb-6 md:mb-0 px-2 md:mt-6">
                <label className="block tracking-wide text-[#464646] text-[20px] font-medium mb-2 font-jost">
                  {_.capitalize(pkg.title)}:
                </label>
                <label htmlFor={`days-${index}`} className="">
                  Enter days
                </label>
                <input
                  className="bg-gray-50 block border-2 border-[#DDDDDD] rounded-md focus:outline-none 
                    focus:shadow-lg focus:shadow-[#800080]-500/50 focus:border-2 focus:border-[#800080] w-full px-2.5 h-[42px]"
                  required
                  name="days"
                  placeholder={`Enter ${pkg.title} days`}
                  value={pkg.days}
                  onInput={(e)=>validateNumber(e.target.value)}
                  onChange={(event) => handleChange(event, index)}
                />
                <div className="mt-2">
                  <label htmlFor={`amount-${index}`} className="">
                    Enter Amount
                  </label>
                  <input
                    className="bg-gray-50 block border-2 border-[#DDDDDD] rounded-md focus:outline-none 
                    focus:shadow-lg focus:shadow-[#800080]-500/50 focus:border-2 focus:border-[#800080] w-full px-2.5 h-[42px] mt-1"
                    required
                    name="amount"
                    placeholder={`Enter ${pkg.title} amount`}
                    value={pkg.amount}
                    onInput={(e)=>isNumberKey(e.target.value)}
                    onChange={(event) => handleChange(event, index)}
                  />
                </div>
                <div className="mt-2">
                  <label htmlFor={`discount-${index}`} className="">
                    Enter discount
                  </label>
                  <input
                    className="bg-gray-50 block border-2 border-[#DDDDDD] rounded-md focus:outline-none 
                    focus:shadow-lg focus:shadow-[#800080]-500/50 focus:border-2 focus:border-[#800080] w-full px-2.5 h-[42px] mt-1 "
                    required
                    name="discount"
                    placeholder={`Enter ${pkg.title} discount`}
                    value={pkg.discount}
                    onInput={(e)=>isNumberKey(e.target.value)}
                    onChange={(event) => handleChange(event, index)}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="flex gap-2 items-center justify-evenly">
            <button
              type="submit"
              className="px-4 py-2 bg-[#800080] text-white rounded-md"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
}