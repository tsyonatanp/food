export async function fetchBanner() {
  const res = await fetch('https://opensheet.elk.sh/1xTITECxbxDUv6SsnoQn_GtL39b7-ZzhgcIvaLyjljU/Banner');
  if (!res.ok) throw new Error('Failed to fetch banner');
  return res.json();
} 