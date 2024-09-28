import React, { useState, useEffect } from "react"
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
const AddImage = () => {
  const [imageMenu, setImageMenu] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const accessToken = useSelector(store => store?.login?.userData[0])
  const propertyNumber = useSelector((state) => state.property.propertyNumber);
  const [reload, setReload] = useState(false)
  const [text, setNewText] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    setError(false)
    setLoading(true)
    const getImageMenu = async () => {
      try {
        const options = {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        }
        const response = await axios.get(`/api/property/${propertyNumber}/menu`, options);
        console.log(response?.data);
        setImageMenu(response?.data.imageMenu)
        setLoading(false)
        setError(false)
        console.log(imageMenu);
      }
      catch (error) {
        console.log(error);
        setLoading(false)
        setError(true)
      }
    }
    getImageMenu()
  }, [reload])

  const handleUpload = async (file) => {
    console.log(file);
    try {
      var bodyFormData = new FormData();
      bodyFormData.append("image", file);
      const options = {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data"
        }
      }
      const response = await axios.post(`/api/property/${propertyNumber}/menu`,
        bodyFormData, options);
      console.log(response?.data);
      setReload(!reload)
      console.log(imageMenu);
    }
    catch (error) {
      console.log(error);
      setError(!reload)
      setError(true)
    }
  }

  const handleDelete = async (index) => {
    if (!window.confirm("Are you sure?")) return;
    if (!accessToken) {
      alert("Please login first")
      navigate("/login")
      return false;
    }
    else {
      try {
        const options = {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          },
          data: [index],
        }
        const response = await axios.delete(`/api/property/${propertyNumber}/menu`,
          options);
        console.log(response?.data);
        setReload(!reload)
        console.log(imageMenu);
      }
      catch (error) {
        console.log(error);
        setError(!reload)
        setError(true)
      }
    }
  }

  const handleSwap = async (index1, index2) => {
    console.log(index1, index2)
    if (!accessToken) {
      navigate("/login")
    }
    else {
      try {
        const options = {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        }
        const body = [
          index1, index2
        ]
        const response = await axios.put(`/api/property/${propertyNumber}/menu`,
          body, options);
        console.log(response?.data);
        setReload(!reload)
        console.log(imageMenu);
      }
      catch (error) {
        console.log(error);
        setError(!reload)
        setError(true)
      }
    }
  }

  const handleUpdateText = async (id) => {
    console.log("handleUpdateText", id, text);
    try {
      const options = {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      }
      const body = {
        "position": id,
        "text": text
      }

      const response = await axios.put(`/api/property/${propertyNumber}/menu/image-caption`,
        body, options);
      console.log(response?.data);
      setReload(!reload)
      console.log(imageMenu);
    }
    catch (error) {
      console.log(error);
      setError(!reload)
      setError(true)
    }
    setNewText("");
  }


  return (
    <>
      {loading ? (
        <div className="flex justify-center mt-[20%]">
          <button
            disabled
            type="button"
            className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              />
            </svg>
            Loading...
          </button>
        </div>
      ) : error ? (
        <div className="flex justify-center mt-[20%]">
          <div className="text-center">
            <h1 className="mt-3 text-2xl font-semibold text-gray-800md:text-3xl">
              Error
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Something Went Wrong!
            </p>
            <div className="flex justify-center items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
              <button
                onClick={() => setReload(!reload)}
                className="w-72 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      ) : imageMenu.length === 0 ? (
        <div>
          <div className="w-[26rem] p-10 bg-white rounded-xl z-10">
            <div className="space-y-3">
              <div className="flex justify-between">
                <p className="rounded-full bg-slate-300 px-4 py-2">
                  <span className="text-sm font-bold text-gray-500 tracking-wide">1</span>
                </p>
                {/* <p className="text-red-500 text-2xl mt-2">
                  <AiFillDelete />
                </p> */}
              </div>
              <div className="grid grid-cols-1 space-y-2">
                <div className="text-sm font-bold text-gray-500 tracking-wide">Attach Image</div>
                <div className="flex items-center justify-center w-full">
                  <div className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                    <div className="h-full w-full text-center flex flex-col items-center justify-center">
                      <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                        <img className="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik" />
                      </div>
                      <label htmlFor="file-input" className="pointer-none text-gray-500 cursor-pointer">
                        <span className="text-blue-600 hover:underline">select a file</span> <br/> from your computer
                      </label>
                    </div>
                  </div>

                  <input
                    type="file"
                    id="file-input"
                    onChange={(e) => {
                      console.log(e.target.files[0]);
                      handleUpload(e.target.files[0])
                    }}
                    multiple={false}
                    className="hidden" />
                </div>
              </div>
              <p className="pb-4 text-sm text-gray-300">
                <span>File type: jpg,png,types of images</span>
              </p>
              <label htmlFor="title" className="text-sm font-bold text-gray-500 tracking-wide">Image Caption</label>
              <div className="flex justify-between">
                <input
                  className="text-base w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  type="text"
                  placeholder="Image Caption" />
                <div className="flex">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap">
          {imageMenu.map((_item, index) => {
            const isCaptionTouched = _item.captionTouched;
            return (
              <div
                key={index}
                className="w-[26rem] p-10 bg-white rounded-xl z-10 mr-4 mb-5">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <p className="rounded-full bg-slate-300 px-4 py-2">
                      <span className="text-sm font-bold text-gray-500 tracking-wide">{index + 1}</span>
                    </p>
                    <button className="text-red-500 text-2xl mt-2"
                      onClick={() => {
                        handleDelete(index + 1)
                      }}
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                  <div className="flex flex-wrap pb-6">
                    <label htmlFor="image" className="text-sm font-bold text-gray-500 tracking-wide mb-2">Menu Image</label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col rounded-lg border-4 border-dashed w-full group text-center">
                        <div className="h-full w-full text-center flex flex-col items-center justify-center">
                          <img className="has-mask object-cover" src={_item.imageUrl} alt="menu" />
                        </div>
                        <input type="file" className="hidden" />
                      </label>
                    </div>
                  </div>
                  {/* <p className="pb-4 text-sm text-gray-300">
                    <p className="float-right bg-blue-600 px-2 py-1 w-28 text-white rounded hover:cursor-pointer">Change Image</p>
                  </p> */}
                  <label htmlFor="title" className="text-sm font-bold text-gray-500 tracking-wide">Image Caption</label>
                  <div className="flex justify-between">
                    <input className="text-base w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="text"
                      value={_item.text}
                      onChange={(e) => {
                        const newText = e.target.value;
                        const updatedImageMenu = [...imageMenu];
                        updatedImageMenu[index] = { ...updatedImageMenu[index], text: newText, captionTouched: true };
                        setNewText(newText);
                        setImageMenu(updatedImageMenu);

                      }}
                      placeholder="Image Caption" />
                    <div className="flex">
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-3 disabled:bg-gray-300"
                        onClick={() => {
                          setReload(!reload);
                        }}
                        disabled={isCaptionTouched ? false : true}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-300"
                        onClick={() => {
                          handleUpdateText(index + 1)
                        }}
                        disabled={isCaptionTouched ? false : true}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={(e) => {
                      console.log(parseInt(e.target.value) + 1)
                      handleSwap(index + 1, parseInt(e.target.value) + 1)
                    }}
                  >
                    <option selected disabled>Swap with</option>
                    {
                      imageMenu?.map((_item, imageIndex) => (
                        <option key={index} value={imageIndex} disabled={index == imageIndex}>{imageIndex + 1}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
            );
          }
          )}
          <div>
            <div className="w-[26rem] p-10 bg-white rounded-xl z-10">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <p className="rounded-full bg-slate-300 px-4 py-2">
                    <span className="text-sm font-bold text-gray-500 tracking-wide">{imageMenu.length + 1}</span>
                  </p>
                  {/* <p className="text-red-500 text-2xl mt-2">
                    <AiFillDelete />
                  </p> */}
                </div>
                <div className="grid grid-cols-1 space-y-2">
                  <div htmlFor="file-input" className="text-sm font-bold text-gray-500 tracking-wide">Attach New Image</div>
                  <div className="flex items-center justify-center w-full">
                    <div className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                      <div className="h-full w-full text-center flex flex-col items-center justify-center">
                        <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                          <img className="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik" />
                        </div>
                        <label htmlFor="file-input" className="pointer-none text-gray-500 "><span className="text-blue-600 hover:underline">select a file</span><br/> from your computer</label>
                      </div>
                      <input
                        id="file-input"
                        type="file" className="hidden"
                        onChange={(e) => {
                          handleUpload(e.target.files[0])
                        }}
                        multiple={false}
                      />
                    </div>
                  </div>
                </div>
                <p className="pb-4 text-sm text-gray-300">
                  <span>File type: jpg,png,types of images</span>
                </p>
                <label htmlFor="title" className="text-sm font-bold text-gray-500 tracking-wide">Image Caption</label>
                <div className="flex justify-between">
                  <input className="text-base w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="text" placeholder="Image Caption" />
                  <div className="flex">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AddImage