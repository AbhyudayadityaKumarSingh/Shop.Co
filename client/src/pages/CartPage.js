import React from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../components/context/Cart';
import { useAuth } from '../components/context/Auth';
import { useNavigate } from 'react-router-dom';
const CartPage = () => {
   const {auth , setAuth} = useAuth();
    const {cart , setCart} = useCart(); 
    const navigate = useNavigate(); 
  return (
    <Layout>
        <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <h1 className='text-center bg-light p-2 mb-2'>
                    {`Hello ${auth?.token && auth?.user.name} `}
                </h1>
                <h4 className='text-center'>
                     {`You have ${cart?.length} items in your cart`} 
                </h4>
              </div>
            </div>
            <div className='row'>
                <div className='col-md-9'>
                    Cart Items
                    <div className='row'>
                        {cart.map((c) => (
                            <div className='col-md-4'>
                                <div className='card' key={c._id}>
                                    <img src={`/api/v1/product/get-product/photo/${c._id}`} className="card-img-top" alt={c.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{c.name}</h5>
                                        <p className="card-text">{c.description}</p>
                                        <p className="card-text"><strong>Price: ${c.price}</strong></p>
                                        <p className="card-text">{c.quantity > 0 ? "In Stock" : "Out of Stock"}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='col-md-3'>
                    <button className='btn btn-primary' onClick={()=> navigate('/checkout')}>Proceed to Checkout</button>

                </div>  
            </div>
        </div>
    </Layout>
  )
}

export default CartPage