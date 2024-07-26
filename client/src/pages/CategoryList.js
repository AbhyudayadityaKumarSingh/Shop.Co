import React ,{useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useParams ,useNavigate } from 'react-router-dom';
import { FaShoppingBag } from "react-icons/fa";

const CategoryList = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category , setCategory] = useState({});
    const getProductsByCat = async () => {
        try{
            const {data} = await axios.get(`/api/v1/product/product-category/${params.slug}`);
            setProducts(data?.products); 
            setCategory(data?.category);
        }
        catch(error){
            console.log(error);
        }
    } ;

    useEffect(() => {
        getProductsByCat();
    },[params.slug]);

  return (
    <Layout>
        <div className='container mt-3'>
            <h2 className='text-center'> Category : {category?.name} </h2>
            <h6 className='text-center'>{category?.length} Results Found</h6>
            <div className='row container'>
            <div className='d-flex flex-wrap'>
                        {products.map(p => (
                            <div className="card m-3" style={{ width: '18rem' }} key={p._id}>
                                <img src={`/api/v1/product/get-product/photo/${p._id}`} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description}</p>
                                    <p className="card-text"><strong>Price: ${p.price}</strong></p>
                                    <p className="card-text">{p.quantity > 0 ? "In Stock" : "Out of Stock"}</p>
                                    <a href="#" className="btn btn-primary" onClick={()=> {navigate(`product/${p.slug}`)}}>View Product</a>
                                    <a href="#" className="btn btn-secondary ms-2">Add to <FaShoppingBag className='mb-1' /></a>
                                </div>
                            </div>
                        ))}
                    </div>

            </div>
        </div>
    </Layout>
  )
}

export default CategoryList