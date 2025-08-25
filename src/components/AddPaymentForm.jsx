import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const AddPaymentForm = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState(100);
  const [mode, setMode] = useState('manual');
  const [week, setWeek] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [recentPayments, setRecentPayments] = useState([]);

  const fetchLastPaidWeek = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/payments/user/${userId}`);
      const lastPayment = res.data[res.data.length - 1];
      return lastPayment ? lastPayment.week : 0;
    } catch (err) {
      console.error('Error fetching last payment week for user:', err);
      return 0;
    }
  };

  const fetchRecentPayments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/payments/recent/20');
      setRecentPayments(res.data);
    } catch (err) {
      console.error('Error fetching last 20 payments for admin panel:', err);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
      } catch (error) {
        console.error('Error fetching users for dropdown:', error);
        setMessage('❌ Error loading users for selection.');
      }
    };
    fetchUsers();
    fetchRecentPayments();
  }, []);

  useEffect(() => {
    const updateWeekForSelectedUser = async () => {
      if (selectedUser) {
        const lastPaid = await fetchLastPaidWeek(selectedUser.value);
        setWeek(lastPaid + 1);
      } else {
        setWeek('');
      }
    };
    updateWeekForSelectedUser();
  }, [selectedUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setFormError('');

    if (!selectedUser || !selectedUser.value || !amount || !mode || week === '') {
      setFormError('❌ Please fill in all fields: User, Amount, Mode, and Week.');
      return;
    }

    try {
      const paymentData = {
        userId: selectedUser.value,
        amount: parseInt(amount),
        mode,
        week: parseInt(week)
      };

      await axios.post('http://localhost:5000/api/payments', paymentData);
      setMessage('✅ Payment added successfully!');
      setFormError('');

      setSelectedUser(null);
      setAmount(100);
      setMode('manual');
      setWeek('');

      fetchRecentPayments();
    } catch (err) {
      console.error('Error adding payment:', err);
      setFormError('❌ ' + (err.response?.data?.message || 'Server error during payment add.'));
    }
  };

  const options = users.map(u => ({
    value: u._id,
    label: `${u.cardNumber} - ${u.name}`
  }));

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Add/Delete Payment (Admin)</h2>

      {message && <p className="text-green-600 mb-4">{message}</p>}
      {formError && <p className="text-red-500 mb-4">{formError}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2 mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Select User:</label>
          <Select
            options={options}
            value={selectedUser}
            onChange={setSelectedUser}
            placeholder="Select Card Number"
            className="w-full"
            classNamePrefix="select"
            isClearable
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min="100"
            step="100"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Payment Mode:</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="manual">Manual</option>
            <option value="online">Online</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Week Number:</label>
          <input
            type="number"
            value={week}
            onChange={(e) => setWeek(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="e.g., 1, 2, 3..."
            min="1"
            required
          />
        </div>
        <div className="md:col-span-2 text-center">
          <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700">
            ➕ Add Payment
          </button>
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">Last 20 Payments</h3>
        {recentPayments.length === 0 ? (
          <p>No recent payments to display.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-4 border-b text-center text-blue-800">Card No</th>
                  <th className="py-2 px-4 border-b text-left text-blue-800">Name</th>
                  <th className="py-2 px-4 border-b text-right text-blue-800">Amount</th>
                  <th className="py-2 px-4 border-b text-left text-blue-800">Mode</th>
                  <th className="py-2 px-4 border-b text-center text-blue-800">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map((payment) => (
                  <tr key={payment._id} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="py-2 px-4 text-center">{payment.userCardNumber}</td>
                    <td className="py-2 px-4">{payment.userName}</td>
                    {/* ✅ FIX: Add conditional check before using toFixed() */}
                    <td className="py-2 px-4 text-right">
                      {typeof payment.amount === 'number' ? `$${payment.amount.toFixed(2)}` : 'N/A'}
                    </td>
                    <td className="py-2 px-4">{payment.mode}</td>
                    <td className="py-2 px-4 text-center">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPaymentForm;