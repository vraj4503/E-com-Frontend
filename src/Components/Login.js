import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const login = async (email, password) => {
        try {
            const response = await axios.post('https://e-com-backend-w8yy.onrender.com/api/login', { email, password });
            if (response.data.success) {
                const user = response.data.user;
                if (user.status === 'active') {
                    sessionStorage.setItem('user', JSON.stringify(user));
                    toast.success('Login successful!');
                    window.location.href = '/home';
                } else {
                    toast.error('User account is not active. Please wait for approval.');
                }
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Login failed');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div className="login-section-main">
            <ToastContainer />
            <div className="login-section-card">
                <div className="login-section-left">
                    <h2 className='login-section-title'>Sign In</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="login-section-group">
                            <label htmlFor="email" className="login-section-label">Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="login-section-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="login-section-group">
                            <label htmlFor="password" className="login-section-label">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="login-section-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="login-section-checkbox-row">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={remember}
                                onChange={() => setRemember(!remember)}
                            />
                            <label htmlFor="rememberMe" className="login-section-checkbox-label">Remember me</label>
                        </div>
                        <button type="submit" className="login-section-btn">Sign In</button>
                    </form>
                    <div className="login-section-divider">
                        <span>Don't have an account?</span>
                    </div>
                    <Link to='/register' className="login-section-outline-btn">Register</Link>
                </div>
                <div className="login-section-right">
                    <div className="login-section-logo">
                        <img src={require('./register-illustration.png')} alt="Login Illustration" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;