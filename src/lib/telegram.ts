export async function sendTelegramMessage(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  
  if (!token || !chatId) {
    console.log('Telegram credentials not found - skipping notification (this is normal in local development)');
    return;
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Telegram API error:', errorText);
    }
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
  }
}

// פונקציה חדשה לשליחת קובץ Excel לטלגרם
export async function sendTelegramExcelFile(excelBuffer: Buffer, filename: string, caption?: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  
  if (!token || !chatId) {
    console.log('Telegram credentials not found - skipping Excel file (this is normal in local development)');
    return;
  }

  const url = `https://api.telegram.org/bot${token}/sendDocument`;
  
  try {
    // יצירת FormData לשליחת הקובץ
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('document', new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), filename);
    
    if (caption) {
      formData.append('caption', caption);
      formData.append('parse_mode', 'HTML');
    }

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Telegram API error sending Excel file:', errorText);
    } else {
      console.log('Excel file sent successfully to Telegram');
    }
  } catch (error) {
    console.error('Failed to send Excel file to Telegram:', error);
  }
} 