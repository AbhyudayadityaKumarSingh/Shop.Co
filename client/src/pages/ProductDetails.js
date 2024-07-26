import React ,{useState , useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
   //initial details
    useEffect(() => {
      if(params?.slug)  getProductDetails();
    }
    ,[params?.slug]);
  //get Product Details
  const getProductDetails = async () => {
    try{
      const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      if(data.success){
        console.log(data.product);
        setProduct(data.product);
        getSimilarProducts(data.product._id,data.product.category._id);
      }
    }
    catch(error){
      console.log(error);
    }
  } ;
  //get Related Products
  const getSimilarProducts = async (pid,cid) => {
      try{
        const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`); 
        setRelatedProducts(data.products);
      }
      catch(error){
        console.log(error);
      }
  } ;

  return (
    <Layout>
        <div className='row container mt-2'>
          <div className='col-md-6 '>

          <img src={`/api/v1/product/get-product/photo/${product._id}`} alt={product.name} />
           
          
          </div>
          <div className='col-md-6 text-center'>
            <h1 className='mb-5'> Product Details </h1>
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p>Price: <strong>${product.price} </strong></p>
            <p>Category: {product.category && product.category.name}</p>
            <p>Quantity: {product.quantity}</p>

            <button className='btn btn-primary'>Add to Cart</button>
            
          </div>

        </div>

        <div className='row container'>
            <h6>Similar Products</h6>
            {relatedProducts.length === 0 && <p className='text-center'>No Similar Products Found </p>}
            
            {relatedProducts.map(p => (
              <div className="card m-3" style={{ width: '18rem' }} key={p._id}>
                <img src={`/api/v1/product/get-product/photo/${p._id}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <p className="card-text"><strong>Price: ${p.price} </strong></p>
                  <p className="card-text">Quantity: {p.quantity}</p>

                  <a href="#" className="btn btn-primary" onClick={()=> {navigate(`/api/v1/product/${p.slug}`)}}>View Product</a>
                  


                  
                </div>
              </div>
            ))}
            
        </div>
    </Layout>
  )
}

export default ProductDetails