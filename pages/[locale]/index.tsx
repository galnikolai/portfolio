import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import PersonalProjects from "@/components/PersonalProjects";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const router = useRouter();
  const { locale } = router.query;
  const { language } = useLanguage();
  const [metaTitle, setMetaTitle] = useState(
    "Portfolio | Nikolai Galitskii - Frontend Developer"
  );
  const [metaDescription, setMetaDescription] = useState(
    "Frontend developer with 6+ years of experience. Specializing in React/TypeScript, interface architecture, performance optimization, AI integration"
  );

  useEffect(() => {
    const currentLang = (locale as string) || language || "ru";
    if (currentLang === "ru") {
      setMetaTitle("Портфолио | Николай Галицкий - Frontend Developer");
      setMetaDescription(
        "Frontend разработчик с 6+ годами опыта. Специализация: React/TypeScript, архитектура интерфейсов, оптимизация производительности, интеграция AI"
      );
    } else {
      setMetaTitle("Portfolio | Nikolai Galitskii - Frontend Developer");
      setMetaDescription(
        "Frontend developer with 6+ years of experience. Specializing in React/TypeScript, interface architecture, performance optimization, AI integration"
      );
    }
  }, [locale, language]);

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen">
        <Navigation />
        <Hero />
        <About />
        <Experience />
        <Projects />
        {/* <PersonalProjects /> */}
        <Contact />
      </main>
    </>
  );
}
