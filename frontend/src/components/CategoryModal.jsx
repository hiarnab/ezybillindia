import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../api/axios";
import ClickAwayListener from "react-click-away-listener";
import { AiOutlineClose } from "react-icons/ai";

const CategoryModal = ({ setShowModal, setfetchCategory }) => {
  const [ItemCategory, setItemCategory] = useState("");
  const [ItemNote, setItemNote] = useState("");
  const [disabled, setDisabled] = useState(true);
  const accessToken = useSelector((store) => store?.login?.userData[0]);
  const PropertyNo = useSelector((store) => store?.property?.propertyNumber);

  const createCategoryHandler = (e) => {
    e.preventDefault();
    setShowModal(true);
    const handleSubmit = async () => {
      try {
        const options = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axios.post(
          `/api/property/${PropertyNo}/itemCtegory`,
          {
            ItemCategory,
          //  ItemNote
          },
          options
        );

        console.log(response);
        if (response?.status === 201) {
          toast.success("Category created successfully!", {
            position: toast.POSITION.TOP_CENTER,
          });
          setfetchCategory(true);
        }
      } catch (err) {
        console.log(err);
        toast.error("Category creation failed!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    handleSubmit();
    setShowModal(false);
    setfetchCategory(false);
  };

  useEffect(() => {
    if (ItemCategory !== "") setDisabled(false);
  }, [ItemCategory]);

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <ClickAwayListener onClickAway={() => setShowModal(false)}>
          <div className="relative  my-6 mx-auto w-[35rem] md:max-w-3xl ">
            {/*content*/}
            <div
              className="border-0 bg-[rgba(255, 255, 255, 1)] shadow-lg rounded-[20px] relative flex flex-col 
              w-full bg-white outline-none focus:outline-none p-12"
            >
              <div className="py-2 flex justify-end">
                <AiOutlineClose
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowModal(false)}
                />
              </div>

              <p className="p-2 font-poppins text-[0.8rem] font-[550]">
                Create Category*
              </p>
              {/*body*/}
              <form onSubmit={createCategoryHandler}>
                <div className="relative   flex-auto">
                  <input
                    className="appearance-none block  border-2 border-[#DDDDDD] required
                w-full
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none 
            focus:border-2 focus:border-[#800080]
            rounded-md h-[42px] px-4 mb-3 leading-tight "
                    required
                    id="grid-first-name"
                    type="text"
                    placeholder=""
                    value={ItemCategory}
                    onChange={(e) => setItemCategory(e.target.value)}
                  />
                  <p className="p-2 font-poppins text-[0.8rem] font-[550]">
                    Note
                  </p>
                  <textarea
                    className="w-full h-48 shadow-md rounded-md appearance-none block  border-2 border-[#DDDDDD] required
            focus:shadow-lg focus:shadow-[#800080]-500/50 focus:outline-none 
            focus:border-2 focus:border-[#800080] p-2 text-sm resize-none overflow-auto"
                    value={ItemNote}
                    onChange={e => setItemNote(e.target.value)}
                  ></textarea>

                  <button
                    className={`font-normal float-right  bg-[#800080] text-[white] flex rounded-md py-2 my-6
              text-[13px] px-3 mx-auto w-2/5 text-center ${
    disabled
      ? "cursor-not-allowed opacity-50"
      : "cursor-pointer opacity-100"
    }`}
                    type="submit"
                    disabled={disabled}
                  >
                    <p className="w-full text-center">Submit</p>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </ClickAwayListener>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default CategoryModal;
