import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';

const navLinkStyle = {
    display: 'block',
    padding: '1rem 2rem',
    color: '#a4b0be',
    textDecoration: 'none',
    fontSize: '1.1rem',
    transition: '0.3s',
    borderLeft: '4px solid transparent',
};

const StatCard = ({ title, value, color }) => (
    <div style={{
        padding: '1.5rem',
        background: 'white',
        borderLeft: `5px solid ${color}`,
        borderRadius: '10px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
    }}>
        <h4 style={{ color: '#777', margin: 0 }}>{title}</h4>
        <h2 style={{ margin: '0.5rem 0', color: '#2f3542' }}>{value}</h2>
    </div>
);

const DashboardStats = () => (
    <div>
        <h2 style={{ marginBottom: '2rem' }}>Dashboard Overview</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            <StatCard title="Total Orders" value="128" color="#ff4757" />
            <StatCard title="Revenue" value="₹12,450" color="#2ecc71" />
            <StatCard title="Products" value="24" color="#3498db" />
        </div>
        <div style={{ marginTop: '3rem', padding: '2rem', background: '#f9f9f9', borderRadius: '10px' }}>
            <p style={{ color: '#777' }}>Select a category from the sidebar to manage your shop. You can view all orders and manage your product menu easily.</p>
        </div>
    </div>
);

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f7f6' }}>
            {/* Sidebar */}
            <div style={{
                width: '260px',
                backgroundColor: '#2f3542',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh',
                zIndex: 1000
            }}>
                <div style={{ padding: '2rem', textAlign: 'center', borderBottom: '1px solid #3e444e' }}>
                    <h2 style={{ margin: 0, color: '#ff4757', letterSpacing: '1px' }}>ADMIN</h2>
                    <p style={{ fontSize: '0.8rem', color: '#747d8c', marginTop: '0.5rem' }}>Management Panel</p>
                </div>

                <nav style={{ flex: 1, paddingTop: '1.5rem' }}>
                    <Link to="/admin/dashboard" style={navLinkStyle}>📊 Dashboard</Link>
                    <Link to="products" style={navLinkStyle}>🍔 Products</Link>
                    <Link to="orders" style={navLinkStyle}>📑 Orders</Link>
                </nav>

                <div style={{ padding: '2rem' }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            width: '100%',
                            padding: '0.8rem',
                            background: 'rgba(255, 71, 87, 0.1)',
                            border: '1px solid #ff4757',
                            color: '#ff4757',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            transition: '0.3s'
                        }}
                    >
                        🚪 Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, marginLeft: '260px', padding: '1.5rem' }}>
                <div style={{
                    background: 'white',
                    borderRadius: '15px',
                    padding: '2.5rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                    minHeight: 'calc(100vh - 3rem)'
                }}>
                    <Routes>
                        <Route path="/" element={<DashboardStats />} />
                        <Route path="products" element={<AdminProducts />} />
                        <Route path="orders" element={<AdminOrders />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
