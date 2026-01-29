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

    return (
        <div>
            <h3>Live Orders</h3>
            {orders.map(order => (
                <div key={order.id} style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>Order #{order.id} - Table {order.table_id}</strong>
                        <span>{new Date(order.created_at).toLocaleTimeString()}</span>
                    </div>
                    <ul>
                        {order.items.map(item => (
                            <li key={item.id}>{item.product_name} x {item.quantity}</li>
                        ))}
                    </ul>
                    <p>Total: ₹{order.total_amount.toFixed(2)} (via {order.payment_method})</p>
                    <div style={{ marginTop: '0.5rem' }}>
                        Status:
                        <select value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)}>
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminOrders;
