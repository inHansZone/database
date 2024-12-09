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

    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: ''
    });

    useEffect(() => {
        axios.get('http://localhost:5000/api/data/Products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

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

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/data/Products/${id}`)
            .then(() => setProducts(products.filter(product => product.id !== id)))
            .catch(error => console.error('Error deleting product:', error));
    };

    const handleNewProductChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleInsert = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/data/Products', newProduct);
            setProducts([...products, response.data]);
            setNewProduct({ name: '', description: '', price: '', stock: '' });
        } catch (error) {
            console.error('Error adding new product:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Product List</h1>

            {/* Insert Product Form */}
            <div className="mb-8 bg-gray-100 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleInsert(); }}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name:</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={handleNewProductChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description:</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="text"
                            name="description"
                            value={newProduct.description}
                            onChange={handleNewProductChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Price:</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="number"
                            name="price"
                            value={newProduct.price}
                            onChange={handleNewProductChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Stock:</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="number"
                            name="stock"
                            value={newProduct.stock}
                            onChange={handleNewProductChange}
                            required
                        />
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit">
                        Add Product
                    </button>
                </form>
            </div>

            {/* Product List */}
            <ul className="space-y-4">
                {products.map(product => (
                    <li key={product.id} className="bg-white p-4 shadow rounded-lg">
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p className="text-gray-600">{product.description}</p>
                        <p className="text-gray-800">Price: ${product.price}</p>
                        <p className="text-gray-800">Stock: {product.stock}</p>
                        <div className="mt-4 space-x-2">
                            <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                                onClick={() => handleEdit(product)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={() => handleDelete(product.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Edit Product Form */}
            {editProduct && (
                <div className="mt-8 bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Name:</label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded"
                                type="text"
                                value={updatedData.name}
                                onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Description:</label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded"
                                type="text"
                                value={updatedData.description}
                                onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Price:</label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded"
                                type="number"
                                value={updatedData.price}
                                onChange={(e) => setUpdatedData({ ...updatedData, price: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Stock:</label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded"
                                type="number"
                                value={updatedData.stock}
                                onChange={(e) => setUpdatedData({ ...updatedData, stock: e.target.value })}
                                required
                            />
                        </div>
                        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" type="submit">
                            Update Product
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProductList;
