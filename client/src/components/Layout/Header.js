import React from 'react';
import { Link } from 'react-router-dom';
import { CiShoppingTag } from 'react-icons/ci';
import { useAuth } from '../context/Auth';
import toast from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';
import useCategory from '../hooks/useCategory';
import { useCart } from '../context/Cart';
import { FiShoppingCart } from "react-icons/fi";

const Header = () => {
    const { auth, setAuth } = useAuth();
    const { cart } = useCart();
    const categories = useCategory();

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: null
        });
        localStorage.removeItem('auth');
        toast.success('Logout successfully');
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <CiShoppingTag /> SHOP.CO
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <SearchInput />
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle"
                                 to={"/categories "} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </Link>
                                <ul className="dropdown-menu">
                                    {categories?.map(c => (
                                        <li key={c._id}>
                                        <Link className="dropdown-item" to={'/categories'}>
                                                All Categories
                                            </Link>
                                            <Link className="dropdown-item" to={`/category/${c.slug}`}>
                                                {c.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            {!auth.user ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {auth.user.name}
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link to={`/dashboard/${auth.user.role === 1 ? 'admin' : 'user'}`} className="dropdown-item">
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" onClick={handleLogout} to="/login">Logout</Link>
                                            </li>
                                        </ul>
                                    </li>
                                </>
                            )}
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart"> {<FiShoppingCart/>} Cart({cart?.length})</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
