import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeekSummary = () => {
  const [week, setWeek] = useState('');
  const [paidUsers, setPaidUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchSummary = async () => {
    setLoading(true);
    setError('');
    try {
      const usersRes = await axios.get('http://localhost:5000/api/users');
      const paymentsRes = await axios.get('http://localhost:5000/api/payments/week/' + week);

      setAllUsers(usersRes.data);
      setPaidUsers(paymentsRes.data);
    } catch (err) {
      setError('Failed to load week summary');
    } finally {
      setLoading(false);
    }
  };

  const unpaidUsers = allUsers.filter(
    user => !paidUsers.some(payment => payment.userId === user._id)
  );

  return (
    <div>
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Week Summary</h2>
      <div className="flex items-center gap-4 mb-4">
        <input
          type="number"
          value={week}
          onChange={(e) => setWeek(e.target.value)}
          placeholder="Enter Week Number"
          className="p-2 border rounded-lg w-40"
        />
        <button
          onClick={fetchSummary}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          View Summary
        </button>
      </div>

      {loading && <p className="text-blue-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && paidUsers.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-green-600 mb-2">✅ Paid Users ({paidUsers.length})</h3>
          <ul className="list-disc list-inside">
            {paidUsers.map((p) => (
              <li key={p._id}>{p.cardNumber} - {p.name}</li>
            ))}
          </ul>
        </div>
      )}

      {!loading && unpaidUsers.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-red-600 mb-2">❌ Unpaid Users ({unpaidUsers.length})</h3>
          <ul className="list-disc list-inside">
            {unpaidUsers.map((u) => (
              <li key={u._id}>{u.cardNumber} - {u.name}</li>
            ))}
          </ul>
        </div>
      )}

      <hr className="my-8" />

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">➕ Manually Register New User</h2>
        <ManualUserForm />
      </div>
    </div>
  );
};

const ManualUserForm = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    name: '',
    phone: '',
    place: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('http://localhost:5000/api/users', formData);
      setMessage(res.data.message);
      setFormData({ cardNumber: '', name: '', phone: '', place: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error adding user');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        type="number"
        name="cardNumber"
        value={formData.cardNumber}
        onChange={handleChange}
        placeholder="Card Number"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="place"
        value={formData.place}
        onChange={handleChange}
        placeholder="Place"
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Add User
      </button>
      {message && <p className="mt-2 text-sm text-blue-600">{message}</p>}
    </form>
  );
};

export default WeekSummary;
