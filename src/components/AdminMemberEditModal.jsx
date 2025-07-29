import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminMemberEditModal = ({ user, onClose, onUpdate }) => {
  const [cardNumber, setCardNumber] = useState(user.cardNumber || '');
  const [name, setName] = useState(user.name || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [place, setPlace] = useState(user.place || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Update state if user prop changes
  useEffect(() => {
    setCardNumber(user.cardNumber || '');
    setName(user.name || '');
    setPhone(user.phone || '');
    setPlace(user.place || '');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const updatedData = { cardNumber, name, phone, place }; // Admin can update all
      const res = await axios.put(`http://localhost:5000/api/users/${user._id}`, updatedData);
      setSuccess(res.data.message || 'Member updated successfully!');
      onUpdate(); // Callback to parent to re-fetch and close
    } catch (err) {
      console.error('Error updating member by admin:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to update member. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Edit Member Details</h2>

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm border border-red-200">
            {error}
          </p>
        )}
        {success && (
          <p className="bg-green-100 text-green-700 p-3 rounded-md mb-4 text-sm border border-green-200">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="place" className="block text-sm font-medium text-gray-700">
              Place
            </label>
            <input
              type="text"
              id="place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminMemberEditModal;