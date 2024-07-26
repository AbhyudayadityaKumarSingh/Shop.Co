import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { FaShoppingBag } from "react-icons/fa";
import { Prices } from '../components/Prices';
import { set } from 'mongoose';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState('');
    const [total , setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading , setLoading] = useState(false);

    //get Total Count of Products
    const getTotal = async () => {
      try{ 
        setLoading(true);
        const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
        setLoading(false);
        setTotal(data.total);
      }
      catch(error){
        setLoading(false);
        console.log(error);
    
      }
    };
    //load more
    const loadMore = async () => {
      try{
        setLoading(true);
        const {data} = await axios.get(`/api/v1/product/product-list/${page}`);
        setLoading(false);
        setProducts([...products,...data.products]);
      }
      catch(error){
        console.log(error);
        setLoading(false);
      }
    };

    useEffect(() => {
      getTotal();
    });

    useEffect(() => {
     if(page===1) return 
      loadMore();
    },[page]);

    

    // Fetch all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/get-products');
            setProducts(data.products);
        } catch (error) {
            console.log(error);
        }
    };

    // Fetch all categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-categories');
            setCategories(data.category);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
      if(!checked.length || !radio.length)  getAllProducts();
        getAllCategories();
    }, []);

    // Handle category filter change
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter(c => c !== id);
        }
        setChecked(all);
    };

    // Get filtered products
    useEffect(() => {
        const getFilteredProducts = async () => {
            try {
                const { data } = await axios.post('/api/v1/product/product-filters', { checked, radio });
                setProducts(data.products);
            } catch (error) {
                console.log(error);
            }
        };
        getFilteredProducts();
    }, [checked, radio]); // Trigger this effect only when checked or radio changes

    return (
        <Layout title={"SHOP.Co - Best Offers"}>
            <div className='row mt-3'>
                <div className='col-md-2'>
                    <h4 className='text-center'>Filter by Categories</h4>
                    {categories.map(c => (
                        <div key={c._id} className='form-check ms-3'>
                            <input
                                type='checkbox'
                                className='form-check-input'
                                id={c._id}
                                onChange={(e) => handleFilter(e.target.checked, c._id)}
                            />
                            <label htmlFor={c._id} className='form-check-label'>{c.name}</label>
                        </div>
                    ))}

                    <h4 className='text-center mt-4 '>Filter by Price</h4>
                    <div className='radio-group ms-3'>
                        {Prices?.map(p => (
                            <div key={p._id} className='form-check'>
                                <input
                                    type='radio'
                                    value={JSON.stringify(p.array)}
                                    className='form-check-input'
                                    id={p._id}
                                    name='price-options'  // Ensure all radios are in the same group
                                    onChange={(e) => setRadio(e.target.value)}
                                />
                                <label htmlFor={p._id} className='form-check-label'>{p.name}</label>
                            </div>
                        ))}
                    </div>
                    <button className='btn btn-danger mt-3 ms-3' onClick={(e) =>{
                      window.location.reload();
                    }}>Reset Filters</button>
                </div>
                <div className='col-md-9'>
                    <h1 className='text-center'>All Products</h1>
                    <div className='d-flex flex-wrap'>
                        {products.map(p => (
                            <div className="card m-3" style={{ width: '18rem' }} key={p._id}>
                                <img src={`/api/v1/product/get-product/photo/${p._id}`} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description}</p>
                                    <p className="card-text"><strong>Price: ${p.price}</strong></p>
                                    <p className="card-text">{p.quantity > 0 ? "In Stock" : "Out of Stock"}</p>
                                    <a href="#" className="btn btn-primary">View Product</a>
                                    <a href="#" className="btn btn-secondary ms-2">Add to <FaShoppingBag className='mb-1' /></a>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='m-2 p-3'>
                      {products && products.length < total && (
                        <button className='btn btn-warning' onClick={(e) => {
                          e.preventDefault();
                         
                          setPage(page + 1);
                        }}>{loading ? "Loading ..." : "Load More"}</button>
                      )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default HomePage;
