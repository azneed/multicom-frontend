import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PendingPaymentsAdminPanel = () => {
  const [pendingPayments, setPendingPayments] = useState([]);
  const [status, setStatus] = useState('');

  const fetchPendingPayments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/pending/pending');
      setPendingPayments(res.data);
    } catch (err) {
      console.error('Error fetching pending payments:', err.message);
    }
  };

  useEffect(() => {
    fetchPendingPayments();
  }, []);

  const handleApprove = async (id) => {
    try {
      // Calls the backend pendingPaymentController's approvePendingPayment
      await axios.post(`http://localhost:5000/api/pending/approve/${id}`);
      setStatus('✅ Payment approved');
      fetchPendingPayments(); // Refresh list after approval
    } catch (err) {
      console.error('Error approving payment:', err.response?.data?.message || err.message);
      setStatus('❌ Approval failed: ' + (err.response?.data?.message || 'Server error.'));
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/pending/reject/${id}`);
      setStatus('❌ Payment rejected');
      fetchPendingPayments(); // Refresh list after rejection
    } catch (err) {
      console.error('Error rejecting payment:', err.response?.data?.message || err.message);
      setStatus('❌ Rejection failed: ' + (err.response?.data?.message || 'Server error.'));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">🕒 Pending Payments</h2>
      {status && <p className="mb-4 text-green-600">{status}</p>}
      {pendingPayments.length === 0 ? (
        <p>No pending payments.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pendingPayments.map(p => (
            <div key={p._id} className="border p-4 rounded-xl shadow bg-white">
              <p><strong>Name:</strong> {p.userId?.name}</p>
              <p><strong>Card #:</strong> {p.userId?.cardNumber}</p>
              <p><strong>Amount:</strong> ₹{p.amount}</p>
              {/* ✅ CRITICAL CHANGE HERE: Use p.screenshotUrl directly */}
              {p.screenshotUrl && (
                <img
                  src={p.screenshotUrl} // Changed from `http://localhost:5000/uploads/${p.screenshotUrl}`
                  alt="proof"
                  className="my-3 w-full rounded-lg object-contain"
                />
              )}
              <div className="flex space-x-2 mt-2">
                <button onClick={() => handleApprove(p._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded">✅ Approve</button>
                <button onClick={() => handleReject(p._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded">❌ Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingPaymentsAdminPanel;