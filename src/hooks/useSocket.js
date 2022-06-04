import { useContext } from 'react';

import socketContext from '../contexts/socket.js';

const useSocket = () => useContext(socketContext);

export default useSocket;
