import React, { useState } from 'react';
import AuthContext from '../../contexts/auth.js';

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem('authUser')),
  );

  const logIn = (user) => {
    localStorage.setItem('authUser', JSON.stringify(user));
    setAuthUser(user);
  };

  const logOut = () => {
    localStorage.removeItem('authUser');
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={{ authUser, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
