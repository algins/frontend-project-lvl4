import React from 'react';
import { useDispatch } from 'react-redux';
import SocketContext from '../../contexts/socket.js';
import { actions as channelsActions } from '../../slices/channelsSlice.js';
import { actions as messagesActions } from '../../slices/messagesSlice.js';

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  socket.on('newMessage', (payload) => {
    dispatch(messagesActions.newMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    dispatch(channelsActions.newChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    dispatch(channelsActions.renameChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    dispatch(channelsActions.removeChannel(payload));
  });

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
