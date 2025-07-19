import React, { useState } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';

const PaymentUploadForm = ({ userId, onUpload }) => {
  const [amount, setAmount] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [week, setWeek] = useState(''); // Assuming user can specify week for pending

  const upiId = 'hameedabbuupl@oksbi';
  const payeeName = 'Multicom';
  const transactionNote = 'Weekly Payment';

  const upiLink = amount ? `upi://pay?pa=${upiId}&pn=${payeeName}&am=${amount}&tn=${transactionNote}&cu=INR` : '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !screenshot || !week) { // Added week to validation
      setStatus('❌ Please enter amount, week, and upload screenshot');
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('amount', amount);
    formData.append('mode', 'UPI');
    formData.append('screenshot', screenshot);
    formData.append('week', week); // NEW: Append the week for pending payment

    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/pending/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setStatus('✅ Payment uploaded successfully');
      setAmount('');
      setScreenshot(null);
      setWeek(''); // Reset week field
      if (onUpload) {
        onUpload();
      }
    } catch (err) {
      console.error('❌ Upload failed:', err.response?.data?.message || err.message);
      setStatus('❌ Upload failed: ' + (err.response?.data?.message || 'Server error.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow w-full max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-blue-700">📤 Upload Your Payment (User Proof)</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Enter Amount (e.g. 100)"
          className="w-full p-2 border rounded"
          step="100" min="100"
          value={amount} onChange={e => setAmount(e.target.value)}
        />
        <input // NEW: Week input for user
          type="number"
          placeholder="Enter Week Number"
          className="w-full p-2 border rounded"
          min="1" max="60"
          value={week} onChange={e => setWeek(e.target.value)}
        />
        {amount && (
          <div className="text-center my-2">
            <QRCodeCanvas value={upiLink} size={180} />
            <p className="text-sm mt-2"><a href={upiLink} className="underline text-blue-600">Tap to pay</a></p>
          </div>
        )}
        <input type="file" accept="image/*" onChange={e => setScreenshot(e.target.files[0])} />
        <button type="submit" disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          {loading ? 'Uploading...' : 'Submit Payment'}
        </button>
      </form>
      {status && <p className="mt-4 font-medium">{status}</p>}
    </div>
  );
};

export default PaymentUploadForm;