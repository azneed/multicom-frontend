import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select'; // Assuming this is for user selection

const AddPaymentForm = () => {
  const [users, setUsers] = useState([]); // State for the list of users in the dropdown
  const [selectedUser, setSelectedUser] = useState(null); // State for the currently selected user in the dropdown
  const [amount, setAmount] = useState(100);
  const [mode, setMode] = useState('manual');
  const [week, setWeek] = useState(''); // State for payment week
  const [message, setMessage] = useState(''); // Success/Error message for payment submission
  const [formError, setFormError] = useState(''); // Error specific to form validation/submission
  const [recentPayments, setRecentPayments] = useState([]); // ✅ NEW STATE for recent payments

  // Helper to fetch user's last payment week
  const fetchLastPaidWeek = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/payments/user/${userId}`);
      // Assuming res.data is an array of payments, potentially sorted by week already by backend.
      // If not, sort it here: res.data.sort((a, b) => a.week - b.week);
      const lastPayment = res.data[res.data.length - 1];
      return lastPayment ? lastPayment.week : 0; // If no payments, start from week 0
    } catch (err) {
      console.error('Error fetching last payment week for user:', err);
      // Don't set a global error here, just return default for specific user context
      return 0; // Default to 0 if error or no payments
    }
  };

  // ✅ NEW FUNCTION: Fetch the last 5 payments for display
  const fetchRecentPayments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/payments/recent/20');
      setRecentPayments(res.data);
    } catch (err) {
      console.error('Error fetching last 5 payments:', err);
      // Consider setting a specific error state for this list if needed
    }
  };

  // Effect hook to fetch ALL users for the dropdown when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
      } catch (error) {
        console.error('Error fetching users for dropdown:', error);
        setMessage('❌ Error loading users for selection.'); // This message is for the main form
      }
    };
    fetchUsers();
    fetchRecentPayments(); // ✅ Also fetch recent payments on mount
  }, []); // Empty dependency array means this runs once on mount

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
    setMessage('');
    setFormError(''); // Clear form-specific error

    // Basic client-side validation
    if (!selectedUser || !selectedUser.value || !amount || !mode || week === '') { // Check for empty string week
      setFormError('❌ Please fill in all fields: User, Amount, Mode, and Week.');
      return;
    }

    try {
      // ✅ Using the new dedicated endpoint for user lookup by card number if needed
      // (This part is commented out as your form uses Select User dropdown based on _id)
      // If you switch to entering card number directly, uncomment and adjust logic here.
      // For now, it uses selectedUser.value (which is userId)
      
      const paymentData = {
        userId: selectedUser.value, // Use the user's ID from the selected dropdown option
        amount: parseInt(amount),
        mode,
        week: parseInt(week) // Send the week
      };

      await axios.post('http://localhost:5000/api/payments', paymentData);
      setMessage('✅ Payment added successfully!');
      setFormError(''); // Clear any previous form errors
      
      // Reset form fields after successful submission
      setSelectedUser(null);
      setAmount(100);
      setMode('manual');
      setWeek('');
      
      fetchRecentPayments(); // ✅ REFRESH recent payments after a successful submission
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
      {formError && <p className="text-red-500 mb-4">{formError}</p>} {/* Display form specific error */}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* User Selection */}
        <div className="md:col-span-2 mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Select User:</label>
          <Select
            options={options}
            value={selectedUser}
            onChange={setSelectedUser}
            placeholder="Select Card Number"
            className="w-full"
            classNamePrefix="select"
            isClearable // Allows clearing selection
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min="100"
            step="100"
            required // Amount is required
          />
        </div>

        {/* Payment Mode */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Payment Mode:</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required // Mode is required
          >
            <option value="manual">Manual</option>
            <option value="online">Online</option>
            <option value="Cash">Cash</option> {/* Added based on previous context */}
            <option value="Bank Transfer">Bank Transfer</option> {/* Added based on previous context */}
          </select>
        </div>

        {/* Week Number */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Week Number:</label>
          <input
            type="number"
            value={week}
            onChange={(e) => setWeek(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="e.g., 1, 2, 3..."
            min="1"
            required // Week is required
          />
        </div>
        <div className="md:col-span-2 text-center">
          <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700">
            ➕ Add Payment
          </button>
        </div>
      </form>

      {/* ✅ NEW SECTION: Display Last 5 Payments */}
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
                    <td className="py-2 px-4 text-right">${payment.amount.toFixed(2)}</td>
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