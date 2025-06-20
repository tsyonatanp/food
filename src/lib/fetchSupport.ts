export async function fetchSupport() {
  const res = await fetch('https://opensheet.elk.sh/1xTlTECzbxdDVu6SSnoQnN_GtL39b7-ZzhgcIvaLyljU/support');
  if (!res.ok) throw new Error('Failed to fetch support info');
  return res.json();
} 