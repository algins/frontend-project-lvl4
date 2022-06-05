import React from 'react';
import { useDispatch } from 'react-redux';
import SocketContext from '../contexts/socket.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  socket.on('newMessage', (message) => {
    dispatch(messagesActions.addMessage(message));
  });

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
