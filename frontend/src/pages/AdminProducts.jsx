import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({ name: '', price: '', category: '', description: '', image: '' });
    const [editingId, setEditingId] = useState(null);

    const token = localStorage.getItem('adminToken');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get('http://localhost:5000/api/products/')
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const action = editingId
            ? axios.put(`http://localhost:5000/api/products/${editingId}`, formData, config)
            : axios.post('http://localhost:5000/api/products/', formData, config);

        action.then(() => {
            setEditingId(null);
            setFormData({ name: '', price: '', category: '', description: '', image: '' });
            fetchProducts();
        }).catch(err => alert('Error saving product'));
    };

    const deleteProduct = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            axios.delete(`http://localhost:5000/api/products/${id}`, config)
                .then(() => fetchProducts())
                .catch(err => alert('Error deleting product'));
        }
    };

    const inputStyle = {
        padding: '0.8rem',
        borderRadius: '8px',
        border: '1px solid #ddd',
        marginBottom: '1rem',
        width: '100%',
        boxSizing: 'border-box'
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ margin: 0, color: '#2f3542' }}>Product Management</h2>
                <div style={{ padding: '0.5rem 1rem', background: '#f1f2f6', borderRadius: '20px', fontSize: '0.9rem', color: '#57606f' }}>
                    {products.length} Products Total
                </div>
            </div>

            {/* Form Card */}
            <div style={{
                background: '#f9f9f9',
                padding: '2rem',
                borderRadius: '12px',
                marginBottom: '3rem',
                border: '1px solid #eee'
            }}>
                <h4 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#57606f' }}>
                    {editingId ? '📝 Edit Product' : '➕ Add New Product'}
                </h4>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <input style={inputStyle} placeholder="Product Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                    <input style={inputStyle} placeholder="Price (₹)" type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                    <input style={inputStyle} placeholder="Category (e.g. Fast Food)" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                    <input style={inputStyle} placeholder="Image URL" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                    <div style={{ gridColumn: 'span 2' }}>
                        <textarea
                            style={{ ...inputStyle, height: '80px', resize: 'vertical' }}
                            placeholder="Description"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1rem' }}>
                        <button type="submit" style={{
                            padding: '0.8rem 2rem',
                            background: '#2ecc71',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}>
                            {editingId ? 'Update Product' : 'Save Product'}
                        </button>
                        {editingId && (
                            <button onClick={() => { setEditingId(null); setFormData({ name: '', price: '', category: '', description: '', image: '' }); }} style={{
                                padding: '0.8rem 2rem',
                                background: '#a4b0be',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: '#f1f2f6' }}>
                        <tr>
                            <th style={{ padding: '1rem' }}>Product</th>
                            <th style={{ padding: '1rem' }}>Category</th>
                            <th style={{ padding: '1rem' }}>Price</th>
                            <th style={{ padding: '1rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    {p.image && <img src={p.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />}
                                    <span style={{ fontWeight: '600' }}>{p.name}</span>
                                </td>
                                <td style={{ padding: '1rem', color: '#57606f' }}>{p.category}</td>
                                <td style={{ padding: '1rem', fontWeight: 'bold' }}>₹{p.price}</td>
                                <td style={{ padding: '1rem' }}>
                                    <button onClick={() => { setEditingId(p.id); setFormData(p); }} style={{ padding: '0.5rem 1rem', marginRight: '0.5rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                                    <button onClick={() => deleteProduct(p.id)} style={{ padding: '0.5rem 1rem', background: '#ff4757', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProducts;
