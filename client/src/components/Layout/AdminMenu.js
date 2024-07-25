import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <>
  <div className='text-center'>

            
<div className="list-group">
<h3>Admin Panel</h3>
  <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action active" aria-current="true">
   Profile
  </NavLink>
  <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">Orders</NavLink>

  
 
</div>
  </div>



    </>
  )
}

export default AdminMenu