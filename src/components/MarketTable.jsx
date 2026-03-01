import React, { useContext } from 'react';
import { Star } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { AppContext } from '../context/AppContext';

export default function MarketTable({ coins }) {
  const { watchlist, toggleWatchlist } = useContext(AppContext);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs text-gray-500 uppercase">
          <tr>
            <th className="p-4">Coin</th>
            <th className="p-4">Price</th>
            <th className="p-4">24h Change</th>
            <th className="p-4 w-32">7d Trend</th>
            <th className="p-4 text-center">Watch</th>
          </tr>
        </thead>
        <tbody className="divide-y dark:divide-gray-700">
          {coins.map((coin) => (
            <tr key={coin.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
              <td className="p-4 flex items-center gap-3">
                <img src={coin.image} className="w-6 h-6" alt={coin.name} />
                <div>
                  <p className="font-bold text-sm leading-none">{coin.name}</p>
                  <p className="text-[10px] text-gray-500 uppercase mt-1">{coin.symbol}</p>
                </div>
              </td>
              <td className="p-4 font-mono text-sm font-semibold">
                €{coin.current_price.toLocaleString()}
              </td>
              <td className={`p-4 text-sm font-bold ${coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </td>
              <td className="p-4 h-12">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={coin.sparkline_in_7d.price.map(p => ({ p }))}>
                    <Line 
                      type="monotone" 
                      dataKey="p" 
                      stroke={coin.price_change_percentage_24h > 0 ? "#10b981" : "#ef4444"} 
                      dot={false} 
                      strokeWidth={1.5} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </td>
              <td className="p-4 text-center">
                <button 
                  onClick={() => toggleWatchlist(coin.id)}
                  className="hover:scale-110 transition-transform"
                >
                  <Star 
                    size={18} 
                    className={watchlist.includes(coin.id) ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"} 
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}