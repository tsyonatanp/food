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
  const [finalNotes, setFinalNotes] = useState('');
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
        // מחיר ל-100 גרם
        const total = (w / 100) * selected.price;
        setCalculations(prev => [
          ...prev,
          { product: selected, weight: w, total, notes }
        ]);
        setWeight('');
        setNotes('');
      }
    }
  };

  const handleDeleteCalculation = (index: number) => {
    setCalculations(prev => prev.filter((_, i) => i !== index));
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
    if (printRef.current && typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleAllPDF = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    doc.text('Hello world', 10, 10);
    doc.save('order-summary.pdf');
  };

  // חישוב סך הכל להזמנה
  const totalSum = calculations.reduce((sum, c) => sum + c.total, 0);

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #ccc' }}>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #private-calc-output, #private-calc-output * { visibility: visible; }
          #private-calc-output { position: absolute; left: 0; top: 0; width: 100vw; background: white; }
          #private-calc-output th:last-child,
          #private-calc-output td:last-child { display: none; }
        }
        #private-calc-output .order-title {
          font-size: 2rem;
          font-weight: bold;
          color: #283078;
          text-align: center;
          margin-bottom: 0.5em;
        }
        #private-calc-output .order-date {
          text-align: left;
          font-size: 1.1rem;
          margin-bottom: 1em;
        }
        #private-calc-output table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 16px;
        }
        #private-calc-output th {
          background: #e6e6f0;
          font-weight: bold;
          padding: 8px;
          border: 1px solid #ddd;
        }
        #private-calc-output tr:nth-child(even) {
          background: #f0f0fa;
        }
        #private-calc-output tr:nth-child(odd) {
          background: #fff;
        }
        #private-calc-output td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        #private-calc-output .final-notes-title {
          border: 1.5px solid #789;
          background: #f5f5ff;
          padding: 8px 12px;
          font-weight: bold;
          margin-bottom: 0.5em;
          display: inline-block;
        }
        #private-calc-output .greeting {
          color: #287828;
          font-size: 1.2rem;
          text-align: center;
          margin-top: 2em;
        }
      `}</style>
      <h1 style={{ textAlign: 'center', marginBottom: 24 }}>מחשבון מחיר (פנימי)</h1>
      {/* טופס */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ marginBottom: 16, border: '2px solid #e5e7eb', borderRadius: 8, padding: 16 }}>
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
        <div style={{ marginBottom: 16, border: '2px solid #e5e7eb', borderRadius: 8, padding: 16 }}>
          <label>הזן משקל בגרם:</label>
          <input type='number' value={weight} onChange={e => setWeight(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 8, border: '1px solid #d1d5db', borderRadius: 4 }} />
        </div>
        <div style={{ marginBottom: 16, border: '2px solid #e5e7eb', borderRadius: 8, padding: 16 }}>
          <label>הערות (לא חובה):</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 8, minHeight: 50, border: '1px solid #d1d5db', borderRadius: 4 }} />
        </div>
        <button onClick={handleAddCalculation} style={{ width: '100%', padding: 12, background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, fontSize: 18, marginBottom: 24 }}>הוסף חישוב</button>
      </div>
      {/* פלט להדפסה ול-PDF */}
      <div id="private-calc-output" ref={printRef}>
        <div className="order-title">שלג-רוז – אוכל מוכן</div>
        <div className="order-date">{(() => {
          const date = new Date();
          const months = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
          return `${date.getDate()} ב${months[date.getMonth()]} ${date.getFullYear()}`;
        })()}</div>
        {calculations.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>מוצר</th>
                <th>מחיר ל-100 גרם</th>
                <th>משקל (גרם)</th>
                <th>מחיר סופי</th>
                <th>הערות</th>
                <th>פעולות</th>
              </tr>
            </thead>
            <tbody>
              {calculations.map((calc, idx) => (
                <tr key={idx}>
                  <td>{calc.product.name}</td>
                  <td>₪{calc.product.price}</td>
                  <td>{calc.weight}</td>
                  <td>₪{calc.total.toFixed(2)}</td>
                  <td>{calc.notes}</td>
                  <td>
                    <button 
                      onClick={() => handleDeleteCalculation(idx)}
                      style={{ 
                        background: '#dc2626', 
                        color: 'white', 
                        padding: '4px 8px', 
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      aria-label={`מחק את ${calc.product.name}`}
                    >
                      מחק
                    </button>
                  </td>
                </tr>
              ))}
              <tr style={{ fontWeight: 'bold', background: '#e6e6f0' }}>
                <td colSpan={3} style={{ textAlign: 'left' }}>סך הכל להזמנה:</td>
                <td>₪{totalSum.toFixed(2)}</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        )}
        <div className="final-notes-title">הערות כלליות:</div>
        <div style={{ border: '1.5px solid #789', background: '#f5f5ff', borderRadius: 6, padding: 12, minHeight: 50, marginBottom: 24 }}>
          {finalNotes}
        </div>
        <div className="greeting">בתיאבון ובריאות טובה 🌿 צוות שלג-רוז</div>
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