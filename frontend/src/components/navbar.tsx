"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, User as UserIcon } from "lucide-react";
import { useUser } from "@/context/UserContext";
import localFont from "next/font/local";

// Load GeistMono font locally
const geistMono = localFont({
  src: [
    { path: '../fonts/GeistMono/GeistMono-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/GeistMono/GeistMono-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-geist-mono',
});

export default function Navbar() {
  const { user, setUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const handleLogout = async () => {
    await fetch("http://localhost:8000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser?.(null);
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const opacity = scrollY < 100 ? 0.9 : 0.8;

  const gradientStyle = {
    background: `linear-gradient(
      to right,
      rgba(220, 38, 38, 0.1) 0%,
      rgba(255, 255, 255, 1) 10%,
      rgba(255, 255, 255, 1) 90%,
      rgba(220, 38, 38, 0.1) 100%
    )`,
    backdropFilter: "blur(10px)",
  };

  return (
    <nav
      className={`${geistMono.className} fixed top-0 left-0 w-full z-50 text-gray-900 shadow-lg transition-all duration-300`}
      style={gradientStyle}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Image src="/logo.png" alt="Logo" width={240} height={240} />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center font-semibold">
          <li>
            <Link href="/blogs" className="hover:text-red-600 transition-colors duration-300 text-2xl">
              Blogs
            </Link>
          </li>
          <li>
            <Link href="/skills" className="hover:text-red-600 transition-colors duration-300 text-2xl">
              Skills
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-red-600 transition-colors duration-300 text-2xl">
              Contact
            </Link>
          </li>
          {!user ? (
            <li>
              <Link href="/login" className="hover:text-red-600 transition-colors duration-300 text-2xl">
                Login
              </Link>
            </li>
          ) : (
            <li className="flex items-center gap-3">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name || user.email}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <UserIcon className="w-8 h-8 text-red-600" />
              )}
              <span>{user.name || user.email}</span>
              <button
                onClick={handleLogout}
                className="hover:text-red-600 transition-colors duration-300"
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-red-800/50 transition"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden flex flex-col px-6 py-4 space-y-4 font-geistMono transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          background: `linear-gradient(
            to right,
            rgba(220, 38, 38, 0.15) 0%,
            rgba(255, 255, 255, 0.9) 15%,
            rgba(255, 255, 255, 0.9) 85%,
            rgba(220, 38, 38, 0.15) 100%
          )`,
          backdropFilter: "blur(10px)",
        }}
      >
        <Link
          href="/blogs"
          className="block hover:text-red-600 transition-colors duration-300"
          onClick={() => setIsOpen(false)}
        >
          Blogs
        </Link>
        <Link
          href="/skills"
          className="block hover:text-red-600 transition-colors duration-300"
          onClick={() => setIsOpen(false)}
        >
          Skills
        </Link>
        <Link
          href="/contact"
          className="block hover:text-red-600 transition-colors duration-300"
          onClick={() => setIsOpen(false)}
        >
          Contact
        </Link>

        {!user ? (
          <Link
            href="/login"
            className="block hover:text-red-600 transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
        ) : (
          <div
            className="flex items-center gap-3"
            onClick={() => setIsOpen(false)}
          >
            {/* Avatar or icon */}
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name || user.email}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <UserIcon className="w-8 h-8 text-red-600" />
            )}
            <span>{user.name || user.email}</span>
            <button
              onClick={handleLogout}
              className="hover:text-red-600 underline transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
