import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select, MenuItem, TextField, Button, InputLabel, FormControl, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");

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

  // Get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/get-product/${params.slug}`);
      if (data.success) {
        setName(data.product.name);
        setId(data.product._id);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        setCategory(data.product.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error in getting single product');
    }
  };

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line
  }, []);

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('category', category);
    formData.append('photo', photo);

  
      const { data } = await axios.put(`/api/v1/product/update-product/${id}`, formData, 
);

      if (data.success) {
        toast.success('Product updated successfully');
        setName('');
        setDescription('');
        setPrice('');
        setQuantity('');
        setCategory('');
        setPhoto('');
        // Clear form or redirect as needed
      } else {
        toast.error('Failed to update product');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to update product');
    }
  };

  return (
    <Layout title={'Dashboard - Update Product'}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1>Update Product</h1>
            <form onSubmit={handleUpdate} className='m-1 w-75'>
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
                <Box display="flex" alignItems="center">
                  <InputLabel style={{ marginRight: 10 }}>Photo</InputLabel>
                  <TextField
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    fullWidth
                  />
                </Box>
                <div className='mt-3'>
                  {photo && <img src={URL.createObjectURL(photo)} alt="product" style={{ width: 100, height: 100 }} />}
                </div>
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
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: 16 }}>
                Update Product
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
