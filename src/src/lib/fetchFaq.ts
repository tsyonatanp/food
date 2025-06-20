export async function fetchFaq() {
  const res = await fetch('https://opensheet.elk.sh/1xTlTECzbxdDVu6SSnoQnN_GtL39b7-ZzhgcIvaLyljU/faq');
  if (!res.ok) throw new Error('Failed to fetch faq info');
  return res.json();
} 