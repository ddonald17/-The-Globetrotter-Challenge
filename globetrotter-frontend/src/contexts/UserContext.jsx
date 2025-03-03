import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('globetrotter_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('globetrotter_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('globetrotter_user');
  };

  const updateScore = (newScore) => {
    const updatedUser = { ...user, score: newScore };
    setUser(updatedUser);
    localStorage.setItem('globetrotter_user', JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout, updateScore }}>
      {children}
    </UserContext.Provider>
  );
};
