import React ,{useState,useEffect} from 'react'
import useCategory from '../components/hooks/useCategory'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom';


const Categories = () => {
    const categories = useCategory();   

  return (
    <Layout title={"All Catrgories"}>
        <div className='container'>
         
            <div className='row'>
               {categories.map((c)=>(
                <div className='col-md-6 mt-5 mb-3  gx-3 gy-3' >
                    <button className='btn btn-primart text-light' key={c._id}>
                        <Link to={`/category/${c.slug}`} className='btn btn-primary'>{c.name}</Link>
                    </button>
                </div>
               ))}
                
            </div>
        </div>
    </Layout>
  )
}

export default Categories