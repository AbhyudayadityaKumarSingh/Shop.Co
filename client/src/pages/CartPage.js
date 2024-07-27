import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useCart } from '../components/context/Cart';
import { useAuth } from '../components/context/Auth';
import { useNavigate } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const CartPage = () => {
    const { auth } = useAuth();
    const { cart, setCart } = useCart();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            toast.success('Item removed from cart');
        } catch (error) {
            toast.error('Error removing item from cart');
            console.log(error);
        }
    };

    const getToken = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/braintree/token');
            console.log('Fetched clientToken:', data.token);
            setClientToken(data.token);
        } catch (error) {
            toast.error('Error fetching payment token');
            console.log(error);
        }
    };

    useEffect(() => {
        getToken();
    }, [auth?.token]);

    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post('/api/v1/product/braintree/payment', { nonce, amount: calculateTotalAmount(), cart });
            setLoading(false);
            localStorage.removeItem('cart');
            setCart([]);
            navigate('/dashboard/user/orders');
            toast.success('Payment Successful');
        } catch (error) {
            toast.error('Payment failed');
            console.log(error);
            setLoading(false);
        }
    };

    const emptyCart = () => {
        localStorage.removeItem('cart');
        setCart([]);
        toast.success('Cart emptied');
    };

    const calculateTotalAmount = () => cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='text-center bg-light p-2 mb-2'>
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className='text-center'>
                            {`You have ${cart?.length} items in your cart`}
                        </h4>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-9'>
                        <button className='btn btn-outline-danger mb-3' onClick={emptyCart}>Empty Cart</button>
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
                        {auth?.user?.address ? (
                            <div className='col-md-12'>
                                <h6>Delivery Address:</h6>
                                <p>{auth?.user?.address}</p>
                                <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Change Address</button>
                            </div>
                        ) : (
                            <div className='col-md-12'>
                                <button className='btn btn-warning' onClick={() => navigate('/login')}>Login to Checkout</button>
                            </div>
                        )}
                        <hr/>
                        <h5>{`Total Amount: $${calculateTotalAmount()}`}</h5>
                        <div className='mt-2'>
                            {clientToken && (
                                <>
                                    <DropIn options={{ authorization: clientToken }} onInstance={(instance) => {
                                        console.log('DropIn instance:', instance);
                                        setInstance(instance);
                                    }} />
                                    <button className='btn btn-primary' onClick={handlePayment} disabled={loading || !instance}>
                                        {loading ? 'Processing...' : 'Pay Now'}
                                    </button>
                                </>
                            )}
                            {!clientToken && <p>Loading payment options...</p>}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
