import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = (props) => {
  return (
    <div>
     <Helmet>
                <meta charSet="utf-8" />
                 <meta name='description' content={props.description} />
                <meta name='keywords' content={props.keywords} />
                <meta name='author' content={props.author} />
                <title>{props.title}</title>
                
            </Helmet>
        <Header />
        <main style={{minHeight : "80vh"}}>
        {props.children}
        <ToastContainer />
        </main>
        <Footer  />
    </div>
  )
}
Layout.defaultProps = {
    title: 'Welcome to E-Commerce',
    description: 'We sell the best products for cheap',
    keywords: 'electronics, buy electronics, cheap electronics',
    author: 'Abhyudayaditya Kumar Singh'
}
export default Layout