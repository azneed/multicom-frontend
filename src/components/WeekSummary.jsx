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
      setPaidUsers(paymentsRes.data.map(p => p.userId));
    } catch (err) {
      setError('Failed to load week summary');
    } finally {
      setLoading(false);
    }
  };

  const unpaidUsers = allUsers.filter(
    user => !paidUsers.some(p => p._id === user._id)
  );

  const paidUserDetails = allUsers.filter(
    user => paidUsers.some(p => p._id === user._id)
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

      {!loading && paidUserDetails.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-green-600 mb-2">✅ Paid Users ({paidUserDetails.length})</h3>
          <ul className="list-disc list-inside">
            {paidUserDetails.map((u) => (
              <li key={u._id}>{u.cardNumber} - {u.name}</li>
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
    </div>
  );
};

export default WeekSummary;
