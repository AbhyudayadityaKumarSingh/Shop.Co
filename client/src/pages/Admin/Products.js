import React, { useState, useEffect } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:8080/api/v1/product/get-products');
        if (data.success) {
          setProducts(data.products);
          console.log(data.products);
          toast.success('Products loaded successfully');
        }
      } catch (error) {
        console.log(error);
        toast.error('Error loading products');
      }
    };

    getAllProducts();
  }, []);

  // Handle delete product
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:8080/api/v1/product/delete-product/${id}`);
      if (data.success) {
        toast.success('Product deleted successfully');
        setProducts(products.filter(p => p._id !== id));
      }
    } catch (error) {
      console.log(error);
      toast.error('Error deleting product');
    }
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {products.map(p => (
              <div className="card m-3" style={{ width: '18rem' }} key={p._id}>
                <img src={`/api/v1/product/get-product/photo/${p._id}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <p className="card-text"><strong>Price: ${p.price} </strong></p>
                  <p className="card-text">Quantity: {p.quantity}</p>
                  <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'>
                    <button className="btn btn-primary ms-2">Update</button>
                  </Link>
                  <button className="btn btn-danger ms-2" onClick={() => handleDelete(p._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
