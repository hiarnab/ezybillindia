
import React, { useEffect, useState } from "react"
import PropertyCardComponent from "../components/PropertyCardComponent.jsx"
import axios from "../api/axios";

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFetchedProperties } from "../propertySlice";
import configData from "../config.json";

const MyProperties = ({ setSidebarTabs }) => {
  const accessToken = useSelector(store => store?.login?.userData[0])
  const [properties, setProperties] = useState(null)
  const [deletePopup, setDeletePopup] = useState(false)
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [user, setUser] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken == null) {
      navigate("/login")
    }

  }, [accessToken, navigate])

  useEffect(() => {
    setSidebarTabs(false)
  }, [])

  useEffect(() => {
    const getUserData = async () => {
      try {
        const options = {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        }
        const response = await axios.get("/api/user", options);
        setUser(response?.data);
        var daySinceModalDisplayed = calculateDaysDifference(response?.data?.LastDateModalDisplayed)
        if ((response?.data.RegEmail == "" || response?.data.RegEmail == null) && daySinceModalDisplayed >= configData.MODAL_REPEAT_DAYS) {
          setOpen(true)
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    if (!accessToken) {
      navigate("/login")
    } else {
      getUserData()
    }
  }, [accessToken, open])


  useEffect(() => {
    const getPropertyData = async () => {
      try {
        const options = {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        }
        const response = await axios.get("/api/property", options);
        console.log(response?.data);
        setProperties(response?.data)
      }
      catch (error) {
        console.log(error);
      }
    }
    getPropertyData()
  }, [])

  useEffect(() => {
    const getPropertyData = async () => {
      try {
        const options = {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        }
        const response = await axios.get("/api/property", options);
        console.log(response?.data);
        setProperties(response?.data)
      }
      catch (error) {
        console.log(error);
      }
    }
    getPropertyData()
  }, [deletePopup])

  useEffect(() => {
    if (properties?.length) {
      dispatch(addFetchedProperties(properties))
    }
  }, [properties])

  const calculateDaysDifference = (date) => {

    const givenDate = new Date(date);
    const currentDate = new Date();
    const timeDifferenceMs = currentDate - givenDate;
    const daysDifference = timeDifferenceMs / (1000 * 60 * 60 * 24);
    const roundedDaysDifference = Math.floor(daysDifference);

    return roundedDaysDifference;
  }

  function formatDateToISOString(timestamp) {
    const date = new Date(timestamp);
    const formattedDate = date.toISOString();
    return formattedDate;
  }

  const handleAddEmail = async () => {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (regex.test(email)) {
      const options = {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        },
      }
      const data = {
        email: email,
        CustomerNo: user.CustomerNo
      }
      await axios.put("/api/user/email", data, options)
        .then(res => {
          console.log("RESPONSE: ", res);
          if (
            res.status == 200
          ) {
            alert("Email added successfully")
            setOpen(false)
          } else {
            alert("Something went wrong. Try Again.")
          }
        })
        .catch(error => {
          console.log("ERROR: ", error);
          setOpen(false);
        })
    } else {
      alert("Please enter a valid email address")
    }
  }

  const handleCancelEmailModal = async () => {
    const options = {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      },
    }
    const data = {
      newDate: formatDateToISOString(Date.now()),
      CustomerNo: user.CustomerNo
    }
    await axios.put("/api/user/modal-date", data, options)
      .then(res => {
        console.log("RESPONSE: ", res);
        setOpen(false);
      })
      .catch(error => {
        console.log("ERROR: ", error);
        setOpen(false);
      })
  }


  return (
    <>
      <div className="flex justify-end mr-5">
        <Link to='/dashboard/addproperty' className="text-right">
          <li
            className="flex w-36 rounded-md p-2 cursor-pointer hover:bg-light-white text-[#fff] 
          text-sm items-center justify-center gap-x-1 mt-2 bg-green-700 font-medium">
            <span className="text-lg">+</span>
            <span> Add Property</span>
          </li>
        </Link>
      </div>


      <div className="w-auto">
        {open && (
          <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                          <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                        </svg>

                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Update Email Address</h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            If you&lsquo;d like to receive regular updates from us, please provide your email address:
                          </p>
                          <p className="mt-2 text-sm text-gray-500">
                            Please enter your email address:
                          </p>
                          <input
                            type="email"
                            className="mt-2 w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      onClick={handleAddEmail}
                      className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                    >
                      Add Mail Address
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEmailModal}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-3 px-2 py-3 md:px-6">
          {
            properties?.map(property => (
              <div key={property?.PropNo}>
                {property?.isActive === 0 ? (
                  <div className="bg-red-500 text-white p-4 rounded">
                    You are blocked. Please contact the admin.
                  </div>
                ) : (
                  <PropertyCardComponent
                    setSidebarTabs={setSidebarTabs}
                    property={property}
                    propNo={property?.PropNo}
                    deletePopup={deletePopup}
                    setDeletePopup={setDeletePopup}
                  />
                )}
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default MyProperties