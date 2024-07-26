import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select, MenuItem, TextField, Button, InputLabel, FormControl } from '@mui/material';

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [category, setCategory] = useState("");

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-categories');
      if (data.success) {
        setCategories(data.category);
        toast.success('Categories loaded');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error Loading Categories');
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('quantity', quantity);
   
    formData.append('category', category);
    formData.append('photo', photo);

    try {
      const { data } = await axios.post('http://localhost:8080/api/v1/product/create-product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.success) {
        toast.success('Product created successfully');
        setName('');
        setDescription('');
        setPrice('');
        setQuantity('');
        setCategory('');
        setPhoto('');
        // Clear form or redirect as needed
      } else {
        toast.error('Failed to create product');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to create product');
    }
  };

  return (
    <Layout title={'Dashboard - Create Product'}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1>Manage Products</h1>
            <form onSubmit={handleSubmit} className='m-1 w-75'>
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.length > 0 ? (
                    categories.map((c) => (
                      <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No categories available</MenuItem>
                  )}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel style={{ marginBottom: 8 }}>Photo</InputLabel>
                <TextField
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  fullWidth
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Product Name"
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Description"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Product Description"
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Product Price"
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Product Quantity"
                />
              </FormControl>
              {/* <FormControl fullWidth margin="normal">
                <InputLabel>Shipping</InputLabel>
                <Select
                  value={shipping}
                  onChange={(e) => setShipping(e.target.value)}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl> */}
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: 16 }}>
                Create Product
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
