// multicom-frontend/utils/setAuthToken.js
import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // When no token is passed, it means logout or clear tokens
    delete axios.defaults.headers.common['Authorization'];

    // Clear all associated tokens to prevent accidental re-use
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    // Any other localStorage items related to sessions should be cleared here
  }
};

export default setAuthToken;