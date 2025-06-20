import { NextRequest, NextResponse } from 'next/server';
import { sendTelegramMessage } from '@/lib/telegram';

export async function POST(req: NextRequest) {
  console.log("Order API route called");
  try {
    const data = await req.json();
    console.log("Received order data:", data);
    // data should include: orderNumber, name, phone, address, floor, apartment, entryCode, notes, cart (array of items), total, etc.
    const { orderNumber, name, phone, address, floor, apartment, entryCode, notes, cart, total } = data;
    const itemsText = cart.map((item: any) =>
      item.isByWeight
        ? `• ${item.name} - ${item.weight} גרם`
        : item.averageWeightPerUnit && item.estimatedUnitPrice
          ? `• ${item.name} - ${item.quantity} יחידות (הערכה: ${item.quantity * item.averageWeightPerUnit} גרם, מחיר משוער: ₪${(item.estimatedUnitPrice * item.quantity).toFixed(2)})`
          : `• ${item.name} - ${item.quantity} יחידות`
    ).join('\n');
    const message = `🛒 <b>התקבלה הזמנה חדשה!</b>\n\n<b>מספר הזמנה:</b> ${orderNumber}\n<b>שם:</b> ${name}\n<b>טלפון:</b> ${phone}\n<b>כתובת:</b> ${address}` +
      (floor ? `\n<b>קומה:</b> ${floor}` : '') +
      (apartment ? `\n<b>דירה:</b> ${apartment}` : '') +
      (entryCode ? `\n<b>קוד כניסה:</b> ${entryCode}` : '') +
      (notes ? `\n<b>הערות לשליח:</b> ${notes}` : '') +
      `\n\n<b>פרטי הזמנה:</b>\n${itemsText}\n\n<b>סה\"כ לתשלום:</b> ₪${total}` +
      `\n\n<b><span style='color:#e53e3e'>המחיר הסופי מתעדכן לאחר השקילה – כדי שתקבלו בדיוק מה שאתם רוצים.</span></b>`;

    console.log("Attempting to send Telegram message...");
    await sendTelegramMessage(message);
    console.log("Telegram message sent successfully!");

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Error in order API route:", e);
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
} 