"use client";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, scale: 0.98, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: 20 },
};

export default function ContactPage() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative min-h-screen animated-gradient transition-colors duration-500 pt-24 pb-16"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white/40 backdrop-blur-md rounded-2xl shadow-xl transition-colors duration-500 p-8">
          {/* Header */}
          <h1 className="text-4xl md:text-5xl font-bold text-red-900 text-center mb-8 transition-colors duration-500">
            Contact Me
          </h1>
          <p className="text-center text-lg md:text-xl text-red-800 mb-12 transition-colors duration-500">
            Feel free to reach out to me via email or follow me on social media!
          </p>

          {/* Contact Methods */}
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="mailto:laptoper42@gmail.com"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-red-900 text-red-50 rounded-xl shadow hover:bg-red-700 active:scale-95 transition-all duration-200"
            >
              Email
            </a>
            <a
              href="https://github.com/SomeDoodL"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-red-900 text-red-50 rounded-xl shadow hover:bg-red-700 active:scale-95 transition-all duration-200"
            >
              GitHub
            </a>
            <a
              href="https://www.instagram.com/something_doodle"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-red-900 text-red-50 rounded-xl shadow hover:bg-red-700 active:scale-95 transition-all duration-200"
            >
              Instagram
            </a>
          </div>

          {/* Optional Contact Form */}
          <div className="mt-16 bg-red-50 rounded-xl p-8 shadow transition-colors duration-500">
            <h2 className="text-3xl font-bold text-red-900 mb-6 text-center transition-colors duration-500">
              Send Me a Message
            </h2>
            <form className="space-y-4 max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-red-500 placeholder-gray-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-red-500 placeholder-gray-400"
              />
              <textarea
                placeholder="Your Message"
                className="w-full p-3 border border-gray-300 rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-red-500 text-red-500 placeholder-gray-400"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
