import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../components/context/Auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Profile = () => {
    //context
    const {auth ,setAuth} = useAuth() ;

    //state
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
      const {data} = await axios.put(`/api/v1/auth/update-profile`, {
          name,
          email,
          password,
          phone,
          address,
          answer
      })
      if(data.success){
          toast.success(data.message) 
          setAuth({...auth,user:data.user})
          let ls = localStorage.getItem('auth');
          ls = JSON.parse(ls);
          ls.user = data.user;
          localStorage.setItem('auth',JSON.stringify(ls));
          toast.success('Profile Updated Successfully')
          navigate(`/dashboard/${auth?.user.name}`)
      }
      else{
          toast.error(data.message)
      }
     
    }
      catch(error){
          console.log(error)
          toast.error('Something went wrong')
          
      }
  };

  //get user data
  useEffect(() => {
    const {email,name,phone,address, password} = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
 
   

  },[auth?.user]);

  return (
   <Layout title={'User-Profile'}>
        <div className='container-fluid m-3 p-3'>
        <div className='row'>
        <div className='col-md-3'>
        <UserMenu />
        </div>
        <div className='col-md-9'>
          <div className='card w-75 p-3'> 
           <h3>Update Profile</h3>

          <form onSubmit={handleSubmit}>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
    <input value={name} onChange={(e)=>setName(e.target.value)} type='text' className='form-control'  />
   
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input value={email} disabled onChange={(e)=>{setEmail(e.target.value)}} type="email" className="form-control"  id="exampleInputEmail1" aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" className="form-control" id="exampleInputPassword1"  />
  </div>
    <div className="mb-3">
    <label htmlFor='InputPhone' className='form-label'>Phone Number</label>
    <input value={phone} onChange={(e)=>{setPhone(e.target.value)}} type='text' className='form-control' id='InputPhone'  />
    </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Address </label>
    <input value={address} onChange={(e)=>{setAddress(e.target.value)}} type="text" className="form-control" />
   
  </div>

  
 
  <button type="submit" className="btn btn-primary">Update</button>
</form>


          </div>
        </div>
        </div>
        </div>  

   </Layout>
  )
}

export default Profile