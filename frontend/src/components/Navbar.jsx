import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
                QR Order System
            </Link>
            <Link to="/admin/login" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>
                Admin
            </Link>
        </nav>
    );
};

export default Navbar;
