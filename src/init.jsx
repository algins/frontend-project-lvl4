import { Provider, ErrorBoundary } from '@rollbar/react';
import i18next from 'i18next';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { io } from 'socket.io-client';
import { Provider as StoreProvider } from 'react-redux';
import App from './components/App.jsx';
import AuthProvider from './components/providers/AuthProvider.jsx';
import SocketProvider from './components/providers/SocketProvider.jsx';
import resources from './locales/index.js';
import setLocale from './locales/yup/setLocale.js';
import store from './slices/index.js';

export default () => {
  const rollbarConfig = {
    accessToken: '08ee2c1cc9ea4e979ae63ece376be02d',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };

  const i18n = i18next.createInstance();
  i18n.init({ lng: 'ru', resources });
  setLocale(i18n);

  const socket = io();

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <StoreProvider store={store}>
            <AuthProvider>
              <SocketProvider socket={socket}>
                <App />
              </SocketProvider>
            </AuthProvider>
          </StoreProvider>
        </I18nextProvider>
      </ErrorBoundary>
    </Provider>
  );
};
