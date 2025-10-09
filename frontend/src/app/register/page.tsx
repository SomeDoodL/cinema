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

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useUser();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Register failed");

      setUser(data.user);
      router.push("/");
    } catch (err: any) {
      alert(err.message);
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
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-red-900 text-center">Register</h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none text-red-600 placeholder-gray-400"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none text-red-600 placeholder-gray-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none text-red-600 placeholder-gray-400"
        />

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-lg transition-all duration-200 active:scale-95"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-red-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </motion.div>
  );
}
