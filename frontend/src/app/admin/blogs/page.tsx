"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

export default function AdminBlogs() {
  const { user } = useUser();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", content: "", image: null as File | null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/admin/blogs", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs || []);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    if (form.image) formData.append("image", form.image);

    const res = await fetch("http://localhost:8000/admin/blogs", {
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

  if (!user?.is_admin)
    return <p className="text-center mt-10 text-red-500">Access Denied</p>;

  if (loading) return <p className="text-center mt-10">Loading blogs...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Blog Panel</h1>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border rounded-md p-2"
          required
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full border rounded-md p-2 h-40"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files?.[0] || null })
          }
          className="block"
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Upload Blog
        </button>
      </form>

      {/* Blog List */}
      <div className="space-y-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="border p-4 rounded-md">
            {blog.image_path && (
              <img
                src={`http://localhost:8000/storage/${blog.image_path}`}
                alt={blog.title}
                className="w-full h-60 object-cover rounded-md mb-2"
              />
            )}
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-600 line-clamp-2">{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
