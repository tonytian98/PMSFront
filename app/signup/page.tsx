"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Signup() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { signup } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signup(username, password)
      router.push("/")
    } catch (error) {
      console.error("Signup failed:", error)
    }
  }

  return (
    <div className="min-h-screen bg-blue-950 flex items-center justify-center">
      <div className="bg-blue-900 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1 text-white">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-blue-100 text-blue-900"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-blue-100 text-blue-900"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition-colors"
          >
            Sign up
          </button>
        </form>
        <p className="mt-4 text-center text-blue-200">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

