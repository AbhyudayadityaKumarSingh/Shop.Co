import React ,{useState,useEffect}from 'react'
import toast from 'react-hot-toast'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import { get } from 'mongoose'

const CreateCategory = () => {
  const [categories,setCategories] = useState([]);

  //get all categories
  const getAllCategories = async () => {
    try {
     const { data } = await axios.get(`/api/v1/category/categories`);

      if(data.success){
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error Loading Categories');
    }
  };

  useEffect(() => {
     getAllCategories();
  }, []);
  return (
    
    <Layout title={'Dashboard - Create Category'}>
            <div className='container-fluid m-3 p-3'>
    <div className='row'>
    <div className='col-md-3'>
    <AdminMenu />

    </div>
    <div className='col-md-9'>
     <h1>Create and Manage Categories</h1>
    </div>
    <div>
<table className="table">
  <thead>
    <tr>
     
      <th scope="col">Name</th>
      <th scope="col">Actions</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    
    <tr>
   
     
    </tr>
  </tbody>
</table>

    </div>

    </div>
    </div>
    </Layout>
   
  )
}

export default CreateCategory