import React from 'react'
import Layout from '../components/Layout/Layout'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaBackward } from "react-icons/fa6";
const PageNotFound = () => {
  return (
    <Layout>
    <FaBackward/>
    <Link to='/' className='pnf-btn p-3' >Go Back</Link>
      <div className='text-center p-5'>
        
          
        <h1>Error 404: Page Not Found</h1>
        <p>Sorry, we couldn't find the page you were looking for :'(</p>
        <Image src='/Dog-on-computer-scaled.jpeg' style={{ width: '50%' }}   className='p-10' fluid />
      </div>
    </Layout>
  )
}

export default PageNotFound
