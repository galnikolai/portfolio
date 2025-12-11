"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Redux Toolkit",
  "Zustand",
  "Next.js",
  "SCSS",
  "Vite",
  "Webpack",
  "Jest",
  "D3.js",
  "Storybook",
  "Canvas",
  "Figma",
  "Node.js",
  "REST",
  "GraphQL",
  "WebSockets",
  "HuggingFace",
  "Mistral",
  "Fine-tuning",
  "LLM-assisted development",
];

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t("about.title")}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              {t("about.description1")}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              {t("about.description2")}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t("about.description3")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              {t("about.skillsTitle")}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-gray-900 dark:text-white rounded-lg font-medium cursor-default transition-transform duration-150 ease-out hover:scale-110 transform-gpu">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
