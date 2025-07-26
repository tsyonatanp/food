export async function fetchSheleg() {
  try {
    // מנסה לטעון תמונות מ-Google Sheets
    const res = await fetch('https://opensheet.elk.sh/1xTlTECzbxdDVu6SSnoQnN_GtL39b7-ZzhgcIvaLyljU/sheleg');
    if (!res.ok) {
      console.warn('Failed to fetch sheleg images from Google Sheets');
      return [];
    }
    const data = await res.json();
    
    // מסנן תמונות ריקות ומחזיר רק תמונות תקינות
    const images = data
      .map((row: any) => row['תמונה'] || row['image'] || row['link'])
      .filter((url: string) => url && url.trim() !== '');
    
    return images.length > 0 ? images : [];
  } catch (error) {
    console.warn('Error fetching sheleg images:', error);
    return [];
  }
} 