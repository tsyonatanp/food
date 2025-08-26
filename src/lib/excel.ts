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
  
  // יצירת נתונים לטבלת הזמנה
  const orderItems = orderData.cart.map((item, index) => ({
    'מספר שורה': index + 1,
    'שם מוצר': item.name,
    'סוג מכירה': item.isByWeight ? 'לפי משקל' : 'לפי יחידות',
    'משקל (גרם)': item.isByWeight ? item.weight : '',
    'כמות יחידות': !item.isByWeight ? item.quantity : '',
    'מחיר ל-100 גרם (₪)': item.isByWeight ? (item.pricePerGram ? item.pricePerGram * 100 : '') : '',
    'מחיר ליחידה (₪)': !item.isByWeight ? item.price : '',
    'סה"כ מחיר (₪)': item.total,
    'הערות': ''
  }));

  // יצירת worksheet לפרטי הזמנה
  const orderWorksheet = XLSX.utils.json_to_sheet(orderItems);
  
  // הגדרת רוחב עמודות
  const columnWidths = [
    { wch: 8 },   // מספר שורה
    { wch: 25 },  // שם מוצר
    { wch: 12 },  // סוג מכירה
    { wch: 12 },  // משקל
    { wch: 12 },  // כמות יחידות
    { wch: 15 },  // מחיר ל-100 גרם
    { wch: 15 },  // מחיר ליחידה
    { wch: 15 },  // סה"כ מחיר
    { wch: 20 }   // הערות
  ];
  orderWorksheet['!cols'] = columnWidths;

  // הוספת כותרת לטבלה
  const titleRow = [
    { 'מספר שורה': 'פרטי הזמנה', 'שם מוצר': '', 'סוג מכירה': '', 'משקל (גרם)': '', 'כמות יחידות': '', 'מחיר ל-100 גרם (₪)': '', 'מחיר ליחידה (₪)': '', 'סה"כ מחיר (₪)': '', 'הערות': '' }
  ];
  
  const titleWorksheet = XLSX.utils.json_to_sheet(titleRow);
  titleWorksheet['!cols'] = columnWidths;
  
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
    { 'שדה': 'סה"כ מוצרים', 'ערך': `₪${orderData.total.toFixed(2)}` },
    { 'שדה': 'דמי משלוח', 'ערך': `₪${orderData.deliveryFee.toFixed(2)}` },
    { 'שדה': 'סה"כ לתשלום', 'ערך': `₪${orderData.finalTotal.toFixed(2)}` },
    { 'שדה': 'תאריך הזמנה', 'ערך': new Date().toLocaleDateString('he-IL') },
    { 'שדה': 'שעת הזמנה', 'ערך': new Date().toLocaleTimeString('he-IL') }
  ];
  
  const customerWorksheet = XLSX.utils.json_to_sheet(customerData);
  customerWorksheet['!cols'] = [{ wch: 15 }, { wch: 30 }];

  // הוספת הworksheets לworkbook
  XLSX.utils.book_append_sheet(workbook, customerWorksheet, 'פרטי לקוח');
  XLSX.utils.book_append_sheet(workbook, orderWorksheet, 'פרטי הזמנה');

  // יצירת קובץ Excel כbuffer
  const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  
  return excelBuffer;
}

// פונקציה ליצירת שם קובץ
export function generateExcelFilename(orderNumber: string): string {
  const date = new Date().toLocaleDateString('he-IL').replace(/\//g, '-');
  return `הזמנה_${orderNumber}_${date}.xlsx`;
}
