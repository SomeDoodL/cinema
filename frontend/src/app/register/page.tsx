"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // ✅ Import router
import { useUser } from "@/context/UserContext";

const pageVariants = {
  initial: { opacity: 0, scale: 0.98, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: 20 },
};

function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const part = parts.pop();
    if (part) {
      return part.split(";").shift();
    }
  }
  return undefined;
}

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const router = useRouter();
  const { fetchUser } = useUser();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      alert("Passwords do not match!");
      return;
    }

    // Get CSRF cookie first
    await fetch("http://localhost:8000/sanctum/csrf-cookie", {
      credentials: "include",
    });

    const xsrfToken = getCookie("XSRF-TOKEN");

    const res = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-XSRF-TOKEN": xsrfToken ? decodeURIComponent(xsrfToken) : "",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      }),
    });

    if (res.ok) {
      await fetchUser(); // update user context
      alert("Registration successful!");
      router.push("/"); // ✅ redirect to homepage
    } else {
      let errMsg = "Registration failed!";
      try {
        const errJson = await res.json();
        errMsg = errJson.message || JSON.stringify(errJson);
      } catch {
        const errText = await res.text();
        if (errText) errMsg = errText;
      }
      console.error("Error:", errMsg);
      alert(errMsg);
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
          required
        />

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

        <input
          type="password"
          placeholder="Confirm Password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none text-red-600 placeholder-gray-400"
          required
        />

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-lg transition-all duration-200 active:scale-95"
        >
          Register
        </button>
      </form>
    </motion.div>
  );
}
