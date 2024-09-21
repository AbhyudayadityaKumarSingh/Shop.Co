import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { CategoryForm } from '../../components/Form/CategoryForm';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:8080/api/v1/category/create-category', { name });
      if (data.success) {
        toast.success('Category Created Successfully');
        setName('');
        getAllCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error('Error in creating category');
    }
  };

  // Handle update form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await axios.put(`http://localhost:8080/api/v1/category/update-category/${selected._id}`, { name: updateName });
      if (data.success) {
        toast.success('Category Updated Successfully');
        getAllCategories();
        setShow(false);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error updating category');
    }
  };

  // Handle delete category
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:8080/api/v1/category/delete-category/${id}`);
      if (data.success) {
        toast.success('Category Deleted Successfully');
        getAllCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error('Error Deleting Category');
    }
  };

  // Get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-categories');
      if (data.success) {
        setCategories(data.category);
        toast.success(`${name} is loaded`);
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
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1> Manage Categories</h1>
            <div className="p-3 w-50">
              <CategoryForm name={name} setName={setName} handleSubmit={handleSubmit} /> {/* Pass props here */}
            </div>

            <div className='w-75'>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <tr key={category._id}>
                        <td>{category.name}</td>
                        <td>
                          <Button
                            variant="primary"
                            className="ms-2"
                            onClick={() => {
                              setSelected(category);
                              setUpdateName(category.name);
                              setShow(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button variant="danger" className="ms-2" onClick={() => handleDelete(category._id)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">No categories available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal */}
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CategoryForm name={updateName} setName={setUpdateName} handleSubmit={handleUpdate} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Layout>
  );
};

export default CreateCategory;