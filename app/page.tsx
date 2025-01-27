"use client"

import { useAuth } from "./contexts/AuthContext"
import Link from "next/link"
import Navbar from "./components/Navbar"
import { useState, useEffect } from 'react';

export default function Home() {
  const { user } = useAuth()
  const [positions, setPositions] = useState({});

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      setPositions(JSON.parse(event.data));
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="min-h-screen bg-blue-950 flex flex-col">
      {user && <Navbar />}
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h1 className="text-6xl sm:text-7xl font-bold text-center mb-12 text-white">
            Welcome{user ? `, ${user.username}!` : "!"}
          </h1>
          {!user && (
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/login"
                className="flex-1 bg-blue-400 text-blue-900 text-center py-3 px-6 rounded-full hover:bg-blue-300 transition-colors text-base"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="flex-1 bg-blue-600 text-white text-center py-3 px-6 rounded-full hover:bg-blue-500 transition-colors text-base"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
        {user && (
          <div className="mt-8 bg-blue-900 rounded-lg p-8 w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-6 text-white">Your Positions</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-white border-collapse">
                <thead>
                  <tr className="bg-blue-800">
                    <th className="p-3 text-left">PositionID</th>
                    <th className="p-3 text-left">Symbol</th>
                    <th className="p-3 text-left">Qty</th>
                    <th className="p-3 text-left">AverageCost</th>
                    <th className="p-3 text-left">UnrealizedPnL</th>
                    <th className="p-3 text-left">Currency</th>
                    <th className="p-3 text-left">CurrentPrice</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(positions).map((position: any) => (
                    <tr key={position.PositionID} className="border-b border-blue-700 hover:bg-blue-800 transition-colors">
                      <td className="p-3">{position.PositionID}</td>
                      <td className="p-3">{position.Symbol}</td>
                      <td className="p-3">{position.Qty}</td>
                      <td className="p-3">{position.AverageCost.toFixed(2)}</td>
                      <td
                        className={`p-3 ${
                          position.UnrealizedPnL > 0
                            ? 'text-green-400'
                            : position.UnrealizedPnL < 0
                            ? 'text-red-400'
                            : 'text-white'
                        }`}
                      >
                        {position.UnrealizedPnL.toFixed(2)}
                      </td>
                      <td className="p-3">{position.Currency}</td>
                      <td className="p-3">{position.CurrentPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}