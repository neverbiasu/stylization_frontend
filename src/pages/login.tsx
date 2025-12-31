"use client";

import React from "react";
import Navbar from "@/components/navbar";

export default function Login() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Login
          </h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-400"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-600 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-400"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-blue-600 hover:underline bg-transparent border-none p-0 cursor-pointer"
            >
              Forgot your password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
