import { createContext, useState, useEffect } from 'react';
import { getCookie } from '../utils/cookies';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getCookie('token');
    const username = getCookie('username') || 'Admin';
    if (token) {
      setUser({ username });
    }
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
