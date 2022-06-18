import { Provider, ErrorBoundary } from '@rollbar/react';
import i18next from 'i18next';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider as StoreProvider } from 'react-redux';
import socket from './socket.js';
import App from './components/App.jsx';
import AuthProvider from './components/providers/AuthProvider.jsx';
import SocketProvider from './components/providers/SocketProvider.jsx';
import resources from './locales/index.js';
import setLocale from './locales/yup/setLocale.js';
import store from './slices/index.js';

const init = () => {
  const rollbarConfig = {
    accessToken: process.env.POST_CLIENT_ITEM_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    enabled: process.env.NODE_ENV === 'production',
    payload: {
      environment: process.env.NODE_ENV,
    },
  };

  const i18n = i18next.createInstance();
  i18n.init({ lng: 'ru', resources });
  setLocale(i18n);

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

export default init;
