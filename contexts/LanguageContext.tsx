"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/router";

type Language = "ru" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { locale } = router.query;
  
  // Определяем язык из URL параметра или используем русский по умолчанию
  const initialLanguage = ((locale as Language) || "ru") as Language;
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const [translations, setTranslations] = useState<Record<string, any>>({});

  // Обновляем язык при изменении locale в URL
  useEffect(() => {
    if (locale && (locale === "ru" || locale === "en")) {
      setLanguageState(locale as Language);
      localStorage.setItem("language", locale as string);
    }
  }, [locale]);

  useEffect(() => {
    // Загружаем переводы
    import(`../locales/${language}.json`)
      .then((mod) => setTranslations(mod.default))
      .catch(() => {
        // Fallback на русский, если перевод не найден
        import(`../locales/ru.json`)
          .then((mod) => setTranslations(mod.default))
          .catch(() => setTranslations({}));
      });
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    
    // Обновляем URL с новой локалью
    const pathname = router.asPath;
    // Убираем текущую локаль из пути, если она есть
    const pathWithoutLocale = pathname.replace(/^\/(ru|en)/, "") || "/";
    const newPath = `/${lang}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
    
    // Используем push для навигации на новый URL
    router.push(newPath, undefined, { locale: false });
  };

  const t = (key: string): any => {
    const keys = key.split(".");
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key; // Возвращаем ключ, если перевод не найден
      }
    }
    
    return value; // Возвращаем значение (может быть строка, массив или объект)
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

