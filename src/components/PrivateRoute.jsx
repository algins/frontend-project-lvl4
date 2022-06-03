import React from 'react';
import { Redirect } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Redirect to={routes.web.loginPath()} />
  );
};

export default PrivateRoute;
