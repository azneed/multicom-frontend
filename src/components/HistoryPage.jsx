import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const HistoryPage = () => {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/activity');
      setLogs(res.data);
    } catch (err) {
      console.error('Failed to load activity logs:', err.message);
    }
  };

  const filterLogs = () => {
    const now = dayjs();
    return logs.filter((log) => {
      const created = dayjs(log.createdAt);
      if (filter === 'today') return created.isSame(now, 'day');
      if (filter === 'week') return created.isSame(now, 'week');
      if (filter === 'month') return created.isSame(now, 'month');
      return true;
    });
  };

  const displayLabel = (type) => {
    if (type === 'approve') return '✅ Approved';
    if (type === 'reject') return '❌ Rejected';
    if (type === 'manual') return '✍️ Manual Entry';
    if (type === 'user_uploaded_for_review') return '⬆️ User Uploaded'; // Added this actionType
    if (type === 'register') return '📝 User Registered'; // Added this actionType
    if (type === 'delete') return '🗑️ Deleted'; // Added this actionType
    return 'ℹ️';
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">📜 Activity History</h2>
      <div className="mb-4 space-x-2">
        <button onClick={() => setFilter('all')} className="px-3 py-1 rounded bg-gray-200">All</button>
        <button onClick={() => setFilter('today')} className="px-3 py-1 rounded bg-gray-200">Today</button>
        <button onClick={() => setFilter('week')} className="px-3 py-1 rounded bg-gray-200">This Week</button>
        <button onClick={() => setFilter('month')} className="px-3 py-1 rounded bg-gray-200">This Month</button>
      </div>
      {filterLogs().length === 0 ? (
        <p className="text-gray-500">No activity found.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filterLogs().map((log) => (
            <div key={log._id} className="border p-4 rounded-xl shadow-md bg-white">
              <p><strong>👤 Name:</strong> {log.userId?.name} ({log.userId?.cardNumber})</p>
              <p><strong>📞 Phone:</strong> {log.userId?.phone}</p>
              <p><strong>💸 Amount:</strong> ₹{log.amount}</p>
              <p><strong>📦 Mode:</strong> {log.mode}</p>
              {log.week && <p><strong>📅 Week:</strong> {log.week}</p>}
              <p><strong>🕒 Time:</strong> {dayjs(log.createdAt).format('DD MMM YYYY hh:mm A')}</p>
              <p><strong>🔁 Action:</strong> {displayLabel(log.actionType)}</p>
              {/* Consistently use log.screenshotUrl */}
              {log.screenshotUrl && (
                <img
                  src={`http://localhost:5000/uploads/${log.screenshotUrl}`}
                  alt="proof"
                  className="w-full mt-2 rounded"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;