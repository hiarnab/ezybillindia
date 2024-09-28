import React, { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../../api/axios";
import { SlArrowRight } from "react-icons/sl";

function DashboardM() {
  const accessToken = useSelector((store) => store?.adminlogin?.adminData[0]);
  const [report, setReport] = useState([])
  const [inactive, setInactive] = useState([])
  const [renew, setRenew] = useState([])
  const [todaypay, setTodaypay] = useState([])
  const [thisweekpay, setThisWeekPay] = useState([])
  const [thismonthpay, setThisMonthPay] = useState([])
  const navigate = useNavigate();

  // This is for active data
  useEffect(() => {
    const getdashboardData = async () => {
      try {
        const options = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        
        const response = await axios.get("/api/dashboard", options);
        // console.log("API Response:", response.data);
        const flattenedData = response.data.flat();
        setReport(flattenedData[0]); // Set the packages state with the API response

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (accessToken) {
      getdashboardData();
    }
  }, [accessToken]);
  // This is for active data

  // this is for inactive data
  useEffect(() => {
    const getdashboardData = async () => {
      try {
        const options = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        
        const response = await axios.get("/api/inactivepro/inactive", options);
        // console.log("API Response:", response.data);
        const flattenedData = response.data.flat();
        setInactive(flattenedData[0]); // Set the packages state with the API response

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (accessToken) {
      getdashboardData();
    }
  }, [accessToken]);
  // this is for inactive data

  // This is for Renewal Data
  useEffect(() => {
    const getdashboardData = async () => {
      try {
        const options = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        
        const response = await axios.get("/api/package/renew/renewal", options);
        // console.log("API Response:", response.data);
        const flattenedData = response.data.flat();
        setRenew(flattenedData[0]); // Set the packages state with the API response

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (accessToken) {
      getdashboardData();
    }
  }, [accessToken]);
  // This is for Renewal Data

  // This is for today payment
  useEffect(() => {
    const gettodaypaymentData = async () => {
      try {
        const options = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        
        const response = await axios.get("/api/payment/today", options);
        // console.log("API Response:", response.data);
        const flattenedData = response.data.flat();
        setTodaypay(flattenedData[0]); // Set the packages state with the API response

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (accessToken) {
      gettodaypaymentData();
    }
  }, [accessToken]);
  // This is for todaypayment

  // This is for thisweek payment
  useEffect(() => {
    const gethisweekpaymentData = async () => {
      try {
        const options = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        
        const response = await axios.get("api/payment/week/thisweek", options);
        // console.log("API Response:", response.data);
        const flattenedData = response.data.flat();
        setThisWeekPay(flattenedData[0]); // Set the packages state with the API response

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (accessToken) {
      gethisweekpaymentData();
    }
  }, [accessToken]);
  // This is for thisweekpayment

  // This is for thismonth payment
  useEffect(() => {
    const gethismonthpaymentData = async () => {
      try {
        const options = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        
        const response = await axios.get("api/payment/month/thismonth", options);
        // console.log("API Response:", response.data);
        const flattenedData = response.data.flat();
        setThisMonthPay(flattenedData[0]); // Set the packages state with the API response

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (accessToken) {
      gethismonthpaymentData();
    }
  }, [accessToken]);
  // This is for thismonthpayment

  useEffect(() => {
    if (!accessToken) {
      navigate("/admin/login");
    }
  }, [accessToken, navigate]);

  const handelClick = ()=>{
    navigate("/admin/dashboard/property");
  };

  const handelClickPayment = ()=>{
    navigate("/admin/dashboard/payment")
  };
  
  return (
    <>
      <div className="w-full "> 
        <h1 className="text-center mt-4  text-4xl font-bold text-[#7E007F]">Welcome to EzyBill India</h1>
      </div>
      <br />
      <div className="grid place-content-center  grid-cols-1 md:grid-cols-3 gap-8  p-4">
        <div className="shadow-xl p-6 rounded-xl">
          <h1 className="mt-4 text-xl text-gray-600 font-[600]">Properties:</h1>
          <h2 className="mt-4 text-xl text-gray-600 font-[600]">Active: </h2>
          <h2 className="text-xl text-gray-600 font-[600]">{report.property}</h2>
          <h2 className="mt-4 text-xl text-gray-600 font-[600]">Inactive: </h2>
          <h2 className="text-xl text-gray-600 font-[600]">{inactive.property}</h2>
          <h2 className="mt-4 text-xl text-gray-600 font-[600]">Pending For Renewal:</h2>
          <h2 className="text-xl text-gray-600 font-[600]">{renew.property}2</h2>
          <button className="mt-10 flex items-center gap-3 px-3 py-2 bg-[#7e007f] text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300" onClick={handelClick}>Click <span><SlArrowRight/></span></button>
        </div>
        <div className="shadow-xl  p-6 rounded-xl">
          <h1 className="mt-4 text-xl text-gray-600 font-[600]">Payments :</h1>
          <h2 className="mt-4 text-xl text-gray-600 font-[600]">Today :</h2>
          <h2 className="text-xl text-gray-600 font-[600]">{todaypay.todaypay}</h2>
          <h2 className="mt-4 text-xl text-gray-600 font-[600]">This Week :</h2>
          <h2 className="text-xl text-gray-600 font-[600]">{thisweekpay.todaypay}</h2>
          <h2 className="mt-4 text-xl text-gray-600 font-[600]">This Month :</h2>
          <h2 className="text-xl text-gray-600 font-[600]">{thismonthpay.todaypay}</h2>
          <button className="mt-10 flex items-center gap-3 px-3 py-2 bg-[#7e007f] text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300" onClick={handelClickPayment}>Click <span><SlArrowRight/></span></button>
        </div>
      </div>
    </>
  );
}

export default DashboardM;
