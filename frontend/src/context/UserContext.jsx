import { createContext, useState, useEffect } from 'react';
import { getCookie } from '../utils/cookies';
import * as authService from '../services/authService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getCookie('yt-token');
      if (token) {
        try {
          const profileData = await authService.getProfile();
          if (profileData?.user) {
            setUser(profileData.user);
          } else {
            // Fallback
            setUser({ name: 'Admin' });
          }
        } catch (error) {
          setUser({ name: 'Admin' });
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
