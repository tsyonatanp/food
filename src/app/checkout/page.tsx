"use client";

import { useState, useEffect } from "react";
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
  const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedDetails = localStorage.getItem('customerDetails');
      if (savedDetails) {
        const { name, phone, address, floor, apartment, entryCode } = JSON.parse(savedDetails);
        setName(name || "");
        setPhone(phone || "");
        setAddress(address || "");
        setFloor(floor || "");
        setApartment(apartment || "");
        setEntryCode(entryCode || "");
      }
    }
  }, []);

  // Calculate delivery fee based on cart contents
  const hasCatering = items.some(item => item.area === 'קייטרינג');
  const DELIVERY_FEE = hasCatering ? 250 : 30;
  const actualDeliveryFee = DELIVERY_FEE;
  const finalTotal = total + actualDeliveryFee;

  const validate = () => {
    if (!name.trim()) return "יש להזין שם מלא";
    if (!/^0[2-9]\d{7,8}$/.test(phone.trim())) return "מספר טלפון לא תקין";
    if (!address.trim()) return "יש להזין כתובת";
    if (floor && isNaN(Number(floor))) return "קומה חייבת להיות מספר";
    if (apartment && isNaN(Number(apartment))) return "דירה חייבת להיות מספר";
    if (!termsAccepted) return "יש לאשר שקראת את תקנון האתר";
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
        const customerDetails = { name, phone, address, floor, apartment, entryCode };
        if (typeof window !== 'undefined') {
          localStorage.setItem('customerDetails', JSON.stringify(customerDetails));
          // Save order details for the confirmation page
          const orderDetails = {
            orderNumber,
            name,
            total: finalTotal,
            cart: items,
          };
          sessionStorage.setItem('latestOrder', JSON.stringify(orderDetails));
        }
        setSuccess(true);
        
        clearCart();
        router.push('/order-confirmation'); // Redirect to confirmation page
      } else {
        setError(data.error || "אירעה שגיאה בשליחת ההזמנה");
      }
    } catch (e: any) {
      setError(e.message || "אירעה שגיאה בשליחת ההזמנה");
    } finally {
      setLoading(false);
    }
  };

  const hasError = error.length > 0;
  const isNameInvalid = hasError && error.includes("שם");
  const isPhoneInvalid = hasError && error.includes("טלפון");
  const isAddressInvalid = hasError && error.includes("כתובת");
  const isFloorInvalid = hasError && error.includes("קומה");
  const isApartmentInvalid = hasError && error.includes("דירה");

  return (
    <main className="min-h-screen py-8 bg-gray-50">
      <div className="container max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">סיום הזמנה</h1>
        {success ? (
          <div className="bg-green-100 text-green-800 p-4 rounded text-center mb-6" role="alert" aria-live="polite">
            ההזמנה נשלחה בהצלחה! נחזור אליך לאישור.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow" role="form" aria-label="טופס הזמנה">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">שם מלא</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="input w-full"
                required
                dir="rtl"
                aria-invalid={isNameInvalid}
                aria-describedby={isNameInvalid ? "name-error" : undefined}
              />
              {isNameInvalid && (
                <div id="name-error" className="text-red-600 text-sm mt-1" role="alert">
                  {error}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="block mb-1 font-medium">טלפון</label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="input w-full"
                required
                dir="rtl"
                pattern="0[2-9]{1}\d{7,8}"
                title="מספר טלפון ישראלי תקין"
                aria-invalid={isPhoneInvalid}
                aria-describedby={isPhoneInvalid ? "phone-error" : undefined}
              />
              {isPhoneInvalid && (
                <div id="phone-error" className="text-red-600 text-sm mt-1" role="alert">
                  {error}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="address" className="block mb-1 font-medium">כתובת למשלוח</label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="input w-full"
                required
                dir="rtl"
                aria-invalid={isAddressInvalid}
                aria-describedby={isAddressInvalid ? "address-error" : undefined}
              />
              {isAddressInvalid && (
                <div id="address-error" className="text-red-600 text-sm mt-1" role="alert">
                  {error}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="floor" className="block mb-1 font-medium">קומה</label>
              <input
                id="floor"
                type="text"
                value={floor}
                onChange={e => setFloor(e.target.value)}
                className="input w-full"
                dir="rtl"
                inputMode="numeric"
                pattern="[0-9]*"
                aria-invalid={isFloorInvalid}
                aria-describedby={isFloorInvalid ? "floor-error" : undefined}
              />
              {isFloorInvalid && (
                <div id="floor-error" className="text-red-600 text-sm mt-1" role="alert">
                  {error}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="apartment" className="block mb-1 font-medium">דירה</label>
              <input
                id="apartment"
                type="text"
                value={apartment}
                onChange={e => setApartment(e.target.value)}
                className="input w-full"
                dir="rtl"
                inputMode="numeric"
                pattern="[0-9]*"
                aria-invalid={isApartmentInvalid}
                aria-describedby={isApartmentInvalid ? "apartment-error" : undefined}
              />
              {isApartmentInvalid && (
                <div id="apartment-error" className="text-red-600 text-sm mt-1" role="alert">
                  {error}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="entryCode" className="block mb-1 font-medium">קוד כניסה/שער</label>
              <input
                id="entryCode"
                type="text"
                value={entryCode}
                onChange={e => setEntryCode(e.target.value)}
                className="input w-full"
                dir="rtl"
              />
            </div>
            <div>
              <label htmlFor="notes" className="block mb-1 font-medium">הערות לשליח</label>
              <textarea
                id="notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="input w-full"
                dir="rtl"
                rows={2}
              />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={e => setTermsAccepted(e.target.checked)}
                required
                className="accent-green-600 w-5 h-5"
              />
              <label htmlFor="terms" className="text-sm select-none">
                בלחיצה על שליחה אני מאשר/ת שקראתי את <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline text-green-700 hover:text-green-900">תקנון האתר</a>
              </label>
            </div>
            {/* Cart Items */}
            <div className="bg-gray-50 rounded p-3 text-sm" role="region" aria-label="פריטי הזמנה">
              <div className="font-semibold mb-3">פריטי הזמנה:</div>
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-2 pb-2 border-b border-gray-200">
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    {item.isByWeight ? (
                      <div className="text-gray-600">
                        {item.weight} גרם × ₪{(item.pricePerGram || 0).toFixed(2)}
                      </div>
                    ) : (
                      <div className="text-gray-600">
                        {item.quantity} יחידות × ₪{(item.estimatedUnitPrice || item.price || 0).toFixed(2)}
                        {item.estimatedUnitPrice && item.averageWeightPerUnit && (
                          <div className="text-xs text-gray-500 mt-1">
                            (הערכה: {item.quantity! * item.averageWeightPerUnit} גרם)
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="font-semibold">
                    ₪{item.isByWeight 
                      ? ((item.weight || 0) * (item.pricePerGram || 0)).toFixed(2)
                      : ((item.quantity || 0) * (item.estimatedUnitPrice || item.price || 0)).toFixed(2)
                    }
                  </div>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between">
                  <span>סה"כ פריטים:</span>
                  <span className="font-semibold">₪{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-red-700">
                  <span>דמי משלוח:</span>
                  <span className="font-semibold">₪{actualDeliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold mt-1">
                  <span>סה"כ לתשלום:</span>
                  <span>₪{finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="bg-gray-50 rounded p-3 text-sm" role="region" aria-label="פרטי הזמנה">
              <div className="font-semibold mb-2">פרטי הזמנה:</div>
              <div className="mb-1">מספר הזמנה: <b>{orderNumber}</b></div>
              <div className="mb-1">שם: {name}</div>
              <div className="mb-1">טלפון: {phone}</div>
              <div className="mb-1">כתובת: {address}</div>
              {floor && <div className="mb-1">קומה: {floor}</div>}
              {apartment && <div className="mb-1">דירה: {apartment}</div>}
              {entryCode && <div className="mb-1">קוד כניסה: {entryCode}</div>}
              {notes && <div className="mb-1">הערות: {notes}</div>}
            </div>
            {error && <div className="text-red-600 text-center" role="alert" aria-live="polite">{error}</div>}
            <button
              type="submit"
              className="btn-primary w-full mt-2"
              disabled={loading || items.length === 0}
              aria-describedby={items.length === 0 ? "empty-cart-warning" : undefined}
            >
              {loading ? "שולח..." : "שלח הזמנה"}
            </button>
            {items.length === 0 && (
              <div id="empty-cart-warning" className="text-red-600 text-sm text-center">
                העגלה ריקה - יש להוסיף פריטים לפני שליחת ההזמנה
              </div>
            )}
            <strong className="text-xs text-red-600 mt-2 block text-center">
              המחיר הסופי מתעדכן לאחר השקילה – כדי שתקבלו בדיוק מה שאתם רוצים.
            </strong>
          </form>
        )}
      </div>
    </main>
  );
} 