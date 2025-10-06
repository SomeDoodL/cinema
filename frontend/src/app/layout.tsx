import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/navbar";
import { UserProvider } from "@/context/UserContext";

const geistSans = localFont({
  src: [
    {
      path: "../fonts/Geist/Geist-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Geist/Geist-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: [
    {
      path: "../fonts/GeistMono/GeistMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/GeistMono/GeistMono-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Khaylief - Aspiring to not be homeless",
  description:
    "Personal introduction page of Khaylief, a lover of technology, programming, and all space and universe related things.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-red-100 to-red-300 min-h-screen`}
      >
        {/* ✅ Provide user context to entire app */}
        <UserProvider>
          <Navbar />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
