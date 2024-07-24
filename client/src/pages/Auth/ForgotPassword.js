import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [answer, setAnswer] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/forgot-password', {
                email,
                newPassword,
                answer
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate(location.state?.from || '/login'); // Use location.state?.from if available
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        }
    };

    return (
        <Layout title={'Forgot Password - Shop.io'}>
            <div className='register'>
                <h1>Forgot Password</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="form-control"
                            required
                            id="email"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">New Password</label>
                        <input
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            type="password"
                            className="form-control"
                            id="newPassword"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="answer" className="form-label">Enter your Secret Answer</label>
                        <input
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            id="answer"
                            aria-describedby="emailHelp"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Reset Password</button>
                </form>
            </div>
        </Layout>
    );
};

export default ForgotPassword;
