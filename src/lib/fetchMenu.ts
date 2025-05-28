export async function fetchMenu() {
  const res = await fetch('https://opensheet.elk.sh/1xTlTECzbxdDVu6SSnoQnN_GtL39b7-ZzhgcIvaLyljU/Menu', {
    next: { revalidate: 60 }
  });
  if (!res.ok) throw new Error('Failed to fetch menu');
  return res.json();
} 