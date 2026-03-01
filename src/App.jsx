import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import MarketTable from "./components/MarketTable";
import AlertSidebar from "./components/AlertSidebar"; // This will contain Converter & Alerts
import { AppContext } from "./context/AppContext";
import { Search } from "lucide-react";

export default function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "eur",
              order: "market_cap_desc",
              per_page: 50,
              sparkline: true,
              price_change_percentage: "24h",
            },
          }
        );
        setCoins(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchCoins();
    const interval = setInterval(fetchCoins, 60000);
    return () => clearInterval(interval);
  }, []);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Theme Toggle & Login */}
        <Navbar />

        {/* Professional Search Bar (Feature #1) */}
        <div className="relative mb-8 max-w-2xl">
          <Search className="absolute left-4 top-3.5 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search by name or symbol..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1e293b] border-none rounded-xl py-3.5 pl-12 pr-4 outline-none focus:ring-2 ring-blue-500 text-sm"
          />
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Market Table (Feature #2, #3, #5) */}
          <div className="col-span-12 lg:col-span-8 xl:col-span-9 bg-[#1e293b]/50 rounded-2xl border border-gray-800 overflow-hidden">
            <MarketTable coins={filteredCoins} />
          </div>

          {/* Sidebar: Converter & Price Alert (Feature #4, #6) */}
          <div className="col-span-12 lg:col-span-4 xl:col-span-3 space-y-6">
            {/* Quick Converter Box */}
            <div className="bg-[#1e293b] p-6 rounded-2xl border border-gray-800 shadow-xl">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="text-blue-500">$</span> Converter
              </h3>
              <input
                type="number"
                defaultValue={10}
                className="w-full bg-[#0f172a] p-3 rounded-lg outline-none mb-4"
              />
              <p className="text-xs text-gray-400 mb-1">Result:</p>
              <p className="text-2xl font-bold text-blue-500">$655,850 USD</p>
            </div>

            {/* Price Alert Box */}
            <div className="bg-[#1e293b] p-6 rounded-2xl border border-gray-800 shadow-xl">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="text-blue-500 font-normal">🔔</span> Price
                Alert
              </h3>
              <div className="space-y-4">
                <input
                  placeholder="btc"
                  className="w-full bg-[#0f172a] p-3 rounded-lg outline-none text-sm"
                />
                <input
                  placeholder="45"
                  className="w-full bg-[#0f172a] p-3 rounded-lg outline-none text-sm"
                />
                <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold transition-all">
                  Set Alert
                </button>
              </div>
            </div>

            {/* User Session Info */}
            {user && (
              <div className="p-4 bg-[#1e293b]/30 border border-gray-800 rounded-xl text-[10px] text-gray-500 italic">
                Session: {user.role} | Last login:{" "}
                {new Date(user.last_login).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
