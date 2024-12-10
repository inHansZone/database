import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        p_name: '',
        p_description: '',
        // p_status: '',
        pc_id: '',
        store_id: '',
        storecat_name: ''
    });

    const [newProduct, setNewProduct] = useState({
        p_name: '',
        p_description: '',
        // p_status: '',
        pc_id: '',
        store_id: '',
        storecat_name: ''
    });

    useEffect(() => {
        axios.get('http://localhost:5000/api/data/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleEdit = (product) => {
        setEditProduct(product);
        setUpdatedData({
            p_name: product.p_name,
            p_description: product.p_description,
            p_status: product.p_status,
            pc_id: product.pc_id,
            store_id: product.store_id,
            storecat_name: product.storecat_name
        });
    };

    // Handle update action
    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/data/products/${editProduct.product_id}`, updatedData);
            console.log('Product updated:', response.data);
            alert('Product updated successfully');
            setProducts(products.map(p => p.product_id === editProduct.product_id ? { ...p, ...updatedData } : p));
            setEditProduct(null); // Close the edit form
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // Handle delete action
    const handleDelete = (product_id) => {
        axios.delete(`http://localhost:5000/api/data/products/${product_id}`)
            .then(response => {
                alert('Product deleted successfully');
                setProducts(products.filter(product => product.product_id !== product_id));
            })
            .catch(error => {
                console.error('Error deleting products:', error);
                alert('Failed to delete product');
            });
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
            const response = await axios.post('http://localhost:5000/api/data/products', newProduct);
            console.log('New product added:', response.data);
            alert('Product added successfully');

            // After successfully inserting, fetch the updated list of products
            axios.get('http://localhost:5000/api/data/products')
                .then(response => {
                    setProducts(response.data);  // Reload the products list
                    setNewProduct({ 
                        p_name: '',
                        p_description: '',
                        // p_status: '',
                        pc_id: '',
                        store_id: '',
                        storecat_name: '' }); // Reset form fields
                })
                .catch(error => {
                    console.error('Error fetching updated products:', error);
                });
        } catch (error) {
            console.error('Error adding new product:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">

            {/* Insert Product Form */}
            <div className="mb-8 bg-gray-100 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Thêm Sản phẩm mới</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleInsert(); }}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Tên sản phẩm:</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="text"
                            name="p_name"
                            value={newProduct.p_name}
                            onChange={handleNewProductChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Mô tả:</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="text"
                            name="p_description"
                            value={newProduct.p_description}
                            onChange={handleNewProductChange}
                            // required
                        />
                    </div>
                    {/* <div className="mb-4">
                        <label className="block text-gray-700">Trạng thái:</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="text"
                            name="p_status"
                            value={newProduct.p_status}
                            onChange={handleNewProductChange}
                            required
                        />
                    </div> */}
                    <div className="mb-4">
                        <label className="block text-gray-700">ID Danh mục Sản phẩm:</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="number"
                            name="pc_id"
                            value={newProduct.pc_id}
                            onChange={handleNewProductChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">ID Cửa hàng:</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="number"
                            name="store_id"
                            value={newProduct.store_id}
                            onChange={handleNewProductChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Tên Danh mục cửa hàng:</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="text"
                            name="storecat_name"
                            value={newProduct.storecat_name}
                            onChange={handleNewProductChange}
                            // required
                        />
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit">
                        Thêm Sản phẩm
                    </button>
                </form>
            </div>

            {/* Product List */}
            <h1 className="text-3xl font-bold mb-4">Danh sách Sản phẩm</h1>
            <ul className="space-y-4">
                {products.map(product => (
                    <li key={product.product_id} className="bg-white p-4 shadow rounded-lg">
                        <h2 className="text-lg font-semibold">Tên Sản phẩm: {product.p_name}</h2>
                        <p className="text-gray-600">Mô tả: {product.p_description}</p>
                        <p className="text-gray-600">Ngày thêm: {product.p_date}</p>
                        <p className="text-gray-600">Tổng số sao đánh giá: {product.p_totalstar}</p>
                        <p className="text-gray-800">Tổng số lượt đánh giá: {product.p_totalreview}</p>
                        <p className="text-gray-800">Trạng thái: {product.p_status}</p>
                        <p className="text-gray-800">ID Danh mục Sản phẩm: {product.pc_id}</p>
                        <p className="text-gray-800">ID Cửa hàng: {product.store_id}</p>
                        <p className="text-gray-800">Tên Danh mục cửa hàng: {product.storecat_name}</p>
                        <div className="mt-4 space-x-2">
                            <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                                onClick={() => handleEdit(product)}
                            >
                                Chỉnh sửa
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={() => handleDelete(product.product_id)}
                            >
                                Xoá
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Edit Product Form */}
            {editProduct && (
                <div className="mt-8 bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Chỉnh sửa Sản phẩm</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Tên Sản phẩm:</label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded"
                                type="text"
                                value={updatedData.p_name}
                                onChange={(e) => setUpdatedData({ ...updatedData, p_name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Mô tả:</label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded"
                                type="text"
                                value={updatedData.p_description}
                                onChange={(e) => setUpdatedData({ ...updatedData, p_description: e.target.value })}
                                // required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Trạng thái:</label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded"
                                type="text"
                                value={updatedData.p_status}
                                onChange={(e) => setUpdatedData({ ...updatedData, p_status: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">ID Danh mục Sản phẩm:</label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded"
                                type="text"
                                value={updatedData.pc_id}
                                onChange={(e) => setUpdatedData({ ...updatedData, pc_id: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">ID Cửa hàng::</label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded"
                                type="text"
                                value={updatedData.store_id}
                                onChange={(e) => setUpdatedData({ ...updatedData, store_id: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Tên Danh mục cửa hàng:</label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded"
                                type="text"
                                value={updatedData.storecat_name}
                                onChange={(e) => setUpdatedData({ ...updatedData, storecat_name: e.target.value })}
                                // required
                            />
                        </div>
                        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" type="submit">
                            Cập nhật Sản phẩm
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProductList;
