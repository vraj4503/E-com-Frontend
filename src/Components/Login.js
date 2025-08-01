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
        <div className="register-main">
            <ToastContainer />
            <div className="register-card">
                <div className="register-left">
                    <h2 className='form-title'>Sign In</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group checkbox-group">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={remember}
                                onChange={() => setRemember(!remember)}
                            />
                            <label htmlFor="rememberMe" className="checkbox-label">Remember me</label>
                        </div>
                        <button type="submit" className="btn btn-gradient">Sign In</button>
                    </form>
                    <div className="divider">
                        <span>Don't have an account?</span>
                    </div>
                    <Link to='/register' className="btn btn-outline">Register</Link>
                </div>
                <div className="register-right">
                    <div className="register-logo">
                        <img src={require('./register-illustration.png')} alt="Login Illustration" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;