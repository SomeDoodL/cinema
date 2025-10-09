"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, scale: 0.98, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: 20 },
};

export default function BlogDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlog() {
      try {
        const res = await fetch(`http://localhost:8000/api/blogs/${id}`);
        const data = await res.json();
        setBlog(data.blog || data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    }
    loadBlog();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (!blog) return <p className="text-center mt-10 text-red-600">Blog not found.</p>;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative min-h-screen animated-gradient transition-colors duration-500 pt-32 pb-16"
    >
      <div className="container mx-auto px-16">
        <div className="max-w-3xl mx-auto bg-white/40 backdrop-blur-md rounded-2xl shadow-xl p-8 transition-colors duration-500">
          <button
            onClick={() => router.back()}
            className="mb-6 text-red-600 hover:underline"
          >
            ← Back
          </button>

          {blog.image_path && (
            <div className="w-full h-80 mb-6 rounded-xl overflow-hidden shadow-md">
              <img
                src={`http://localhost:8000/uploads/${blog.image_path}`}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-red-900 mb-4">
            {blog.title}
          </h1>

          {blog.authorName && (
            <p className="text-red-600 mb-4">By {blog.authorName}</p>
          )}

          <p className="text-red-800 leading-relaxed whitespace-pre-line">
            {blog.content}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
