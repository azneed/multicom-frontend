// multicom-frontend/src/pages/UserDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import PaymentUploadForm from './PaymentUploadForm';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import UserProfileEditModal from './UserProfileEditModal';

// Helper function for safe date formatting
const safeFormatDate = (dateString, formatStr, fallback = 'N/A') => {
  if (!dateString) {
    return fallback;
  }
  const date = new Date(dateString);
  if (isNaN(date.getTime())) { // Check if date is "Invalid Date"
    return fallback;
  }
  try {
    return format(date, formatStr);
  } catch (e) {
    console.error("Error formatting date:", dateString, e);
    return fallback;
  }
};


const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userId } = useParams();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // YouTube video configuration - update this ID weekly
  const youtubeConfig = {
    videoId: 'AG_To4SkNc0', // Replace with your actual YouTube video ID
    title: "This Week's Draw",
    description: "Watch the latest weekly draw results"
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        navigate('/');
        return;
      }

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const userRes = await axios.get(`http://localhost:5000/api/users/profile`);
      setUser(userRes.data);

      const payRes = await axios.get(`http://localhost:5000/api/payments/user/${userRes.data._id}`);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [navigate]);

 // ... inside UserDashboard.jsx
const paidWeeksMap = {};
payments.forEach((p) => {
    console.log('Processing payment:', p); // Add this line
    console.log('payment.createdAt:', p.createdAt, 'Type:', typeof p.createdAt); // And this line
    const paymentUserId = p.userId ? (typeof p.userId === 'object' ? p.userId._id : p.userId) : null;
    if (user && user._id && paymentUserId && String(paymentUserId) === String(user._id)) {
        paidWeeksMap[p.week] = p;
    }
});
// ...

  const handleProfileUpdated = () => {
    setIsEditModalOpen(false);
    fetchProfile();
  };

  const completedPayments = Object.keys(paidWeeksMap).length;
  const progressPercentage = (completedPayments / 60) * 100;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" style={{animationDirection: 'reverse'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        User data not loaded. Please try logging in again.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          style={{
            animation: 'blob 7s infinite'
          }}
        ></div>
        <div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          style={{
            animation: 'blob 7s infinite',
            animationDelay: '2s'
          }}
        ></div>
        <div 
          className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          style={{
            animation: 'blob 7s infinite',
            animationDelay: '4s'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* YouTube Video Section - New Addition */}
        <div 
          className="mb-8 transform transition-all duration-700 ease-out"
          style={{
            animation: 'slideInUp 0.8s ease-out forwards'
          }}
        >
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  {youtubeConfig.title}
                </h2>
              </div>
              <p className="text-gray-600 mb-6">{youtubeConfig.description}</p>
              
              {/* Responsive YouTube Embed */}
              <div className="relative pb-[56.25%] h-0 rounded-xl overflow-hidden shadow-lg">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${youtubeConfig.videoId}?autoplay=0&rel=0&modestbranding=1`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Weekly Draw Video"
                ></iframe>
              </div>
              
              <div className="mt-4 flex justify-end">
                <a 
                  href={`https://youtube.com/watch?v=${youtubeConfig.videoId}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-red-600 flex items-center"
                >
                  Watch on YouTube
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div 
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl shadow-sm"
            style={{
              animation: 'shake 0.5s ease-in-out'
            }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">!</span>
              </div>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {user && (
          <div 
            className="mb-8 transform transition-all duration-700 ease-out"
            style={{
              animation: 'slideInUp 0.8s ease-out forwards'
            }}
          >
            {/* Profile Header Card */}
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 h-32 relative">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-end justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center transform -translate-y-2">
                        <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {user.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="text-white">
                        <h1 className="text-2xl font-bold drop-shadow-lg">{user.name}</h1>
                        <p className="text-blue-100 text-sm">Multicom Gift Scheme Member</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsEditModalOpen(true)}
                      className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 border border-white/30"
                    >
                      <span className="flex items-center space-x-2">
                        <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        <span>Edit Profile</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Profile Details */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="group p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Card Number</p>
                        <p className="font-semibold text-gray-800">{user.cardNumber}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
</div>
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-semibold text-gray-800">{user.phone}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Place</p>
                        <p className="font-semibold text-gray-800">{user.place}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* ✅ FIX: Using safeFormatDate for registeredAt */}
        {user && ( // Only render if user object exists
          <div className="p-6 bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Registration Details</h3>
            <p className="text-gray-600">
              Registered On: {safeFormatDate(user.registeredAt, 'dd MMMM yyyy, hh:mm a', 'N/A or Invalid Date')}
            </p>
          </div>
        )}

        {user && (
          <div 
            className="mb-8 transform transition-all duration-700 ease-out"
            style={{
              animation: 'slideInUp 0.8s ease-out forwards',
              animationDelay: '200ms'
            }}
          >
            {/* Payment Progress Card */}
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      Payment Progress
                    </h3>
                    <p className="text-gray-600">
                      {completedPayments} out of 60 weeks completed
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">{Math.round(progressPercentage)}%</div>
                    <div className="text-sm text-gray-500">Complete</div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                      style={{ width: `${progressPercentage}%` }}
                    >
                      <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>0 weeks</span>
                    <span className="font-medium text-green-600">{completedPayments} weeks</span>
                    <span>60 weeks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {user && (
          <div 
            className="mb-8 transform transition-all duration-700 ease-out"
            style={{
              animation: 'slideInUp 0.8s ease-out forwards',
              animationDelay: '400ms'
            }}
          >
            {/* Payment Grid Card */}
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Payment History</h3>
                    <p className="text-gray-600">Weekly payment tracking ({payments.length}/60)</p>
                  </div>
                </div>

                {/* Payment Grid */}
                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-15 gap-3">
                  {Array.from({ length: 60 }, (_, i) => {
                    const week = i + 1;
                    const payment = paidWeeksMap[week];
                    const isCompleted = !!payment;

                    return (
                      <div
                        key={week}
                        className={`group relative h-16 w-full text-center text-sm rounded-xl flex flex-col justify-center items-center border-2 transition-all duration-300 transform hover:scale-110 hover:z-10 cursor-pointer ${
                          isCompleted
                            ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white border-green-300 shadow-lg hover:shadow-xl'
                            : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 border-gray-300 hover:from-gray-200 hover:to-gray-300'
                        }`}
                        style={{ 
                          animationDelay: `${i * 50}ms`,
                          animation: 'fadeInScale 0.6s ease-out forwards'
                        }}
                      >
                        <div className="font-bold text-xs">W{week}</div>
                        {payment && (
                          <div className="text-xs opacity-90">
                            {/* ✅ FIX: Using safeFormatDate for payment.createdAt */}
                            <div>{safeFormatDate(payment.createdAt, 'dd/MM')}</div>
                            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1 animate-pulse"></div>
                          </div>
                        )}
                        
                        {/* Tooltip */}
                        {payment && (
                          <div className="absolute z-20 hidden group-hover:flex flex-col bg-white text-gray-800 text-xs p-3 rounded-lg shadow-2xl top-full mt-2 w-48 border border-gray-200 transform -translate-x-1/2 left-1/2">
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-200"></div>
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span className="font-semibold text-green-600">Week {payment.week}</span>
                                <span className="text-green-600">✓</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Amount:</span>
                                <span className="font-semibold">₹{payment.amount}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Mode:</span>
                                <span className="font-semibold">{payment.mode}</span>
                              </div>
                              <div className="pt-1 border-t border-gray-200">
                                <span className="text-gray-500">
                                  {/* ✅ FIX: Using safeFormatDate for payment.createdAt in tooltip */}
                                  {safeFormatDate(payment.createdAt, 'dd MMM yyyy, hh:mm a')}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {/* Legend */}
                <div className="flex items-center justify-center space-x-8 mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded border-2 border-green-300"></div>
                    <span className="text-sm text-gray-600">Completed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded border-2 border-gray-300"></div>
                    <span className="text-sm text-gray-600">Pending</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Upload Form */}
        {user && (
          <div 
            className="transform transition-all duration-700 ease-out"
            style={{
              animation: 'slideInUp 0.8s ease-out forwards',
              animationDelay: '600ms'
            }}
          >
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 overflow-hidden">
              <div className="p-6">
                {/* ✅ FIX: Pass user._id to PaymentUploadForm */}
                <PaymentUploadForm userId={user._id} />
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditModalOpen && user && (
          <UserProfileEditModal
            user={user}
            onClose={() => setIsEditModalOpen(false)}
            onUpdate={handleProfileUpdated}
          />
        )}
      </div>
      
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .xl\\:grid-cols-15 {
          grid-template-columns: repeat(15, minmax(0, 1fr));
        }
        
        @media (max-width: 640px) {
          .xl\\:grid-cols-15 {
            grid-template-columns: repeat(5, minmax(0, 1fr));
          }
        }
        
        @media (min-width: 641px) and (max-width: 768px) {
          .xl\\:grid-cols-15 {
            grid-template-columns: repeat(8, minmax(0, 1fr));
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .xl\\:grid-cols-15 {
            grid-template-columns: repeat(10, minmax(0, 1fr));
          }
        }
        
        @media (min-width: 1025px) and (max-width: 1280px) {
          .xl\\:grid-cols-15 {
            grid-template-columns: repeat(12, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;