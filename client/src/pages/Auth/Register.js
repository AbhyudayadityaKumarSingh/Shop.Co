import React, {useState}from 'react'
import Layout from '../../components/Layout/Layout'
import { BiHandicap } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import axios from 'axios'

const Register = () => {
    const [name, setName] = useState('') ;
    const [email, setEmail] = useState('') ;
    const [password, setPassword] = useState('') ;
    const [phone, setPhone] = useState('') ;
    const [address, setAddress] = useState('') ;
    const [answer, setAnswer] = useState('') ;
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
      try{
        const res = await axios.post(`/api/v1/auth/register`, {
            name,
            email,
            password,
            phone,
            address,
            answer
        })
        if(res.data.success){
            toast.success(res.data.message) 
            navigate('/login')
        }
        else{
            toast.error(res.data.message)
        
        }
      }
        catch(error){
            console.log(error)
            toast.error('Something went wrong')
        }
    }

  return (
    <Layout>
        <div className='register'>
            <h1>Register User </h1>

           <form onSubmit={handleSubmit}>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
    <input value={name} onChange={(e)=>setName(e.target.value)} type='text' className='form-control'  required/>
   
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" className="form-control" required id="exampleInputEmail1" aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" className="form-control" id="exampleInputPassword1" required />
  </div>
    <div className="mb-3">
    <label htmlFor='InputPhone' className='form-label'>Phone Number</label>
    <input value={phone} onChange={(e)=>{setPhone(e.target.value)}} type='text' className='form-control' id='InputPhone' required />
    </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Address </label>
    <input value={address} onChange={(e)=>{setAddress(e.target.value)}} type="text" className="form-control" required/>
   
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label"> Write something you would remember </label>
    <input value={answer} onChange={(e)=>{setAnswer(e.target.value)}} type="text" className="form-control" required/>
   
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        </div>
    </Layout>

  )
}

export default Register