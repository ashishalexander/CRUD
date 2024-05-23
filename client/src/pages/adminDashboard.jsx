import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchUsers,
    deleteUsers,
    updateUsers,
    createUser,
    selectUsers,
    selectLoading,
    selectError,
} from '../redux/admin/adminuserSlice';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers) || [];
    console.log(users)
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchRegex, setSearchRegex] = useState(new RegExp(''));
    const [editingUserId, setEditingUserId] = useState(null);
    const [editedUserDetails, setEditedUserDetails] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUserDetails, setNewUserDetails] = useState({ username: '', email: '', password: '' });

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleDelete = (userId) => {
        dispatch(deleteUsers(userId));
    };

    const handleEdit = (user) => {
        setEditingUserId(user._id);
        setEditedUserDetails(user);
    };

    const handleSave = () => {
        dispatch(updateUsers(editedUserDetails));
        setEditingUserId(null);
    };

    const handleCancel = () => {
        setEditingUserId(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUserDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        try {
            const regex = new RegExp(term, 'i');
            setSearchRegex(regex);
        } catch (err) {
            setSearchRegex(new RegExp(''));
        }
    };

    const handleNewUserChange = (e) => {
        const { name, value } = e.target;
        setNewUserDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCreateUser = (e) => {
        e.preventDefault();
        dispatch(createUser(newUserDetails));
        setNewUserDetails({ username: '', email: '', password: '' });
        setIsModalOpen(false); 
        dispatch(fetchUsers());
    };

     const validUsers = users.filter((user) => user && user.username);
     const filteredUsers = validUsers.filter((user) => searchRegex.test(user.username));

    return (
        <div className="p-4">
            <h1 className="text-2xl text-center font-bold mb-4">Admin Dashboard</h1>
            <input
                type="text"
                placeholder="Search users"
                value={searchTerm}
                onChange={handleSearch}
                className="mb-4 mt-4 p-2 border-4 rounded"
            />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 ml-11"
                onClick={() => setIsModalOpen(true)}
            >
                Create User
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-2">Create New User</h2>
                        <form onSubmit={handleCreateUser}>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={newUserDetails.username}
                                onChange={handleNewUserChange}
                                className="mb-2 p-2 border rounded w-full"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={newUserDetails.email}
                                onChange={handleNewUserChange}
                                className="mb-2 p-2 border rounded w-full"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={newUserDetails.password}
                                onChange={handleNewUserChange}
                                className="mb-2 p-2 border rounded w-full"
                            />
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2">Name</th>
                            <th className="py-2">Email</th>
                            <th className="py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user._id}>
                                {editingUserId === user._id ? (
                                    <>
                                        <td className="border px-2 py-2 w-1/3">
                                            <input
                                                type="text"
                                                name="username"
                                                value={editedUserDetails.username}
                                                onChange={handleChange}
                                                className="border p-2 rounded w-full"
                                            />
                                        </td>
                                        <td className="border px-2 py-2 w-1/3">
                                            <input
                                                type="email"
                                                name="email"
                                                value={editedUserDetails.email}
                                                onChange={handleChange}
                                                className="border p-2 rounded w-full"
                                            />
                                        </td>
                                        <td className="border px-4 py-2 flex justify-center items-center">
                                            <button
                                                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                                                onClick={handleSave}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                                onClick={handleCancel}
                                            >
                                                Cancel
                                            </button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="border px-4 py-2">{user.username}</td>
                                        <td className="border px-4 py-2">{user.email}</td>
                                        <td className="border px-4 py-2 flex justify-center items-center">
                                            <button
                                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                                onClick={() => handleEdit(user)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded"
                                                onClick={() => handleDelete(user._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminDashboard;
