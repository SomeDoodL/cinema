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

export default function BlogsPage() {
  const { user } = useUser();
  const router = useRouter();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  // Detect screen size for clickable cards
  useEffect(() => {
    const m = window.matchMedia("(min-width: 768px)");
    setIsDesktop(m.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    m.addEventListener("change", handler);
    return () => m.removeEventListener("change", handler);
  }, []);

  // Fetch blogs from backend
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:8000/blogs", {
          credentials: "include",
        });

        const text = await res.text();
        console.log("Blog API raw response:", text);

        let json;
        try {
          json = JSON.parse(text);
        } catch (err) {
          console.error("Failed to parse JSON:", err);
          json = { blogs: [] };
        }

        setBlogs(json.blogs || json);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const openBlog = (id: number | string) => {
    router.push(`/blogs/${id}`);
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative min-h-screen animated-gradient transition-colors duration-500 pt-24 pb-8"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto bg-white/40 backdrop-blur-md rounded-2xl shadow-xl transition-colors duration-500 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-red-900">
              Blogs
            </h1>

            {user?.is_admin && (
              <button
                onClick={() => router.push("/admin/blogs")}
                className="hidden sm:inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Go to Admin Panel
              </button>
            )}
          </div>

          {/* Grid Section */}
          {loading ? (
            <div className="text-center py-20 text-gray-600">
              Loading blogs...
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20 text-gray-600">
              No blogs yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <article
                  key={blog.id}
                  onClick={() => isDesktop && openBlog(blog.id)}
                  className={`relative rounded-xl overflow-hidden border border-red-100 bg-white/70 hover:shadow-lg transition-all duration-200 ${
                    isDesktop ? "cursor-pointer" : ""
                  }`}
                >
                  {/* Image */}
                  {blog.image_path ? (
                    <div className="w-full h-40 md:h-44 lg:h-36 relative">
                      <img
                        src={`http://localhost:8000/storage/${blog.image_path}`}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-40 md:h-44 lg:h-36 bg-red-50 flex items-center justify-center text-red-400">
                      <span className="text-lg font-medium">No image</span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4 flex flex-col h-44 md:h-40">
                    <h2 className="text-lg md:text-xl font-semibold text-red-900 mb-2 line-clamp-2">
                      {blog.title}
                    </h2>

                    <p className="text-gray-700 text-sm flex-1 line-clamp-3 mb-3">
                      {blog.content}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        {blog.user?.name ? `By ${blog.user.name}` : ""}
                      </div>

                      {/* Read More button (only for mobile) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openBlog(blog.id);
                        }}
                        className="inline-flex items-center gap-2 text-sm text-red-600 font-medium md:hidden"
                      >
                        Read More →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Admin button for mobile */}
          {user?.is_admin && (
            <div className="mt-6 sm:hidden text-center">
              <button
                onClick={() => router.push("/admin/blogs")}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
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
