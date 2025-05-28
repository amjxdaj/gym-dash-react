
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member';
  gymId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demo
const mockUsers: User[] = [
  { id: '1', name: 'John Owner', email: 'owner@gym.com', role: 'owner' },
  { id: '2', name: 'Sarah Admin', email: 'admin@gym.com', role: 'admin', gymId: 'gym1' },
  { id: '3', name: 'Mike Member', email: 'member@gym.com', role: 'member', gymId: 'gym1' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('gymapp_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    // Mock authentication
    const foundUser = mockUsers.find(u => u.email === email && u.role === role);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('gymapp_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string, role: string): Promise<boolean> => {
    // Mock signup
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: role as 'owner' | 'admin' | 'member',
      gymId: role !== 'owner' ? 'gym1' : undefined,
    };
    setUser(newUser);
    localStorage.setItem('gymapp_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gymapp_user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
