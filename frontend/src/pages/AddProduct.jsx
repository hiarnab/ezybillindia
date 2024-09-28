import React from "react";
import { useEffect, useState, useMemo } from "react";
import ProductModal from "../components/ProductModal.jsx";
import ProductCardComponent from "../components/ProductCardComponent.jsx";
import { useSelector } from "react-redux";
import axios from "../api/axios";
import EditProduct from "../components/EditProduct.jsx";
// import DummyTable from "../components/Table/DummyTable.jsx";
import Pagination from "../components/Table/Pagination.jsx";
// import data from "../components/Table/mock-data.json";

let PageSize = 10;

const AddSubCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const [fetchProduct, setfetchProduct] = useState(false);
  const accessToken = useSelector((store) => store?.login?.userData[0]);
  const PropertyNo = useSelector((store) => store?.property?.propertyNumber);
  const [product, setproduct] = useState(null);
  const [edit, setEdit] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const createCategoryHandler = () => {
    setShowModal(true);
  };

  const fun = () => {
    setEdit(false);
  };
  
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return product?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, product]);

  useEffect(() => {
    console.log("useEffect");
    const getProductData = async () => {
      try {
        const options = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axios.get(
          `/api/property/${PropertyNo}/product`,
          options
        );
        console.log(response?.data);
        setproduct(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProductData();
  }, []);

  useEffect(() => {
    console.log("useEffect");
    const getProductData = async () => {
      try {
        const options = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axios.get(
          `/api/property/${PropertyNo}/product`,
          options
        );
        console.log(response?.data);
        setproduct(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProductData();
  }, [fetchProduct, edit, deletePopup]);


  return (
    <>
      {showModal && (
        <ProductModal
          setShowModal={setShowModal}
          setfetchProduct={setfetchProduct}
        />
      )}
      <button
        className="font-normal  bg-green-700 text-[white] flex items-center 
      rounded-md py-2 my-6 text-[13px] px-3 ml-auto cursor-pointer opacity-100"
        onClick={createCategoryHandler}
      >
        <span className="text-lg">+</span>Create Product
      </button>
      {edit ? (
        <div>
          <EditProduct
            product={product}
            setfetchProduct={setfetchProduct}
            setEdit={fun}
          />
        </div>
      ) : (
        // <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-2 py-3 md:px-6">
        //   {
        //     product?.map(product => (
        //       <div key={product}>
        //         <ProductCardComponent product={product} setEdit={setEdit}
        //           setfetchProduct={setfetchProduct}
        //           deletePopup={deletePopup}
        //           setDeletePopup={setDeletePopup}
        //         />
        //       </div>
        //     ))
        //   }
        // </div>
        <>
          <div className="bg-white mb-5 overflow-auto shadow-md rounded-2xl">
            <table className="container">
              <thead className="bg-[#800080] text-[white]">
                <tr>
                  <th className="whitespace-normal px-4 py-3">Category</th>
                  <th className="whitespace-normal px-4 py-3">Sub Category</th>
                  <th className="whitespace-normal px-4 py-3">Product</th>
                  <th className="whitespace-normal px-4 py-3">Price</th>
                  <th className="whitespace-normal px-4 py-3">Edit</th>
                  <th className="whitespace-normal px-4 py-3">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentTableData?.map((product) => (
                  <tr key={product} className="hover:dark:hover:bg-gray-600">
                    <ProductCardComponent
                      currentTableData={currentTableData}
                      product={product}
                      setEdit={setEdit}
                      setfetchProduct={setfetchProduct}
                      deletePopup={deletePopup}
                      setDeletePopup={setDeletePopup}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center justify-center">
            { product &&
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={product.length}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
            }
          </div>
        </>
      )}
    </>
  );
};

export default AddSubCategory;
