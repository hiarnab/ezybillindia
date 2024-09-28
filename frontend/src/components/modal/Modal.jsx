import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { IoCloseSharp } from "react-icons/io5";




export default function Modal({ onClose, children})  {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);
  return (
    <div className=" fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-10">
      <div className=" modal  w-[45%] bg-white rounded relative p-10 max-h-[80%] overflow-y-auto">
        <button className="absolute right-3 top-3 border-[1px] border-[#800080] rounded-full cursor-pointer"  onClick={onClose} ><IoCloseSharp fill="#800080" size={30}/>
        </button>
        {children}
        {/* <div className="w-ful flex justify-center mt-8">
          <button
            className="font-[600] text-[#B90FB9] ease-in-out duration-300 px-4 border-[1px] border-[#B90FB9] hover:bg-[#B90FB9] hover:text-white text-xl py-1 rounded-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div> */}
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
