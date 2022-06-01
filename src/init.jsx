import i18next from 'i18next';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import App from './components/App.jsx';
import resources from './locales/index.js';
import setLocale from './locales/yup/setLocale.js';

export default () => {
  const i18nextInstance = i18next.createInstance();
  i18nextInstance.init({ lng: 'ru', resources });
  setLocale(i18nextInstance);

  return (
    <I18nextProvider i18n={i18nextInstance}>
      <App />
    </I18nextProvider>
  );
};
