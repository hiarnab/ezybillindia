
import React from "react";
import CategoryModal from "../components/CategoryModal.jsx";
import { useEffect, useState } from "react";
import CategoryCardComponent from "../components/CategoryCardComponent.jsx";
import { useSelector } from "react-redux";
import axios from "../api/axios";
import EditCategory from "../components/EditCategory.jsx";




const AddCategory = () => {
  const [showModal, setShowModal] = useState(false)
  const [category, setCategory] = useState(null) 
  const [indCategory, setIndCategory] = useState(null)
  const [fetchCategory, setfetchCategory] = useState(false) 
  const PropertyNo = useSelector(store => store?.property?.propertyNumber)
  const accessToken = useSelector(store => store?.login?.userData[0])
  const [edit, setEdit] = useState(false)
  const [deletePopup, setDeletePopup] = useState(false)

  useEffect(()=>{
    console.log(edit)
  },[edit])
  const fun = () => {
    setEdit(false)
  }
  useEffect(()=>{
    console.log(edit, PropertyNo)
    if(edit === false)
    {
      const getCategoryData = async () => {
        try {
          const options = {
            headers: {
              "Authorization": `Bearer ${accessToken}`
            }}
          const response = await axios.get(`/api/property/${PropertyNo}/itemCategory`, options);
          console.log(response?.data);
          setCategory(response?.data)
        }
        catch (error) {
          console.log(error);
        }
      }
      getCategoryData() 
    }
  },[edit])
    
  useEffect(()=>{
    console.log("useEffect")
    const getCategoryData = async () => {
      try {
        const options = {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }}
        const response = await axios.get(`/api/property/${PropertyNo}/itemCategory`, options);
        console.log(response?.data);
        setCategory(response?.data)
      }
      catch (error) {
        console.log(error);
      }
    }
    getCategoryData()
  },[]) 

  useEffect(()=>{
    const getCategoryData = async () => {
      try {
        const options = {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }}
        const response = await axios.get(`/api/property/${PropertyNo}/itemCategory`, options);
        console.log(response?.data);
        setCategory(response?.data)
      }
      catch (error) {
        console.log(error);
      }
    }
    getCategoryData()
  },[fetchCategory, deletePopup]) 

  useEffect(()=>{
    console.log("Category....",category)
  },[category])

  const  createCategoryHandler = () => {
    setShowModal(true)
  }
    
  return ( 
    <>
      {
        showModal && <CategoryModal setShowModal={setShowModal} setfetchCategory={setfetchCategory}/>
      }
   
      <button className="font-normal  bg-green-700 text-[white] flex items-center 
      rounded-md py-2 my-6 text-[13px] px-3 ml-auto
      cursor-pointer opacity-100" onClick={ createCategoryHandler}> <span className="text-lg">+</span>Create Category</button>
      {
        edit ? 
          <div>
            <EditCategory 
              category={category} 
              indCategory={indCategory}  
              setfetchCategory={setfetchCategory}
              setEdit={fun}
            />
          </div> 
          : 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-2 py-3 md:px-6">
            {
              category?.map(category => (
                <div  key={category}>
                  <CategoryCardComponent 
                    category={category} 
                    setEdit={setEdit}
                    deletePopup={deletePopup} setDeletePopup={setDeletePopup}
                    setIndCategory={setIndCategory}/>
                </div>
              ))
            }   
          </div>
      }
    
    </> 
   
  );
}

export default AddCategory