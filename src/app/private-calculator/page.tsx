'use client'

import { useEffect, useState, useRef } from 'react';

interface Product {
  name: string;
  price: number;
  roiePrice: number;
}

interface Calculation {
  product: Product;
  weight: number;
  selectedBoxes: { name: string; weight: number }[];
  totalBoxWeight: number;
  netWeight: number;
  total: number;
  notes: string;
}

interface RoieCalculation {
  product: Product;
  weight: number;
  selectedBoxes: { name: string; weight: number }[];
  totalBoxWeight: number;
  netWeight: number;
  roiePrice: number;
  total: number;
  notes: string;
}

// סוגי קופסאות עם משקלים
const BOX_TYPES = [
  { name: 'קופסה גדולה', weight: 70 },
  { name: 'קופסה קטנה', weight: 50 }, 
  { name: 'קופסה סלט גדול', weight: 20 },
  { name: 'קופסה סלט קטן', weight: 10 }
];

const TEMP_LOGO = '/images/logo.png';

export default function PrivateCalculator() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [weight, setWeight] = useState('');
  const [selectedBoxes, setSelectedBoxes] = useState<{ name: string; weight: number }[]>([]);
  const [notes, setNotes] = useState('');
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [roieCalculations, setRoieCalculations] = useState<RoieCalculation[]>([]);
  const [finalNotes, setFinalNotes] = useState('');
  const printRef = useRef<HTMLDivElement>(null);

  // הודעת אישור ביציאה מהמחשבון
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // רק אם יש חישובים או הערות, נציג הודעת אישור
      if (calculations.length > 0 || roieCalculations.length > 0 || finalNotes.trim() || notes.trim()) {
        e.preventDefault();
        e.returnValue = 'האם אתה בטוח שברצונך לצאת? השינויים לא יישמרו.';
        return 'האם אתה בטוח שברצונך לצאת? השינויים לא יישמרו.';
      }
    };

    // הוספת event listener
    window.addEventListener('beforeunload', handleBeforeUnload);

    // ניקוי event listener
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [calculations, roieCalculations, finalNotes, notes]);

  // Fetch products from Google Sheets (opensheet API)
  useEffect(() => {
    fetch('https://opensheet.elk.sh/1xTlTECzbxdDVu6SSnoQnN_GtL39b7-ZzhgcIvaLyljU/Menu')
      .then(res => res.json())
      .then((data) => {
        const filtered = data.filter((item: any) => String(item.checkboxes).toLowerCase() === 'true');
        const items: Product[] = filtered.map((item: any) => ({
          name: item['מנה'],
          price: Number(item['מחיר (₪)']),
          roiePrice: Number(item['רועי']),
        }));
        setProducts(items);
      });
  }, []);

  const handleBoxToggle = (boxType: { name: string; weight: number }) => {
    setSelectedBoxes(prev => {
      const isSelected = prev.some(box => box.name === boxType.name);
      if (isSelected) {
        return prev.filter(box => box.name !== boxType.name);
      } else {
        return [...prev, boxType];
      }
    });
  };

  const handleAddCalculation = () => {
    if (selected && weight) {
      const w = parseFloat(weight);
      if (!isNaN(w)) {
        // חישוב משקל כולל של כל הקופסאות שנבחרו
        const totalBoxWeight = selectedBoxes.reduce((sum, box) => sum + box.weight, 0);
        
        // חישוב משקל נטו (ללא קופסאות)
        const netWeight = Math.max(0, w - totalBoxWeight);
        
        // מחיר ל-100 גרם על המשקל הנטו
        const total = (netWeight / 100) * selected.price;
        
        setCalculations(prev => [
          ...prev,
          { 
            product: selected, 
            weight: w, 
            selectedBoxes: [...selectedBoxes],
            totalBoxWeight: totalBoxWeight,
            netWeight: netWeight,
            total, 
            notes 
          }
        ]);
        setWeight('');
        setNotes('');
        setSelectedBoxes([]); // איפוס הקופסאות שנבחרו
      }
    }
  };

  const handleCalculateRoie = () => {
    if (calculations.length === 0) {
      alert('אין מוצרים לחישוב רועי. הוסף מוצרים קודם.');
      return;
    }

    // אם יש כבר חישובי רועי, נשאל אם למחוק אותם
    if (roieCalculations.length > 0) {
      const confirmed = window.confirm('יש כבר חישובי רועי קיימים. האם אתה רוצה להחליף אותם?');
      if (!confirmed) {
        return;
      }
    }

    // המרת כל החישובים הרגילים לחישובי רועי
    const newRoieCalculations: RoieCalculation[] = calculations.map(calc => {
      // חישוב משקל כולל של כל הקופסאות (חצי משקל)
      const totalBoxWeight = calc.selectedBoxes.reduce((sum, box) => sum + (box.weight / 2), 0);
      
      // חישוב משקל נטו (ללא חצי קופסאות)
      const netWeight = Math.max(0, calc.weight - totalBoxWeight);
      
      // מחיר רועי מהעמודה "רועי"
      const roiePrice = calc.product.roiePrice;
      
      // מחיר סופי על המשקל הנטו
      const total = (netWeight / 100) * roiePrice;
      
      return {
        product: calc.product,
        weight: calc.weight,
        selectedBoxes: calc.selectedBoxes,
        totalBoxWeight: totalBoxWeight,
        netWeight: netWeight,
        roiePrice: roiePrice,
        total: total,
        notes: calc.notes
      };
    });

    setRoieCalculations(newRoieCalculations);
  };

  const handleDeleteCalculation = (index: number) => {
    const confirmed = window.confirm('האם אתה בטוח שברצונך למחוק את הפריט הזה?');
    if (confirmed) {
      setCalculations(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleDeleteRoieCalculation = (index: number) => {
    const confirmed = window.confirm('האם אתה בטוח שברצונך למחוק את הפריט הזה?');
    if (confirmed) {
      setRoieCalculations(prev => prev.filter((_, i) => i !== index));
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

  const handlePrint = (type: 'customer' | 'roie' | 'all') => {
    if (printRef.current && typeof window !== 'undefined') {
      // הוספת CSS להסתרת/הצגת אלמנטים לפי סוג הדפסה
      const style = document.createElement('style');
      style.textContent = `
        @media print {
          body * { visibility: hidden; }
          #private-calc-output, #private-calc-output * { visibility: visible; }
          #private-calc-output { position: absolute; left: 0; top: 0; width: 100vw; background: white; }
          #private-calc-output th:last-child,
          #private-calc-output td:last-child { display: none; }
        }
      `;
      
      if (type === 'customer') {
        style.textContent += `
          @media print {
            .roie-section { display: none !important; }
          }
        `;
      } else if (type === 'roie') {
        style.textContent += `
          @media print {
            .customer-section { display: none !important; }
          }
        `;
      }
      
      document.head.appendChild(style);
      window.print();
      document.head.removeChild(style);
    }
  };

  const handleAllPDF = async (type: 'customer' | 'roie' | 'all') => {
    // הסרנו את הפונקציונליות של PDF כדי להקטין את גודל הבונדל
    alert('פונקציונליות PDF זמינה בקרוב');
  };

  // חישוב סך הכל להזמנה
  const totalSum = calculations.reduce((sum, c) => sum + c.total, 0);
  const roieTotalSum = roieCalculations.reduce((sum, c) => sum + c.total, 0);
  const deliveryFee = 30; // דמי משלוח קבועים
  const totalWithDelivery = totalSum + deliveryFee;

  // חישוב משקל כולל של קופסאות נבחרות
  const totalSelectedBoxWeight = selectedBoxes.reduce((sum, box) => sum + box.weight, 0);

  const handleGoBack = () => {
    // בדיקה אם יש חישובים או הערות
    if (calculations.length > 0 || roieCalculations.length > 0 || finalNotes.trim() || notes.trim()) {
      const confirmed = window.confirm('האם אתה בטוח שברצונך לצאת? השינויים לא יישמרו.');
      if (confirmed) {
        window.location.href = '/';
      }
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '20px auto', padding: '16px 12px', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #ccc' }}>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #private-calc-output, #private-calc-output * { visibility: visible; }
          #private-calc-output { position: absolute; left: 0; top: 0; width: 100vw; background: white; }
          #private-calc-output th:last-child,
          #private-calc-output td:last-child { display: none; }
        }
        @media screen and (max-width: 640px) {
          #private-calc-output table {
            font-size: 14px;
          }
          #private-calc-output th,
          #private-calc-output td {
            padding: 4px;
          }
          #private-calc-output .order-title {
            font-size: 1.5rem !important;
          }
          #private-calc-output .order-date {
            font-size: 1rem !important;
          }
          #private-calc-output .greeting {
            font-size: 1rem !important;
          }
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <button 
          onClick={handleGoBack}
          style={{ 
            padding: '8px 16px', 
            background: '#6b7280', 
            color: 'white', 
            border: 'none', 
            borderRadius: 6, 
            cursor: 'pointer',
            fontSize: 14
          }}
          aria-label="חזור לדף הבית"
        >
          ← חזור לדף הבית
        </button>
        <h1 style={{ textAlign: 'center', margin: 0, flex: 1 }}>מחשבון מחיר (פנימי)</h1>
        <div style={{ width: 100 }}></div> {/* Spacer for balance */}
      </div>
      {/* טופס */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ marginBottom: 16, border: '2px solid #e5e7eb', borderRadius: 8, padding: '12px 8px' }}>
          <label style={{ display: 'block', marginBottom: 4 }}>בחר מוצר:</label>
          <select value={selected?.name || ''} onChange={e => {
            const prod = products.find(p => p.name === e.target.value);
            setSelected(prod || null);
          }} style={{ width: '100%', padding: '6px 4px', marginTop: 4, border: '1px solid #d1d5db', borderRadius: 4 }}>
            <option value=''>-- בחר --</option>
            {products.map(p => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>
        </div>
        
        <div style={{ marginBottom: 16, border: '2px solid #e5e7eb', borderRadius: 8, padding: '12px 8px' }}>
          <label style={{ display: 'block', marginBottom: 8 }}>בחר קופסאות (אפשר לבחור כמה):</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {BOX_TYPES.map(box => (
              <label key={box.name} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={selectedBoxes.some(selectedBox => selectedBox.name === box.name)}
                  onChange={() => handleBoxToggle(box)}
                  style={{ marginLeft: '8px' }}
                />
                {box.name} ({box.weight} גרם)
              </label>
            ))}
          </div>
          {selectedBoxes.length > 0 && (
            <div style={{ fontSize: '12px', color: '#666', marginTop: '8px', padding: '4px', background: '#f0f0f0', borderRadius: '4px' }}>
              משקל כולל של קופסאות: {totalSelectedBoxWeight} גרם
            </div>
          )}
        </div>
        
        <div style={{ marginBottom: 16, border: '2px solid #e5e7eb', borderRadius: 8, padding: '12px 8px' }}>
          <label style={{ display: 'block', marginBottom: 4 }}>
            {selectedBoxes.length > 0 ? 'הזן משקל כולל (עם קופסאות) בגרם:' : 'הזן משקל בגרם:'}
          </label>
          <input 
            type='number' 
            value={weight} 
            onChange={e => setWeight(e.target.value)} 
            style={{ width: '100%', padding: '6px 4px', marginTop: 4, border: '1px solid #d1d5db', borderRadius: 4 }} 
          />
          {weight && selectedBoxes.length > 0 && (
            <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
              משקל נטו: {Math.max(0, parseFloat(weight) - totalSelectedBoxWeight)} גרם
            </div>
          )}
          {weight && selectedBoxes.length === 0 && (
            <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
              משקל נטו: {parseFloat(weight)} גרם (ללא קופסאות)
            </div>
          )}
        </div>
        
        <div style={{ marginBottom: 16, border: '2px solid #e5e7eb', borderRadius: 8, padding: '12px 8px' }}>
          <label style={{ display: 'block', marginBottom: 4 }}>הערות (לא חובה):</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} style={{ width: '100%', padding: '6px 4px', marginTop: 4, minHeight: 50, border: '1px solid #d1d5db', borderRadius: 4 }} />
        </div>
        
        <div style={{ display: 'flex', gap: '8px', marginBottom: 20 }}>
          <button onClick={handleAddCalculation} style={{ flex: 1, padding: '10px 8px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, fontSize: 16 }}>הוסף חישוב</button>
          <button 
            onClick={() => {
              if (calculations.length > 0 || roieCalculations.length > 0 || finalNotes.trim() || notes.trim()) {
                const confirmed = window.confirm('האם אתה בטוח שברצונך לנקות הכל? פעולה זו לא ניתנת לביטול.');
                if (confirmed) {
                  setCalculations([]);
                  setRoieCalculations([]);
                  setFinalNotes('');
                  setNotes('');
                  setSelectedBoxes([]);
                  setWeight('');
                  setSelected(null);
                }
              }
            }}
            style={{ 
              padding: '10px 16px', 
              background: '#dc2626', 
              color: '#fff', 
              border: 'none', 
              borderRadius: 6, 
              fontSize: 16,
              cursor: 'pointer'
            }}
            aria-label="נקה את כל החישובים וההערות"
          >
            נקה הכל
          </button>
        </div>
        
        {/* שדה הערות כלליות */}
        <div style={{ marginBottom: 16, border: '2px solid #e5e7eb', borderRadius: 8, padding: '12px 8px' }}>
          <label style={{ display: 'block', marginBottom: 4 }}>הערות כלליות (לא חובה):</label>
          <textarea 
            value={finalNotes} 
            onChange={e => setFinalNotes(e.target.value)} 
            placeholder="הזן הערות כלליות להזמנה..."
            style={{ width: '100%', padding: '6px 4px', marginTop: 4, minHeight: 80, border: '1px solid #d1d5db', borderRadius: 4 }} 
          />
        </div>
      </div>
      
      {/* פלט להדפסה ול-PDF */}
      <div id="private-calc-output" ref={printRef}>
        <div className="order-title">שלג-רוז – אוכל מוכן</div>
        <div className="order-date">{(() => {
          const date = new Date();
          const months = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
          return `${date.getDate()} ב${months[date.getMonth()]} ${date.getFullYear()}`;
        })()}</div>
        
        {/* טבלה רגילה */}
        {calculations.length > 0 && (
          <div className="customer-section">
            <h3 style={{ marginTop: '24px', marginBottom: '12px', color: '#283078', borderBottom: '2px solid #e6e6f0', paddingBottom: '8px' }}>
              חישוב רגיל
            </h3>
            <table>
              <thead>
                <tr>
                  <th>מוצר</th>
                  <th>מחיר ל-100 גרם</th>
                  <th>משקל כולל</th>
                  <th>קופסאות</th>
                  <th>משקל נטו</th>
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
                    <td>{calc.weight} גרם</td>
                    <td>
                      {calc.selectedBoxes.length > 0 
                        ? calc.selectedBoxes.map(box => `${box.name} (${box.weight} גרם)`).join(', ')
                        : 'ללא קופסאות'
                      }
                    </td>
                    <td>{calc.netWeight} גרם</td>
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
                  <td colSpan={5} style={{ textAlign: 'left' }}>סך הכל להזמנה:</td>
                  <td>₪{totalSum.toFixed(2)}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr style={{ fontWeight: 'bold', background: '#f0f8ff' }}>
                  <td colSpan={5} style={{ textAlign: 'left' }}>דמי משלוח:</td>
                  <td>₪{deliveryFee.toFixed(2)}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr style={{ fontWeight: 'bold', background: '#e6ffe6' }}>
                  <td colSpan={5} style={{ textAlign: 'left' }}>סך הכל לתשלום:</td>
                  <td>₪{totalWithDelivery.toFixed(2)}</td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        
        {/* טבלת רועי */}
        {roieCalculations.length > 0 && (
          <div className="roie-section">
            <h3 style={{ marginTop: '24px', marginBottom: '12px', color: '#059669', borderBottom: '2px solid #d1fae5', paddingBottom: '8px' }}>
              חישוב לרועי
            </h3>
            <table>
              <thead>
                <tr>
                  <th>מוצר</th>
                  <th>מחיר רועי ל-100 גרם</th>
                  <th>משקל כולל</th>
                  <th>קופסאות (חצי משקל)</th>
                  <th>משקל נטו</th>
                  <th>מחיר סופי</th>
                  <th>פעולות</th>
                </tr>
              </thead>
              <tbody>
                {roieCalculations.map((calc, idx) => (
                  <tr key={idx}>
                    <td>{calc.product.name}</td>
                    <td>₪{calc.roiePrice.toFixed(2)}</td>
                    <td>{calc.weight} גרם</td>
                    <td>
                      {calc.selectedBoxes.length > 0 
                        ? calc.selectedBoxes.map(box => `${box.name} (${box.weight/2} גרם)`).join(', ')
                        : 'ללא קופסאות'
                      }
                    </td>
                    <td>{calc.netWeight} גרם</td>
                    <td>₪{calc.total.toFixed(2)}</td>
                    <td>
                      <button 
                        onClick={() => handleDeleteRoieCalculation(idx)}
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
                <tr style={{ fontWeight: 'bold', background: '#d1fae5' }}>
                  <td colSpan={5} style={{ textAlign: 'left' }}>סך הכל לתשלום:</td>
                  <td>₪{roieTotalSum.toFixed(2)}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        
        <div className="final-notes-title">הערות כלליות:</div>
        <div style={{ border: '1.5px solid #789', background: '#f5f5ff', borderRadius: 6, padding: 12, minHeight: 50, marginBottom: 24 }}>
          {finalNotes}
        </div>
        <div className="greeting">בתיאבון ובריאות טובה 🌿 צוות שלג-רוז</div>
      </div>
      
      {/* כפתורי הדפסה ו-PDF */}
      {calculations.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button onClick={handleCalculateRoie} style={{ width: '100%', padding: '10px 8px', background: '#059669', color: '#fff', border: 'none', borderRadius: 6, fontSize: 16 }}>חישוב לרועי</button>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button onClick={() => handlePrint('customer')} style={{ padding: '10px 8px', background: '#f59e42', color: '#fff', border: 'none', borderRadius: 6, fontSize: 16 }}>הדפס ללקוח</button>
            <button onClick={() => handlePrint('roie')} style={{ padding: '10px 8px', background: '#059669', color: '#fff', border: 'none', borderRadius: 6, fontSize: 16 }}>הדפס לרועי</button>
          </div>
          
          <button onClick={() => handlePrint('all')} style={{ width: '100%', padding: '10px 8px', background: '#8b5cf6', color: '#fff', border: 'none', borderRadius: 6, fontSize: 16 }}>הדפס הכל</button>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button onClick={() => handleAllPDF('customer')} style={{ padding: '10px 8px', background: '#10b981', color: '#fff', border: 'none', borderRadius: 6, fontSize: 16 }}>PDF ללקוח</button>
            <button onClick={() => handleAllPDF('roie')} style={{ padding: '10px 8px', background: '#059669', color: '#fff', border: 'none', borderRadius: 6, fontSize: 16 }}>PDF לרועי</button>
          </div>
          
          <button onClick={() => handleAllPDF('all')} style={{ width: '100%', padding: '10px 8px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 6, fontSize: 16 }}>PDF הכל</button>
        </div>
      )}
    </div>
  );
} 