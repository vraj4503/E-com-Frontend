import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css'; 
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
        <div>
            <ToastContainer />
            <div className="container-center">
                <div className="form-container">
                    <h2 className='form-title'>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="name" className="form-label">
                                <strong>Name</strong>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Name"
                                className="form-control"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="email" className="form-label">
                                <strong>Email Id</strong>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="username" className="form-label">
                                <strong>Username</strong>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Username"
                                className="form-control"
                                id="username"
                                value={formData.username}
                                onChange={handleChange}
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
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="phonenumber" className="form-label">
                                <strong>Phone Number</strong>
                            </label>
                            <input
                                type="tel"
                                placeholder="Enter Phone Number"
                                className="form-control"
                                id="phonenumber"
                                value={formData.phonenumber}
                                onChange={handleChange}
                                pattern="[0-9]{10}"
                                maxLength={10}
                                required
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="role" className="form-label">
                                <strong>Register as admin?</strong>
                            </label>
                            <div>
                                <input
                                    type="checkbox"
                                    id="roleAdmin"
                                    name="role"
                                    checked={formData.role === 'admin'}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.checked ? 'admin' : 'user' })}
                                />
                                <label htmlFor="roleAdmin">Admin</label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                    <p className='container my-2'>Already have an account ?</p>
                    <Link to='/login' className="btn btn-secondary">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;