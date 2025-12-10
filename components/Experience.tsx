"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const experienceKeys = ["markeaze", "csmoney", "covert"];

const companyLinks = {
  markeaze: "https://markeaze.com/",
  csmoney: "https://cs.money/",
  covert: "https://coin360.com/",
};

const technologies = {
  markeaze: [
    "React",
    "TypeScript",
    "Web Components",
    "Mistral AI",
    "Jest",
    "FSD Architecture",
  ],
  csmoney: [
    "React",
    "TypeScript",
    "Storybook",
    "react-window",
    "Webpack",
  ],
  covert: [
    "React",
    "TypeScript",
    "Firebase",
    "Node.js",
    "i18next",
  ],
};

export default function Experience() {
  const { t } = useLanguage();
  return (
    <section
      id="experience"
      className="py-20 bg-white dark:bg-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t("experience.title")}
        </motion.h2>

        <div className="space-y-12">
          {experienceKeys.map((key, index) => (
            <motion.div
              key={key}
              className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {t(`experienceItems.${key}.position`)}
                  </h3>
                  <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    <a
                      href={companyLinks[key as keyof typeof companyLinks]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {t(`experienceItems.${key}.company`)}
                    </a>
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t(`experienceItems.${key}.period`)}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {t(`experienceItems.${key}.description`)}
              </p>

              <div className="mb-6">
                <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {t("experience.achievements")}
                </h5>
                <ul className="space-y-2">
                  {(() => {
                    const achievements = t(`experienceItems.${key}.achievements`);
                    const achievementsArray = Array.isArray(achievements) ? achievements : [];
                    return achievementsArray.map((achievement: string, idx: number) => (
                      <li
                        key={idx}
                        className="flex items-start text-gray-600 dark:text-gray-300"
                      >
                        <span className="text-blue-600 dark:text-blue-400 mr-2">
                          ✓
                        </span>
                        <span>{achievement}</span>
                      </li>
                    ));
                  })()}
                </ul>
              </div>

              <div>
                <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {t("experience.technologies")}
                </h5>
                <div className="flex flex-wrap gap-2">
                  {technologies[key as keyof typeof technologies].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

