import React from 'react';
import SocketContext from '../../contexts/socket.js';

const SocketProvider = ({ socket, children }) => {
  const addMessage = async (message, cb) => socket.emit('newMessage', message, cb);
  const addChannel = async (channel, cb) => socket.emit('newChannel', channel, cb);
  const removeChannel = async (id, cb) => socket.emit('removeChannel', { id }, cb);
  const renameChannel = async (id, name, cb) => socket.emit('renameChannel', { id, name }, cb);

  return (
    <SocketContext.Provider value={{
      addMessage,
      addChannel,
      removeChannel,
      renameChannel,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
