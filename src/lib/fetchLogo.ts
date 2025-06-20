    export async function fetchLogoUrl() {
      const res = await fetch('https://opensheet.elk.sh/1xTlTECzbxdDVu6SSnoQnN_GtL39b7-ZzhgcIvaLyljU/settings');
      if (!res.ok) throw new Error('Failed to fetch logo');
      const data = await res.json();
      const logoRow = data.find((row: any) => row.key === 'logoUrl');
      return logoRow ? logoRow.value : '/logo.png';
    }
