import { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = AuthService.getToken();
      if (token) {
        try {
          // Validate token with backend
          await AuthService.validateToken();
          const userInfo = AuthService.getUserInfo();
          if (userInfo) {
            setUser(userInfo);
            setIsAuthenticated(true);
          }
        } catch (error) {
          // Token is invalid, clear storage
          AuthService.logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await AuthService.login(email, password);
      const userInfo = response.user || { email, name: email.split('@')[0] };
      setUser(userInfo);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await AuthService.register(userData);
      const userInfo = response.user || { 
        email: userData.email, 
        name: userData.nombre || userData.email.split('@')[0] 
      };
      setUser(userInfo);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};