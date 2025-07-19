import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    name: '',
    phone: '',
    place: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/users', formData);
      setMessage(res.data.message);
      setFormData({ cardNumber: '', name: '', phone: '', place: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 md:p-10"
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-6">
          🎫 MULTICOM Gift Scheme Registration
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <input
            type="number"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            required
            placeholder="Card Number"
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Full Name"
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Phone Number"
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleChange}
            required
            placeholder="Place"
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition duration-200"
          >
            Register Now
          </motion.button>
        </form>
        {message && <p className="mt-4 text-green-600 text-center font-medium">✅ {message}</p>}
        {error && <p className="mt-4 text-red-500 text-center font-medium">❌ {error}</p>}
      </motion.div>
    </div>
  );
};

export default UserRegistrationForm;
