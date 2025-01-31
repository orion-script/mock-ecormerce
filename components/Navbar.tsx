"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme(theme || "light");
  }, [theme, setTheme]);

  return (
    <nav className="bg-blue-600 dark:bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-2xl font-bold">
            E-Shop
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-gray-200">
              Shop
            </Link>
            <Link href="/cart" className="hover:text-gray-200">
              Cart
            </Link>
            <Link href="/checkout" className="hover:text-gray-200">
              Checkout
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-md bg-white dark:bg-gray-800 dark:text-white text-blue-600"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-blue-700 dark:bg-gray-800 py-2">
          <Link href="/" className="block py-2 px-4 hover:bg-blue-500">
            Shop
          </Link>
          <Link href="/cart" className="block py-2 px-4 hover:bg-blue-500">
            Cart
          </Link>
          <Link href="/checkout" className="block py-2 px-4 hover:bg-blue-500">
            Checkout
          </Link>
        </div>
      )}
    </nav>
  );
}
