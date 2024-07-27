import React, {useState , useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../components/context/Auth'
import axios from 'axios'

const Orders = () => {
  const {auth,setAuth} = useAuth();
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const { data } = await axios.get('/api/v1/auth/orders');
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if(auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={'User-Orders'}>
    <div className='container-fluid m-3 p-3'>
    <div className='row'>
    <div className='col-md-3'>
        <UserMenu />
    </div>
       <div className='col-md-9'>
        <h1>All Orders</h1>
       </div>
    </div>
    </div>
    </Layout>
  )
}

export default Orders