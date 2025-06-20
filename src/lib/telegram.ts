export async function sendTelegramMessage(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error('Missing Telegram credentials');
    throw new Error('Missing Telegram credentials');
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
    });

    const responseText = await response.text();
    console.log('Raw Telegram API Response:', responseText);

    if (!response.ok) {
      console.error('Telegram API error:', responseText);
      // Don't throw here to allow the order process to complete
      return;
    }

    try {
      const result = JSON.parse(responseText);
      console.log('Telegram API Response:', JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('Failed to parse Telegram API response:', error);
    }
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
    throw error; // Re-throw the error to be caught by the API route
  }
} 