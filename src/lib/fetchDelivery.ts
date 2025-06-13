export async function fetchDelivery() {
  const res = await fetch('https://opensheet.elk.sh/1xTlTECzbxdDVu6SSnoQnN_GtL39b7-ZzhgcIvaLyljU/delivery');
  if (!res.ok) throw new Error('Failed to fetch delivery info');
  return res.json();
} 