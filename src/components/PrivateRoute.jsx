import React from 'react';
import { Redirect } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';

const PrivateRoute = ({ children }) => {
  const { authUser } = useAuth();

  return (
    authUser ? children : <Redirect to={routes.web.loginPath()} />
  );
};

export default PrivateRoute;
