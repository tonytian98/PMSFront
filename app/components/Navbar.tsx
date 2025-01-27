"use client"

import Link from "next/link"
import { useAuth } from "../contexts/AuthContext"

export default function Navbar() {
  const { logout } = useAuth()

  return (
    <nav className="bg-blue-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
        Position Management System
        </Link>
        <div className="space-x-4">
          
          <button onClick={logout} className="text-white hover:text-blue-200">
            Log out
          </button>
        </div>
      </div>
    </nav>
  )
}

