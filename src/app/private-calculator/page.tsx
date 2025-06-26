'use client'

import { useEffect, useState } from 'react';

interface Product {
  name: string;
  price: number;
  image: string;
}

const TEMP_LOGO = '/images/logo.png';

export default function PrivateCalculator() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [weight, setWeight] = useState('');
  const [total, setTotal] = useState<number | null>(null);
  const [notes, setNotes] = useState('');

  // Fetch products from Google Sheets (opensheet API)
  useEffect(() => {
    fetch('https://opensheet.elk.sh/1xTlTECzbxdDVu6SSnoQnN_GtL39b7-ZzhgcIvaLyljU/Menu')
      .then(res => res.json())
      .then((data) => {
        const filtered = data.filter((item: any) => String(item.checkboxes).toLowerCase() === 'true');
        const items: Product[] = filtered.map((item: any) => ({
          name: item['מנה'],
          price: Number(item['מחיר (₪)']),
          image: item['תמונה'],
        }));
        setProducts(items);
      });
  }, []);

  const handleCalc = () => {
    if (selected && weight) {
      const w = parseFloat(weight);
      if (!isNaN(w)) {
        setTotal((w / 1000) * selected.price);
      }
    }
  };

  const handlePDF = async () => {
    if (!selected || !weight || !total) return;
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
    doc.text('מחשבון מחיר', 105, 60, { align: 'center' });
    doc.setFontSize(16);
    doc.text(`מוצר: ${selected.name}`, 20, 80);
    doc.text(`מחיר לק"ג: ₪${selected.price}`, 20, 90);
    doc.text(`משקל: ${weight} גרם`, 20, 100);
    doc.text(`מחיר סופי: ₪${total.toFixed(2)}`, 20, 110);
    if (selected.image) {
      try {
        const prodImg = await fetch(selected.image).then(r => r.blob()).then(blobToBase64);
        doc.addImage(prodImg, 'JPEG', 120, 80, 70, 70);
      } catch (e) {}
    }
    // Notes
    if (notes) {
      doc.setFontSize(14);
      doc.text('הערות:', 20, 130);
      doc.setFontSize(12);
      doc.text(notes, 20, 140, { maxWidth: 170 });
    }
    doc.save('calculation.pdf');
  };

  // Helper: blob to base64
  function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #ccc' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 24 }}>מחשבון מחיר (פנימי)</h1>
      <div style={{ marginBottom: 16 }}>
        <label>בחר מוצר:</label>
        <select value={selected?.name || ''} onChange={e => {
          const prod = products.find(p => p.name === e.target.value);
          setSelected(prod || null);
          setTotal(null);
        }} style={{ width: '100%', padding: 8, marginTop: 8 }}>
          <option value=''>-- בחר --</option>
          {products.map(p => (
            <option key={p.name} value={p.name}>{p.name}</option>
          ))}
        </select>
      </div>
      {selected && (
        <div style={{ marginBottom: 16 }}>
          <img src={selected.image} alt={selected.name} style={{ maxWidth: 200, maxHeight: 200, display: 'block', margin: '0 auto 16px' }} />
          <div>מחיר לק"ג: <b>₪{selected.price}</b></div>
        </div>
      )}
      <div style={{ marginBottom: 16 }}>
        <label>הזן משקל בגרם:</label>
        <input type='number' value={weight} onChange={e => setWeight(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 8 }} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>הערות (לא חובה):</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 8, minHeight: 50 }} />
      </div>
      <button onClick={handleCalc} style={{ width: '100%', padding: 12, background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, fontSize: 18, marginBottom: 16 }}>חשב מחיר</button>
      {total !== null && (
        <div style={{ textAlign: 'center', fontSize: 22, marginBottom: 16 }}>
          מחיר סופי: <b>₪{total.toFixed(2)}</b>
        </div>
      )}
      {total !== null && (
        <button onClick={handlePDF} style={{ width: '100%', padding: 12, background: '#10b981', color: '#fff', border: 'none', borderRadius: 6, fontSize: 18 }}>הורד PDF</button>
      )}
    </div>
  );
} 