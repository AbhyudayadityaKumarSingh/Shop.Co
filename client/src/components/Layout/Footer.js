import React from 'react' 
import { Link } from 'react-router-dom'

const Footer = () => {
    const year = new Date().getFullYear()
  return (
    <div className='bg-dark text-light p-3 footer'>
        <p className='text-left' style={{minHeight : "5vh"}}>Developed by  : Abhyudayaditya Kumar Singh</p>
        <p className='text-center'>{year} All Rights Reserved &copy;</p>
        <p className='text-center'>
        <Link to="/about" >About Me</Link> |
        <Link to="/contact" >Contact Us</Link> | 
        
        <Link to="/policy" >Privacy Policy</Link>

        </p>
    </div>
  )
}

export default Footer