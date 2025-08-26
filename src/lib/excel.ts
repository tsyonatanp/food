import * as XLSX from 'xlsx';

interface OrderItem {
  name: string;
  isByWeight: boolean;
  weight?: number;
  quantity?: number;
  price?: number;
  pricePerGram?: number;
  total: number;
}

interface OrderData {
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  floor?: string;
  apartment?: string;
  entryCode?: string;
  notes?: string;
  cart: OrderItem[];
  total: number;
  deliveryFee: number;
  finalTotal: number;
}

export function createOrderExcelFile(orderData: OrderData): Buffer {
  // יצירת workbook חדש
  const workbook = XLSX.utils.book_new();
  
  // יצירת נתונים לטבלת הזמנה - רק משקל ושם מוצר
  const orderItems = orderData.cart.map((item) => ({
    'משקל (גרם)': item.isByWeight ? item.weight : (item.quantity ? `${item.quantity} יחידות` : ''),
    'שם מוצר': item.name
  }));

  // יצירת worksheet לפרטי הזמנה
  const orderWorksheet = XLSX.utils.json_to_sheet(orderItems);
  
  // הגדרת רוחב עמודות - רק 2 עמודות
  const columnWidths = [
    { wch: 15 },  // משקל
    { wch: 30 }   // שם מוצר
  ];
  orderWorksheet['!cols'] = columnWidths;

  // הוספת הworksheet לworkbook - רק גיליון אחד
  XLSX.utils.book_append_sheet(workbook, orderWorksheet, 'רשימת מוצרים');

  // יצירת קובץ Excel כbuffer
  const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  
  return excelBuffer;
}

// פונקציה ליצירת שם קובץ
export function generateExcelFilename(orderNumber: string): string {
  const date = new Date().toLocaleDateString('he-IL').replace(/\//g, '-');
  return `הזמנה_${orderNumber}_${date}.xlsx`;
}
