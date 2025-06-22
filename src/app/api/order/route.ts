import { NextRequest, NextResponse } from 'next/server';
import { sendTelegramMessage, sendTelegramDocument } from '@/lib/telegram';
import OrderPdfDocument from '@/components/OrderPdfDocument';
import ReactPDF from '@react-pdf/renderer';
import React from 'react';

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
      `\n\n<b>פרטי הזמנה:</b>\n${itemsText}\n\n<b>סה\"כ לתשלום:</b> ₪${total.toFixed(2)}` +
      `\n\n<b>המחיר הסופי מתעדכן לאחר השקילה – כדי שתקבלו בדיוק מה שאתם רוצים.</b>`;

    console.log("Attempting to send Telegram message...");
    try {
      await sendTelegramMessage(message);
      console.log("Telegram message sent successfully!");
    } catch (telegramError) {
      console.log("Telegram notification failed, but order was processed successfully:", telegramError);
      // Don't fail the entire order process if Telegram fails
    }

    // Then, generate and send the PDF document
    try {
      const pdfComponent = React.createElement(OrderPdfDocument, { order: data });
      // @ts-ignore
      const pdfBuffer = await ReactPDF.toBuffer(pdfComponent);
      
      const fileName = `order-${orderNumber}.pdf`;
      const caption = `קבלה עבור הזמנה מספר ${orderNumber}`;
      
      await sendTelegramDocument(pdfBuffer, fileName, caption);
    } catch (pdfError) {
      console.error('Failed to generate or send PDF:', pdfError);
      // Optionally send a message to Telegram that PDF generation failed
      await sendTelegramMessage(`<b>שגיאה:</b> לא ניתן היה להפיק קובץ PDF עבור הזמנה ${orderNumber}.`);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Error in order API route:", e);
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
} 