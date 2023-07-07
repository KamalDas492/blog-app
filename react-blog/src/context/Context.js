import React, { createContext, useState } from 'react';

// Create the user context
export const UserContext = createContext();

// Create the user context provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
