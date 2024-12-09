import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        name: '',
        description: '',
        price: '',
        stock: ''
    });

    // State for new product form
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: ''
    });

    useEffect(() => {
        // Fetch all products
        axios.get('http://localhost:5000/api/data/Products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    // Handle edit action
    const handleEdit = (product) => {
        setEditProduct(product);
        setUpdatedData({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock
        });
    };

    // Handle update action
    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/data/Products/${editProduct.id}`, updatedData);
            console.log('Product updated:', response.data);
            setProducts(products.map(p => p.id === editProduct.id ? { ...p, ...updatedData } : p));
            setEditProduct(null); // Close the edit form
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // Handle delete action
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/data/Products/${id}`)
            .then(response => {
                alert('Product deleted successfully');
                setProducts(products.filter(product => product.id !== id));
            })
            .catch(error => {
                console.error('Error deleting product:', error);
                alert('Failed to delete product');
            });
    };

    // Handle new product form change
    const handleNewProductChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle new product insertion
    // const handleInsert = async () => {
    //     try {
    //         const response = await axios.post('http://localhost:5000/api/data/Products', newProduct);
    //         console.log('New product added:', response.data);
    //         setProducts([...products, { ...newProduct, id: response.data.id }]); // Add the new product to the list
    //         setNewProduct({ name: '', description: '', price: '', stock: '' }); // Reset form fields
    //     } catch (error) {
    //         console.error('Error adding new product:', error);
    //     }
    // };
    const handleInsert = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/data/Products', newProduct);
            console.log('New product added:', response.data);

            // After successfully inserting, fetch the updated list of products
            axios.get('http://localhost:5000/api/data/Products')
                .then(response => {
                    setProducts(response.data);  // Reload the products list
                    setNewProduct({ name: '', description: '', price: '', stock: '' }); // Reset form fields
                })
                .catch(error => {
                    console.error('Error fetching updated products:', error);
                });
        } catch (error) {
            console.error('Error adding new product:', error);
        }
    };
    return (
        <div>
            <h1>Product List</h1>

            {/* Insert Product Form */}
            <div style={{ marginBottom: '20px' }}>
                <h2>Add New Product</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleInsert(); }}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={handleNewProductChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <input
                            type="text"
                            name="description"
                            value={newProduct.description}
                            onChange={handleNewProductChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={newProduct.price}
                            onChange={handleNewProductChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Stock:</label>
                        <input
                            type="number"
                            name="stock"
                            value={newProduct.stock}
                            onChange={handleNewProductChange}
                            required
                        />
                    </div>
                    <button type="submit">Add Product</button>
                </form>
            </div>

            {/* Product List */}
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Stock: {product.stock}</p>
                        <button onClick={() => handleEdit(product)}>Edit</button>
                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {/* Edit Product Form */}
            {editProduct && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Edit Product</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                value={updatedData.name}
                                onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label>Description:</label>
                            <input
                                type="text"
                                value={updatedData.description}
                                onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label>Price:</label>
                            <input
                                type="number"
                                value={updatedData.price}
                                onChange={(e) => setUpdatedData({ ...updatedData, price: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label>Stock:</label>
                            <input
                                type="number"
                                value={updatedData.stock}
                                onChange={(e) => setUpdatedData({ ...updatedData, stock: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit">Update</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProductList;
