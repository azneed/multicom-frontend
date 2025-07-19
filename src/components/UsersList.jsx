import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersList = ({ onViewProfile }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(res.data);
    } catch (err) {
      setError('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Registered Users</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {users.length === 0 ? (
        <p>No users registered yet.</p>
      ) : (
        <table className="w-full table-auto border rounded-lg overflow-hidden shadow-md bg-white">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Card No</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Phone</th>
              <th className="py-2 px-4 text-left">Place</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="py-2 px-4">{u.cardNumber}</td>
                <td className="py-2 px-4">{u.name}</td>
                <td className="py-2 px-4">{u.phone}</td>
                <td className="py-2 px-4">{u.place}</td>
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() => onViewProfile(u._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                  >
                    View Profile
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

export default UsersList;
