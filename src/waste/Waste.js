
// return (
//     <div className="register-main">
//         <ToastContainer />
//         <div className="register-card">
//             <div className="register-left">
//                 <h2 className='form-title'>Register</h2>
//                 <div className='form-subtitle'>Create a great platform for managing your cases & clients</div>
//                 <form onSubmit={handleSubmit}>
//                         <div className="mb-3 text-start">
//                             <label htmlFor="name" className="form-label">
//                                 <strong>Name</strong>
//                             </label>
//                             <input
//                                 type="text"
//                                 placeholder="Enter Name"
//                                 className="form-control"
//                                 id="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div className="mb-3 text-start">
//                             <label htmlFor="email" className="form-label">
//                                 <strong>Email Id</strong>
//                             </label>
//                             <input
//                                 type="email"
//                                 placeholder="Enter Email"
//                                 className={`form-control ${errors.email ? 'is-invalid' : ''}`}
//                                 id="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 required
//                             />
//                             {errors.email && <div className="invalid-feedback">{errors.email}</div>}
//                         </div>
//                         <div className="mb-3 text-start">
//                             <label htmlFor="username" className="form-label">
//                                 <strong>Username</strong>
//                             </label>
//                             <input
//                                 type="text"
//                                 placeholder="Enter Username"
//                                 className="form-control"
//                                 id="username"
//                                 value={formData.username}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div className="mb-3 text-start">
//                             <label htmlFor="password" className="form-label">
//                                 <strong>Password</strong>
//                             </label>
//                             <input
//                                 type="password"
//                                 placeholder="Enter Password"
//                                 className={`form-control ${errors.password ? 'is-invalid' : ''}`}
//                                 id="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 required
//                             />
//                             {errors.password && <div className="invalid-feedback">{errors.password}</div>}
//                         </div>
//                         <div className="mb-3 text-start">
//                             <label htmlFor="phonenumber" className="form-label">
//                                 <strong>Phone Number</strong>
//                             </label>
//                             <input
//                                 type="tel"
//                                 placeholder="Enter Phone Number"
//                                 className="form-control"
//                                 id="phonenumber"
//                                 value={formData.phonenumber}
//                                 onChange={handleChange}
//                                 pattern="[0-9]{10}"
//                                 maxLength={10}
//                                 required
//                             />
//                         </div>
//                         <div className="mb-3 text-start">
//                             <label htmlFor="role" className="form-label">
//                                 <strong>Register as admin?</strong>
//                             </label>
//                             <div>
//                                 <input
//                                     type="checkbox"
//                                     id="roleAdmin"
//                                     name="role"
//                                     checked={formData.role === 'admin'}
//                                     onChange={(e) => setFormData({ ...formData, role: e.target.checked ? 'admin' : 'user' })}
//                                 />
//                                 <label htmlFor="roleAdmin">Admin</label>
//                             </div>
//                         </div>
//                         <button type="submit" className="btn btn-primary">Register</button>
//                     </form>
//                 <p className='container my-2'>Already have an account ?</p>
//                 <Link to='/login' className="btn btn-secondary">Login</Link>
//             </div>
//             <div className="register-right">
//                 <img src={require('./register-illustration.png')} alt="Register Illustration" />
//             </div>
//         </div>
//     </div>
// );
