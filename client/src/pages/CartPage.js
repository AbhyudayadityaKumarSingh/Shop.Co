import React ,{useState, useEffect} from 'react';
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
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
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

    //get payment gateway token
    const getToken = async () => {
        try{
            const {data} = await axios.post('/api/v1/product/braintree/token');
            setClientToken(data.clientToken);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getToken();
    },
    [auth?.token]);

const handlePayment = async () => {
    try{
        setLoading(true);
        const {nonce} = await instance.requestPaymentMethod();
        const {data} = await axios.post('/api/v1/product/braintree/payment', {nonce, amount: cart.reduce((acc, item) => acc + item.price, 0)});
        setLoading(false);
        localStorage.removeItem('cart');
        setCart([]);
        navigate('/dashboard/user/order');
        toast.success('Payment Successfull');
    }
    catch(error){
        console.log(error);
        setLoading(false);
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
                        <hr />
                     <div className='mt-2'>
                        {!clientToken || !cart?.length ? ("") : (
                            <>
                            <DropIn
                            options={{ 
                                authorization: clientToken,
                                paypal: {
                                    flow: 'vault'
                                }
                                }}
                            onInstance={(instance) => setInstance(instance)}
                        />
                        <button className='btn btn-primary' onClick={handlePayment}
                        disabled={ !loading || !instance || !auth.user?.address  }
                        > {loading ? "Processing...." : "Make Payment" } </button>
                            </>
                        )}
                        
                     </div>
                    </div>

                     

                </div>

            </div>
        </Layout>
    );
}

export default CartPage;
