import React, { useContext, useState } from "react";
import { Bell, Shield, Activity, RefreshCw } from "lucide-react";
import { AppContext } from "../context/AppContext";

export default function AlertSidebar() {
  const { user, watchlist } = useContext(AppContext);
  const [amount, setAmount] = useState(1);

  if (!user)
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 text-center">
        <p className="text-sm text-gray-400">Login to access tools.</p>
      </div>
    );

  return (
    <div className="space-y-6">
      {/* 1. Price Alert Section (Feature #6) */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 shadow-sm">
        <h3 className="font-bold flex items-center gap-2 mb-4">
          <Bell size={18} className="text-yellow-500" /> Active Alerts
        </h3>
        <div className="space-y-2">
          {watchlist.length > 0 ? (
            watchlist.map((coin) => (
              <div
                key={coin}
                className="flex justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-xs"
              >
                <span className="capitalize font-bold">{coin}</span>
                <span className="text-blue-500">Tracking...</span>
              </div>
            ))
          ) : (
            <p className="text-[10px] text-gray-500">No coins in watchlist.</p>
          )}
        </div>
      </div>

      {/* 2. Quick Converter (Feature #4) */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 shadow-sm">
        <h3 className="font-bold flex items-center gap-2 mb-4">
          <RefreshCw size={18} className="text-green-500" /> Quick Converter
        </h3>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 mb-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm outline-none"
          placeholder="Amount in EUR"
        />
        <p className="text-[10px] text-gray-400">
          Convert EUR to your watched assets instantly.
        </p>
      </div>
    </div>
  );
}
