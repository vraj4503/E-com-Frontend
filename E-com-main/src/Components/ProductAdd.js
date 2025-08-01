import React, { useState } from 'react';
import './ProductAdd.css'; 
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
        <div>
            <Navbar />
            <div className="product-add-container">
                <h1>Add Product</h1>
                <form onSubmit={handleSubmit}>
                    <div className="pr-form-group">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>
                    <div className="pr-form-group">
                        <label htmlFor="description">Description</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="description" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                        />
                    </div>
                    <div className="pr-form-group">
                        <label htmlFor="price">Price In INR</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="price" 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)} 
                        />
                    </div>
                    <div className="pr-form-group">
                        <label htmlFor="image">Image</label>
                        <input 
                            type="file" 
                            className="form-control" 
                            id="image"
                            multiple 
                            onChange={(e) => setImage(e.target.files)}
                        />
                    </div>
                    <button type="submit" className="pr-btn btn-primary">Submit</button>
                </form>
                <button className="pr-home btn-primary" onClick={() => window.location.href = '/home'}>Back To Home</button>
            </div>
        </div>
    )
}

export default ProductAdd;