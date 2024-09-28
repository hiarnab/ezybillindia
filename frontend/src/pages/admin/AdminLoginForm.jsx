
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TelLenValidation from "../../utils/TelLenValidation";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../authentication/authContextAdmin";

export const AdminLoginForm = () => {

  const [disabled, setDisabled] = useState(true);
  const [adminmobile, setAdminmobile] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const adminDetailSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", {
        phone: adminmobile,
        password: password
      });
      console.log(response);
      if (response?.status == "200") {
        toast.success("Login successful!", {
          position: toast.POSITION.TOP_CENTER,
        });
        const { accessToken } = response.data;
        login(accessToken);
        setTimeout(() => {
          navigate("/admin/dashboard/dashboardm");
        }, 1000);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    if (
      (adminmobile !== "" && adminmobile.toLowerCase().match(/^\d{10}$/)) ||
      (password !== "" && password.length >= 8)
    ) {
      setDisabled(false);
    } else { setDisabled(true); }
  }, [adminmobile, password]);



  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="grid grid-cols-8">
        <div className="col-span-1 md:col-span-3"></div>
        <div className="col-span-6 md:col-span-2">



          <form className="rounded-md px-2 md:px-6 py-6 md:py-12 shadow-xl bg-white" onSubmit={adminDetailSubmitHandler}>

            <div className="px-6 text-center">
              <h1 className="text-[30px] font-semibold text-[#464646] font-jost">
                Login
              </h1>
            </div>
            <div className="flex flex-col mb-6">
              <div className="w-full mb-6 md:mb-0 px-2 md:mt-6">
                <label className="block tracking-wide text-[#464646]
            text-[14px] font-[550] font-jost mb-2" htmlFor="RegMobile">
                  Mobile number*
                </label>
                <div
                  className={`flex items-center gap-2 bg-white border-2 border-[#DDDDDD]  ${focused &&
                    "shadow-lg shadow-[#800080]-500/50 border-[#800080]"
                  }
              rounded-md leading-[2.6]`}
                >
                  <div className="flex gap-0 items-center">
                    <p className="margin-0 text-black text-[0.7rem] font-[550] font-poppins">
                      +91
                    </p>
                    <KeyboardArrowDownIcon
                      className="text-[#464646] font-[550] text-xs"
                      style={{ fontSize: "0.8rem" }}
                    />
                  </div>
                  <input
                    onBlur={() => setFocused(false)}
                    onKeyDown={(e) => TelLenValidation(e)}
                    onFocus={() => setFocused(true)}
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none appearance-none block w-full border-0 outline-none pl-[5px]
                        "
                    required
                    id="grid-first-name"
                    type="number"

                    placeholder=""
                    value={adminmobile}
                    onChange={(e) => setAdminmobile(e.target.value)}

                  />
                </div>
              </div>
              <div className="w-full mb-6 md:mb-0 px-2 md:mt-6">
                <label
                  className="block tracking-wide text-[#464646]
            text-[14px] font-[550] font-jost mb-2"
                  htmlFor="grid-first-name"
                >
                  Password
                </label>

                <input
                  onBlur={() => setFocused(false)}
                  onFocus={() => setFocused(true)}
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block w-full border-2 border-[#DDDDDD]
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none focus:border-2
             focus:border-[#800080] rounded-md h-[42px] px-4 mb-3 leading-tight"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}

                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[#B3B3B3] text-[0.6rem] font-normal text-center font-jost">
                By continuing, I agree to the{" "}
                <span className="font-[600] text-black">Terms of Use</span> &{" "}
                <span className="font-[600] text-black">Privacy Policy</span>
              </span>

              <button
                className={`font-normal  bg-[#800080] font-jost text-[white] rounded-md w-full py-3 px-6 my-6
                  ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer opacity-100"} `}
                disabled={disabled}>
                Login
              </button>

              <span className="text-[#B3B3B3] text-[12px] font-normal text-center cursor-pointer font-jost">
                Don’t you have an account?
                <span className="font-bold text-black ml-1">Sign Up</span>
              </span>
            </div>
          </form>
        </div>
        <div className="col-span-1 md:col-span-3"></div>
      </div>
    </>
  );
};

export default AdminLoginForm;
