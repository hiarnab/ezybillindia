import React from "react"
// import {TbBuildingEstate } from "react-icons/tb";
// import {BsTelephoneForwardFill} from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux";
import axios from "../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCategory } from "../propertySlice";
// import propNoIco from "../assets/propertyNoIco.png"
import tagIco from "../assets/tag.png"

const CategoryCardComponent= ({ category, setEdit, 
  deletePopup, setDeletePopup}) => {
 
  const dispatch = useDispatch()
  const accessToken = useSelector(store => store?.login?.userData[0])
  
  const editHandler = () => {
    console.log("edit clicked")
    setEdit(true)
    dispatch(getCategory(category))
  }
  //  useEffect(()=>{
  // if(category){
  //   dispatch(getCategory(category))
  //   console.log(category)
  // }
  // },[category])
  const categoryDeleteHandler = () => {
    console.log("del") 
    setDeletePopup(true)
    
  } 

  const deleteHandler = () => {
    const deleteCategory = async () => {
      try {
        const options = {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }}
        const response = await axios.delete(`/api/property/${category?.PropertyNo}/itemCtegory/${category?.CategoryRN}`, options);
        console.log(response);
        if(response?.status === 204){
          toast.success("Category deleted successfully!", {
            position: toast.POSITION.TOP_CENTER
          });
          setDeletePopup(false)
        }
      }
      catch (error) {
        toast.error("Category deletion failed!", { 
          position: toast.POSITION.TOP_CENTER
        });
        console.log(error);
        setDeletePopup(false)
      }
    }
    deleteCategory()
  }
  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="rounded-md p-5 border-solid border-2 border-gray-300 bg-white">
        <div className="flex flex-col gap-3">
          {/* <div className="flex text-[14px] font-normal justify-between flex-wrap">
            <div className="flex items-center gap-4">
              <img src={propNoIco} alt="icon" className="w-4" />
              <h5 className="text-[#B3B3B3] flex items-center gap-2 font-jost">
                Property No
              </h5>
            </div>

            <h5 className="text-[#464646] font-jost">{category?.PropertyNo}</h5>
          </div> */}
          <div className="flex text-[14px] font-normal justify-between flex-wrap">
            <div className="flex items-center gap-4">
              <img src={tagIco} alt="icon" className="w-4" />
              <h5 className="text-[#B3B3B3] flex items-center gap-2 font-jost">
                Category Name
              </h5>
            </div>
            <h5 className="text-[#464646] font-jost">
              {category?.ItemCategory}
            </h5>
          </div>
          <div className="flex items-center justify-around">
            <button
              className="
    font-normal  bg-[#800080] text-[white] flex items-center 
    rounded-md py-2 px-10 my-6 text-[14px] 
    cursor-pointer opacity-100 font-jost  
     "
              onClick={editHandler}
            >
              Edit
            </button>
            <button
              className="font-normal  bg-red-600 text-[white] flex items-center 
    rounded-md py-2 my-6 text-[14px] px-10 
    cursor-pointer opacity-100 font-jost"
              onClick={categoryDeleteHandler}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {deletePopup ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div
                  className="flex items-baseline justify-center p-5 border-b border-solid text-sm 
                 border-slate-200 rounded-t"
                >
                  <h3 className="text-[#706f6f] font-medium leading-6">
                  We still see some subcategories being present under the category. <br/>
                  Are you still sure to go ahead with the deletion?
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black loat-right
                     text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setDeletePopup(false)}
                  >
                    <span
                      className="bg-transparent text-black  
                    w-6 text-2xl block outline-none focus:outline-none"
                    >
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="flex justify-center gap-5">
                  <button
                    className="font-normal bg-red-400 text-[white] rounded-md py-2 my-6 
              text-[14px] px-3 cursor-pointer opacity-100"
                    onClick={deleteHandler}
                  >
                    Yes
                  </button>
                  <button
                    className="font-normal bg-yellow-400 text-[white]  rounded-md py-2 my-6 
              text-[14px] px-3  cursor-pointer opacity-100"
                    onClick={() => setDeletePopup(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default CategoryCardComponent 