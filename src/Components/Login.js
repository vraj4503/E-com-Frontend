import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3500/api/login', { email, password });
            console.log('Response:', response.data); 
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
            console.error('Error:', error); 
            toast.error('Login failed');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div className="container-center">
            <ToastContainer />
            <div className="form-container">
                <h2 className='form-title'>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 text-start">
                        <label htmlFor="email" className="form-label">
                            <strong>Email Id / Username</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="password" className="form-label">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                    <br />
                    <br />
                    <br />
                    <p>Don't have an account ? </p>
                    <button type="button" className="btn btn-secondary" onClick={() => window.location.href = '/register'}>Register</button>
                </form>
            </div>
        </div>

    );
}

export default Login;