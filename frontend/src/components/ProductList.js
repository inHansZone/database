import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        email: '',
        password: '',
        full_name: '',
        date_of_birth: '',
        // regis_date: '',
        role: '',
        status: ''
    });

    const [newUser, setNewUser] = useState({
        email: '',
        password: '',
        full_name: '',
        date_of_birth: '',
        // regis_date: '',
        role: '',
        status: ''
    });

    useEffect(() => {
        axios.get('http://localhost:5000/api/data/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleEdit = (user) => {
        setEditUser(user);
        setUpdatedData({
            email: user.email,
            password: user.password,
            full_name: user.full_name,
            date_of_birth: user.date_of_birth,
            role: user.role,
            status: user.status
        });
    };

    // Handle update action
    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/data/users/${editUser.users_id}`, updatedData);
            console.log('User updated:', response.data);
            setUsers(users.map(p => p.users_id === editUser.users_id ? { ...p, ...updatedData } : p));
            setEditUser(null); // Close the edit form
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // Handle delete action
    const handleDelete = (users_id) => {
        axios.delete(`http://localhost:5000/api/data/users/${users_id}`)
            .then(response => {
                alert('User deleted successfully');
                setUsers(users.filter(user => user.users_id !== users_id));
            })
            .catch(error => {
                console.error('Error deleting users:', error);
                alert('Failed to delete user');
            });
    };

    const handleNewUserChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleInsert = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/data/users', newUser);
            console.log('New user added:', response.data);

            // After successfully inserting, fetch the updated list of products
            axios.get('http://localhost:5000/api/data/users')
                .then(response => {
                    setUsers(response.data);  // Reload the products list
                    setNewUser({ email: '', password: '', full_name: '', date_of_birth: '', role: '', status: '' }); // Reset form fields
                })
                .catch(error => {
                    console.error('Error fetching updated users:', error);
                });
        } catch (error) {
            console.error('Error adding new user:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">

            {/* Insert User Form */}
            <div className="mb-8 bg-gray-100 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Add New User</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleInsert(); }}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email:</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="text"
                            name="email"
                            value={newUser.email}
                            onChange={handleNewUserChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password:</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="text"
                            name="password"
                            value={newUser.password}
                            onChange={handleNewUserChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Full Name:</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="text"
                            name="full_name"
                            value={newUser.full_name}
                            onChange={handleNewUserChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">DOB:</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="text"
                            name="date_of_birth"
                            value={newUser.date_of_birth}
                            onChange={handleNewUserChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Role:</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="text"
                            name="role"
                            value={newUser.role}
                            onChange={handleNewUserChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Status:</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="text"
                            name="status"
                            value={newUser.status}
                            onChange={handleNewUserChange}
                            required
                        />
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit">
                        Add User
                    </button>
                </form>
            </div>

            {/* User List */}
            <h1 className="text-3xl font-bold mb-4">User List</h1>
            <ul className="space-y-4">
                {users.map(user => (
                    <li key={user.users_id} className="bg-white p-4 shadow rounded-lg">
                        <h2 className="text-lg font-semibold">Full Name: {user.full_name}</h2>
                        <p className="text-gray-600">Email: {user.email}</p>
                        <p className="text-gray-600">Password: {user.password}</p>
                        <p className="text-gray-600">DOB: {user.date_of_birth}</p>
                        <p className="text-gray-800">Registration Date: {user.regis_date}</p>
                        <p className="text-gray-800">Role: {user.role}</p>
                        <p className="text-gray-800">Status: {user.status}</p>
                        <div className="mt-4 space-x-2">
                            <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                                onClick={() => handleEdit(user)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={() => handleDelete(user.users_id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Edit User Form */}
            {editUser && (
                <div className="mt-8 bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Edit User</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Full Name:</label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded"
                                type="text"
                                value={updatedData.full_name}
                                onChange={(e) => setUpdatedData({ ...updatedData, full_name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email:</label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded"
                                type="text"
                                value={updatedData.email}
                                onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Password:</label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded"
                                type="text"
                                value={updatedData.password}
                                onChange={(e) => setUpdatedData({ ...updatedData, password: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">DOB:</label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded"
                                type="text"
                                value={updatedData.date_of_birth}
                                onChange={(e) => setUpdatedData({ ...updatedData, date_of_birth: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Role:</label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded"
                                type="text"
                                value={updatedData.role}
                                onChange={(e) => setUpdatedData({ ...updatedData, role: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Status:</label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded"
                                type="text"
                                value={updatedData.status}
                                onChange={(e) => setUpdatedData({ ...updatedData, status: e.target.value })}
                                required
                            />
                        </div>
                        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" type="submit">
                            Update User
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UserList;
