"use client";

import React from "react";
import Link from "next/link";

export default function Navbar() {
  const [pathname, setPathname] = React.useState("");

  React.useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="text-gray-800 font-bold text-lg">
              <img src="/logo.png" alt="Logo" className="h-16" />
            </Link>
          </div>
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-gray-600 hover:text-gray-800 rounded-lg px-3 py-2 ${
                pathname === "/" ? "bg-gray-100" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/generate"
              className={`text-gray-600 hover:text-gray-800 rounded-lg px-3 py-2 ${
                pathname === "/generate" ? "bg-gray-100" : ""
              }`}
            >
              Generate
            </Link>
            <Link
              href="/community"
              className={`text-gray-600 hover:text-gray-800 rounded-lg px-3 py-2 ${
                pathname === "/community" ? "bg-gray-100" : ""
              }`}
            >
              Community
            </Link>
            <Link
              href="/pricing"
              className={`text-gray-600 hover:text-gray-800 rounded-lg px-3 py-2 ${
                pathname === "/pricing" ? "bg-gray-100" : ""
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className={`text-gray-600 hover:text-gray-800 rounded-lg px-3 py-2 ${
                pathname === "/contact" ? "bg-gray-100" : ""
              }`}
            >
              Contact
            </Link>
          </div>
          {/* Login Button */}
          <div className="flex items-center">
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-800 rounded-lg px-3 py-2 bg-gray-100"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
