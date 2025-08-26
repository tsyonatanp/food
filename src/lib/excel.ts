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
  
  // יצירת נתונים לטבלת הזמנה - רק שם מוצר ומשקל
  const orderItems = orderData.cart.map((item, index) => ({
    'מספר שורה': index + 1,
    'שם מוצר': item.name,
    'משקל (גרם)': item.isByWeight ? item.weight : (item.quantity ? `${item.quantity} יחידות` : '')
  }));

  // יצירת worksheet לפרטי הזמנה
  const orderWorksheet = XLSX.utils.json_to_sheet(orderItems);
  
  // הגדרת רוחב עמודות - רק 3 עמודות
  const columnWidths = [
    { wch: 8 },   // מספר שורה
    { wch: 30 },  // שם מוצר
    { wch: 15 }   // משקל
  ];
  orderWorksheet['!cols'] = columnWidths;
  
  // יצירת worksheet לפרטי לקוח
  const customerData = [
    { 'שדה': 'מספר הזמנה', 'ערך': orderData.orderNumber },
    { 'שדה': 'שם לקוח', 'ערך': orderData.customerName },
    { 'שדה': 'טלפון', 'ערך': orderData.phone },
    { 'שדה': 'כתובת', 'ערך': orderData.address },
    { 'שדה': 'קומה', 'ערך': orderData.floor || '' },
    { 'שדה': 'דירה', 'ערך': orderData.apartment || '' },
    { 'שדה': 'קוד כניסה', 'ערך': orderData.entryCode || '' },
    { 'שדה': 'הערות', 'ערך': orderData.notes || '' },
    { 'שדה': '', 'ערך': '' },
    { 'שדה': 'סה"כ לתשלום', 'ערך': `₪${orderData.finalTotal.toFixed(2)}` },
    { 'שדה': 'תאריך הזמנה', 'ערך': new Date().toLocaleDateString('he-IL') },
    { 'שדה': 'שעת הזמנה', 'ערך': new Date().toLocaleTimeString('he-IL') }
  ];
  
  const customerWorksheet = XLSX.utils.json_to_sheet(customerData);
  customerWorksheet['!cols'] = [{ wch: 15 }, { wch: 30 }];

  // הוספת הworksheets לworkbook
  XLSX.utils.book_append_sheet(workbook, customerWorksheet, 'פרטי לקוח');
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
