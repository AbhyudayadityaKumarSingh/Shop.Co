import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { FaUserGroup } from "react-icons/fa6";
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../../components/context/Auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/login`, {
        email,
        password,
      });
      if (res.status === 200) {
        toast.success('User Logged in Successfully');
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('auth', JSON.stringify({
          user: res.data.user,
          token: res.data.token,
        }));
        navigate(location.state || '/');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout>
      <div className='d-flex justify-content-center align-items-center' style={{ marginBottom: '-120px' }}>
        <FaUserGroup style={{ fontSize: '4rem' }} />
      </div>
      <div className='register'>
        <h1 style={{ marginBottom: '20px' }}>Login User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              required
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <div className='mb-3'>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password
            </button>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
