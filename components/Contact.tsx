"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import ResumeDownload from "./ResumeDownload";

const socialLinks = [
  {
    name: "Email",
    url: "mailto:galnikolaiant@gmail.com",
    icon: "📧",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/galnikolai",
    icon: "💼",
  },
  {
    name: "Telegram",
    url: "https://t.me/gulmum",
    icon: "✈️",
  },
  {
    name: "GitHub",
    url: "https://github.com/galnikolai",
    icon: "💻",
  },
];

interface ValidationErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) {
          return t("contact.validation.nameRequired");
        }
        if (value.trim().length < 2) {
          return t("contact.validation.nameMin");
        }
        if (value.trim().length > 100) {
          return t("contact.validation.nameMax");
        }
        // Проверка на допустимые символы (буквы, пробелы, дефисы, апострофы)
        if (!/^[a-zA-Zа-яА-ЯёЁ\s\-']+$/u.test(value.trim())) {
          return t("contact.validation.nameInvalid");
        }
        break;
      case "email":
        if (!value.trim()) {
          return t("contact.validation.emailRequired");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          return t("contact.validation.emailInvalid");
        }
        if (value.trim().length > 255) {
          return t("contact.validation.emailMax");
        }
        break;
      case "message":
        if (!value.trim()) {
          return t("contact.validation.messageRequired");
        }
        if (value.trim().length < 10) {
          return t("contact.validation.messageMin");
        }
        if (value.trim().length > 2000) {
          return t("contact.validation.messageMax");
        }
        break;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        errors[key as keyof ValidationErrors] = error;
        isValid = false;
      }
    });

    setValidationErrors(errors);
    return isValid;
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Очищаем ошибку для поля при вводе
    if (validationErrors[field as keyof ValidationErrors]) {
      setValidationErrors({
        ...validationErrors,
        [field]: undefined,
      });
    }
    // Очищаем общий статус при изменении формы
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация перед отправкой
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });
    setValidationErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          type: "success",
          message: t("contact.success"),
        });
        setFormData({ name: "", email: "", message: "" });
        setValidationErrors({});
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || t("contact.error"),
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: t("contact.error"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t("contact.title")}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              {t("contact.subtitle")}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              {t("contact.description")}
            </p>

            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {language === "ru" ? "Скачать резюме" : "Download Resume"}
              </h4>
              <ResumeDownload />
            </div>

            <div className="space-y-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-2xl">{link.icon}</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {link.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t("contact.name")}
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={(e) => {
                  const error = validateField("name", e.target.value);
                  if (error) {
                    setValidationErrors({
                      ...validationErrors,
                      name: error,
                    });
                  }
                }}
                className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  validationErrors.name
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
                maxLength={100}
              />
              {validationErrors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {validationErrors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t("contact.email")}
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={(e) => {
                  const error = validateField("email", e.target.value);
                  if (error) {
                    setValidationErrors({
                      ...validationErrors,
                      email: error,
                    });
                  }
                }}
                className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  validationErrors.email
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
                maxLength={255}
              />
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {validationErrors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t("contact.message")}
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                  ({formData.message.trim().length}/2000)
                </span>
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                onBlur={(e) => {
                  const error = validateField("message", e.target.value);
                  if (error) {
                    setValidationErrors({
                      ...validationErrors,
                      message: error,
                    });
                  }
                }}
                className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none ${
                  validationErrors.message
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
                maxLength={2000}
              />
              {validationErrors.message && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {validationErrors.message}
                </p>
              )}
            </div>

            {submitStatus.type && (
              <div
                className={`p-4 rounded-lg ${
                  submitStatus.type === "success"
                    ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              {isLoading ? t("contact.sending") : t("contact.submit")}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
