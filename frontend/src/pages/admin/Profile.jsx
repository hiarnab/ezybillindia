import React, { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const Profile = () => {

  const accessToken = useSelector((store) => store?.adminlogin?.adminData[0]);
  const [key, setKey] = useState([]);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log(accessToken);
    if (!accessToken) {
      navigate("admin/login");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const getPackageData = async () => {
      try {
        const options = {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        };
        const response = await axios.get("/api/admin/profile", options);
        console.log("API Response:", response.data);
        const flattenedData = response.data.flat();
        setKey(flattenedData[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (accessToken) {
      getPackageData();
    }
  }, [accessToken]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSaveChanges = async () => {
    if (password.length >= 8) {
      try {
        const options = {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
        };
        const data = {
          password
        }
        const response = await axios.post("/api/admin/password/update", data, options);
        console.log("Password Update Response:", response.data);
        alert("Password updated successfully!");
      } catch (error) {
        console.error("Error updating password:", error);
        alert("Failed to update password. Please try again.");
      }
    } else {
      alert("Password must be at least 8 characters long.");
    }
  };


  return (
    <>
      <ToastContainer autoClose={2000} />

      <ToastContainer autoClose={2000} />
      <div className=" min-h-[100vh] flex flex-col px-0 md:px-6 mt-3 md:mt-0 justify-center items-center">
        <form
          className="rounded-md px-2 md:px-6 py-6 w-full"
        //</>onSubmit={userDetailSubmitHandler}
        >
          <div className="px-2">
            <h1 className="text-[30px] font-semibold text-[#464646] font-jost">
              My Profile
            </h1>
          </div>
          <div className="flex items-center justify-between  flex-wrap mb-6">
            <div className="w-[100%] md:w-[48%] mb-6 md:mb-0 px-2 md:mt-6 gap-2">
              <label
                className="block tracking-wide text-[#464646]
              text-[16px] font-normal mb-2 font-jost"
                htmlFor="grid-first-name"
              >
                Name<span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block w-full border-2 border-[#DDDDDD]
              focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2 focus:border-[#800080]
               rounded-[10px] h-[42px] px-4 mb-3 leading-tight "
                required
                id="CustomerName"
                type="text"
                placeholder=""
                value={key.fullName}
              />
            </div>

            <div className="w-[100%] md:w-[48%] mb-6 md:mb-0 px-2 md:mt-6">
              <label
                className="block tracking-wide text-[#464646] 
              text-[16px] font-normal mb-2 font-jost"
                htmlFor="grid-first-name"
              >
                Email Id<span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block  border-2 border-[#DDDDDD]
              focus:shadow-lg focus:shadow-[#800080]-500/50 focus:border-2 focus:border-[#800080]
               w-full h-[42px]
               rounded-[10px]  px-4 mb-3 leading-tight focus:outline-none"
                id="RegMobile"
                type="email"
                placeholder=""
                value={key.email}
              />
            </div>

            <div className="w-[100%] md:w-[48%] mb-6 md:mb-0 px-2 md:mt-6">
              <label
                className="block tracking-wide text-[#464646] 
              text-[16px] font-normal mb-2 font-jost"
                htmlFor="grid-first-name"
              >
                Mobile Number<span className="text-red-500">*</span>
              </label>
              <input
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block  border-2 border-[#DDDDDD]
              focus:shadow-lg focus:shadow-[#800080]-500/50 focus:border-2 focus:border-[#800080]
               w-full h-[42px]
               rounded-[10px]  px-4 mb-3 leading-tight focus:outline-none"
                id="RegMobile"
                type="number"
                placeholder=""
                value={key.phone}
              />
            </div>
            <div className="w-[100%] md:w-[48%] mb-6 md:mb-0 px-2 md:mt-6">
              <label
                className="block tracking-wide text-[#464646]
              text-[16px] font-normal mb-2 font-jost"
                htmlFor="states"
              >
                State<span className="text-red-500">*</span>
              </label>

              <select
                id="states"
                className="bg-gray-50  block 
border-2 border-[#DDDDDD] rounded-[10px] focus:outline-none 
focus:shadow-lg focus:shadow-[#800080]-500/50 focus:border-2 focus:border-[#800080]
  w-full px-2.5 h-[42px]"
              // defaultValue={State}
              // onChange={(e) => editDetailsHandler(e, "State")}
              >
                <option >
                  West bengal
                </option>


              </select>
            </div>
            <div className="w-[100%] md:w-[48%] mb-6 md:mb-0 px-2 md:mt-6">
              <label
                className="block tracking-wide text-[#464646] 
            text-[16px] font-normal mb-2"
                htmlFor="grid-first-name font-jost"
              >
                Country<span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block  border-2 border-[#DDDDDD]
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:border-2 focus:border-[#800080]
             w-full h-[42px]
             rounded-[10px]  px-4 mb-3 leading-tight focus:outline-none"
                id="grid-first-name"
                type="text"
                placeholder=""
                value="India"
              />
            </div>

            <div className="w-[100%] md:w-[48%] mb-6 md:mb-0 px-2 md:mt-6">
              <label
                className="block tracking-wide text-[#464646] 
              text-[16px] font-normal mb-2 font-jost"
                htmlFor="grid-first-name"
              >
                Password<span className="text-red-500">*</span>
              </label>
              <input
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block border-2 border-[#DDDDDD]
          focus:shadow-lg focus:shadow-[#800080]-500/50 focus:border-2 focus:border-[#800080]
          w-full h-[42px]
          rounded-[10px] px-4 mb-3 leading-tight focus:outline-none"
                id="RegMobile"
                type="password"
                placeholder="Enter Your new password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            {/* <div className="grid grid-cols-4 md:mb-3 md:mt-3"></div> */}
          </div>
          <div className="flex  items-center gap-3 px-2 justify-end">

            <>
              <button
                className="font-normal text-[white] flex items-center 
          rounded-md py-2 my-6 text-[16px] px-3 
          cursor-pointer bg-[#dd2726]" onClick={() => setPassword("")}
              >
                Cancel
              </button>
              <button
                className={`font-normal w-[20%] text-[white] flex justify-center items-center 
                  rounded-md py-2 my-6 text-[16px] px-3 
                  ${password.length >= 8 ? "cursor-pointer opacity-100 bg-[#16a34a] " : "cursor-not-allowed opacity-50 bg-[#16a34a]"}`}
                disabled={password.length < 8}
                onClick={handleSaveChanges}

              >
                Save Changes
              </button>
            </>

          </div>
        </form>
      </div>
    </>
  );
};

export default Profile

