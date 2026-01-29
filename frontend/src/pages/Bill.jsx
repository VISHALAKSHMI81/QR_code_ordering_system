import React from 'react';
import { useLocation } from 'react-router-dom';

const Bill = () => {
    const { state } = useLocation();
    const order = state?.order;

    if (!order) return <div>No order found.</div>;

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ border: '2px solid #2f3542', padding: '2rem', borderRadius: '12px', textAlign: 'left' }}>
                <h2 style={{ textAlign: 'center' }}>INVOICE</h2>
                <p><strong>Order ID:</strong> #{order.id}</p>
                <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
                <p><strong>Table:</strong> {order.table_id}</p>
                <hr style={{ margin: '1rem 0' }} />

                {order.items.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{item.product_name} x {item.quantity}</span>
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}

                <hr style={{ margin: '1rem 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Tax (5%)</span>
                    <span>₹{order.tax.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '1rem' }}>
                    <span>Total Paid</span>
                    <span>₹{order.total_amount.toFixed(2)}</span>
                </div>

                <div style={{ marginTop: '2rem', textAlign: 'center', color: '#2ed573' }}>
                    <h3>Order Status: {order.status}</h3>
                    <p>Payment via {order.payment_method}</p>
                </div>
            </div>

            <button
                onClick={() => window.print()}
                style={{ marginTop: '2rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
            >
                Download Bill (Print PDF)
            </button>
        </div>
    );
};

export default Bill;
