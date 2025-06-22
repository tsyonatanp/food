import { NextRequest, NextResponse } from 'next/server';
import { sendTelegramMessage } from '@/lib/telegram';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    const { orderNumber, name, phone, cart, total } = data;
    const itemsText = cart.map((item: any) =>
        `• ${item.name} - ${item.quantity} ${item.isByWeight ? 'גרם' : 'יחידות'}`
    ).join('\n');
    
    const message = `🛒 <b>הזמנה חדשה!</b>\n\n<b>מספר הזמנה:</b> ${orderNumber}\n<b>שם:</b> ${name}\n<b>טלפון:</b> ${phone}\n\n<b>פרטי הזמנה:</b>\n${itemsText}\n\n<b>סה\"כ לתשלום:</b> ₪${total.toFixed(2)}`;

    await sendTelegramMessage(message);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Error in order API route:", e);
    return NextResponse.json({ ok: false, error: "Failed to process order" }, { status: 500 });
  }
} 