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
        if (editingId) {
            axios.put(`http://localhost:5000/api/products/${editingId}`, formData, config)
                .then(() => {
                    setEditingId(null);
                    setFormData({ name: '', price: '', category: '', description: '', image: '' });
                    fetchProducts();
                });
        } else {
            axios.post('http://localhost:5000/api/products/', formData, config)
                .then(() => {
                    setFormData({ name: '', price: '', category: '', description: '', image: '' });
                    fetchProducts();
                });
        }
    };

    const deleteProduct = (id) => {
        if (window.confirm('Delete this product?')) {
            axios.delete(`http://localhost:5000/api/products/${id}`, config)
                .then(() => fetchProducts());
        }
    };

    return (
        <div>
            <h3>Product Management</h3>

            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd' }}>
                <h4>{editingId ? 'Edit Product' : 'Add New Product'}</h4>
                <input placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                <input placeholder="Price" type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                <input placeholder="Category" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                <input placeholder="Image URL" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                <button type="submit">{editingId ? 'Update' : 'Add'}</button>
                {editingId && <button onClick={() => setEditingId(null)}>Cancel</button>}
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.id}>
                            <td>{p.name}</td>
                            <td>{p.category}</td>
                            <td>₹{p.price}</td>
                            <td>
                                <button onClick={() => { setEditingId(p.id); setFormData(p); }}>Edit</button>
                                <button onClick={() => deleteProduct(p.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminProducts;
