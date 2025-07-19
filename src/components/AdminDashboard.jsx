import React, { useState } from 'react';
import UsersList from './UsersList';
import AddPaymentForm from './AddPaymentForm';
import WeekSummary from './WeekSummary';
import AdminAddUserForm from './AdminAddUserForm';
import SchemeEditor from './SchemeEditor';
import UserProfile from './UserProfile';
import AdminMultiPayment from './AdminMultiPayment';
import PendingPaymentsAdminPanel from './PendingPaymentsAdminPanel';
import HistoryPage from './HistoryPage'; // ✅ Import HistoryPage

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [selectedUserId, setSelectedUserId] = useState(null);

  const openUserProfile = (userId) => {
    setSelectedUserId(userId);
    setActiveTab('profile');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
        🛠 MULTICOM Admin Dashboard
      </h1>

      <div className="flex justify-center space-x-3 mb-6 flex-wrap">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl font-semibold shadow-md transition ${
            activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-white'
          }`}
        >
          👥 View Users
        </button>
        <button
          onClick={() => setActiveTab('payment')}
          className={`px-4 py-2 rounded-xl font-semibold shadow-md transition ${
            activeTab === 'payment' ? 'bg-blue-600 text-white' : 'bg-white'
          }`}
        >
          💰 Add/Delete Payment
        </button>
        <button
          onClick={() => setActiveTab('multi')}
          className={`px-4 py-2 rounded-xl font-semibold shadow-md transition ${
            activeTab === 'multi' ? 'bg-blue-600 text-white' : 'bg-white'
          }`}
        >
          🔢 Multi-Week Manager
        </button>
        <button
          onClick={() => setActiveTab('week')}
          className={`px-4 py-2 rounded-xl font-semibold shadow-md transition ${
            activeTab === 'week' ? 'bg-blue-600 text-white' : 'bg-white'
          }`}
        >
          📅 Week Summary
        </button>
        <button
          onClick={() => setActiveTab('adduser')}
          className={`px-4 py-2 rounded-xl font-semibold shadow-md transition ${
            activeTab === 'adduser' ? 'bg-blue-600 text-white' : 'bg-white'
          }`}
        >
          ➕ Add User
        </button>
        <button
          onClick={() => setActiveTab('scheme')}
          className={`px-4 py-2 rounded-xl font-semibold shadow-md transition ${
            activeTab === 'scheme' ? 'bg-blue-600 text-white' : 'bg-white'
          }`}
        >
          ⚙️ Edit Scheme
        </button>
        <button
          onClick={() => setActiveTab('review')}
          className={`px-4 py-2 rounded-xl font-semibold shadow-md transition ${
            activeTab === 'review' ? 'bg-blue-600 text-white' : 'bg-white'
          }`}
        >
          📤 Review Payments
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-xl font-semibold shadow-md transition ${
            activeTab === 'history' ? 'bg-blue-600 text-white' : 'bg-white'
          }`}
        >
          📜 History Log
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        {activeTab === 'users' && <UsersList onViewProfile={openUserProfile} />}
        {activeTab === 'payment' && <AddPaymentForm />}
        {activeTab === 'multi' && <AdminMultiPayment />}
        {activeTab === 'week' && <WeekSummary />}
        {activeTab === 'adduser' && <AdminAddUserForm />}
        {activeTab === 'scheme' && <SchemeEditor />}
        {activeTab === 'profile' && <UserProfile userId={selectedUserId} onBack={() => setActiveTab('users')} />}
        {activeTab === 'review' && <PendingPaymentsAdminPanel />}
        {activeTab === 'history' && <HistoryPage />} {/* ✅ New history tab */}
      </div>
    </div>
  );
};

export default AdminDashboard;
