import React from 'react';
import SocketContext from '../../contexts/socket.js';

const SocketProvider = ({ socket, children }) => (
  <SocketContext.Provider value={socket}>
    {children}
  </SocketContext.Provider>
);

export default SocketProvider;
