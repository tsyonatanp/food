"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";

function generateOrderNumber() {
  const now = new Date();
  const dateStr = now.toISOString().slice(0,10).replace(/-/g, ''); // YYYYMMDD
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${dateStr}-${hours}${minutes}`;
}

export default function CheckoutPage() {
  const { state, clearCart } = useCart();
  const { items, total, deliveryFee } = state;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [floor, setFloor] = useState("");
  const [apartment, setApartment] = useState("");
  const [entryCode, setEntryCode] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [orderNumber] = useState(generateOrderNumber());
  const router = useRouter();

  const freeDeliveryThreshold = Number(process.env.NEXT_PUBLIC_FREE_DELIVERY_THRESHOLD) || 500;
  const actualDeliveryFee = total >= freeDeliveryThreshold ? 0 : deliveryFee;
  const finalTotal = total + actualDeliveryFee;

  const validate = () => {
    if (!name.trim()) return "יש להזין שם מלא";
    if (!/^0[2-9]\d{7,8}$/.test(phone.trim())) return "מספר טלפון לא תקין";
    if (!address.trim()) return "יש להזין כתובת";
    if (floor && isNaN(Number(floor))) return "קומה חייבת להיות מספר";
    if (apartment && isNaN(Number(apartment))) return "דירה חייבת להיות מספר";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber,
          name,
          phone,
          address,
          floor,
          apartment,
          entryCode,
          notes,
          cart: items,
          total: finalTotal,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setSuccess(true);
        clearCart();
        setTimeout(() => router.push("/"), 3000);
      } else {
        setError(data.error || "אירעה שגיאה בשליחת ההזמנה");
      }
    } catch (e: any) {
      setError(e.message || "אירעה שגיאה בשליחת ההזמנה");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-8 bg-gray-50">
      <div className="container max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">סיום הזמנה</h1>
        {success ? (
          <div className="bg-green-100 text-green-800 p-4 rounded text-center mb-6">
            ההזמנה נשלחה בהצלחה! נחזור אליך לאישור.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
            <div>
              <label className="block mb-1 font-medium">שם מלא</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="input w-full"
                required
                dir="rtl"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">טלפון</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="input w-full"
                required
                dir="rtl"
                pattern="0[2-9]{1}\d{7,8}"
                title="מספר טלפון ישראלי תקין"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">כתובת למשלוח</label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="input w-full"
                required
                dir="rtl"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">קומה</label>
              <input
                type="text"
                value={floor}
                onChange={e => setFloor(e.target.value)}
                className="input w-full"
                dir="rtl"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">דירה</label>
              <input
                type="text"
                value={apartment}
                onChange={e => setApartment(e.target.value)}
                className="input w-full"
                dir="rtl"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">קוד כניסה/שער</label>
              <input
                type="text"
                value={entryCode}
                onChange={e => setEntryCode(e.target.value)}
                className="input w-full"
                dir="rtl"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">הערות לשליח</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="input w-full"
                dir="rtl"
                rows={2}
              />
            </div>
            <div className="bg-gray-50 rounded p-3 text-sm">
              <div className="font-semibold mb-2">סיכום הזמנה:</div>
              <div className="mb-1">מספר הזמנה: <b>{orderNumber}</b></div>
              <div className="mb-1">שם: {name}</div>
              <div className="mb-1">טלפון: {phone}</div>
              <div className="mb-1">כתובת: {address}</div>
              {floor && <div className="mb-1">קומה: {floor}</div>}
              {apartment && <div className="mb-1">דירה: {apartment}</div>}
              {entryCode && <div className="mb-1">קוד כניסה: {entryCode}</div>}
              {notes && <div className="mb-1">הערות: {notes}</div>}
              {items.length === 0 ? (
                <div className="text-gray-500">העגלה ריקה</div>
              ) : (
                <ul className="mb-2">
                  {items.map(item => (
                    <li key={item.id} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>{item.weight} גרם</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex justify-between">
                <span>סכום ביניים:</span>
                <span>₪{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>דמי משלוח:</span>
                <span>{actualDeliveryFee === 0 ? "חינם!" : `₪${actualDeliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-bold mt-2">
                <span>סה"כ לתשלום:</span>
                <span>₪{finalTotal.toFixed(2)}</span>
              </div>
            </div>
            {error && <div className="text-red-600 text-center">{error}</div>}
            <button
              type="submit"
              className="btn-primary w-full mt-2"
              disabled={loading || items.length === 0}
            >
              {loading ? "שולח..." : "שלח הזמנה"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
} 