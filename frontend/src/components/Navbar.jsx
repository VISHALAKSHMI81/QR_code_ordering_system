import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link to="/" className="navbar-brand">QR Order</Link>
                <div className="navbar-links">
                    <Link to="/">Menu</Link>
                    <Link to="/admin/login">Admin Dashboard</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
