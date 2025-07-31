import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReportsAndAnalytics = () => {
  // State for Payments Received Report
  const [paymentsReport, setPaymentsReport] = useState(null);
  const [paymentsFilter, setPaymentsFilter] = useState('thisMonth'); // Default filter
  const [paymentsLoading, setPaymentsLoading] = useState(true);
  const [paymentsError, setPaymentsError] = useState('');

  // State for Pending Payments Report
  const [pendingPaymentsReport, setPendingPaymentsReport] = useState(null);
  const [pendingPaymentsLoading, setPendingPaymentsLoading] = useState(true);
  const [pendingPaymentsError, setPendingPaymentsError] = useState('');

  // Function to fetch Payments Received Report
  const fetchPaymentsReport = async (filter) => {
    setPaymentsLoading(true);
    setPaymentsError('');
    try {
      const res = await axios.get(`http://localhost:5000/api/reports/payments-received?filter=${filter}`);
      setPaymentsReport(res.data);
    } catch (err) {
      console.error('Error fetching payments report:', err);
      setPaymentsError(err.response?.data?.message || 'Failed to load payments report.');
    } finally {
      setPaymentsLoading(false);
    }
  };

  // Function to fetch Pending Payments Report
  const fetchPendingPaymentsReport = async () => {
    setPendingPaymentsLoading(true);
    setPendingPaymentsError('');
    try {
      const res = await axios.get('http://localhost:5000/api/reports/pending-payments');
      setPendingPaymentsReport(res.data);
    } catch (err) {
      console.error('Error fetching pending payments report:', err);
      setPendingPaymentsError(err.response?.data?.message || 'Failed to load pending payments report.');
    } finally {
      setPendingPaymentsLoading(false);
    }
  };

  // Fetch reports on component mount and when filter changes for payments
  useEffect(() => {
    fetchPaymentsReport(paymentsFilter);
    fetchPendingPaymentsReport();
  }, [paymentsFilter]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Reports & Analytics</h1>

      {/* Payments Received Section */}
      <div className="mb-10 p-5 border rounded-lg shadow-sm bg-gray-50">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Payments Received</h2>
        
        {/* Filter Buttons */}
        <div className="mb-4 flex space-x-2">
          <button
            onClick={() => setPaymentsFilter('today')}
            className={`py-2 px-4 rounded ${paymentsFilter === 'today' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Today
          </button>
          <button
            onClick={() => setPaymentsFilter('thisWeek')}
            className={`py-2 px-4 rounded ${paymentsFilter === 'thisWeek' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            This Week
          </button>
          <button
            onClick={() => setPaymentsFilter('thisMonth')}
            className={`py-2 px-4 rounded ${paymentsFilter === 'thisMonth' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            This Month
          </button>
          {/* Add custom date range pickers if needed */}
        </div>

        {paymentsLoading ? (
          <p className="text-gray-600">Loading payments report...</p>
        ) : paymentsError ? (
          <p className="text-red-500">Error: {paymentsError}</p>
        ) : paymentsReport ? (
          <div>
            <p className="text-xl font-medium mb-2">Total Amount Received: <span className="text-green-600 font-bold">${paymentsReport.totalAmount.toFixed(2)}</span></p>
            <p className="text-xl font-medium mb-4">Total Payments: <span className="font-bold">{paymentsReport.totalPayments}</span></p>

            {paymentsReport.dailyBreakdown && Object.keys(paymentsReport.dailyBreakdown).length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Daily Breakdown:</h3>
                <div className="overflow-x-auto rounded-lg shadow">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-blue-50">
                      <tr>
                        <th className="py-2 px-4 border-b text-left text-blue-800">Date</th>
                        <th className="py-2 px-4 border-b text-right text-blue-800">Amount</th>
                        <th className="py-2 px-4 border-b text-center text-blue-800">Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(paymentsReport.dailyBreakdown).sort(([dateA], [dateB]) => dateA.localeCompare(dateB)).map(([date, data]) => (
                        <tr key={date} className="border-b last:border-b-0 hover:bg-gray-50">
                          <td className="py-2 px-4">{new Date(date).toLocaleDateString()}</td>
                          <td className="py-2 px-4 text-right">${data.totalAmount.toFixed(2)}</td>
                          <td className="py-2 px-4 text-center">{data.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-600">No payment data available for the selected period.</p>
        )}
      </div>

      {/* Pending Payments Section */}
      <div className="p-5 border rounded-lg shadow-sm bg-gray-50">
        <h2 className="text-2xl font-semibold text-orange-700 mb-4">Pending Payments (Awaiting Approval)</h2>
        
        {pendingPaymentsLoading ? (
          <p className="text-gray-600">Loading pending payments report...</p>
        ) : pendingPaymentsError ? (
          <p className="text-red-500">Error: {pendingPaymentsError}</p>
        ) : pendingPaymentsReport ? (
          <div>
            <p className="text-xl font-medium mb-2">Total Pending Amount: <span className="text-red-600 font-bold">${pendingPaymentsReport.totalPendingAmount.toFixed(2)}</span></p>
            <p className="text-xl font-medium mb-4">Total Pending Payments: <span className="font-bold">{pendingPaymentsReport.totalPendingCount}</span></p>

            {pendingPaymentsReport.pendingByUser && pendingPaymentsReport.pendingByUser.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Breakdown by User:</h3>
                <div className="overflow-x-auto rounded-lg shadow">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-orange-50">
                      <tr>
                        <th className="py-2 px-4 border-b text-left text-orange-800">User (Card No - Name)</th>
                        <th className="py-2 px-4 border-b text-right text-orange-800">Total Pending Amount</th>
                        <th className="py-2 px-4 border-b text-center text-orange-800">Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingPaymentsReport.pendingByUser.map((userPending) => (
                        <tr key={userPending.userId} className="border-b last:border-b-0 hover:bg-gray-50">
                          <td className="py-2 px-4">{userPending.userCardNumber} - {userPending.userName}</td>
                          <td className="py-2 px-4 text-right">${userPending.totalAmount.toFixed(2)}</td>
                          <td className="py-2 px-4 text-center">{userPending.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-600">No pending payment data available.</p>
        )}
      </div>
    </div>
  );
};

export default ReportsAndAnalytics;
