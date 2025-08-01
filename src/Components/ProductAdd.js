import React, { useState } from 'react';
import "./global.css"; 
import Navbar from './Navbar';

const ProductAdd = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);

        for (let i = 0; i < image.length; i++) {
            formData.append('image', image[i]);
        }

        try {
            const response = await fetch('https://e-com-backend-w8yy.onrender.com/api/addproduct', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('Product Request Sent Successfully');
                window.location.reload();
            } else {
                console.error('Failed to add product');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="productadd-main-bg">
            <Navbar />
            <div className="productadd-container">
                <h1 className="productadd-title">Add Product</h1>
                <form onSubmit={handleSubmit}>
                    <div className="productadd-form-group">
                        <label htmlFor="name" className="productadd-label">Name</label>
                        <input 
                            type="text" 
                            className="productadd-control" 
                            id="name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>
                    <div className="productadd-form-group">
                        <label htmlFor="description" className="productadd-label">Description</label>
                        <input 
                            type="text" 
                            className="productadd-control" 
                            id="description" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                        />
                    </div>
                    <div className="productadd-form-group">
                        <label htmlFor="price" className="productadd-label">Price In INR</label>
                        <input 
                            type="text" 
                            className="productadd-control" 
                            id="price" 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)} 
                        />
                    </div>
                    <div className="productadd-form-group">
                        <label htmlFor="image" className="productadd-label">Image</label>
                        <input 
                            type="file" 
                            className="productadd-control" 
                            id="image"
                            multiple 
                            onChange={(e) => setImage(e.target.files)}
                        />
                    </div>
                    <button type="submit" className="productadd-btn">Submit</button>
                </form>
                <button className="productadd-home-btn" onClick={() => window.location.href = '/home'}>Back To Home</button>
            </div>
        </div>
    )
}

export default ProductAdd;