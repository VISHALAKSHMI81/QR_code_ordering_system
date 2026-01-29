import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <div style={{ width: '200px', backgroundColor: '#2f3542', color: 'white', padding: '1rem' }}>
                <h3>Admin Panel</h3>
                <nav style={{ marginTop: '2rem' }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '1rem' }}>
                            <Link to="products" style={{ color: 'white', textDecoration: 'none' }}>Products</Link>
                        </li>
                        <li style={{ marginBottom: '1rem' }}>
                            <Link to="orders" style={{ color: 'white', textDecoration: 'none' }}>Orders</Link>
                        </li>
                    </ul>
                </nav>
                <button
                    onClick={handleLogout}
                    style={{ marginTop: '2rem', background: 'none', border: '1px solid white', color: 'white', cursor: 'pointer', padding: '0.5rem' }}
                >
                    Logout
                </button>
            </div>

            <div style={{ flex: 1, padding: '2rem' }}>
                <Routes>
                    <Route path="/" element={<h2>Welcome, Admin</h2>} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="orders" element={<AdminOrders />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboard;
