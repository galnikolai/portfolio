"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "ru" ? "en" : "ru");
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-gray-900 dark:text-white font-medium text-sm"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Переключить язык"
    >
      {language === "ru" ? "EN" : "RU"}
    </motion.button>
  );
}

