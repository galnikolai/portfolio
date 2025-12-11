import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

type ResponseData = {
  message: string;
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false });
  }

  const { name, email, message } = req.body;

  // Валидация наличия полей
  if (!name || !email || !message) {
    return res.status(400).json({
      message: "Все поля обязательны для заполнения",
      success: false,
    });
  }

  // Тримминг и проверка после тримминга
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return res.status(400).json({
      message: "Все поля обязательны для заполнения",
      success: false,
    });
  }

  // Валидация длины имени
  if (trimmedName.length < 2) {
    return res.status(400).json({
      message: "Имя должно содержать минимум 2 символа",
      success: false,
    });
  }
  if (trimmedName.length > 100) {
    return res.status(400).json({
      message: "Имя не должно превышать 100 символов",
      success: false,
    });
  }

  // Валидация формата имени (только буквы, пробелы, дефисы, апострофы)
  if (!/^[a-zA-Zа-яА-ЯёЁ\s\-']+$/u.test(trimmedName)) {
    return res.status(400).json({
      message: "Имя содержит недопустимые символы",
      success: false,
    });
  }

  // Валидация email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return res.status(400).json({
      message: "Некорректный email адрес",
      success: false,
    });
  }
  if (trimmedEmail.length > 255) {
    return res.status(400).json({
      message: "Email не должен превышать 255 символов",
      success: false,
    });
  }

  // Валидация длины сообщения
  if (trimmedMessage.length < 10) {
    return res.status(400).json({
      message: "Сообщение должно содержать минимум 10 символов",
      success: false,
    });
  }
  if (trimmedMessage.length > 2000) {
    return res.status(400).json({
      message: "Сообщение не должно превышать 2000 символов",
      success: false,
    });
  }

  // Защита от XSS - экранирование HTML
  const escapeHtml = (text: string): string => {
    const map: { [key: string]: string } = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  };

  const safeName = escapeHtml(trimmedName);
  const safeEmail = escapeHtml(trimmedEmail);
  const safeMessage = escapeHtml(trimmedMessage);

  try {
    // Создаем transporter для отправки email
    // Используем переменные окружения для конфигурации
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true", // true для 465, false для других портов
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Проверяем наличие учетных данных
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("SMTP credentials not configured");
      return res.status(500).json({
        message: "Сервер не настроен для отправки email",
        success: false,
      });
    }

    // Email получателя (ваш email)
    const recipientEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER;

    // Отправляем email
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: recipientEmail,
      replyTo: trimmedEmail,
      subject: `Новое сообщение от ${safeName} через форму портфолио`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Новое сообщение из формы контактов</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Имя:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Сообщение:</strong></p>
            <p style="white-space: pre-wrap; margin-top: 10px;">${safeMessage}</p>
          </div>
          <p style="color: #666; font-size: 12px;">
            Это сообщение было отправлено через форму контактов на вашем портфолио.
          </p>
        </div>
      `,
      text: `
Новое сообщение из формы контактов

Имя: ${trimmedName}
Email: ${trimmedEmail}

Сообщение:
${trimmedMessage}
      `,
    });

    return res.status(200).json({
      message: "Сообщение успешно отправлено",
      success: true,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      message: "Ошибка при отправке сообщения. Попробуйте позже.",
      success: false,
    });
  }
}
