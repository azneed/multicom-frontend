import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const AddPaymentForm = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState(100);
  const [mode, setMode] = useState('manual');
  const [week, setWeek] = useState(''); // NEW: State for week
  const [message, setMessage] = useState('');

  // Helper to fetch user's last payment week
  const fetchLastPaidWeek = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/payments/user/${userId}`);
      const lastPayment = res.data[res.data.length - 1]; // Assuming sorted by week
      return lastPayment ? lastPayment.week : 0; // If no payments, start from week 0
    } catch (err) {
      console.error('Error fetching last payment week:', err);
      return 0; // Default to 0 if error or no payments
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setMessage('❌ Error loading users.');
      }
    };
    fetchUsers();
  }, []);

  // Effect to update week input when a user is selected
  useEffect(() => {
    const updateWeekForSelectedUser = async () => {
      if (selectedUser) {
        const lastPaid = await fetchLastPaidWeek(selectedUser.value);
        setWeek(lastPaid + 1); // Set to the next logical week
      } else {
        setWeek(''); // Clear week if no user is selected
      }
    };
    updateWeekForSelectedUser();
  }, [selectedUser]); // Rerun when selectedUser changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!selectedUser || !selectedUser.value || !amount || !mode || !week) {
      setMessage('❌ Please fill in all fields: User, Amount, Mode, and Week.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/payments', { // Call the payment route's main POST
        userId: selectedUser.value,
        amount: parseInt(amount),
        mode,
        week: parseInt(week) // Send the week
      });
      setMessage('✅ Payment added successfully!');
      // Reset form fields after successful submission
      setSelectedUser(null);
      setAmount(100);
      setMode('manual');
      setWeek('');
    } catch (err) {
      console.error('Error adding payment:', err);
      setMessage('❌ ' + (err.response?.data?.message || 'Server error during payment add.'));
    }
  };

  const options = users.map(u => ({
    value: u._id,
    label: `${u.cardNumber} - ${u.name}`
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4 text-green-700">💰 Add/Delete Payment (Admin)</h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Select User:</label>
        <Select
          options={options}
          value={selectedUser}
          onChange={setSelectedUser}
          placeholder="Select Card Number"
          className="w-full"
          classNamePrefix="select"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          min="100"
          step="100"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Payment Mode:</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="manual">Manual</option>
          <option value="online">Online</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Week Number:</label>
        <input
          type="number"
          value={week}
          onChange={(e) => setWeek(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g., 1, 2, 3..."
          min="1"
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700">
        ➕ Add Payment
      </button>

      {message && <p className={`text-sm mt-2 ${message.startsWith('❌') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
    </form>
  );
};

export default AddPaymentForm;