import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import SubCategoryModal from "../components/SubCategoryModal.jsx";
import SubcategoryCardComponent from "../components/SubcategoryCardComponent.jsx";
import axios from "../api/axios";
import { useSelector } from "react-redux";
import EditSubCategory from "../components/EditSubCategory.jsx";
// import DummyTable from "../components/Table/DummyTable.jsx";
import Pagination from "../components/Table/Pagination.jsx";
// import data from "../components/Table/mock-data.json";

let PageSize = 10;

 

const AddSubCategory = () => {
  const [showModal, setShowModal] = useState(false)
  const [fetchSubCategory, setfetchSubCategory] = useState(false) 
  const accessToken = useSelector(store => store?.login?.userData[0]) 
  const PropertyNo = useSelector(store => store?.property?.propertyNumber)
  const [subcategory, setSubCategory] = useState(null) 
  const [deletePopup, setDeletePopup] = useState(false)
  const [edit, setEdit] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(()=>{
    setEdit(false)
  },[]) 
  
  const fun = () => {
    setEdit(false)
  }
  
    
  useEffect(()=>{
    console.log("useEffect")
    const getSubCategoryData = async () => {
      try {
        const options = {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }}
        const response = await axios.get(`/api/property/${PropertyNo}/item`, options);
        console.log(response?.data);
        setSubCategory(response?.data)
      }
      catch (error) {
        console.log(error);
      }
    } 
    getSubCategoryData()
  },[])
    
  useEffect(()=>{
    console.log("fetchSubCategory", fetchSubCategory)
    const getSubCategoryData = async () => {
      try {
        const options = {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }}
        const response = await axios.get(`/api/property/${PropertyNo}/item`, options);
        console.log(response?.data);
        setSubCategory(response?.data)
      }
      catch (error) {
        console.log(error);
      }
    }  
    getSubCategoryData()
  },[edit, deletePopup, fetchSubCategory])

  const  createCategoryHandler = () => {
    setShowModal(true)
  }
    
  useEffect(()=>{
    console.log("fetchSubCategory", fetchSubCategory)
  },[fetchSubCategory])
  
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return subcategory?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, subcategory]);
  
  
  return ( 
    <>
      {
        showModal && <SubCategoryModal setShowModal={setShowModal}  
          setfetchSubCategory={ setfetchSubCategory}/>
      }
      <button className="font-normal  bg-green-700 text-[white] flex items-center 
      rounded-md py-2 my-6 text-[13px] px-3 ml-auto
      cursor-pointer opacity-100" onClick={ createCategoryHandler}><span className="text-lg">+</span>Create Sub Category</button>
      {
        edit ? 
          <div>
            <EditSubCategory 
              subcategory={subcategory} 
              setfetchSubCategory={setfetchSubCategory}
              fetchSubCategory={fetchSubCategory}
              setEdit={fun}  
            /> 
          </div> 
          : 
          // <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-2 py-3 md:px-6">
          //   {
          //     subcategory?.map(subcategory => (
          //       <div key={subcategory}>
          //         <SubcategoryCardComponent subcategory={subcategory} 
          //           setEdit={setEdit} 
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
                    <th className="whitespace-normal px-4 py-3">
                  Category
                    </th>
                    <th className="whitespace-normal px-4 py-3">
                  Sub Category
                    </th>
                    <th className="whitespace-normal px-4 py-3">Edit</th>
                    <th className="whitespace-normal px-4 py-3">
                  Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {
                    currentTableData?.map((subcategory, index) => (
                      <tr  key={index} className="hover:dark:hover:bg-gray-600">
                        <SubcategoryCardComponent subcategory={subcategory} 
                          setEdit={setEdit} 
                          deletePopup={deletePopup} 
                          setDeletePopup={setDeletePopup}
                        />
                      </tr>
                    ))
                  }   
                </tbody>
              </table>
            </div>
            <div className="flex flex-col items-center justify-center">
              {subcategory &&
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={subcategory.length}
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
              }
            </div>
          </>
      }
      {/* <DummyTable/> */}
      
    </>
  );
}

export default AddSubCategory