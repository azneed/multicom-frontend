import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminMultiPayment = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // New state for the input text value
  const [amountToAdd, setAmountToAdd] = useState('');
  const [amountToDelete, setAmountToDelete] = useState('');
  const [feedback, setFeedback] = useState('');

  // Helper to fetch user's last payment week
  const fetchLastPaymentWeek = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/payments/user/${userId}`);
      const sortedPayments = res.data.sort((a, b) => a.week - b.week);
      const lastPayment = sortedPayments[sortedPayments.length - 1];
      return lastPayment ? lastPayment.week : 0;
    } catch (err) {
      console.error('Error fetching last payment week:', err);
      return 0;
    }
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Error fetching users:', err));
  }, []);

  // ✅ New handler for the searchable input
  const handleUserSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Find the user object that matches the current input value
    const matchedUser = users.find(
      (user) =>
        `${user.cardNumber} - ${user.name}`.toLowerCase() === e.target.value.toLowerCase() ||
        user.cardNumber?.toString() === e.target.value // In case user types only card number
    );

    if (matchedUser) {
      setSelectedUserId(matchedUser._id);
    } else {
      setSelectedUserId(''); // Clear selectedUserId if no user matches the input text
    }
  };


  const handleAddPayment = async () => {
    const amount = parseInt(amountToAdd, 10);

    if (!selectedUserId) {
      setFeedback('❌ Please select a user using the search box.'); // Updated feedback message
      return;
    }

    if (isNaN(amount) || amount <= 0 || amount % 100 !== 0) {
      setFeedback('❌ Enter valid amount (multiples of ₹100 only)');
      return;
    }

    const count = amount / 100;

    try {
      const lastPaidWeek = await fetchLastPaymentWeek(selectedUserId);
      let currentWeek = lastPaidWeek === 0 ? 0 : lastPaidWeek;

      for (let i = 0; i < count; i++) {
        currentWeek++;
        await axios.post('http://localhost:5000/api/payments', {
          userId: selectedUserId,
          amount: 100,
          mode: 'manual',
          week: currentWeek
        });
      }

      const feedbackStartWeek = lastPaidWeek === 0 ? 1 : lastPaidWeek + 1;
      setFeedback(`✅ Added ${count} payments (₹${amount}) starting from week ${feedbackStartWeek}`);
      setAmountToAdd('');

    } catch (err) {
      console.error(err);
      setFeedback('❌ Failed to add payments: ' + (err.response?.data?.message || 'Server error'));
    }
  };

  const handleDeletePayment = async () => {
    const amount = parseInt(amountToDelete, 10);

    if (!selectedUserId) {
      setFeedback('❌ Please select a user using the search box.'); // Updated feedback message
      return;
    }

    if (isNaN(amount) || amount <= 0 || amount % 100 !== 0) {
      setFeedback('❌ Enter valid delete amount (multiples of ₹100 only)');
      return;
    }
    const count = amount / 100;
    try {
      const res = await axios.get(`http://localhost:5000/api/payments/user/${selectedUserId}`);
      const sorted = res.data.sort((a, b) => b.week - a.week);
      const toDelete = sorted.slice(0, count);

      if (toDelete.length === 0) {
        setFeedback('⚠️ No payments to delete for this user.');
        setAmountToDelete('');
        return;
      }

      const deletePromises = toDelete.map(p => axios.delete(`http://localhost:5000/api/payments/${p._id}`));
      await Promise.all(deletePromises);

      setFeedback(`✅ Deleted last ${toDelete.length} payments (₹${toDelete.length * 100})`);
      setAmountToDelete('');
    } catch (err) {
      console.error(err);
      setFeedback('❌ Failed to delete payments: ' + (err.response?.data?.message || 'Server error'));
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-green-700">🔢 Multi-Week Payment Manager</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Select User:</label>
        <input
          type="text"
          list="users-list"
          placeholder="Search by name or card number"
          className="w-full border rounded px-3 py-2"
          value={searchQuery} // Bind input value to searchQuery state
          onChange={handleUserSearchChange} // Use the new handler
        />
        <datalist id="users-list">
          {users.map((user) => (
            <option key={user._id} value={`${user.cardNumber} - ${user.name}`} />
          ))}
        </datalist>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">💰 Add Amount (₹100/week):</label>
          <input
            type="number"
            value={amountToAdd}
            onChange={(e) => setAmountToAdd(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-2"
            placeholder="₹ e.g. 500"
            min="100"
            step="100"
          />
          <button
            onClick={handleAddPayment}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
          >
            ➕ Add Payments
          </button>
        </div>
        <div>
          <label className="block mb-1 font-medium">❌ Delete Amount (₹100/week):</label>
          <input
            type="number"
            value={amountToDelete}
            onChange={(e) => setAmountToDelete(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-2"
            placeholder="₹ e.g. 200"
            min="100"
            step="100"
          />
          <button
            onClick={handleDeletePayment}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
          >
            🗑️ Delete Payments
          </button>
        </div>
      </div>

      {feedback && <p className="text-center text-blue-700 font-medium mt-4">{feedback}</p>}
    </div>
  );
};

export default AdminMultiPayment;