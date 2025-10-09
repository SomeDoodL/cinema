"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

export default function AdminBlogs() {
  const { user } = useUser();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", content: "", image: null as File | null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:8000/api/admin/blogs", {
          credentials: "include",
        });
        const text = await res.text();
        console.log("🔍 Raw admin/blogs response:", text);

        let data;
        try {
          data = JSON.parse(text);
        } catch (err) {
          console.error("❌ JSON parse failed:", err);
          data = null;
        }

        if (data) {
          setBlogs(data.blogs || []);
        } else {
          setBlogs([]);
        }
      } catch (err) {
        console.error("🚨 Fetch failed:", err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    if (form.image) formData.append("image", form.image);

    const res = await fetch("http://localhost:8000/api/admin/blogs", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      setBlogs([data.blog, ...blogs]);
      setForm({ title: "", content: "", image: null });
    } else {
      alert("Failed to create blog");
    }
  };

  if (!user?.role)
    return <p className="text-center mt-10 text-red-500">Access Denied</p>;

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading blogs...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800">
        Admin Blog Panel
      </h1>

      {/* Upload Form */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Create a New Blog Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Blog Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500 text-red-500 placeholder-gray-500"
            required
          />
          <textarea
            placeholder="Write your blog content here..."
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-3 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-red-500 text-red-500 placeholder-gray-500"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, image: e.target.files?.[0] || null })
            }
            className="block w-full text-gray-700"
          />
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium"
          >
            Upload Blog
          </button>
        </form>
      </div>

      {/* Blog List */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Blogs</h2>

        {blogs.length === 0 ? (
          <p className="text-gray-500 text-center">No blogs yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
              >
                {blog.image_path && (
                  <img
                    src={`http://localhost:8000/storage/${blog.image_path}`}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3">{blog.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
