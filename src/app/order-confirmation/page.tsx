"use client";

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useReactToPrint } from 'react-to-print';

// Define the type for an item in the order
interface OrderItem {
  name: string;
  isByWeight: boolean;
  weight?: number;
  quantity?: number;
  estimatedUnitPrice?: number;
  averageWeightPerUnit?: number;
  price?: number;
}

// Define the type for the order details
interface OrderDetails {
  orderNumber: string;
  name: string;
  total: number;
  cart: OrderItem[];
}

export default function OrderConfirmationPage() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `אישור הזמנה - ${orderDetails?.orderNumber}`,
    pageStyle: `
      @media print {
        body {
          direction: rtl;
          -webkit-print-color-adjust: exact; /* Ensures colors and backgrounds are printed */
        }
        .no-print {
          display: none !important;
        }
      }
    `
  });

  useEffect(() => {
    const savedOrderJson = sessionStorage.getItem('latestOrder');
    if (savedOrderJson) {
      try {
        const savedOrder = JSON.parse(savedOrderJson);
        setOrderDetails(savedOrder);
      } catch (e) {
        setError("לא ניתן היה לטעון את פרטי ההזמנה.");
      }
    } else {
      // This can happen if the user navigates directly to this page
      // without completing an order.
      setError("לא נמצאו פרטי הזמנה. ייתכן שהגעת לכאן בטעות.");
    }
  }, []);

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">שגיאה</h1>
        <p className="mb-6">{error}</p>
        <Link href="/order" className="btn-primary">
          חזרה לחנות
        </Link>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p>טוען פרטי הזמנה...</p>
      </div>
    );
  }

  const { orderNumber, name, total, cart } = orderDetails;

  // Add safety check for cart
  if (!cart || !Array.isArray(cart)) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">שגיאה</h1>
        <p className="mb-6">פרטי ההזמנה לא נמצאו או פגומים.</p>
        <Link href="/order" className="btn-primary">
          חזרה לחנות
        </Link>
      </div>
    );
  }

  const PrintableContent = () => (
    <div className="p-6 max-w-2xl mx-auto bg-white text-right">
      <h1 className="text-3xl font-bold text-center mb-4 text-green-600">תודה רבה, {name}!</h1>
      <p className="text-center text-lg mb-6">ההזמנה שלך התקבלה בהצלחה.</p>
      
      <div className="border-t border-b border-gray-200 py-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">מספר הזמנה: {orderNumber}</h2>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">סיכום הזמנה</h3>
        <ul className="list-none space-y-2">
          {cart.map((item: OrderItem, index) => {
            let itemText;
            if (item.isByWeight) {
              itemText = `• ${item.name} - ${item.weight} גרם`;
            } else if (item.averageWeightPerUnit && item.estimatedUnitPrice) {
              const estimatedPrice = (item.estimatedUnitPrice * (item.quantity ?? 1)).toFixed(2);
              itemText = `• ${item.name} - ${item.quantity} יחידות (מחיר משוער: ₪${estimatedPrice})`;
            } else {
              itemText = `• ${item.name} - ${item.quantity} יחידות`;
            }
            return (
              <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                <span>{itemText}</span>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="text-2xl font-bold text-center mb-8">
        <span>סה"כ לתשלום (מוערך): </span>
        <span>₪{total.toFixed(2)}</span>
      </div>

      <p className="text-center text-sm text-gray-500 mb-6">המחיר הסופי יעודכן לאחר שקילת המוצרים.</p>
    </div>
  );

  return (
    <>
      <div style={{ display: 'none' }}>
        <div ref={componentRef}>
            <PrintableContent />
        </div>
      </div>
      
      <div className="container mx-auto p-4 md:p-6 my-10 text-right">
        <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
           <h1 className="text-3xl font-bold text-center mb-4 text-green-600">תודה רבה, {name}!</h1>
          <p className="text-center text-lg mb-6">ההזמנה שלך התקבלה בהצלחה.</p>
          
          <div className="border-t border-b border-gray-200 py-4 mb-6">
            <h2 className="text-xl font-semibold mb-2">מספר הזמנה: {orderNumber}</h2>
            <p className="text-gray-600">קיבלנו את ההזמנה, ניצור קשר בהקדם לתשלום</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">סיכום הזמנה</h3>
            <ul className="list-none space-y-2">
              {cart.map((item: OrderItem, index) => {
                let itemText;
                if (item.isByWeight) {
                  itemText = `• ${item.name} - ${item.weight} גרם`;
                } else if (item.averageWeightPerUnit && item.estimatedUnitPrice) {
                  const estimatedPrice = (item.estimatedUnitPrice * (item.quantity ?? 1)).toFixed(2);
                  itemText = `• ${item.name} - ${item.quantity} יחידות (מחיר משוער: ₪${estimatedPrice})`;
                } else {
                  itemText = `• ${item.name} - ${item.quantity} יחידות`;
                }
                return (
                  <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                    <span>{itemText}</span>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="text-2xl font-bold text-center mb-8">
            <span>סה"כ לתשלום (מוערך): </span>
            <span>₪{total.toFixed(2)}</span>
          </div>
        </div>

        <div className="text-center mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 no-print">
          <Link href="/order" className="btn-primary text-lg px-8 py-3 w-full sm:w-auto">
            חזרה לחנות
          </Link>
          <button onClick={handlePrint} className="btn-secondary text-lg px-8 py-3 w-full sm:w-auto">
            הדפסה / הורדת קבלה
          </button>
        </div>
      </div>
    </>
  );
} 