import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SchemeEditor = () => {
  const [scheme, setScheme] = useState('');
  const [message, setMessage] = useState('');

  // Fetch existing scheme (optional)
  useEffect(() => {
    axios.get('http://localhost:5000/api/scheme')
      .then(res => setScheme(res.data.scheme || ''))
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:5000/api/scheme', { scheme });
      setMessage('✅ Scheme updated successfully');
    } catch {
      setMessage('❌ Failed to update scheme');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-purple-700 mb-3">🎯 Edit Scheme Details</h2>
      <textarea
        value={scheme}
        onChange={(e) => setScheme(e.target.value)}
        rows={4}
        className="w-full border p-3 rounded-lg mb-3"
        placeholder="Enter current scheme details (e.g., 1BHK Flat or Fronx)"
      />
      <button
        onClick={handleSave}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
      >
        Save Scheme
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
};

export default SchemeEditor;
