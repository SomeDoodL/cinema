"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";

const pageVariants = {
  initial: { opacity: 0, scale: 0.98, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: 20 },
};

interface Blog {
  _id: string;
  title: string;
  content: string;
  image_path?: string | null;
  authorName?: string;
}

export default function BlogsPage() {
  const { user } = useUser();
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:8000/api/blogs");
        const data = await res.json();
        setBlogs(data.blogs || []);
      } catch (err) {
        console.error(err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const openBlog = (id: string) => {
    router.push(`/blogs/${id}`);
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative min-h-screen animated-gradient transition-colors duration-500 pt-32 pb-12"
    >
      <div className="container mx-auto px-16">
        <div className="max-w-6xl mx-auto bg-white/40 backdrop-blur-md rounded-2xl shadow-xl transition-colors duration-500 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-red-900">Blogs</h1>
            {user?.role && (
              <button
                onClick={() => router.push("/admin/blogs")}
                className="hidden sm:inline-flex items-center gap-2 bg-red-600 text-red-50 px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Go to Admin Panel
              </button>
            )}
          </div>

          {loading ? (
            <p className="text-center text-gray-600 py-20">Loading blogs...</p>
          ) : blogs.length === 0 ? (
            <p className="text-center text-gray-600 py-20">No blogs yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <article
                  key={blog._id}
                  onClick={() => openBlog(blog._id)}
                  className="bg-red-50/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  {blog.image_path ? (
                    <img
                      src={`http://localhost:8000/uploads/${blog.image_path}`}
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center text-red-400 bg-red-100">
                      No image
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-red-900 mb-2 line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-red-800 text-sm line-clamp-3 mb-4">
                      {blog.content}
                    </p>
                    {blog.authorName && (
                      <p className="text-red-600 text-sm">By {blog.authorName}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}

          {user?.role && (
            <div className="mt-8 text-center sm:hidden">
              <button
                onClick={() => router.push("/admin/blogs")}
                className="bg-red-600 text-red-50 px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Go to Admin Panel
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
