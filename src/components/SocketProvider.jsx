import React from 'react';
import { useDispatch } from 'react-redux';
import SocketContext from '../contexts/socket.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  socket.on(
    'newMessage',
    (message) => {
      dispatch(messagesActions.addMessage(message));
    },
  );

  const sendMessage = (message) => {
    socket.emit('newMessage', message);
  };

  return (
    <SocketContext.Provider value={{ sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
