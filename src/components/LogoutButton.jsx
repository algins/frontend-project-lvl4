import React from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.js';

const LogoutButton = () => {
  const { t } = useTranslation();
  const { authUser, logOut } = useAuth();

  return (
    authUser ? <Button onClick={logOut}>{t('logoutButton.logout')}</Button> : null
  );
};

export default LogoutButton;
