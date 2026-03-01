import React, { useContext, useState } from "react";
import { TrendingUp, Sun, Moon, User, LogOut } from "lucide-react";
import { AppContext } from "../context/AppContext";

export default function Navbar() {
  const { darkMode, setDarkMode, user, login, logout } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogin = async () => {
    const email = prompt("Enter Email (e.g., alex.rivera@example.com):");
    const password = prompt("Enter Password:");
    if (email && password) {
      const result = await login(email, password);
      if (!result.success) alert(result.message);
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border dark:border-gray-700 mb-6 transition-colors">
      {/* Logo Section */}
      <div className="flex items-center gap-2 text-2xl font-bold text-blue-500">
        <TrendingUp size={28} /> <span>CryptoPulse</span>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {darkMode ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-blue-600" />
          )}
        </button>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-3 border-l pl-4 dark:border-gray-600 group"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none">{user.name}</p>
                <span className="text-[10px] bg-blue-500/10 text-blue-500 px-1.5 rounded uppercase font-bold mt-1 inline-block">
                  {user.role}
                </span>
              </div>
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                {user.name.charAt(0)}
              </div>
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-[#1e293b] rounded-xl shadow-xl border dark:border-gray-700 z-50 overflow-hidden">
                <button
                  onClick={() => {
                    logout();
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
