import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const UserPaymentHistory = ({ userId }) => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId) {
      setError('❌ User ID is required.');
      return;
    }

    const fetchPayments = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/payments/user/${userId}`);
        setPayments(res.data);
      } catch (err) {
        setError('❌ Failed to load payment history.');
      }
    };

    fetchPayments();
  }, [userId]);

  const paidWeeksMap = {};
  payments.forEach(p => {
    paidWeeksMap[p.week] = p;
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-blue-800 text-center">
        📊 My Payment History ({payments.length}/60 Weeks)
      </h2>

      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-10 gap-2">
        {Array.from({ length: 60 }, (_, i) => {
          const week = i + 1;
          const payment = paidWeeksMap[week];

          return (
            <div
              key={week}
              className={`relative group h-16 text-center text-sm rounded-lg flex flex-col justify-center items-center border transition-all ${
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
  );
};

export default UserPaymentHistory;
