import { NextRequest, NextResponse } from 'next/server';
import { sendTelegramMessage } from '@/lib/telegram';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // data should include: name, phone, address, cart (array of items), total, etc.
    const { name, phone, address, cart, total } = data;
    const itemsText = cart.map((item: any) => `• ${item.name} - ${item.weight} גרם`).join('\n');
    const message = `🛒 <b>התקבלה הזמנה חדשה!</b>\n\n<b>שם:</b> ${name}\n<b>טלפון:</b> ${phone}\n<b>כתובת:</b> ${address}\n\n<b>פרטי הזמנה:</b>\n${itemsText}\n\n<b>סה"כ לתשלום:</b> ₪${total}`;
    await sendTelegramMessage(message);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
} 