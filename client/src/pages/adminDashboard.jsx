import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUsers, updateUsers, selectUsers, selectLoading, selectError } from '../redux/admin/adminuserSlice';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers) || [];
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchRegex, setSearchRegex] = useState(new RegExp(''));

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleDelete = (userId) => {
        dispatch(deleteUsers(userId));
    };

    const handleUpdate = (user) => {
        dispatch(updateUsers(user));
    };

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        try {
            const regex = new RegExp(term, 'i'); 
            console.log(regex)
            setSearchRegex(regex);
        } catch (err) {
            // Invalid regex, handle as needed
            setSearchRegex(new RegExp('')); 
        }
    }; 

    const filteredUsers = users.filter(user =>
        searchRegex.test(user.username || '')
    );

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <input
                type="text"
                placeholder="Search users"
                value={searchTerm}
                onChange={handleSearch}
                className="mb-4 p-2 border rounded"
            />
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
                        {filteredUsers.map(user => (
                            <tr key={user._id}>
                                <td className="border px-4 py-2">{user.username}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                        onClick={() => handleUpdate(user)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminDashboard;
