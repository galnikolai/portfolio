import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Frontend разработчик с 6+ годами опыта. Специализация: React/TypeScript, архитектура интерфейсов, оптимизация производительности, интеграция AI"
        />
        <meta
          name="keywords"
          content="портфолио, frontend разработчик, React, TypeScript, Next.js, веб-разработка, AI интеграция"
        />
        <meta name="author" content="Николай Галицкий" />
        <meta
          property="og:title"
          content="Портфолио | Николай Галицкий - Frontend Developer"
        />
        <meta
          property="og:description"
          content="Frontend разработчик с 6+ годами опыта. Специализация: React/TypeScript, архитектура интерфейсов, оптимизация производительности"
        />
        <meta property="og:type" content="website" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
