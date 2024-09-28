import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";

const CloudMenu = () => {
  const params = useParams();
  const [menuType, setMenuType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageMenu, setImageMenu] = useState([]);
  const [textMenu, setTextMenu] = useState([]);
  const [reload, setReload] = useState(false);
  const [PropName, setPropName] = useState([]);

  useEffect(() => {
    setError(false);
    setLoading(true);
    const getImageMenu = async () => {
      try {
        const response = await axios.get(`/api/home/menu/${params.menuName}`);
        console.log(response?.data);
        if (response?.data?.menuType == "text") {
          setMenuType("text");
          setTextMenu(response?.data?.menu);
          setPropName(response?.data?.PropName);
        } else {
          setMenuType("image");
          setImageMenu(response?.data?.menu);
          setPropName(response?.data?.PropName);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setError(false);
      }
    };
    getImageMenu();
  }, [reload]);

  return (
    <div className="min-h-screen">
      <h1 className="text-center font-bold text-2xl sm:text-lg md:text-xl lg:text-2xl xl:text-3xl pt-3 px-3 text-[#7e007e]">
        {" "}
        Welcome to {PropName} Cloud Menu{" "}
      </h1>
      {loading ? (
        <div className="flex justify-center mt-[20%]">
          <button
            disabled
            type="button"
            className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 mr-3 text-gray-200 animate-spin"
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
      ) : menuType === "" ? (
        <div className="flex justify-center mt-[20%]">
          <div className="text-center">
            <h1 className="mt-3 text-2xl font-semibold text-gray-800md:text-3xl">
              Error
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Menu not found.
            </p>
          </div>
        </div>
      ) : menuType == "text" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-4">
          {textMenu.map((category) => (
            <div
              key={category?.category}
              className="bg-white shadow-md p-4 rounded mb-4"
            >
              <h2 className="text-xl font-semibold bg-purple-100 pl-4 py-2 rounded">
                {category?.category}
              </h2>
              {category?.note !== "NONE" ? (
                <p className="text-gray-600 text-xs">{category?.note}</p>
              ) : null}
              <div className="mt-2 space-y-2">
                {category?.subcategories?.map((subcategory) => (
                  <div
                    key={subcategory?.subcategory}
                    className="border-l-2 pl-4"
                  >
                    <h3 className="text-lg font-semibold">
                      {subcategory?.subcategory}
                    </h3>
                    {subcategory?.NoteOnItem !== "NONE" ? (
                      <p className="text-gray-500 text-xs">
                        {subcategory?.NoteOnItem}
                      </p>
                    ) : null}
                    {subcategory?.products?.length > 0 ? (
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        {subcategory?.products?.map((product) => (
                          <li
                            key={product?.ProductName}
                            className="flex justify-between text-gray-600"
                          >
                            <span className="font-semibold">
                              {product?.ProductName}
                              {product?.NoteOnProduct !== "NONE" ? (
                                <p className="text-gray-400 text-xs">
                                  {product?.NoteOnProduct}
                                </p>
                              ) : null}
                            </span>{" "}
                            <span className="font-semibold">
                              ₹ {product?.UnitPrice}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="content mx-6 mt-0 mb-6 md:mt-6">
          {imageMenu.map((item, index) => (
            <div key={index} className="relative w-full box">
              <img
                src={item.imageUrl}
                className="w-full h-full object-cover"
                alt={item.text}
              />
              <h1>{item.PropName} </h1>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white ">
                <h2 className="text-center text-white text-2xl capitalize py-1">
                  {" "}
                  {item.text}{" "}
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CloudMenu;
