import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
const Dashboard = () => {
  return (
    <Layout title={"Dashboard- E-Commerce"}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
           <UserMenu  />
          </div>
          <div className='col-md-3'>
            <h1>Dashboard</h1>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard


//This is a protected route, only accessible to authenticated users.