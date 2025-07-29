import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Receive the new 'searchQuery' prop
const UsersList = ({ onViewProfile, onEditUser, searchQuery }) => { // ✅ MODIFIED PROP DESTRUCTURING
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(res.data);
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users in UsersList:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ NEW: Filter users based on searchQuery
  const filteredUsers = users.filter(user => {
    const query = searchQuery.toLowerCase();
    return (
      user.cardNumber.toString().includes(query) || // Search by card number
      user.name.toLowerCase().includes(query) ||    // Search by name
      user.phone.includes(query) ||                 // Search by phone
      user.place.toLowerCase().includes(query)      // Search by place
    );
  });

  return (
    <div>
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Registered Users</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {filteredUsers.length === 0 ? ( // ✅ Use filteredUsers here
        <p>No users found matching your search criteria.</p>
      ) : (
        <table className="w-full table-auto border rounded-lg overflow-hidden shadow-md bg-white">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Card No</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Phone</th>
              <th className="py-2 px-4 text-left">Place</th>
              <th className="py-2 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => ( // ✅ Map over filteredUsers
              <tr key={u._id} className="border-t">
                <td className="py-2 px-4">{u.cardNumber}</td>
                <td className="py-2 px-4">{u.name}</td>
                <td className="py-2 px-4">{u.phone}</td>
                <td className="py-2 px-4">{u.place}</td>
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() => onViewProfile(u._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 mr-2"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => onEditUser(u)}
                    className="bg-yellow-600 text-white px-3 py-1 rounded-md hover:bg-yellow-700"
                  >
                    Edit
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