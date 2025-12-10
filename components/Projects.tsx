"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

const projectKeys = ["markeaze", "csmoney", "covert"];

const projectLinks = {
  markeaze: "https://markeaze.com/",
  csmoney: "https://cs.money/",
  covert: "https://coin360.com/",
};

const projectTechnologies = {
  markeaze: ["React", "TypeScript", "Web Components", "Mistral AI", "Jest"],
  csmoney: ["React", "Storybook", "react-window", "TypeScript"],
  covert: ["React", "TypeScript", "Firebase", "Node.js", "i18next"],
};

export default function Projects() {
  const { t } = useLanguage();
  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t("projects.title")}
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectKeys.map((key, index) => (
            <motion.div
              key={key}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div
                className="relative h-48"
                style={{
                  backgroundColor:
                    key === "markeaze"
                      ? "#ffffff"
                      : key === "csmoney"
                      ? "#806cf5"
                      : key === "covert"
                      ? "#1d1f1e"
                      : undefined,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  {key === "markeaze" ? (
                    <Image
                      src="/markeaze-logo.svg"
                      alt="Markeaze Logo"
                      width={200}
                      height={80}
                      className="object-contain"
                    />
                  ) : key === "csmoney" ? (
                    <Image
                      src="/csmoney-logo.svg"
                      alt="CS Money Logo"
                      width={200}
                      height={80}
                      className="object-contain"
                    />
                  ) : key === "covert" ? (
                    <Image
                      src="/coin360-logo.svg"
                      alt="Coin360 Logo"
                      width={200}
                      height={80}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-6xl">🚀</span>
                  )}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  <a
                    href={projectLinks[key as keyof typeof projectLinks]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {t(`projectItems.${key}.title`)}
                  </a>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t(`projectItems.${key}.description`)}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {projectTechnologies[
                    key as keyof typeof projectTechnologies
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={projectLinks[key as keyof typeof projectLinks]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                >
                  {t("projects.visitSite")} →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
