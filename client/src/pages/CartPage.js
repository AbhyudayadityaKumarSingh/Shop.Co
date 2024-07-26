import React from 'react';
import Layout from '../components/Layout/Layout';
import { useCart } from '../components/context/Cart';
import { useAuth } from '../components/context/Auth';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const { auth } = useAuth();
    const { cart, setCart } = useCart();
    const navigate = useNavigate();

    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='text-center bg-light p-2 mb-2'>
                            {`Hello ${auth?.token && auth?.user.name}`}
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
                                <div className='col-md-4' key={c._id}>
                                    <div className='card'>
                                        <img src={`/api/v1/product/get-product/photo/${c._id}`} className="card-img-top" alt={c.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{c.name}</h5>
                                            <p className="card-text"><strong>Price: ${c.price}</strong></p>
                                            <button className='btn btn-danger' onClick={() => removeCartItem(c._id)}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='col-md-3 text-center'>
                         <h4>Order Summary</h4>
                        <p>{`Total Items: ${cart.length}`}</p>
                        <hr />
                        <h5>{`Total Amount: $${cart.reduce((acc, item) => acc + item.price, 0)}`}</h5>
                        <button className='btn btn-primary' onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
                         <hr/>
                        {auth?.user?.address ? (
                    <div className='col-md-12'>
                        <h6>Delivery Address :</h6>
                        <p>{auth?.user?.address}</p>
                        <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Change Address</button>
                    </div>
                     ) : (
                    <div className='col-md-12'>
                        
                        <button className='btn btn-warning' onClick={() => navigate('/login')}>Login to Checkout</button>
                    </div>
                     )}
                    </div>
                     

                </div>

            </div>
        </Layout>
    );
}

export default CartPage;
