import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Modal from "../modal/Modal.jsx";
import axios from "../../api/axios";
import { SlOptions } from "react-icons/sl";




export default function TableComponent({ data, confirmDisableProperty, fetchUpdatedProperties, lifeTimeFree }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const accessToken = useSelector((store) => store?.adminlogin?.adminData[0]);
  const [details, setDetails] = useState([]);
  const [dotedoption, setDotedoption] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [lifetimefree, setlifetimefree] = useState(false);
  const [menu, setMenu] = useState([]);


  const dropdownRef = useRef(null);

  const handleDisableClick = async (PropertyNo) => {
    setDotedoption(false);
    await confirmDisableProperty(PropertyNo);
    await fetchUpdatedProperties();
  };

  const handelLifeTimeFree = async (PropertyNo) => {
    setDotedoption(false);
    lifeTimeFree(PropertyNo)
    await fetchUpdatedProperties();
  }

  const handleViewMenu = async (PropertyNo) => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const responseMenu = await axios.get(`/api/menu/${PropertyNo}`, options);
      console.log(responseMenu.data);
      setMenu(responseMenu.data);
      //setIsModalOpen(true);
      openModal();
      setDotedoption(false);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleOpenModal = async (PropertyNo) => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(
        `/api/admin/property/propertyDetails/${PropertyNo}`,
        options
      );
      console.log(response.data);
      const data = Array.isArray(response.data)
        ? response.data[0]
        : response.data;
      setDetails(data);
      setIsModalOpen(true);
      setDotedoption(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDetails([]);
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleToggleDropdown = () => {
    setDotedoption(!dotedoption);

  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDotedoption(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <td className="whitespace-normal px-4 py-3 text-center text-gray-700">
        {data?.PropName}
      </td>
      <td className="whitespace-normal px-4 py-3 text-center text-gray-700">
        {data?.PropType}
      </td>
      <td className="whitespace-normal px-4 py-3 text-center text-gray-700">
        {data?.CustomerName}
      </td>
      <td className="whitespace-normal px-4 py-3 text-center text-gray-700">
        {data?.PropPhone}
      </td>
      <td className="whitespace-normal px-4 py-3 text-center text-gray-700">
        {data?.PropEmail}
      </td>
      <td className="whitespace-normal px-4 py-3 text-center text-gray-700">
        {data?.PropState}
      </td>
      <td className="whitespace-normal px-4 py-3 text-center text-gray-700">
        {data?.propertyIsActive === 1 ? "Active" : "Inactive"}
      </td>
      <td className="whitespace-normal px-4 py-3 text-center text-gray-700">

        {data?.expired_at && new Date(data?.expired_at) < new Date() ? "Expired" : data?.title ==="life_time_free" ? "Our Software User (Free Plan)": data?.title}

      </td>
      <td className="whitespace-nowrap px-4 py-3 text-center text-gray-700">
        <div className="flex gap-2">
          <button
            className="bg-[#800080] text-white px-2 py-2 rounded "
            onClick={() => handleOpenModal(data.PropertyNo)}
          >
            View
          </button>
          <div className="relative" ref={dropdownRef}>
            <button
              className="px-2 py-2 rounded h-full bg-[#eaecef]"
              onClick={handleToggleDropdown}
            >
              <SlOptions />
            </button>
            {dotedoption && (
              <div className="absolute z-10 right-0 top-full mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg">
                <ul>
                  <li className=" hover:bg-gray-100 cursor-pointer">
                    <button
                      className="p-2 w-full"
                      type="button"
                      onClick={() => handelLifeTimeFree(data.PropertyNo)}
                    >

                      {data?.expired_at !== null ? "Enable Free Plan" : "Disable Free Plan"}

                    </button>
                  </li>
                  {/* {lifetimefree && (
                  <Modal onClose={() => setlifetimefree(false)}>
                    <div>
                      <h3>lifetimefree</h3>
                    </div>
                  </Modal>
                )} */}
                  {/* <li className="p-2 hover:bg-gray-100 cursor-pointer">Delete</li> */}
                  <li className=" hover:bg-gray-100 cursor-pointer">
                    <button
                      className="p-2 w-full"
                      type="button"
                      onClick={() => handleDisableClick(data.PropertyNo)}
                    >
                      {data?.propertyIsActive === 1
                        ? "Disable Property"
                        : "Enable Property"}
                    </button>
                  </li>
                  <li className="hover:bg-gray-100 cursor-pointer">
                    <button
                      type="button"
                      className="w-full p-2"
                      onClick={() => handleViewMenu(data.PropertyNo)}
                    >
                      View Menu
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </td>
      {isModalOpen && details && (
        <Modal onClose={handleCloseModal}>
          <h2 className="text-center text-[#7e007e] text-3xl mb-6 mt-2 font-[700]">
            Property Details
          </h2>
          <div className="w-full ">
            <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
              <p>Property No:</p>
              <p>{details.PropertyNo}</p>
            </div>
            <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
              <p>Customer Name:</p>
              <p>{details.CustomerName}</p>
            </div>
            <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
              <p>Property Name:</p>
              <p>{details.PropName}</p>
            </div>
            <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
              <p>Address:</p>
              <p>
                {details.PropAddress}, {details.PropState},{" "}
                {details.PropCountry}
              </p>
            </div>
            <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
              <p>Email:</p>
              <p>{details.PropEmail}</p>
            </div>
            <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
              <p>Phone:</p>
              <p>{details.PropPhone}</p>
            </div>
            <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
              <p>Type:</p>
              <p>{details.PropType}</p>
            </div>
            <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
              <p>Menu Type:</p>
              <p>{details.MenuType}</p>
            </div>
            <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
              <p>Last Date Modal Displayed:</p>
              <p>
                {" "}
                {new Date(details.LastDateModalDisplayed).toLocaleString()}
              </p>
            </div>
            <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
              <p>Plan :</p>
              <p>
                {details.title}({details.type})
              </p>
            </div>
            <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
              <p>Amount:</p>
              <p>{details.amount}</p>
            </div>
            <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
              <p>Start Date:</p>
              <p> {new Date(details.start_date).toLocaleString()}</p>
            </div>
            <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
              <p>Expiry Date:</p>
              <p>{new Date(details.expired_at).toLocaleString()}</p>
            </div>
            <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
              <p>Status:</p>
              <p>{details.is_active}</p>
            </div>
          </div>
        </Modal>
      )}
      {modalIsOpen && menu.length > 0 ? (
        <Modal onClose={closeModal}>
          <h2 className="text-center text-[#7e007e] text-3xl mb-6 mt-2 font-[700]">
            Text Menu View
          </h2>
          {menu.map((item, index) => (
            <div key={index} className="mb-4 mt-6">
              <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
                <p>Product Name RN:</p>
                <p>{item.ProductNameRN}</p>
              </div>
              {/* <h1>Product Name RN: {item.ProductNameRN}</h1> */}
              <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
                <p>Item Name RN:</p>
                <p>{item.ItemNameRN}</p>
              </div>
              {/* <h1>Item Name RN: {item.ItemNameRN}</h1> */}
              <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
                <p>Category RN:</p>
                <p>{item.CategoryRN}</p>
              </div>
              {/* <h1>Category RN: {item.CategoryRN}</h1> */}
              <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
                <p>Property No:</p>
                <p>{item.PropertyNo}</p>
              </div>
              {/* <h1>Property No: {item.PropertyNo}</h1> */}
              <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
                <p>Product Name:</p>
                <p>{item.ProductName}</p>
              </div>
              {/* <h1>Product Name: {item.ProductName}</h1> */}
              <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
                <p>Note On Product:</p>
                <p>{item.NoteOnProduct}</p>
              </div>
              {/* <h1>Note On Product: {item.NoteOnProduct}</h1> */}
              <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
                <p>Unit Price:</p>
                <p>{item.UnitPrice}</p>
              </div>
              {/* <h1>Unit Price: {item.UnitPrice}</h1> */}
              <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
                <p>Unit:</p>
                <p>{item.Unit}</p>
              </div>
              {/* <h1>Unit: {item.Unit}</h1> */}
              <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
                <p>SGST PC:</p>
                <p>{item.SGSTPC}</p>
              </div>
              {/* <h1>SGST PC: {item.SGSTPC}</h1> */}
              <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
                <p>CGST PC:</p>
                <p>{item.CGSTPC}</p>
              </div>
              {/* <h1>CGST PC: {item.CGSTPC}</h1> */}
              <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
                <p>Discount Allowed:</p>
                <p>{item.DiscountAllowed}</p>
              </div>
              {/* <h1>Discount Allowed: {item.DiscountAllowed}</h1> */}
              <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
                <p>ShName:</p>
                <p> {item.ShName}</p>
              </div>
              {/* <h1>ShName: {item.ShName}</h1> */}
              <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
                <p>Room Unit Price:</p>
                <p>{item.RoomUnitPrice}</p>
              </div>
              {/* <h1>Room Unit Price: {item.RoomUnitPrice}</h1> */}
              <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
                <p>HSNSAC:</p>
                <p>{item.HSNSAC}</p>
              </div>
              {/* <h1>HSNSAC: {item.HSNSAC}</h1> */}
              <div className="flex mt-2 justify-between font-[500] text-[#6f7178] ">
                <p>Is Suspended: </p>
                <p>{item.IsSuspended ? "Yes" : "No"}</p>
              </div>
              {/* <h1>Is Suspended: {item.IsSuspended ? "Yes" : "No"}</h1> */}
            </div>
          ))}
        </Modal>
      ) : (
        modalIsOpen && 
        <Modal onClose={closeModal}>
          <p className=" font-[500] text-[#6f7178] ">No menu items available.</p>
        </Modal>
      )}
    </>
  );
}
