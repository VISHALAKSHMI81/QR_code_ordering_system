import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/products/')
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    }, []);

    const addToCart = (product) => {
        setCart(prev => {
            const newCart = { ...prev };
            if (newCart[product.id]) {
                newCart[product.id].quantity += 1;
            } else {
                newCart[product.id] = { ...product, quantity: 1 };
            }
            return newCart;
        });
    };

    const cartCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="menu-page">
            <h2>Our Menu</h2>
            <div className="product-list">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.image || 'https://via.placeholder.com/80'} alt={product.name} className="product-image" />
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p>{product.category}</p>
                            <p className="price">₹{product.price}</p>
                        </div>
                        <button className="add-btn" onClick={() => addToCart(product)}>Add</button>
                    </div>
                ))}
            </div>

            {cartCount > 0 && (
                <div className="cart-bar" onClick={() => navigate('/cart', { state: { cart } })}>
                    <span>{cartCount} Items | ₹{cartTotal.toFixed(2)}</span>
                    <span>View Cart →</span>
                </div>
            )}
        </div>
    );
};

export default Menu;
