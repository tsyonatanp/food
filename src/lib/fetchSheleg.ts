export async function fetchSheleg() {
  const res = await fetch('https://opensheet.elk.sh/1xTlTECzbxdDVu6SSnoQnN_GtL39b7-ZzhgcIvaLyljU/sheleg');
  if (!res.ok) throw new Error('Failed to fetch sheleg images');
  const data = await res.json();
  return data.map((row: any) => row.sheleg).filter((url: string) => !!url);
} 