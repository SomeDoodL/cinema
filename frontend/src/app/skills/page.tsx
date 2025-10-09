"use client";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, scale: 0.98, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: 20 },
};

interface Skill {
  name: string;
  url?: string;
  category: string;
}

export default function SkillsPage() {
  const skills: Skill[] = [
    // Frontend
    { name: "React", url: "https://react.dev/", category: "Frontend" },
    { name: "Next.js", url: "https://nextjs.org/", category: "Frontend" },
    { name: "TypeScript", url: "https://www.typescriptlang.org/", category: "Frontend" },
    { name: "Tailwind CSS", url: "https://tailwindcss.com/", category: "Frontend" },
    { name: "HTML5", url: "https://developer.mozilla.org/en-US/docs/Web/HTML", category: "Frontend" },
    { name: "CSS3", url: "https://developer.mozilla.org/en-US/docs/Web/CSS", category: "Frontend" },

    // Backend
    { name: "Node.js", url: "https://nodejs.org/", category: "Backend" },
    { name: "Express.js", url: "https://expressjs.com/", category: "Backend" },
    { name: "Laravel", url: "https://laravel.com/", category: "Backend" },
    { name: "PHP", url: "https://www.php.net/", category: "Backend" },
    { name: "REST APIs", category: "Backend" },
    { name: "GraphQL", url: "https://graphql.org/", category: "Backend" },

    // Database
    { name: "MySQL", url: "https://www.mysql.com/", category: "Database" },
    { name: "MongoDB", url: "https://www.mongodb.com/", category: "Database" },
    { name: "SQLite", url: "https://www.sqlite.org/", category: "Database" },

    // Tools & Dev
    { name: "Git", url: "https://git-scm.com/", category: "Tools" },
    { name: "GitHub", url: "https://github.com/", category: "Tools" },
    { name: "VS Code", url: "https://code.visualstudio.com/", category: "Tools" },
    { name: "Postman", url: "https://www.postman.com/", category: "Tools" },
  ];

  const categories = ["Frontend", "Backend", "Database", "Tools"];

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative min-h-screen animated-gradient transition-colors duration-500 pt-24 pb-16"
    >
      <div className="container mx-auto px-16">
        <div className="max-w-5xl mx-auto bg-white/40 backdrop-blur-md rounded-2xl shadow-xl transition-colors duration-500 p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-red-900 text-center mb-12">
            My Skills
          </h1>

          {categories.map((category) => (
            <section key={category} className="mb-12">
              <h2 className="text-3xl font-bold text-red-900 mb-6 text-center">
                {category}
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {skills
                  .filter((s) => s.category === category)
                  .map((skill) => (
                    <a
                      key={skill.name}
                      href={skill.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-50 rounded-xl p-6 shadow transition-all duration-200 hover:shadow-lg hover:bg-red-100 cursor-pointer text-center"
                    >
                      <h3 className="text-lg font-semibold text-red-900 mb-2">
                        {skill.name}
                      </h3>
                      {skill.url && (
                        <p className="text-sm text-red-700 break-words">
                          {new URL(skill.url).hostname.replace("www.", "")}
                        </p>
                      )}
                    </a>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
