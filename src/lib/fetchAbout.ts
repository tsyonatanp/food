export async function fetchAbout() {
  const res = await fetch('https://opensheet.elk.sh/1xTlTECzbxdDVu6SSnoQnN_GtL39b7-ZzhgcIvaLyljU/about');
  if (!res.ok) throw new Error('Failed to fetch about info');
  return res.json();
} 