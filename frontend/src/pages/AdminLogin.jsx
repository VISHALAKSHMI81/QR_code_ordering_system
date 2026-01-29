import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [username, setUsername] = useState('admin@gmail.com');
    const [password, setPassword] = useState('Admin');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/auth/login', { username, password })
            .then(res => {
                localStorage.setItem('adminToken', res.data.token);
                navigate('/admin/dashboard');
            })
            .catch(err => alert('Invalid credentials'));
    };

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f1f2f6',
            margin: 0,
            padding: 0,
            position: 'fixed',
            top: 0,
            left: 0
        }}>
            <div style={{
                padding: '3rem',
                maxWidth: '450px',
                width: '100%',
                background: 'white',
                borderRadius: '15px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2f3542' }}>Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ fontWeight: '600', color: '#57606f' }}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                marginTop: '0.5rem',
                                borderRadius: '8px',
                                border: '1px solid #ced4da',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ fontWeight: '600', color: '#57606f' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                marginTop: '0.5rem',
                                borderRadius: '8px',
                                border: '1px solid #ced4da',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            backgroundColor: '#ff4757',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'background 0.3s'
                        }}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
