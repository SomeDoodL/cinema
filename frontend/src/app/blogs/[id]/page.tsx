"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function BlogDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/blogs/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setBlog(data.blog || data); // depending on backend return format
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!blog) return <p className="text-center mt-10">Blog not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => router.back()}
        className="mb-4 text-red-600 hover:underline"
      >
        ← Back
      </button>

      {blog.image_path && (
        <img
          src={`http://localhost:8000/storage/${blog.image_path}`}
          alt={blog.title}
          className="w-full h-80 object-cover rounded-md mb-6"
        />
      )}

      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-700 whitespace-pre-line">{blog.content}</p>
    </div>
  );
}
