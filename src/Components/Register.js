import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css'; 
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CryptoJS from 'crypto-js';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        phonenumber: '',
        role: 'user' 
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { id, value, name } = e.target;
        if (name === 'role') {
            setFormData({ ...formData, role: value });
        } else {
            setFormData({ ...formData, [id]: value });
        }
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/;
        return re.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let validationErrors = {};
    
        if (!validateEmail(formData.email)) {
            validationErrors.email = 'Invalid email format';
        }
    
        if (!validatePassword(formData.password)) {
            validationErrors.password = 'Password must be 6-12 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character';
        }
    
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
    
        setErrors({});
    
        const encryptedPassword = CryptoJS.AES.encrypt(formData.password, 'Vraj@123').toString();
        const status = formData.role === 'admin' ? 'pending' : 'active';
        const dataToSubmit = { ...formData, password: encryptedPassword, status };
        try {
            const response = await axios.post('https://e-com-backend-w8yy.onrender.com/api/register', dataToSubmit);
            console.log(response.data);
            if (formData.role === 'admin') {
                toast.info('Admin registration is pending approval. Try again after some time.');
            } else {
                toast.success('User Registered Successfully!');
            }
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <div className="register-section-main">
            <ToastContainer />
            <div className="register-section-card">
                <div className="register-section-left">
                    <h2 className='register-section-title'>Create Account</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="register-section-row">
                            <div className="register-section-group">
                                <label htmlFor="name" className="register-section-label">First Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your first name"
                                    className="register-section-control"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="register-section-group">
                                <label htmlFor="username" className="register-section-label">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your last name"
                                    className="register-section-control"
                                    id="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="register-section-group">
                            <label htmlFor="email" className="register-section-label">Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className={`register-section-control ${errors.email ? 'register-section-invalid' : ''}`}
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {errors.email && <div className="register-section-feedback">{errors.email}</div>}
                        </div>
                        <div className="register-section-group">
                            <label htmlFor="username2" className="register-section-label">Username</label>
                            <input
                                type="text"
                                placeholder="Choose a username"
                                className="register-section-control"
                                id="username2"
                                value={formData.username2 || ''}
                                onChange={e => setFormData({ ...formData, username2: e.target.value })}
                                required
                            />
                        </div>
                        <div className="register-section-group">
                            <label htmlFor="password" className="register-section-label">Password</label>
                            <input
                                type="password"
                                placeholder="Create a strong password"
                                className={`register-section-control ${errors.password ? 'register-section-invalid' : ''}`}
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            {errors.password && <div className="register-section-feedback">{errors.password}</div>}
                        </div>
                        <div className="register-section-group">
                            <label htmlFor="phonenumber" className="register-section-label">Phone Number</label>
                            <input
                                type="tel"
                                placeholder="Enter your phone number"
                                className="register-section-control"
                                id="phonenumber"
                                value={formData.phonenumber}
                                onChange={handleChange}
                                pattern="[0-9]{10}"
                                maxLength={10}
                                required
                            />
                        </div>
                        <div className="register-section-checkbox-row">
                            <input
                                type="checkbox"
                                id="roleAdmin"
                                name="role"
                                checked={formData.role === 'admin'}
                                onChange={(e) => setFormData({ ...formData, role: e.target.checked ? 'admin' : 'user' })}
                            />
                            <label htmlFor="roleAdmin" className="register-section-checkbox-label">Register as Administrator</label>
                        </div>
                        <button type="submit" className="register-section-btn">Create Account</button>
                    </form>
                    <div className="register-section-divider">
                        <span>Already have an account?</span>
                    </div>
                    <Link to='/login' className="register-section-outline-btn">Sign In</Link>
                </div>
                <div className="register-section-right">
                    <div className="register-section-logo">
                        <img src={require('./register-illustration.png')} alt="Register Illustration" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;