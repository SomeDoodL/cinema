"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const pageVariants = {
  initial: { opacity: 0, scale: 0.98, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: 20 },
};

interface Blog {
  _id: string;
  title: string;
  content: string;
  image_path?: string;
  authorName?: string;
}

export default function Home() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const res = await fetch("http://localhost:8000/api/blogs");
        const data = await res.json();
        setBlogs(data.blogs || []);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setBlogs([]);
      } finally {
        setLoadingBlogs(false);
      }
    }
    loadBlogs();
  }, []);

  const openBlog = (id: string) => {
    router.push(`/blogs/${id}`);
  };

  return (
    <div>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative min-h-screen animated-gradient transition-colors duration-500 pt-24"
      >
        <div className="container mx-auto px-16 py-16">
          <div className="max-w-3xl mx-auto bg-white/40 backdrop-blur-md rounded-2xl shadow-xl transition-colors duration-500">
            {/* Header */}
            <header className="text-center mb-16 px-4 py-8">
              <div className="mb-8 bg-red-50 rounded-xl p-8 shadow transition-colors duration-500">
                <div className="w-32 h-32 mx-auto mb-6 mt-5 rounded-full overflow-hidden border border-red-200 flex items-center justify-center bg-red-50 shadow transition-colors duration-500">
                  <Image
                    src="/muka.jpeg"
                    alt="Khay Profile"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-red-900 mb-4 transition-colors duration-500">
                  Yo, I&apos;m Khaylief
                </h1>
                <p className="text-xl md:text-2xl text-red-700 mb-8 transition-colors duration-500">
                  A Highschool Student & Aspiring Programmer
                </p>
              </div>

              {/* About Section */}
              <section id="about" className="mb-12">
                <h2 className="text-3xl font-bold text-red-900 mb-6 text-center transition-colors duration-500">
                  About Me
                </h2>
                <div className="bg-red-50 rounded-xl p-8 shadow transition-colors duration-500">
                  <p className="text-lg text-red-800 leading-relaxed mb-4 transition-colors duration-500">
                    Welcome! I&apos;m a highschool student who aspires to be a
                    programmer. I have a deep passion for technology and love
                    exploring new programming languages and frameworks. My goal
                    is to create impactful software that can make a difference
                    in people&apos;s lives. and I also love space and universe
                    related things.
                  </p>
                  <p className="text-lg text-red-800 leading-relaxed transition-colors duration-500">
                    When I&apos;m not coding, I go outside and play with my
                    friends!
                  </p>
                </div>
              </section>

              {/* Skills Section */}
              <section id="skills" className="mb-16">
                <h2 className="text-3xl font-bold text-red-900 mb-6 text-center transition-colors duration-500">
                  Skills
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 rounded-xl p-6 shadow transition-colors duration-500">
                    <h3 className="text-xl font-semibold text-red-900 mb-4 transition-colors duration-500">
                      Frontend
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { name: "React", url: "https://react.dev/" },
                        { name: "Next.js", url: "https://nextjs.org/" },
                        { name: "TypeScript", url: "https://www.typescriptlang.org/" },
                        { name: "Tailwind CSS", url: "https://tailwindcss.com/" },
                      ].map((skill) => (
                        <a
                          key={skill.name}
                          href={skill.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-red-900 text-red-50 rounded-full text-sm transition-all duration-200 hover:scale-110 hover:bg-red-700 active:scale-95 cursor-pointer"
                        >
                          {skill.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="bg-red-50 rounded-xl p-6 shadow transition-colors duration-500">
                    <h3 className="text-xl font-semibold text-red-900 mb-4 transition-colors duration-500">
                      Backend
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { name: "Node.js", url: "https://nodejs.org/" },
                        { name: "Laravel", url: "https://laravel.com/" },
                        { name: "Express.js", url: "https://expressjs.com/" },
                      ].map((skill) => (
                        <a
                          key={skill.name}
                          href={skill.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-red-900 text-red-50 rounded-full text-sm transition-all duration-200 hover:scale-110 hover:bg-red-700 active:scale-95 cursor-pointer"
                        >
                          {skill.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </header>

            {/* Blogs Section */}
            <section id="blogs" className="mb-16 px-4">
              <h2 className="text-3xl font-bold text-red-900 mb-6 text-center">
                Latest Blogs
              </h2>

              {loadingBlogs ? (
                <p className="text-center text-gray-600 py-10">Loading blogs...</p>
              ) : blogs.length === 0 ? (
                <p className="text-center text-gray-600 py-10">No blogs yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs.map((blog) => (
                    <div
                      key={blog._id}
                      onClick={() => openBlog(blog._id)}
                      className="rounded-xl overflow-hidden border border-red-100 bg-white/70 hover:shadow-lg transition-all duration-200 cursor-pointer"
                    >
                      {blog.image_path ? (
                        <div className="w-full h-40 relative">
                          <img
                            src={`http://localhost:8000/uploads/${blog.image_path}`}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-40 bg-red-50 flex items-center justify-center text-red-400">
                          <span>No image</span>
                        </div>
                      )}

                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-red-900 mb-2 line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-gray-700 text-sm line-clamp-3 mb-2">
                          {blog.content}
                        </p>
                        {blog.authorName && (
                          <div className="text-sm text-gray-600">
                            By {blog.authorName}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Contact Section */}
            <section id="contact" className="text-center mb-16">
              <h2 className="text-3xl font-bold text-red-900 mb-6 transition-colors duration-500">
                Contact Info
              </h2>
              <div className="bg-red-50 rounded-xl p-8 pb-12 shadow transition-colors duration-500">
                <p className="text-lg text-red-800 mb-6 transition-colors duration-500">
                  Feel free to reach out to me via email or follow me on social
                  media!
                </p>
                <div className="flex justify-center gap-6 flex-wrap">
                  <a
                    href="mailto:laptoper42@gmail.com"
                    className="flex items-center gap-2 px-6 py-3 bg-red-900 text-red-50 rounded-lg hover:bg-red-700 active:scale-95 transition-all duration-200"
                  >
                    Email
                  </a>
                  <a
                    href="https://github.com/SomeDoodL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-red-900 text-red-50 rounded-lg hover:bg-red-700 active:scale-95 transition-all duration-200"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.instagram.com/something_doodle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-red-900 text-red-50 rounded-lg hover:bg-red-700 active:scale-95 transition-all duration-200"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
