'use client'

import { useEffect, useState, useRef } from 'react';

interface Product {
  name: string;
  price: number;
}

interface Calculation {
  product: Product;
  weight: number;
  total: number;
  notes: string;
}

const TEMP_LOGO = '/images/logo.png';

export default function PrivateCalculator() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const printRef = useRef<HTMLDivElement>(null);

  // Fetch products from Google Sheets (opensheet API)
  useEffect(() => {
    fetch('https://opensheet.elk.sh/1xTlTECzbxdDVu6SSnoQnN_GtL39b7-ZzhgcIvaLyljU/Menu')
      .then(res => res.json())
      .then((data) => {
        const filtered = data.filter((item: any) => String(item.checkboxes).toLowerCase() === 'true');
        const items: Product[] = filtered.map((item: any) => ({
          name: item['מנה'],
          price: Number(item['מחיר (₪)']),
        }));
        setProducts(items);
      });
  }, []);

  const handleAddCalculation = () => {
    if (selected && weight) {
      const w = parseFloat(weight);
      if (!isNaN(w)) {
        const total = (w / 1000) * selected.price;
        setCalculations(prev => [
          ...prev,
          { product: selected, weight: w, total, notes }
        ]);
        setWeight('');
        setNotes('');
      }
    }
  };

  // Helper: blob to base64 (for logo)
  function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  const handlePrint = () => {
    if (printRef.current) {
      window.print();
    }
  };

  const handleAllPDF = async () => {
    if (calculations.length === 0) return;
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    // Add logo
    try {
      const logoImg = await fetch(TEMP_LOGO).then(r => r.blob()).then(blobToBase64);
      doc.addImage(logoImg, 'PNG', 10, 10, 40, 40);
    } catch (e) {}
    // Date
    const date = new Date().toLocaleDateString('he-IL');
    doc.setFontSize(12);
    doc.text(`תאריך: ${date}`, 160, 20);
    doc.setFontSize(22);
    doc.text('סיכום הזמנה', 105, 60, { align: 'center' });
    doc.setFontSize(16);
    let y = 80;
    calculations.forEach((calc, idx) => {
      doc.text(`מוצר: ${calc.product.name}`, 20, y);
      doc.text(`מחיר לק"ג: ₪${calc.product.price}`, 20, y + 10);
      doc.text(`משקל: ${calc.weight} גרם`, 20, y + 20);
      doc.text(`מחיר סופי: ₪${calc.total.toFixed(2)}`, 20, y + 30);
      if (calc.notes) {
        doc.setFontSize(14);
        doc.text('הערות:', 20, y + 40);
        doc.setFontSize(12);
        doc.text(calc.notes, 20, y + 50, { maxWidth: 170 });
        y += 60;
      } else {
        y += 40;
      }
      if (y > 250 && idx < calculations.length - 1) {
        doc.addPage();
        y = 20;
      }
    });
    doc.save('order-summary.pdf');
  };

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #ccc' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 24 }}>מחשבון מחיר (פנימי)</h1>
      <div style={{ marginBottom: 16 }}>
        <label>בחר מוצר:</label>
        <select value={selected?.name || ''} onChange={e => {
          const prod = products.find(p => p.name === e.target.value);
          setSelected(prod || null);
        }} style={{ width: '100%', padding: 8, marginTop: 8 }}>
          <option value=''>-- בחר --</option>
          {products.map(p => (
            <option key={p.name} value={p.name}>{p.name}</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>הזן משקל בגרם:</label>
        <input type='number' value={weight} onChange={e => setWeight(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 8 }} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>הערות (לא חובה):</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 8, minHeight: 50 }} />
      </div>
      <button onClick={handleAddCalculation} style={{ width: '100%', padding: 12, background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, fontSize: 18, marginBottom: 24 }}>הוסף חישוב</button>

      {/* טבלת חישובים */}
      <div ref={printRef} style={{ marginBottom: 24 }}>
        {calculations.length > 0 && (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
            <thead>
              <tr style={{ background: '#f3f4f6' }}>
                <th style={{ border: '1px solid #ddd', padding: 8 }}>מוצר</th>
                <th style={{ border: '1px solid #ddd', padding: 8 }}>מחיר לק"ג</th>
                <th style={{ border: '1px solid #ddd', padding: 8 }}>משקל (גרם)</th>
                <th style={{ border: '1px solid #ddd', padding: 8 }}>מחיר סופי</th>
                <th style={{ border: '1px solid #ddd', padding: 8 }}>הערות</th>
              </tr>
            </thead>
            <tbody>
              {calculations.map((calc, idx) => (
                <tr key={idx}>
                  <td style={{ border: '1px solid #ddd', padding: 8 }}>{calc.product.name}</td>
                  <td style={{ border: '1px solid #ddd', padding: 8 }}>₪{calc.product.price}</td>
                  <td style={{ border: '1px solid #ddd', padding: 8 }}>{calc.weight}</td>
                  <td style={{ border: '1px solid #ddd', padding: 8 }}>₪{calc.total.toFixed(2)}</td>
                  <td style={{ border: '1px solid #ddd', padding: 8 }}>{calc.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {calculations.length > 0 && (
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={handlePrint} style={{ flex: 1, padding: 12, background: '#f59e42', color: '#fff', border: 'none', borderRadius: 6, fontSize: 18 }}>הדפס הכל</button>
          <button onClick={handleAllPDF} style={{ flex: 1, padding: 12, background: '#10b981', color: '#fff', border: 'none', borderRadius: 6, fontSize: 18 }}>הורד PDF לכל ההזמנה</button>
        </div>
      )}
    </div>
  );
} 