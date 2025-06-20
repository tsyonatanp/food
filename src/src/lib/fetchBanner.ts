export async function fetchBanner() {
  const res = await fetch('https://opensheet.elk.sh/1xTlTECzbxdDVu6SSnoQnN_GtL39b7-ZzhgcIvaLyljU/Banner');
  if (!res.ok) throw new Error('Failed to fetch banner');
  return res.json();
} 