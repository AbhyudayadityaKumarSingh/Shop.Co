import React from 'react'
import { NavLink } from 'react-router-dom' 
import { CiShoppingTag } from "react-icons/ci";
import { useAuth } from '../context/Auth';

const Header = () => {
    const {auth, setAuth} = useAuth()
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: null
        })
        localStorage.removeItem('auth')
    }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
          <CiShoppingTag />  E-Commerce </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/category">Category</NavLink>
              </li>
              {
                !auth.user ? (<>
                    <li className="nav-item">
                <NavLink className="nav-link" to="/register">Register</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </li>
              
                </>) : (
                    <>
                    <li className="nav-item">
                <NavLink className="nav-link" onClick={handleLogout} to="/login">Logout</NavLink>
              </li>
                    </>
                ) 
              }
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">Cart(0)   </NavLink>
              </li>
             
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
