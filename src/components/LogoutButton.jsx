import React from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';

const LogoutButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    auth.loggedIn ? <Button onClick={auth.logOut}>{t('logoutButton.logout')}</Button> : null
  );
};

export default LogoutButton;
