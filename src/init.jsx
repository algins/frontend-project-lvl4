import { Provider, ErrorBoundary } from '@rollbar/react';
import i18next from 'i18next';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider as StoreProvider } from 'react-redux';
import { io } from 'socket.io-client';
import App from './components/App.jsx';
import AuthProvider from './components/providers/AuthProvider.jsx';
import SocketProvider from './components/providers/SocketProvider.jsx';
import resources from './locales/index.js';
import setLocale from './locales/yup/setLocale.js';
import store from './slices/index.js';
import { actions as channelsActions } from './slices/channelsSlice.js';
import { actions as messagesActions } from './slices/messagesSlice.js';

const init = () => {
  const rollbarConfig = {
    accessToken: process.env.POST_CLIENT_ITEM_ACCESS_TOKEN,
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

  socket.on('newMessage', (payload) => {
    store.dispatch(messagesActions.newMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(channelsActions.newChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(channelsActions.renameChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(channelsActions.removeChannel(payload));
  });

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
