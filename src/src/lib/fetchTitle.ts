export async function fetchTitle() {
  const res = await fetch('https://opensheet.elk.sh/1xTlTECzbxdDVu6SSnoQnN_GtL39b7-ZzhgcIvaLyljU/Title');
  if (!res.ok) throw new Error('Failed to fetch title');
  return res.json();
} 