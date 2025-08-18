export async function fetchMenu() {
  const res = await fetch('https://opensheet.elk.sh/1xTlTECzbxdDVu6SSnoQnN_GtL39b7-ZzhgcIvaLyljU/Menu');
  if (!res.ok) throw new Error('Failed to fetch menu');
  const data = await res.json();
  // Use the value from the sheet for averageWeightPerUnit
  return data.map((item: any) => ({
    ...item,
    averageWeightPerUnit: item['הערכה'] ? Number(item['הערכה']) : undefined,
  }));
} 