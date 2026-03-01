import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  const login = async (email, password) => {
    try {
      // Fetch user from db.json matching both email and password
      const res = await axios.get(`http://localhost:3001/users?email=${email}&password=${password}`);
      
      if (res.data.length > 0) {
        const foundUser = res.data[0];
        
        // Block login if status is not Active
        if (foundUser.status !== "Active") {
          alert(`Login failed: Account status is ${foundUser.status}`);
          return { success: false };
        }

        setUser(foundUser);
        return { success: true };
      }
      alert("Invalid email or password");
      return { success: false };
    } catch (err) {
      console.error("Login error:", err);
      return { success: false };
    }
  };

  const logout = () => setUser(null);

  const toggleWatchlist = async (coinId) => {
    if (!user) return alert("Please login to save favorites");

    // Ensure watch_list exists even if it's missing from db.json
    const currentList = user.watch_list || [];
    const updatedList = currentList.includes(coinId)
      ? currentList.filter(id => id !== coinId)
      : [...currentList, coinId];

    try {
      // PATCH updates only the watch_list field for that specific user ID
      await axios.patch(`http://localhost:3001/users/${user.id}`, {
        watch_list: updatedList
      });
      setUser({ ...user, watch_list: updatedList });
    } catch (err) {
      console.error("Failed to update watchlist:", err);
    }
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      watchlist: user?.watch_list || [], 
      toggleWatchlist, 
      darkMode, 
      setDarkMode, 
      login, 
      logout 
    }}>
      <div className={darkMode ? 'dark' : ''}>{children}</div>
    </AppContext.Provider>
  );
};