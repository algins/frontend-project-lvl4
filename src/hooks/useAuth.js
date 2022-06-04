import { useContext } from 'react';

import authContext from '../contexts/auth.js';

const useAuth = () => useContext(authContext);

export default useAuth;
