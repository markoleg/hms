"use server";
const verifyRecaptcha = async (token: string | undefined) => {
  if (!token) return false;
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    throw new Error("RECAPTCHA_SECRET_KEY is not configured");
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data = await response.json();
    console.log(data.score);

    return data.success && data.score >= 0.5;
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error);
    return false;
  }
};
export const handleContactForm = async (formData: FormData) => {
  // send message using telegram bot
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const phone = formData.get("phone")?.toString();
  const recaptchaToken = formData.get("recaptchaToken")?.toString();

  // Verify reCAPTCHA first
  const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
  if (!isValidRecaptcha) {
    throw new Error("reCAPTCHA verification failed");
  }
  // Construct Telegram message
  const telegramMessage = `New lead from your HMS website:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`;

  try {
    // Send message to Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const chatId2 = process.env.TELEGRAM_CHAT_ID2;
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
      }),
    });
    //do another fetch to another chat_id
    const response2 = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId2,
        text: telegramMessage,
      }),
    });

    if (!response.ok || !response2.ok) {
      throw new Error("Failed to send message to Telegram");
    }
  } catch (error) {
    console.error(error);
  }
};
