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
            <header className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <h1>Exceptional Dining, Simplified.</h1>
                        <p>Experience the future of ordering with our seamless QR-based menu system.</p>
                    </div>
                </div>
            </header>

            <main className="container menu-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', color: '#1a1a1a' }}>Featured Menu</h2>
                        <p style={{ fontSize: '1.1rem', color: '#6b7280' }}>Handpicked delicacies freshly prepared for you.</p>
                    </div>
                    <div style={{ padding: '0.5rem 1.5rem', backgroundColor: '#f3f4f6', borderRadius: '30px', fontWeight: 'bold' }}>
                        {products.length} Items Available
                    </div>
                </div>

                <div className="menu-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '4rem 3rem'
                }}>
                    {products.map(product => (
                        <div key={product.id} className="product-card" style={{ boxShadow: 'none', border: 'none' }}>
                            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '20px' }}>
                                <img
                                    src={product.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'}
                                    alt={product.name}
                                    className="product-image"
                                    style={{ height: '350px', transition: '0.5s transform' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    backgroundColor: 'white',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '50px',
                                    fontWeight: '900',
                                    color: '#ff4757',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                                }}>
                                    ₹{product.price}
                                </div>
                            </div>
                            <div className="product-content" style={{ padding: '1.5rem 0' }}>
                                <h3 className="product-name" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                                <p className="product-description" style={{ fontSize: '1rem', lineHeight: '1.5' }}>
                                    {product.description || 'A masterpiece of flavor, crafted with passion and the freshest seasonal ingredients.'}
                                </p>
                                <button className="add-btn" onClick={() => addToCart(product)} style={{ width: 'fit-content', padding: '1rem 2.5rem', marginTop: '1rem' }}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {cartCount > 0 && (
                <div className="cart-bar" style={{ bottom: '3rem', padding: '1.5rem 2.5rem', width: 'auto', minWidth: '400px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>🛍️</span>
                        <div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.7, textTransform: 'uppercase' }}>Current Order</div>
                            <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>{cartCount} Items Selected</div>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }} onClick={() => navigate('/cart', { state: { cart } })}>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Subtotal</div>
                        <div style={{ fontWeight: '900', fontSize: '1.4rem' }}>₹{cartTotal.toFixed(2)} →</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Menu;
