import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 30000); // Refresh every 30s
        return () => clearInterval(interval);
    }, []);

    const fetchOrders = () => {
        axios.get('http://localhost:5000/api/orders/')
            .then(res => setOrders(res.data))
            .catch(err => console.error(err));
    };

    const updateStatus = (id, status) => {
        axios.put(`http://localhost:5000/api/orders/${id}/status`, { status })
            .then(() => fetchOrders());
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return '#e67e22';
            case 'Paid': return '#2ecc71';
            case 'Completed': return '#3498db';
            case 'Cancelled': return '#e74c3c';
            default: return '#7f8c8d';
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ margin: 0, color: '#2f3542' }}>Live Orders</h2>
                <div style={{ padding: '0.5rem 1rem', background: '#ff4757', color: 'white', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    ● LIVE
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                {orders.map(order => (
                    <div key={order.id} style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                        border: '1px solid #eee',
                        position: 'relative'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1rem' }}>
                            <div>
                                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2f3542' }}>Order #{order.id}</span>
                                <div style={{ fontSize: '0.9rem', color: '#747d8c', marginTop: '0.2rem' }}>Table {order.table_id}</div>
                            </div>
                            <span style={{ fontSize: '0.8rem', color: '#a4b0be' }}>{new Date(order.created_at).toLocaleTimeString()}</span>
                        </div>

                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                            {order.items.map(item => (
                                <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#2f3542' }}>
                                    <span>{item.product_name} x {item.quantity}</span>
                                    <span>₹{item.price * item.quantity}</span>
                                </li>
                            ))}
                        </ul>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                            <div>
                                <div style={{ fontSize: '0.8rem', color: '#a4b0be', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Amount</div>
                                <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#2ecc71' }}>₹{order.total_amount.toFixed(2)}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.8rem', color: '#a4b0be', marginBottom: '0.5rem' }}>Payment: {order.payment_method}</div>
                                <select
                                    value={order.status}
                                    onChange={(e) => updateStatus(order.id, e.target.value)}
                                    style={{
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: '6px',
                                        border: 'none',
                                        background: getStatusColor(order.status),
                                        color: 'white',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        outline: 'none'
                                    }}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {orders.length === 0 && (
                <div style={{ textAlign: 'center', padding: '5rem', color: '#a4b0be' }}>
                    <h3>No active orders at the moment.</h3>
                    <p>When customers place orders, they will appear here in real-time.</p>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
