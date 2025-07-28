import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import PaymentUploadForm from './PaymentUploadForm';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          navigate('/');
          return;
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const userRes = await axios.get(`http://localhost:5000/api/users/profile`);
        const payRes = await axios.get(`http://localhost:5000/api/payments/user/${userId}`);

        setUser(userRes.data);
        setPayments(payRes.data);
        setError('');
      } catch (err) {
        console.error('Error loading user profile:', err.message);
        setError('❌ Failed to load user profile.');
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('jwtToken');
          localStorage.removeItem('userId');
          localStorage.removeItem('userName');
          navigate('/');
        }
      }
    };

    if (userId) {
      fetchProfile();
    } else {
      setError('❌ User ID not provided in URL. Cannot load profile.');
    }
  }, [userId, navigate]);

  const paidWeeksMap = {};
  payments.forEach((p) => {
    const paymentUserId = typeof p.userId === 'object' ? p.userId._id : p.userId;
    if (String(paymentUserId) === String(userId)) {
      paidWeeksMap[p.week] = p;
    }
  });

  return (
    <div className="p-4">
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {user && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">
            👤 {user.name}'s Profile
          </h2>
          <p><strong>Card Number:</strong> {user.cardNumber}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Place:</strong> {user.place}</p>
        </div>
      )}

      {user && (
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-green-700 mb-3">
            💸 Payment History ({payments.length}/60)
          </h3>

          <div className="grid grid-cols-10 gap-2">
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

      {/* ✅ Upload New Payment */}
      {user && (
        <div className="mt-8">
          <PaymentUploadForm userId={userId} />
        </div>
      )}
    </div>
  );
};

export default UserDashboard;