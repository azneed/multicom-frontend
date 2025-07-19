import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import PaymentUploadForm from './PaymentUploadForm';

const UserProfile = ({ userId, onBack }) => {
  const [user, setUser] = useState(null);
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState('');

  const fetchProfile = async () => {
    console.log("UserProfile: fetchProfile called for userId:", userId); // 1. Check if fetch is called
    try {
      const userRes = await axios.get(`http://localhost:5000/api/users/${userId}`);
      console.log("UserProfile: userRes.data:", userRes.data); // 2. Check content of user data
      
      // CRITICAL CHECK: Ensure userRes.data is not null or an empty object.
      // If userRes.data is {}, user.name will be undefined and render fails.
      if (!userRes.data || Object.keys(userRes.data).length === 0) {
        setError('❌ User data not found for this ID.');
        setUser(null); // Explicitly set to null if no user
        console.error("UserProfile: User data came back empty or null.");
        return;
      }

      const payRes = await axios.get(`http://localhost:5000/api/payments/user/${userId}`);
      console.log("UserProfile: payRes.data (payments):", payRes.data); // 3. Check payments data

      setUser(userRes.data);
      setPayments(payRes.data);
      setError('');
      console.log("UserProfile: State updated - user:", userRes.data, "payments:", payRes.data); // 4. Confirm state update
    } catch (err) {
      console.error('UserProfile: Error loading user profile:', err); // Log full error object
      setError('❌ Failed to load user profile. Check backend logs or network.');
      setUser(null); // Ensure user is null on error
      setPayments([]);
    }
  };

  useEffect(() => {
    if (!userId) {
      setError('❌ User ID not provided. Cannot load profile.');
      console.log("UserProfile: userId is null, skipping fetch.");
      return;
    }
    fetchProfile();
    // No need to pass fetchProfile to dependency array if it's stable and only called on userId change
  }, [userId]);

  // --- RENDERING DEBUGGING ---
  console.log("UserProfile: Current user state before render:", user);
  console.log("UserProfile: Current payments state before render:", payments);
  console.log("UserProfile: Current error state before render:", error);


  // Add a loading indicator or clearer messages
  if (user === null && !error) { // If user is null and no error, assume loading
    return <div className="p-4"><p>Loading user profile...</p></div>;
  }
  // If there's an error, display it
  if (error) {
    return (
      <div className="p-4">
        <button onClick={onBack} className="mb-4 bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">← Back</button>
        <p className="text-red-600 mb-4">{error}</p>
      </div>
    );
  }

  // Your existing paidWeeksMap and return JSX
  const paidWeeksMap = {};
  payments.forEach((p) => {
    const paymentUserId = typeof p.userId === 'object' ? p.userId._id : p.userId;
    if (String(paymentUserId) === String(userId)) {
      paidWeeksMap[p.week] = p;
    }
  });

  return (
    <div className="p-4">
      <button
        onClick={onBack}
        className="mb-4 bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
      >
        ← Back
      </button>
      {/* Error display moved up for immediate visibility */}

      {/* user will now be guaranteed not null here if we pass the checks above */}
      {user && ( // Keep this check, though it should now always be true if we reach here
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">
            👤 {user.name}'s Profile {/* Ensure user.name exists */}
          </h2>
          <p><strong>Card Number:</strong> {user.cardNumber}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Place:</strong> {user.place}</p>
        </div>
      )}

      {user && ( // Keep this check
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-green-700 mb-3">
            💸 Payment History ({payments.length}/60)
          </h3>
          <div className="grid grid-cols-10 gap-2">
            {/* ... rest of payment history rendering ... */}
            {Array.from({ length: 60 }, (_, i) => {
              const week = i + 1;
              const payment = paidWeeksMap[week];
              return (
                <div
                  key={week}
                  className={`relative group h-16 text-center text-sm rounded-lg flex flex-col justify-center items-center border ${
                    payment
                      ? 'bg-green-500 text-white border-green-600'
                      : 'bg-gray-200 text-gray-700 border-gray-300'
                  }`}
                >
                  <div className="font-bold">Week {week}</div>
                  {payment && (
                    <>
                      <div className="text-xs">
                        {format(new Date(payment.createdAt), 'dd MMM')}
                        <br />
                        {format(new Date(payment.createdAt), 'hh:mm a')}
                      </div>
                      <div className="absolute z-10 hidden group-hover:flex flex-col bg-white text-black text-xs p-2 rounded shadow-lg top-full mt-1 w-44 border border-gray-300">
                        <strong>Week:</strong> {payment.week}<br />
                        <strong>Amount:</strong> ₹{payment.amount}<br />
                        <strong>Mode:</strong> {payment.mode}<br />
                        <strong>Time:</strong><br />
                        {format(new Date(payment.createdAt), 'dd MMM yyyy, hh:mm a')}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {user && ( // Keep this check
        <div className="mt-8">
          <PaymentUploadForm userId={userId} onUpload={fetchProfile} />
        </div>
      )}
    </div>
  );
};

export default UserProfile;