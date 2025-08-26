import { NextRequest, NextResponse } from 'next/server';
import { sendTelegramMessage, sendTelegramExcelFile } from '@/lib/telegram';
import { createOrderExcelFile, generateExcelFilename } from '@/lib/excel';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    const { orderNumber, name, phone, address, floor, apartment, entryCode, notes, cart, total } = data;
    
    // מיון הפריטים לפי סדר אלפביתי (א-ב) לפי שם המוצר
    const sortedCart = [...cart].sort((a, b) => a.name.localeCompare(b.name, 'he'));
    
    const itemsText = sortedCart.map((item: any) => {
      if (item.isByWeight) {
        return `• ${item.name} - ${item.weight} גרם`;
      }
      return `• ${item.name} - ${item.quantity} יחידות`;
    }).join('\n');
    
    const message = `🛒 <b>הזמנה חדשה!</b>\n\n<b>מספר הזמנה:</b> ${orderNumber}\n<b>שם:</b> ${name}\n<b>טלפון:</b> ${phone}\n<b>כתובת:</b> ${address}` +
      (floor ? `\n<b>קומה:</b> ${floor}` : '') +
      (apartment ? `\n<b>דירה:</b> ${apartment}` : '') +
      (entryCode ? `\n<b>קוד כניסה:</b> ${entryCode}` : '') +
      (notes ? `\n<b>הערות לשליח:</b> ${notes}` : '') +
      `\n\n<b>פרטי הזמנה:</b>\n${itemsText}\n\n<b>סה\"כ לתשלום:</b> ₪${total.toFixed(2)}` +
      `\n\n<b>המחיר הסופי מתעדכן לאחר השקילה – כדי שתקבלו בדיוק מה שאתם רוצים.</b>`;

    // שליחת הודעה לטלגרם
    await sendTelegramMessage(message);

    // יצירת קובץ Excel
    const deliveryFee = 30;
    const finalTotal = total + deliveryFee;
    
    const orderData = {
      orderNumber,
      customerName: name,
      phone,
      address,
      floor,
      apartment,
      entryCode,
      notes,
      cart: sortedCart,
      total,
      deliveryFee,
      finalTotal
    };

    const excelBuffer = createOrderExcelFile(orderData);
    const filename = generateExcelFilename(orderNumber);
    
    // שליחת קובץ Excel לטלגרם
    const excelCaption = `📊 <b>קובץ Excel להזמנה ${orderNumber}</b>\n\nהקובץ מכיל את כל פרטי ההזמנה והמשקלים לצורך הכנה מדויקת.`;
    await sendTelegramExcelFile(excelBuffer, filename, excelCaption);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Error in order API route:", e);
    return NextResponse.json({ ok: false, error: "Failed to process order" }, { status: 500 });
  }
} 