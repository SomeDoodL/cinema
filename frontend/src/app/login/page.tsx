"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

const pageVariants = {
  initial: { opacity: 0, scale: 0.98, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: 20 },
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser, fetchUser } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send login request to Express backend
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // important for cookie-based JWT
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // Set user in context
      setUser(data.user);
      await fetchUser(); // refresh user info if needed

      router.push("/"); // redirect after login
    } catch (err: any) {
      console.error("Login error:", err);
      alert(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex min-h-screen items-center justify-center px-4"
    >
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-red-900 text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none text-red-600 placeholder-gray-400"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none text-red-600 placeholder-gray-400"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-lg transition-all duration-200 active:scale-95"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-2">
          Don't have an account?{" "}
          <Link href="/register" className="text-red-600 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </motion.div>
  );
}
