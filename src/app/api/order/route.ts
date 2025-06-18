import { NextRequest, NextResponse } from 'next/server';
import { sendTelegramMessage } from '@/lib/telegram';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // data should include: orderNumber, name, phone, address, floor, apartment, entryCode, notes, cart (array of items), total, etc.
    const { orderNumber, name, phone, address, floor, apartment, entryCode, notes, cart, total } = data;
    const itemsText = cart.map((item: any) => `• ${item.name} - ${item.weight} גרם`).join('\n');
    const message = `🛒 <b>התקבלה הזמנה חדשה!</b>\n\n<b>מספר הזמנה:</b> ${orderNumber}\n<b>שם:</b> ${name}\n<b>טלפון:</b> ${phone}\n<b>כתובת:</b> ${address}` +
      (floor ? `\n<b>קומה:</b> ${floor}` : '') +
      (apartment ? `\n<b>דירה:</b> ${apartment}` : '') +
      (entryCode ? `\n<b>קוד כניסה:</b> ${entryCode}` : '') +
      (notes ? `\n<b>הערות לשליח:</b> ${notes}` : '') +
      `\n\n<b>פרטי הזמנה:</b>\n${itemsText}\n\n<b>סה\"כ לתשלום:</b> ₪${total}`;
    await sendTelegramMessage(message);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
} 