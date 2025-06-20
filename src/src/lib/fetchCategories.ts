export async function fetchCategories() {
  const res = await fetch('https://opensheet.elk.sh/1xTlTECzbxdDVu6SSnoQnN_GtL39b7-ZzhgcIvaLyljU/MenuCategories');
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  const data = await res.json();
  console.log('Categories data:', data);
  return data;
} 