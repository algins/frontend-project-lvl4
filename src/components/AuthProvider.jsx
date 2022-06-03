import React, { useState } from 'react';
import AuthContext from '../contexts/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem('authUser'),
  );

  const logIn = (authUser) => {
    localStorage.setItem('authUser', authUser);
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('authUser');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
