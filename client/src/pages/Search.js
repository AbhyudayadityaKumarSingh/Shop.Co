import React from 'react';
import Layout from '../components/Layout/Layout';
import { useSearch } from '../components/context/Search';

const Search = () => {
  const { values, setValues } = useSearch();

  return (
    <Layout title={"Search Result"}>
      <div className="container">
        <div className='text-center'>
          <h1>Search Results</h1>
          <h6>
            {values?.results?.length < 1 
              ? 'No Product Found' 
              : `Found ${values?.results?.length} products`}
          </h6>
        </div>
        <div className='d-flex flex-wrap mt-4'>
            {values?.results?.map((product) => (
                <div className='card m-3' style={{ width: '18rem' }} key={product._id}>
                <img src={`/api/v1/product/get-product/photo/${product._id}`} className='card-img-top' alt={product.name} />
                <div className='card-body'>
                    <h5 className='card-title'>{product.name}</h5>
                    <p className='card-text'>{product.description}</p>
                    <p className='card-text'><strong>Price: ${product.price}</strong></p>
                    <p className='card-text'>Quantity: {product.quantity}</p>
                </div>
                </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;