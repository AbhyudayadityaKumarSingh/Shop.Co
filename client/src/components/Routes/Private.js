import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/Auth';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const { auth, setAuth } = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get(`/api/v1/auth/user-auth`);
                if (res.data.ok) {
                    setOk(true);
                } else {
                    setAuth({
                        ...auth,
                        user: null,
                        token: null
                    });
                    localStorage.removeItem('auth');
                    setOk(false);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                setAuth({
                    ...auth,
                    user: null,
                    token: null
                });
                localStorage.removeItem('auth');
                setOk(false);
            }
        };

        if (auth?.token) {
            authCheck();
        }
    }, [auth, setAuth]);

    return ok ? <Outlet /> : <Spinner />;
}
