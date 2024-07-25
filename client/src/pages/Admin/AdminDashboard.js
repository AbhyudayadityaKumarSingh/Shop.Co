import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../components/context/Auth'

export const AdminDashboard = () => {
    const {auth ,setAuth} = useAuth()
  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
          <AdminMenu />
          </div>
            <div className="col-md-9">
            <div className='card'>
                <h1>Admin Name : {auth?.user?.name}</h1>
                <h4>Email : {auth?.user?.email}</h4>
                <h4>Contact : {auth?.user?.phone}</h4>

            </div>
           
            </div>

         
        </div>
      </div>

    </Layout>
  )
}
