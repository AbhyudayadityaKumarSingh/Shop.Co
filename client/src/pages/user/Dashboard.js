import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../components/context/Auth'
const Dashboard = () => {
  const { auth } = useAuth();
  return (
    <Layout title={"Dashboard- E-Commerce"}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
           <UserMenu  />
          </div>
          <div className='col-md-3'>
         
            <h1> Welcome {auth?.user?.name} 
            </h1>
            <h3 className='mt-5'>Mail Id :{auth?.user.email} </h3>
            <h3> Location  : {auth?.user.address}  </h3>


          </div>

          <div className='col-md-6'>
                    </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard


//This is a protected route, only accessible to authenticated users.