import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const { state } = useLocation();
    const [cart, setCart] = useState(state?.cart || {});
    const [tableId, setTableId] = useState('1'); // Default table
    const [paymentMethod, setPaymentMethod] = useState('Cash');
    const navigate = useNavigate();

    const cartItems = Object.values(cart);
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const placeOrder = () => {
        const orderData = {
            table_id: tableId,
            payment_method: paymentMethod,
            items: cartItems.map(item => ({
                product_id: item.id,
                quantity: item.quantity
            }))
        };

        axios.post('http://localhost:5000/api/orders/', orderData)
            .then(res => {
                navigate(`/bill/${res.data.id}`, { state: { order: res.data } });
            })
            .catch(err => console.error(err));
    };

    if (cartItems.length === 0) return <div className="p-4">Your cart is empty.</div>;

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Your Order</h2>
            <div style={{ margin: '1rem 0' }}>
                {cartItems.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span>{item.name} x {item.quantity}</span>
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
                <hr />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginTop: '1rem' }}>
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                </div>
            </div>

            <div style={{ margin: '2rem 0' }}>
                <label>Table Number: </label>
                <input type="text" value={tableId} onChange={(e) => setTableId(e.target.value)} style={{ width: '50px' }} />

                <div style={{ marginTop: '1rem' }}>
                    <p>Payment Method:</p>
                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value="Cash">Cash</option>
                        <option value="UPI">UPI</option>
                        <option value="Card">Card</option>
                    </select>
                </div>
            </div>

            <button
                onClick={placeOrder}
                style={{ width: '100%', backgroundColor: '#ff4757', color: 'white', border: 'none', padding: '1rem', borderRadius: '8px' }}
            >
                Confirm Order
            </button>
        </div>
    );
};

export default Cart;
