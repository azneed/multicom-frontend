import React, { useState } from 'react';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const MemberLoginModal = ({ onClose }) => {
  const [step, setStep] = useState('requestOtp');
  const [cardNumber, setCardNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    if (!cardNumber || !phoneNumber) {
      setError('Please enter both Card Number and Phone Number.');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/users/generate-otp', {
        cardNumber,
        phone: phoneNumber
      });

      setSuccessMessage(res.data.message || 'OTP sent successfully to your phone.');
      setStep('verifyOtp');
    } catch (err) {
      console.error('OTP Request Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    if (!otp) {
      setError('Please enter the OTP.');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/users/verify-otp', {
        cardNumber,
        phone: phoneNumber,
        otp
      });

      const { token, _id, name } = res.data;

      localStorage.setItem('jwtToken', token);
      localStorage.setItem('userId', _id);
      localStorage.setItem('userName', name);
      setAuthToken(token);

      setSuccessMessage('Login successful! Redirecting to dashboard...');
      setLoading(false);

      setTimeout(() => {
        onClose();
        navigate(`/user-dashboard/${_id}`); // Use navigate for redirection
      }, 1500);

    } catch (err) {
      console.error('OTP Verification Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Member Login</h2>
        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm border border-red-200">
            {error}
          </p>
        )}
        {successMessage && (
          <p className="bg-green-100 text-green-700 p-3 rounded-md mb-4 text-sm border border-green-200">
            {successMessage}
          </p>
        )}

        {step === 'requestOtp' ? (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div>
              <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                id="card-number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your card number"
                required
              />
            </div>
            <div>
              <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                Registered Phone Number
              </label>
              <input
                type="tel"
                id="phone-number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 9876543210"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Sending OTP...' : 'Request OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center text-xl tracking-widest"
                placeholder="_ _ _ _ _ _"
                maxLength="6"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify OTP & Login'}
            </button>
            <button
              type="button"
              onClick={() => setStep('requestOtp')}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Request New OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MemberLoginModal;